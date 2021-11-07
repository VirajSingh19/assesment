import React from "react"

import './countervalue.scss';

const ConterValue: React.FC<{ counter: number }> = ({ counter }) => {
    return <div className="counter-value">

        <div className="label">
            Counter Value
        </div>

        <div>
            {counter}
        </div>
    </div>
}

export default ConterValue;