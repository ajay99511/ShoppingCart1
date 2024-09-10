import { Button, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import { UseAppDispatch, useAppSelector } from "../store/ConfigureStore";
import { logout } from "../../features/account/AccountSlice";
import { clearBasket } from "../../features/basket/BasketSlice";

export default function SignInMenu()
{
    const dispatch = UseAppDispatch();
    const {user} = useAppSelector(state=>state.account)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          color="inherit"
          onClick={handleClick}
          sx={{typography:'h6'}}
        >
          {user?.username}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          // MenuListProps={{
          //   'aria-labelledby': 'basic-button',
          // }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My Orders</MenuItem>
          <MenuItem onClick={()=>{dispatch(logout()),dispatch(clearBasket())}}>Logout</MenuItem>
        </Menu>
      </div>
    );
}