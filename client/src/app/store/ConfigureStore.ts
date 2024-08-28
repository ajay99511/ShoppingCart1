import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../../features/contact/CounterSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { basketSlice } from "../../features/basket/BasketSlice";
import { CatalogSlice } from "../../features/catalog/CatalogSlice";

// export default function ConfigureStore()
// {
//     return createStore(CounterReducer);
// }

export const store = configureStore({
    reducer:{
        counter: counterSlice.reducer,
        basket : basketSlice.reducer,
        catalog : CatalogSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const UseAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector :TypedUseSelectorHook<RootState> = useSelector;