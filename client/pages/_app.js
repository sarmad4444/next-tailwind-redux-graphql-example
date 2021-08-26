import React from "react";
import {ApolloProvider} from "@apollo/client";
import {wrapper} from "../stores/auth/authStore";
import client from "../services/graphQL/client";

import 'tailwindcss/tailwind.css'

const MyApp = ({ Component, pageProps }) => {

  return (
    <ApolloProvider client={client} data-theme="cupcake">
      <Component {...pageProps} />
    </ApolloProvider>
    )
}

export default wrapper.withRedux(MyApp);