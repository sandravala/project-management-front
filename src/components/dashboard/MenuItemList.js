import * as React from 'react';
import MenuItem from "./MenuItem";
import {Home, Info} from "@mui/icons-material";
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';

export const MenuItemList = (

    <>
        <MenuItem label="Home" link="/" icon={<Home/>} />
        <MenuItem label="About" link="/about" icon={<Info/>} />
        <MenuItem label="Projects" link="/projects" icon={<CategoryOutlinedIcon/>} />
        <MenuItem label="Sign up" link="/signup" icon={<LockOpenIcon/>} />
    </>
);
