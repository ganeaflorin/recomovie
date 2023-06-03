import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import { getPreferredThemeMode } from './pages/Login/selectors';
import { ThemeModes } from './entities/common';
import { deepPurple, } from '@mui/material/colors';

const ThemeProviderWrapper = ({ children }: { children: any }) => {
    const preferredThemeMode = useSelector(getPreferredThemeMode);
    console.log("🚀 ~ file: ThemeProviderWrapper.tsx:10 ~ ThemeProviderWrapper ~ preferredThemeMode:", preferredThemeMode)

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: preferredThemeMode,
                    ...(preferredThemeMode === ThemeModes.light ? {
                    } : { primary: deepPurple })
                },
            }),
        [preferredThemeMode],
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}

export default ThemeProviderWrapper;
