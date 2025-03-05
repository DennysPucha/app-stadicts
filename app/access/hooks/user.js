import { PUT } from "../methods";
import { getToken } from "../session";
export async function PostChangeUser(data, external_id){
    const token = await getToken();
    const response = await PUT(`cuentas/users/${external_id}`, token, data);
    return response;
}