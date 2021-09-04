import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/globals.css';

import {useEffect} from 'react';
import {Provider} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { useRouter } from 'next/router';
// import { Provider as NextAuthProvider } from 'next-auth/client'
import {store,persistor} from '../utils/StateManager';
import Cookies from "js-cookie";

function MyApp({ Component, pageProps }) {
  let router = useRouter();
  let token = Cookies.get("token");
  useEffect(()=>{
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
    if(token!==undefined & token!==null){
      localStorage.setItem('token',token)
    }
  },[]);

  // if(router.pathname !== "/login" & (token===undefined | token===null)) {
  //   router.push('/login');
  // }

  return (<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <Component {...pageProps} />
    </PersistGate>
    </Provider>)
}

export default MyApp
