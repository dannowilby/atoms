import { useState, useEffect } from 'react';

const useTimeSince = (start) => {

    const [time, setTime] = useState(Date.now() - start);
    useEffect(() => {

        const interval = setInterval(() => {
            setTime(Date.now() - start)
        }, 1000);

        return () => clearInterval(interval);
    })

    return time;
}

export default useTimeSince;