import { useState, useEffect } from 'react';

function useFetcher(url) {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            setIsPending(true);
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Something went wrong :(');
                }

                const result = await response.json();
                setData(result);
                setIsPending(false);
                setError(null);
            } catch (err) {
                console.log(err.message);
                setIsPending(false);
                setError(err.message);
            }
        };

        getData();
    }, [url]);

    return { data, isPending, error };
}

export default useFetcher;
