import { useEffect, useState } from "react";
import { GET, POST, DELETE } from "../methods";
import { getToken } from "../session";

export function useGetSeriesByExercise(ejercicio_id) {
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(0);

    const fetchData = async () => {
        try {
            setLoading(true);
            const token = await getToken();
            const response = await GET(`series/ejercicio/${ejercicio_id}`, token);
            setSeries(response.data || []);
        } catch (error) {
            console.error("Error fetching series:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [refresh]);

    const refetch = () => setRefresh((prev) => prev + 1);

    return { series, loading, refetch };
}
export async function PostSerie(data){
    const token = await getToken();
    const response = await POST(`series`, token, data);
    return response;
}

export async function DeleteSerie(external_id){
    const token = await getToken();
    const response = await DELETE(`series/${external_id}`, token);
    return response;
}
