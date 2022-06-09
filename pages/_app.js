import react, {useEffect} from 'react';
import SSRProvider from 'react-bootstrap/SSRProvider';
// import OneSignal from 'react-onesignal';
import NextNProgress from "nextjs-progressbar";
import { wrapper } from '../redux/store'

import 'bootstrap/dist/css/bootstrap.css'
import '../styles/sass/main.scss'


function MyApp({ Component, pageProps }) {

  useEffect(() => {
    OneSignal = window.OneSignal || [];
    OneSignal.init({
      appId: "2f65b3c0-7af9-4430-9197-927cb4c3572e",
      safari_web_id: "web.onesignal.auto.3cd6b41f-0715-4da8-9007-02ca4af2dc44",
      notifyButton: {
          enable: true,
      },
      allowLocalhostAsSecureOrigin: true,
    });

    OneSignal.push(function () {
      OneSignal.SERVICE_WORKER_PARAM = { scope: '/push/onesignal/' };
      OneSignal.SERVICE_WORKER_PATH = 'push/onesignal/OneSignalSDKWorker.js'
      // OneSignal.init(initConfig);
    });

    
    return () => {
    };
  }, []);

  return (
        <SSRProvider>
          <NextNProgress color="#85bae9" />
          <Component {...pageProps} />
        </SSRProvider>
  )
}

 export default wrapper.withRedux(MyApp);

