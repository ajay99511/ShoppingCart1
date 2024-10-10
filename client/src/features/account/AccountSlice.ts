import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../app/models/User";
import agent from "../../app/api/agent";
import { FieldValues } from "react-hook-form";
import { router } from "../../app/router/Routes";
import { toast } from "react-toastify";
import { setBasket } from "../basket/BasketSlice";

// const navigate = useNavigate();
export interface AccountState
{
    user:User|null,
    status : string
}
const initialState:AccountState =
{
    user:null,
    status : 'Idle'
}
export const signInAsync = createAsyncThunk<User,FieldValues>(
    'account/signInAsync',
    async(data,thunkAPI)=>{
        try {
            const userDto = await agent.Account.login(data);
            const {basket,...user} = userDto;
            if(basket) thunkAPI.dispatch(setBasket(basket));
            localStorage.setItem('user',JSON.stringify(user));
            return user;
        } catch (error : any) {
            return thunkAPI.rejectWithValue({error:error.data})
        }
    }
)

export const fetchCurrentUserAsync = createAsyncThunk<User>(
    'account/fetchCurrentUserAsync',
    async(_,thunkAPI)=>{
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)))
        try {
            const userDto = await agent.Account.getCurrentUser();
            const {basket,...user} = userDto;
            if(basket) 
                {
                    thunkAPI.dispatch(setBasket(basket));
                }
            localStorage.setItem('user',JSON.stringify(user));
            return user;
        } catch (error:any) {
            return thunkAPI.rejectWithValue({error:error.data})
        }
    },
    {
        condition: ()=>{
            if(!localStorage.getItem('user'))
            {
                return false
            }
        }
    }
)
export const AccountSlice = createSlice(
    {
        name:'account',
        initialState,
        reducers:{
            logout:(state)=>{
                
                localStorage.removeItem('user');
                state.user = null;
                router.navigate('/')
            },
            setUser:(state,action)=>{
                state.user = action.payload;
                localStorage.setItem('user',JSON.stringify(action.payload));
                // router.navigate('/catalog')
            }
        },
        extraReducers(builder) {
            builder.addCase(fetchCurrentUserAsync.rejected,(state)=>{
                state.user = null;
                localStorage.removeItem('user');
                toast.error("Session Expired!! Please re-login");
                router.navigate('/');
                state.status = 'Reject'
        }),
            // builder.addMatcher(isAnyOf(fetchCurrentUserAsync.pending,signInAsync.pending),(state,action)=>{
            // }),
        builder.addCase(signInAsync.rejected,(state,action)=>{
            console.log(action.payload)
            state.status = 'Reject'
        }),
        builder.addMatcher(isAnyOf(fetchCurrentUserAsync.fulfilled,signInAsync.fulfilled),(state,action)=>{
            state.user = action.payload
            state.status = 'Idle'
        })
        // builder.addMatcher(isAnyOf(signInAsync.rejected),(state,action)=>{
        //     console.log(action.payload)
        // })
        }
    }
)

export const {logout,setUser} = AccountSlice.actions;