import PropTypes from 'prop-types';
import { ContextProvider } from '../src/state';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
}

MyApp.propTypes = {
  pageProps: PropTypes.object.isRequired,
  Component: PropTypes.elementType.isRequired,
};

export default MyApp;
