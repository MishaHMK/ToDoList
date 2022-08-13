
import axios from "axios";

export class AppService {
    baseURL: string = "https://localhost:44342/api/";

    public static async get(url : string){
        const response = await axios.get("https://localhost:44342/api/" + url);
        return response.data;
    }

    public static async create(url : string){
        const response = await axios.get("https://localhost:44342/api/" + url);
        return response.data;
    }

}