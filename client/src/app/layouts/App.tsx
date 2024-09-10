import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./Header";
import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingComponent from "./LoadingComponent";
import { UseAppDispatch, useAppSelector } from "../store/ConfigureStore";
import { FetchBasketAsync } from "../../features/basket/BasketSlice";
import { fetchCurrentUserAsync } from "../../features/account/AccountSlice";
import { getCookie } from "../util/util";

function App() {
  const dispatch = UseAppDispatch();
  const [loading,setLoading] = useState(true);
  const {basket} = useAppSelector(state=>state.basket);

  const initializeUserBasket = useCallback(async()=>{
    try {
      await dispatch(fetchCurrentUserAsync());
      if(basket!=null)
      {
        await dispatch(FetchBasketAsync());
      }
    } catch (error) {
      console.log(error);
    }
  },[dispatch])

   useEffect(()=>
  {
    initializeUserBasket().then(()=>setLoading(false));
  },[initializeUserBasket])

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette:{
      mode: paletteType,
      background:{
        default: paletteType === 'light' ?'#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChange()
  {
    setDarkMode(!darkMode);
  }

  if(loading) return <LoadingComponent message="Initializing App..."/>
  
  return (
    <>
    <ThemeProvider theme={theme}>
    <CssBaseline/>
    <ToastContainer position='bottom-right' hideProgressBar theme="colored"/>  
    <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
    <Container>
    <Outlet />
    </Container>
    </ThemeProvider>
    </>
  );
}

export default App

 // const {setBasket} = useStoreContext();
  // useEffect(()=>
  // {
  //   const buyerId = getCookie('buyerId');
  //   dispatch(fetchCurrentUserAsync());
  //   if(buyerId)
  //   {
  //     agent.Basket.get()
  //     .then(basket=>dispatch(setBasket(basket)))
  //     .catch(error=>console.log(error))
  //     .finally(()=>setLoading(false))
  //   }
  //   else{
  //     setLoading(false);
  //   }
  // },[dispatch])

  /* async function initApp()
  {
  try{
  await dispatch(FetchCurrentUserAsync());
  await dispatch(FetchBasketAsync())
  }
  catch(error)
  {
  console.log(error);
  }
  }
  */