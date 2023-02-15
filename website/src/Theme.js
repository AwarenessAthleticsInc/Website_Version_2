import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const main = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#00A1Cf',
        },
        secondary: {
            main: '#87BEEB',
        },
        error: {
            main: '#FF0000',
        },
        success: {
            main: '#008000',
        },
        divider: '#acacac',
        action: {
            main: '#000000',
        },
        background: {
            default: '#ffffff',
            paper: '#ffffff',
            box: 'transparent',
        },
        text: {
            primary: 'rgba(0,0,0,0.87)',
            secondary: 'rgba(0,0,0,0.54)',
            disabled: 'rgba(0,0,0,0.38)',
            hint: 'rgba(0,0,0,0.38)',
        },
    },
    typography: {
        fontFamily: 'Montserrat',
        h1: {
            fontFamily: 'Ubuntu',
            fontSize: "3rem",
            fontWeight: "500",
        },
        h2: {
            fontFamily: 'Ubuntu',
            fontSize: '2.5rem',
            fontWeight: "500",
        },
        h3: {
            fontFamily: 'Ubuntu',
            fontSize: '2rem',
            fontWeight: "500",
        },
        h4: {
            fontFamily: 'Ubuntu',
            fontSize: '1.5rem',
            fontWeight: "400",
        },
        h5: {
            fontFamily: 'Ubuntu',
            fontSize: '1.25rem',
            fontWeight: "400",
        },
        h6: {
            fontFamily: 'Ubuntu',
            fontSize: "1rem",
            fontWeight: "400",
        },
        p: {
            fontFamily: 'Montserrat',
            fontSize: "1rem",
            fontWeight: "400",
        }
    },
    overrides: {
        MuiSwitch: {
            root: {
                width: 42,
                height: 26,
                padding: 0,
                margin: 8,
            },
            switchBase: {
                padding: 1,
                '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
                    transform: 'translateX(16px)',
                    color: '#fff',
                    '& + $track': {
                        opacity: 1,
                        border: 'none',
                    },
                },
            },
            thumb: {
                width: 24,
                height: 24,
            },
            track: {
                borderRadius: 13,
                border: '1px solid #bdbdbd',
                backgroundColor: '#fafafa',
                opacity: 1,
                transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            },
        },
    },
});
const dark = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#00A1Cf',
        },
        secondary: {
            main: '#87BEEB',
        },
        error: {
            main: '#FF0000',
        },
        success: {
            main: '#008000',
        },
        action: {
            main: '#87beeb',
        },
        divider: '#acacac',
        background: {
            default: '#303030',
            paper: '#424242',
        },
        text: {
            primary: '#ffffff',
            secondary: 'rgba(255,255,255,0.7)',
            disabled: 'rgba(255,255,255,0.5)',
            hint: 'rgba(255,255,255,0.5)',
        },
    },
    typography: {
        fontFamily: 'Montserrat',
        h1: {
            fontFamily: 'Ubuntu',
            fontSize: "3rem",
            fontWeight: "500",
        },
        h2: {
            fontFamily: 'Ubuntu',
            fontSize: '2.5rem',
            fontWeight: "500",
        },
        h3: {
            fontFamily: 'Ubuntu',
            fontSize: '2rem',
            fontWeight: "500",
        },
        h4: {
            fontFamily: 'Ubuntu',
            fontSize: '1.5rem',
            fontWeight: "400",
        },
        h5: {
            fontFamily: 'Ubuntu',
            fontSize: '1.25rem',
            fontWeight: "400",
        },
        h6: {
            fontFamily: 'Ubuntu',
            fontSize: "1rem",
            fontWeight: "400",
        },
        p: {
            fontFamily: 'Montserrat',
            fontSize: "1rem",
            fontWeight: "400",
        }
    },
    overrides: {
        MuiSwitch: {
            root: {
                width: 42,
                height: 26,
                padding: 0,
                margin: 8,
            },
            switchBase: {
                padding: 1,
                '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
                    transform: 'translateX(16px)',
                    color: '#fff',
                    '& + $track': {
                        opacity: 1,
                        border: 'none',
                    },
                },
            },
            thumb: {
                width: 24,
                height: 24,
            },
            track: {
                borderRadius: 13,
                border: '1px solid #bdbdbd',
                backgroundColor: '#fafafa',
                opacity: 1,
                transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            },
        },
    },
});
const light = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#87beeb',
        },
        secondary: {
            main: '#00A1Cf',
        },
        error: {
            main: '#FF0000',
        },
        success: {
            main: '#008000',
        },
        action: {
            main: '#000000',
        },
        transparent: {
           main: 'transparent',
        },
        divider: '#acacac',
        background: {
            default: '#ffffff',
            paper: '#ffffff',
        },
        text: {
            primary: 'rgba(0,0,0,0.87)',
            secondary: 'rgba(0,0,0,0.54)',
            disabled: 'rgba(0,0,0,0.38)',
            hint: 'rgba(0,0,0,0.38)',
        },
        light: {
            main: '#fcfcfc',
        },
    },
    typography: {
        fontFamily: 'Montserrat',
        fontWeight: "400",
        h1: {
            fontFamily: 'Ubuntu',
            fontSize: "3rem",
            fontWeight: "500",
        },
        h2: {
            fontFamily: 'Ubuntu',
            fontSize: '2.5rem',
            fontWeight: "500",
        },
        h3: {
            fontFamily: 'Ubuntu',
            fontSize: '2rem',
            fontWeight: "500",
        },
        h4: {
            fontFamily: 'Ubuntu',
            fontSize: '1.5rem',
            fontWeight: "400",
        },
        h5: {
            fontFamily: 'Ubuntu',
            fontSize: '1.25rem',
            fontWeight: "400",
        },
        h6: {
            fontFamily: 'Ubuntu',
            fontSize: "1rem",
            fontWeight: "400",
        },
        p: {
            fontFamily: 'Montserrat',
            fontSize: "1rem",
            fontWeight: "400",
        }
    },
    overrides: {
        MuiSwitch: {
            root: {
                width: 42,
                height: 26,
                padding: 0,
                margin: 8,
            },
            switchBase: {
                padding: 1,
                '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
                    transform: 'translateX(16px)',
                    color: '#fff',
                    '& + $track': {
                        opacity: 1,
                        border: 'none',
                    },
                },
            },
            thumb: {
                width: 24,
                height: 24,
            },
            track: {
                borderRadius: 13,
                border: '1px solid #bdbdbd',
                backgroundColor: '#fafafa',
                opacity: 1,
                transition:
                    'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            },
        },
    },
});
const Contrast = createTheme({

});
const Theme = (props) => {
    var theme = main;
    switch (props.theme) {
        case "light":
            theme = light;
            break;
        case "dark":
            theme = dark;
            break;
        case "contrast":
            theme = Contrast;
            break;
        default:
            theme = main;
            break;
    }
    return <ThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
    </ThemeProvider>
}
export default Theme;