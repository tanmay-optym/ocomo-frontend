type AppProps = { Component: React.FC; pageProps: object }; /* could also use interface */

function MyApp({ Component, pageProps }: AppProps): React.FC {
    return <Component {...pageProps} />;
}
export default MyApp;
