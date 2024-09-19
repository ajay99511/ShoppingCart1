import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/Basket";
import agent from "../../app/api/agent";
import { getCookie } from "../../app/util/util";
export interface BasketState
{
    basket : Basket | null,
    status :string
}
const initialState:BasketState={
    basket : null,
    status :'idle'
}
export const FetchBasketAsync = createAsyncThunk<Basket>(
    'basket/fetchBasketAsync',
    async(_, thunkAPI)=>{
        try {
            return await agent.Basket.get();
        } catch (error:any) {
           return thunkAPI.rejectWithValue({error: error.data});
        }
    },
    {
        condition:()=>{
            if(!getCookie('buyerId')) return false;
        }
    }
)
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
            clearBasket:(state)=>{
                state.basket = null;
            },
        },
        extraReducers:(builder =>{
            builder.addCase(AddBasketItemAsync.pending,(state,action)=>
            {
                console.log(action)
                state.status='PendingAddItem'+action.meta.arg.productId+'add'
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
            builder.addMatcher(isAnyOf(AddBasketItemAsync.fulfilled,FetchBasketAsync.fulfilled),(state,action)=>
                {
                        state.basket = action.payload;
                        state.status='Idle';
                })
                builder.addMatcher(isAnyOf(AddBasketItemAsync.rejected,FetchBasketAsync.rejected),(state,action)=>
                {
                        state.status='Idle';
                        console.log(action.payload)
                })
        }
        )
    }
)
export const {setBasket,clearBasket} = basketSlice.actions;


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