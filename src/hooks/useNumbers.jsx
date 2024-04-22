import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useNumbers = () => {
    const [number, setNumber] = useState(0);

    useEffect(() => {
        axios.get('/getNumbers')
            .then(res => {
                setNumber(res.data);
            })
    }, []);

    return number;
};

export default useNumbers;