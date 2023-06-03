import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux';
import { getPreferredThemeMode } from './pages/Login/selectors';
import { ThemeModes } from './entities/common';
import { deepPurple, } from '@mui/material/colors';

const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
    const preferredThemeMode = useSelector(getPreferredThemeMode);

    const theme = useMemo(
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
