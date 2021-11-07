import React, { useEffect, useRef, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import './counter.scss'
import Loader from '../Loader';

interface CounterInterface {
    virajsingh: number
};


const Counter: React.FC = () => {

    const max_value = 999;

    const [count, setCount] = useState<number>(0);

    const [loading, setLoading] = useState<boolean>(false);

    const timer = useRef<any>(null);

    const syncCount = async (count: number = 1): Promise<void> => {
        try {
            if (max_value > 1000 || count < -10) return;

            setLoading(true);
            const payload: CounterInterface = {
                virajsingh: count
            };
            const { data }: AxiosResponse = await axios.put('/front-end.json', payload);
            setCount(data.virajsingh)
        } finally {
            setLoading(false);
        }
    }


    const updateCount = async (count: number): Promise<void> => {

        setCount(count);

        window.clearTimeout(timer.current);

        timer.current = window.setTimeout(async () => {
            try {
                setLoading(true);
                const payload: CounterInterface = {
                    virajsingh: count
                };
                await axios.put('/front-end.json', payload);
            } finally {
                setLoading(false);
            }
        }, 1e3);

    }


    const fetchCount = async (): Promise<void> => {
        try {
            setLoading(true);
            const { data }: AxiosResponse = await axios.get('/front-end.json');
            setCount(data.virajsingh)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        syncCount(1).then(fetchCount);
    }, []);

    return <div className="counter_wrapper">
        {
            <div className="loading">
                {
                    loading &&
                    <>
                        <Loader />
                        <span className="text">
                            Saving Counter Value
                        </span>
                    </>
                }
            </div>
        }

        <div className="counter">
            <button className="decrement" onClick={() => syncCount(count - 1)}> - </button>


            <div className="count">
                <input
                    style={{ marginLeft: count >= 10 ? count >= 100 ? '1.5rem' : '2rem' : '4rem' }}
                    type="text" value={count} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (Number.isNaN(+e.target.value) || +e.target.value > max_value) {
                            return
                        }
                        updateCount(+e.target.value);
                    }} />
            </div>

            <button className="increment" onClick={() => syncCount(count + 1)}> + </button>

        </div>
    </div>
}

export default Counter;
