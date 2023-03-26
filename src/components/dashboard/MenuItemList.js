import * as React from 'react';
import MenuItem from "./MenuItem";
import {Home} from "@mui/icons-material";
import CategoryIcon from '@mui/icons-material/Category';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import AddBoxIcon from '@mui/icons-material/AddBox';

export const MenuItemList = (

    <>
        <MenuItem label="Home" link="/" icon={<Home/>} />
        <MenuItem label="My Projects" link="/projects/my" icon={<StarRoundedIcon/>} />
        <MenuItem label="Projects" link="/projects" icon={<CategoryIcon/>} />
        <MenuItem label="Kurti projekta" link="/projects/save" icon={<AddBoxIcon/>} />
    </>
);
