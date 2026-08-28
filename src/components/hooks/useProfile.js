import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
export const useProfile = () => {
    const { data: session, status } = useSession();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (status === 'authenticated') {
            fetch('/api/profile')
                .then(res => res.json())
                .then(data => {
                setData(data);
                setLoading(false);
            });
        }
        else if (status === 'unauthenticated') {
            setData(null);
            setLoading(false);
        }
    }, [session, status]);
    return { data, loading };
};
