import { ThemeProvider } from '@material-ui/core';
import theme from '../theme/themeContext';
import '../styles/globals.css';

type AppProps = { Component: React.ElementType; pageProps: object }; /* could also use interface */

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default MyApp;
