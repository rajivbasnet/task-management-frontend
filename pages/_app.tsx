import type { AppProps /*, AppContext */ } from 'next/app'
import React, {useEffect, useContext, Fragment} from "react";
import Router from 'next/router';
import 'antd/dist/antd.css';
import "../styles/styles.css";
import "../styles/global.css";
import "font-awesome/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.css";

process.env.NEXTAUTH_SITE = "http://localhost:3000"

function MyApp({ Component, pageProps }: AppProps) {
    const {session} = pageProps
    if (session) {
      Router.push(`/${session.role}`)
    }

    useEffect(() => {
      const {pathname} = Router
      if(pathname == '/' ){
          Router.push('/login')
      }
    });

    return (
      <Fragment>
         <Component {...pageProps} items/>
      </Fragment>
       
    )
  }
  
export default MyApp;