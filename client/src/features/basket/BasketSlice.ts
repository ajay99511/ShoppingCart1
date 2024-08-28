import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/Basket";
import agent from "../../app/api/agent";
export interface BasketState
{
    basket : Basket | null,
    status :string
}
const initialState:BasketState={
    basket : null,
    status :'idle'
}
export const AddBasketItemAsync = createAsyncThunk<Basket,{productId:number,quantity?:number}>(
    'basket/addBasketItemAsync',
    async({productId,quantity},thunkAPI)=>{
        try {
            return await agent.Basket.addItem(productId,quantity)
        } catch (error:any) {
            // console.log(error);
            return thunkAPI.rejectWithValue({error:error.data});
        }
    }
)

export const removeBasketItemAsync = createAsyncThunk<void,{productId:number,quantity:number,name:string}>(
    'basket/removeBasketItemAsync',
    async({productId,quantity=1},thunkAPI)=>{
        try{
            await agent.Basket.removeItem(productId,quantity)
        }
        catch(error : any)
        {
            // console.log(error)
            return thunkAPI.rejectWithValue({error:error.data});
        }
    }
)
export const basketSlice = createSlice(
    {
        name:'basket',
        initialState,
        reducers:{
            setBasket:(state,action)=>{
                state.basket = action.payload;
            },
            
        },
        extraReducers:(builder =>{
            builder.addCase(AddBasketItemAsync.pending,(state,action)=>
            {
                console.log(action)
                state.status='PendingAddItem'+action.meta.arg.productId
            })
            builder.addCase(AddBasketItemAsync.fulfilled,(state,action)=>
            {
                    state.basket = action.payload;
                    state.status='Idle';
            })
            builder.addCase(AddBasketItemAsync.rejected,(state,action)=>
            {
                    state.status='Idle';
                    console.log(action.payload)
            })
            builder.addCase(removeBasketItemAsync.pending,(state,action)=>
            {
                console.log(action)
                state.status='PendingRemoveItem'+action.meta.arg.productId+action.meta.arg.name
            })
            builder.addCase(removeBasketItemAsync.fulfilled,(state,action)=>
            {
                const {productId,quantity} = action.meta.arg;
                const itemIndex = state.basket?.items.findIndex(x=>x.productId===productId);
                if(itemIndex === -1 || itemIndex === undefined) return;
                state.basket!.items[itemIndex].quantity -=quantity!;
                if(state.basket?.items[itemIndex].quantity === 0)
                {
                    state.basket.items.splice(itemIndex,1)
                }
                state.status='Idle'
            })
            builder.addCase(removeBasketItemAsync.rejected,(state,action)=>
            {
                    state.status='Idle'
                    console.log(action.payload)
            })
        }
        )
    }
)
export const {setBasket} = basketSlice.actions;


// removeItem:(state,action)=>{
            //     const {productId,quantity} = action.payload;
            //     const itemIndex = state.basket?.items.findIndex(x=>x.productId===productId);
            //     if(itemIndex === -1 || itemIndex === undefined) return;
            //     state.basket!.items[itemIndex].quantity -=quantity;
            //     if(state.basket?.items[itemIndex].quantity === 0)
            //     {
            //         state.basket.items.splice(itemIndex,1)
            //     }

            //     }