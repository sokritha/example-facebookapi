import "../styles/globals.css";

import { initFacebookSdk } from "../utils/facebook";

// wait for facebook sdk before startup
initFacebookSdk().then(MyApp);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
