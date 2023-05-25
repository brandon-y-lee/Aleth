import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { GlobalTheme } from '../styles/GlobalTheme';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import './styles.css';
import StyledProvider from './StyledProvider';
import Header from '../components/Common/Header/Header.component';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Common/Footer/Footer.component';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Aleth</title>
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={GlobalTheme}>
          <StyledProvider />
          <Header />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default MyApp;
