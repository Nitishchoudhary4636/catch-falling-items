// pages/_app.js
import '../globals.css'; // Adjusted path based on file location

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
