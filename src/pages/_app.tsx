import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { EasybaseProvider } from "easybase-react";

import ebconfig from "../ebconfig.js";

import PageLayout from "@templates/PageLayout";

import { ContextProvider } from "@context/ContextContainer";

import "react-tippy/dist/tippy.css";
import "@fortawesome/fontawesome-free/js/all.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/style.scss";
import "react-multi-carousel/lib/styles.css";

interface IAppProps extends AppProps {}

function App({ Component, pageProps }: IAppProps) {
  return (
    <>
      <EasybaseProvider ebconfig={ebconfig}>
        <Head>
          <title>My Portofolio</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link rel="icon" href="/assets/images/favicon.png" />
          <link href="/fonts/style.css" rel="stylesheet" />
          <meta
            name="My Portofolio"
            content="See my work over a great time period."
          />
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
          />
        </Head>
        <ContextProvider>
          <PageLayout>
            <div className="app_pagelayout">
              <Component {...pageProps} />
            </div>
          </PageLayout>
        </ContextProvider>
      </EasybaseProvider>
    </>
  );
}

export default App;
