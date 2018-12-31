import { WriteStream, ReadStream } from "fs";
import { stringify } from "querystring";
import * as fs from "fs";

export class CookieJar{
    private jar:Map<string,string>=new Map<string,string>();

    private constructor(data:any){
        this.jar=new Map<string,string>(data);
    }
    public get(key:string):string{
        return this.jar[key];
    }

    public contains(key:string):boolean{
        return this.jar.has(key);
    }

    public set(key:string,value:string):string{
        return this.jar[key]=value;
    }

    public delete(key:string):void{
        this.jar.delete(key);
    }

    public save(filename:string):Promise<void>{
        return new Promise((resolve,reject)=>{
            fs.writeFile(filename,JSON.stringify(this.jar),{encoding:"utf-8"},(err:Error)=>{
                if(err){
                    reject(err);
                }else{
                    resolve();
                }
            })
        });
    }

    public static load(filename):Promise<CookieJar>{
        return new Promise<CookieJar>((resolve,reject)=>{
            fs.readFile(filename, {encoding:"utf-8"},(err:Error,data:string)=>{
                if(err){
                    reject(err);
                }else{
                    const cookies:CookieJar=new CookieJar(JSON.parse(data));
                    resolve(cookies);
                }
            });
        });
    }
}