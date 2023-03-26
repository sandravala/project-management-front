import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import * as React from "react";

function Footer(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'SV '}
            <Link color="inherit" href="https://mui.com/">
                Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Footer