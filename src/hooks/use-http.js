import { useCallback, useState } from "react"

const useHttp = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async (options, applyData) => {
        setLoading(true)
        try {
            const response = await fetch(options.url, {
                method: options.method ? options.method : 'GET',
                body: options.body ? JSON.stringify(options.body) : null,
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            if (!response.ok) {
                if (response.status === '400') throw new Error('400: Lorem')
                if (response.status === '401') throw new Error('401: Lorem')
                if (response.status === '402') throw new Error('402: Lorem')
                if (response.status === '403') throw new Error('403: Lorem')
                if (response.status === '404') throw new Error('404: Not found')
                else throw new Error('Something went wrong')
            }
            const data = await response.json();
            applyData(data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false)
        }
    }, []
    )
    return { error, loading, fetchData }
}

export default useHttp