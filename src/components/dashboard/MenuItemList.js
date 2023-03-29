import * as React from 'react';
import MenuItem from "./MenuItem";
import {Home} from "@mui/icons-material";
import CategoryIcon from '@mui/icons-material/Category';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {useTranslation} from "react-i18next";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useSelector } from 'react-redux';


export const MenuItemList = () => {

    const {t} = useTranslation();
    const user = useSelector(({persistedUser}) =>  persistedUser?.userDto);
    const hasAccess = (roles) => user?.roles.some(r => roles.includes(r));

    return (
    <>
        <MenuItem label={t('menuHome')} link="/home" icon={<Home/>} />
        {hasAccess(["ADMIN", "PM"]) && 
        <MenuItem label={t('menuMyProjects')} link="/projects/my" icon={<StarRoundedIcon/>} />
        }
        <MenuItem label={t('menuProjects')} link="/projects" icon={<CategoryIcon/>} />
        {hasAccess(["ADMIN", "PM"]) && 
        <>
        <MenuItem label={t('menuCreateProject')} link="/projects/save" icon={<AddBoxIcon/>} />
        <MenuItem label={"roles"} link="/users" icon={<AdminPanelSettingsIcon/>} />
        </>
        }
    </>
    );
};
