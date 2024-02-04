import React from 'react';
import { useUser } from './UserProvider';

const DateComponent = () => {
    const { data } = useUser()
    const apiDate = new Date(data?.created_at);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = apiDate.toLocaleDateString('en-GB', options);

    return (
        formattedDate
    );
};

export default DateComponent