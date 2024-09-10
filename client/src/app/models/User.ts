import { Basket } from "./Basket";

export interface User{
    email : string,
    username: string,
    token:string,
    basket?:Basket
}