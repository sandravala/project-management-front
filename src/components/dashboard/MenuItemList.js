import * as React from 'react';
import MenuItem from "./MenuItem";
import {Home} from "@mui/icons-material";
import CategoryIcon from '@mui/icons-material/Category';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {useTranslation} from "react-i18next";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';


export const MenuItemList = () => {

    const {t} = useTranslation();

    return (
    <>
        <MenuItem label={t('menuHome')} link="/home" icon={<Home/>} />
        <MenuItem label={t('menuMyProjects')} link="/projects/my" icon={<StarRoundedIcon/>} />
        <MenuItem label={t('menuProjects')} link="/projects" icon={<CategoryIcon/>} />
        <MenuItem label={t('menuCreateProject')} link="/projects/save" icon={<AddBoxIcon/>} />
        <MenuItem label={"roles"} link="/users" icon={<AdminPanelSettingsIcon/>} />
    </>
    );
};
