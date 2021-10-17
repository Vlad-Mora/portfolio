import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { ContextProvider } from "src/context/ContextContainer";

import PageLayout from "src/components/templates/PageLayout/PageLayout";

import "react-tippy/dist/tippy.css";
import "@fortawesome/fontawesome-free/js/all.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/style.scss";

interface IAppProps extends AppProps {}

function App({ Component, pageProps }: IAppProps) {
  return (
    <>
      <Head>
        <title>My Portofolio</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
    </>
  );
}

export default App;
