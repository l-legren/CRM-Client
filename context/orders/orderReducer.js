import { CHOOSE_CLIENT, CHOOSE_PRODUCT, QUANTITY_PRODUCTS, UPDATE_TOTAL } from "../../types";

const OrderReducer = (state, action) => {
    switch (action.type) {
        case CHOOSE_CLIENT:
            return {
                ...state,
                client: action.payload,
            };

        case CHOOSE_PRODUCT:
            return {
                ...state,
                products: action.payload,
            };

        case QUANTITY_PRODUCTS:
            return {
                ...state,
                products: state.products.map((prod) =>
                    prod.id == action.payload.id
                        ? (prod = action.payload)
                        : prod
                )
            };

        case UPDATE_TOTAL:
            return {
                ...state,
                total: state.products.reduce((total, prod) => total += (prod.price * prod.quantity), 0)
            }
        
        default:
            return state;
    }
};

export default OrderReducer;
