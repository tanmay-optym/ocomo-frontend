import { ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import theme from '../theme/themeContext';
import '../styles/globals.css';

type AppProps = { Component: React.ElementType; pageProps: object }; /* could also use interface */

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={4}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}>
        <Component {...pageProps} />
      </SnackbarProvider>
    </ThemeProvider>
  );
}
export default MyApp;
