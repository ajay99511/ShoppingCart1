export const Increment_Counter = "Increment_Counter";
export const Decrement_Counter = "Decrement_Counter";
export interface CounterState
{
    data:number;
    title:string,
}
const initialState : CounterState ={
    data : 42,
    title : "Welcome To The Reality",
}
export function increment(amount =1)
{
    return {
        type:Increment_Counter,
        payload:amount
    }
}
export function decrement(amount =1)
{
    return {
        type:Decrement_Counter,
        payload:amount
    }
}
export interface CounterAction {
    type:string,
    payload:number
}
export default function CounterReducer(state = initialState,action :CounterAction)
{
    switch (action.type)
    {
        case "Increment_Counter":
        {
            return {
                ...state,
                data:state.data+action.payload,
                title:"Dark Reality"
            }
        }
        case "Decrement_Counter":
            {
                return {
                    ...state,
                    data:state.data-action.payload
                }
            }
        default:
            {
                return state;
            }
    }
}