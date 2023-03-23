import {createTheme} from "@mui/material/styles";
import {red} from "@mui/material/colors";

const SVtheme = createTheme({
    palette: {
        primary: {
            main: "#0c2248"
        },
        secondary: {
            light: red[700],
            main: "#8f1b1b"
        }
    }
});

export default SVtheme