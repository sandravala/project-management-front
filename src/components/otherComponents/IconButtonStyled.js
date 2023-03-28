import IconButton from "@mui/material/IconButton";

export const IconButtonStyled = ({icon, OnClickFunction}) => {

return (
<IconButton
    sx={{
        color: "#0c2248",
        "& :hover": {
            color: "#fd2929",
            boxShadow: "rgb(126,134,157)",
        }
    }}
    onClick={OnClickFunction}
>
    {icon}
</IconButton>
)

}