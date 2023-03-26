import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import * as React from "react";
import {Translation} from "react-i18next";
import {TextField} from "@mui/material";
import {i18n} from "../../index"
import MenuItem from '@mui/material/MenuItem';
import Paper from "@mui/material/Paper";
import {styled} from "@mui/material/styles";
import Stack from '@mui/material/Stack';


function Footer(props) {
    const changeLanguage = (event) => {
        i18n.changeLanguage(event.target.value);
    };

    return (

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
            >
                    <Typography variant="normal" color="text.secondary" align="center" {...props}>
                        {'SV '}
                        <Link color="inherit" href="https://mui.com/">
                            Website
                        </Link>
                    </Typography>
                    <Typography variant="normal" color="text.secondary" align="center" {...props}>
                        {new Date().getFullYear()}
                    </Typography>
                    <Translation>
                        {(t, {i18n}) => (
                            <TextField
                                select
                                size="small"
                                variant="standard"
                                value={t("language") === "en" ? "en" : "lt"}
                                onChange={changeLanguage}
                            >
                                <MenuItem key="lt" value="lt">
                                    LT
                                </MenuItem>
                                <MenuItem key="en" value="en">
                                    EN
                                </MenuItem>
                            </TextField>

                        )}
                    </Translation>
            </Stack>

    );
}

export default Footer