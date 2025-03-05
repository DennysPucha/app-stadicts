import { useEffect, useState } from "react";
import { GET, POST, DELETE } from "../methods";
import { getToken } from "../session";
import { getUserData } from "../session";

export function useGetTrainersMyUser(fecha) {
    const [trainings, setTrainings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(0);

    const fetchData = async () => {
        try {
            setLoading(true);
            const user = await getUserData();
            const token = await getToken();
            const response = await GET(`entrenamientos/user/${user.id}?fecha=${fecha}`, token);
            setTrainings(response.data || []);
        } catch (error) {
            console.error("Error fetching trainings:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [fecha, refresh]);

    const refetch = () => setRefresh((prev) => prev + 1);

    return { trainings, loading, refetch };
}
export async function PostTraining(data){
    const token = await getToken();
    const response = await POST(`entrenamientos`, token, data);
    return response;
}

export async function DeleteTraining(external_id){
    const token = await getToken();
    const response = await DELETE(`entrenamientos/${external_id}`, token);
    return response;
}

export async function CopyTraining(id, fecha){
    const token = await getToken();
    const response = await POST(`entrenamientos/copy/${id}?fecha=${fecha}`, token);
    return response;
}