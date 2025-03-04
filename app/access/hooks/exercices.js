import { useEffect, useState } from "react";
import { GET, POST, DELETE } from "../methods";
import { getToken } from "../session";

export function useGetExercicesMyTrain(entrenamiento_id) {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(0);

    const fetchData = async () => {
        try {
            setLoading(true);
            const token = await getToken();
            const response = await GET(`ejercicios/entrenamiento/${entrenamiento_id}`, token);
            setExercises(response.data || []);
        } catch (error) {
            console.error("Error fetching exercises:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [refresh]);

    const refetch = () => setRefresh((prev) => prev + 1);

    return { exercises, loading, refetch };
}

export async function PostExercice(data){
    const token = await getToken();
    const response = await POST(`ejercicios`, token, data);
    return response;
}

export async function DeleteExercice(external_id){
    const token = await getToken();
    const response = await DELETE(`ejercicios/${external_id}`, token);
    return response;
}