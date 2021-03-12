import { useReducer } from "react";
import OrderContext from "./orderContext";
import OrderReducer from "./orderReducer";

import { CHOOSE_CLIENT, CHOOSE_PRODUCT, QUANTITY_PRODUCTS } from "../../types";

const OrderState = ({ children }) => {
    // Order State
    const initialState = {
        client: {},
        products: [],
        total: 0,
    };

    const [state, dispatch] = useReducer(OrderReducer, initialState);

    // Modify the client
    const addClient = (client) => {
        // console.log(client)
        dispatch({
            type: CHOOSE_CLIENT,
            payload: client,
        });
    };

    // Add a product
    const addProducts = (chosenProducts) => {
        let newState;
        if (state.products.length > 0) {
            newState = chosenProducts.map((product) => {
                const newObject = state.products.find(
                    (productState) => productState.id == product.id
                );
                return { ...product, ...newObject };
            });
        } else {
            newState = chosenProducts;
        }
        dispatch({
            type: CHOOSE_PRODUCT,
            payload: newState,
        });
    };

    // Modify quantities
    const quantityProducts = (productAdded) => {
        console.log("Modifying from state", productAdded);
        dispatch({
            type: QUANTITY_PRODUCTS,
            payload: productAdded,
        });
    };

    return (
        <OrderContext.Provider
            value={{
                products: state.products,
                addClient,
                addProducts,
                quantityProducts,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
};

export default OrderState;
