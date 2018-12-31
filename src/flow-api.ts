import Axios, { AxiosResponse, AxiosPromise } from "axios";

export class FlowApi{
    private readonly baseUrl:string="https://flow.polar.com";
    public getLogin():AxiosPromise<any>{
        return Axios.get(this.baseUrl+"/login",{
            
        });
    }
}