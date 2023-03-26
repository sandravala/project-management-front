import {createTheme} from "@mui/material/styles";
import {red} from "@mui/material/colors";

const SVtheme = createTheme({
    palette: {
        primary: {
            main: "#0c2248"
        },
        secondary: {
            main: "#8f1b1b"
        },
        lighterPrimary: {
            main: "#143367"
        }
    },
    typography: {
        countdown: {
            fontSize: 22,
            color: "#c41f1f",
            fontWeight: "bold",
            lineHeight: "normal"
        },
        upperCaseBold: {
            textTransform: "uppercase",
            fontWeight: "bold"
        },
        normal: {
            fontSize: 14,
            color: "#444444"
        }
    }
});

export default SVtheme