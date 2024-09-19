import { AddShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/ConfigureStore";
import SignInMenu from "./SignInMenu";

interface Props{
    darkMode : boolean;
    handleThemeChange: ()=>void;
}

const midLinks = [{title:'catalog',path:'/catalog'},
    {title:'about',path:'/about'},
    {title:'contact',path:'/contact'},
    {title:'error',path:'/error'}
];
const rightLinks = [ 
    {title:'login',path:'/login'},
    {title:'register',path:'/register'}
];

const navStyles ={color:"inherit",typography:"h6",
    '&:hover':{
        color:'grey'},
        '&.active':{
            color:'text.secondary'
        },
        textDecoration:'none'
};

export default function Header({darkMode,handleThemeChange}:Props){
    // const {basket} = useStoreContext();
    const {user} = useAppSelector(state=>state.account);
    const {basket} = useAppSelector(state=>state.basket);
    const itemCount = basket?.items.reduce((sum,item)=>sum+item.quantity,0);
    return(
        <AppBar position="static" sx={{mb:4}}>
            <Toolbar sx={{display:'flex', justifyContent:'space-between', alignContent:'center'}}>

                <Box display='flex' alignContent='center'>
                <Typography variant="h6"
                component={NavLink}
                to=' '
                sx={{color:"inherit",
                textDecoration:"none",
                
                }}>Speed-Cart</Typography>
                <Switch checked={darkMode} onChange={handleThemeChange} />
                </Box>

                <Box display='flex' alignContent='center'>
                <List sx={{display:"flex"}}>
                    {midLinks.map(({title,path})=>
                    <ListItem component={NavLink}
                    to={path}
                    key={path}
                    sx={navStyles}
                    >
                        {title.toUpperCase()}
                    </ListItem>    
                )
                    }
                </List>
                </Box>

               <Box display='flex' alignContent='center'>
               <IconButton size="large" edge="start" color="inherit" sx={{mr:2}} component={Link} to={'basket'} >
                    <Badge badgeContent={itemCount} color="secondary">
                        <AddShoppingCart/>
                    </Badge>
                </IconButton>
                {user ? (<SignInMenu/>):
                (<List sx={{display:"flex"}}>
                {rightLinks.map(({title,path})=>
                <ListItem component={NavLink}
                to={path}
                key={path}
                sx={navStyles}
                >
                    {title.toUpperCase()}
                </ListItem>    
            )
                }
            </List>)
                }
               </Box>

            </Toolbar>
        </AppBar>
    )
}