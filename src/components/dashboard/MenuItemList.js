import * as React from 'react';
import MenuItem from "./MenuItem";
import {Home, Info} from "@mui/icons-material";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import CategoryIcon from '@mui/icons-material/Category';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

export const MenuItemList = (

    <>
        <MenuItem label="Home" link="/" icon={<Home/>} />
        <MenuItem label="My Projects" link="/projects/my" icon={<StarRoundedIcon/>} />
        <MenuItem label="Projects" link="/projects" icon={<CategoryIcon/>} />
        <MenuItem label="Sign up" link="/signup" icon={<LockOpenIcon/>} />
        <MenuItem label="Kurti projekta" link="/projects/save" icon={<AddBoxOutlinedIcon/>} />
    </>
);
