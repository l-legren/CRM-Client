import { useReducer } from "react";
import OrderContext from "./orderContext";
import OrderReducer from "./orderReducer";

import { CHOOSE_CLIENT, CHOOSE_PRODUCT, QUANTITY_PRODUCTS, UPDATE_TOTAL } from "../../types";

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
        // console.log("Modifying from state", productAdded);
        dispatch({
            type: QUANTITY_PRODUCTS,
            payload: productAdded,
        });
    };

    const updateTotal = (productsTotal) => {
        // console.log("Updating total....")
        dispatch({
            type: UPDATE_TOTAL,
            payload: productsTotal
        })
    }

    return (
        <OrderContext.Provider
            value={{
                products: state.products,
                total: state.total,
                client: state.client,
                addClient,
                addProducts,
                quantityProducts,
                updateTotal
            }}
        >
            {children}
        </OrderContext.Provider>
    );
};

export default OrderState;
