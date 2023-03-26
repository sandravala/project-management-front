import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { useNavigate} from "react-router-dom";
import {ListItemButton, tooltipClasses} from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material/styles";


const MenuItem = ({label, icon, link}) => {
    const navigate = useNavigate();

    const StyledTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#f5f5f9',
            // color: 'rgba(94,86,86,0.87)',
            maxWidth: 220,
            border: '1px solid #dadde9',
            textTransform: "uppercase"
        },
    }));


    return (
        <StyledTooltip
            title={
                <React.Fragment>
                    <Typography variant="normal">{label}</Typography>
                </React.Fragment>
            }
            placement="right"
        >
            <ListItemButton onClick={() => navigate(link)}>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={label} />
            </ListItemButton>
        </StyledTooltip>
    )
}
export default MenuItem