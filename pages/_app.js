import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "../config/apollo";
import OrderState from "../context/orders/orderState";

function MyApp({ Component, pageProps }) {
    console.log("Loading from _app.js");

    return (
        <ApolloProvider client={client}>
            <OrderState>
                <Component {...pageProps} />
            </OrderState>
        </ApolloProvider>
    );
}

export default MyApp;
