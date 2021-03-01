import {
    INCREASE,
    DECREASE,
    CLEAR_CART,
    REMOVE,
    TOGGLE_AMOUNT,
} from "./actions";

function reducer(state, action) {
    switch (action.type) {
        case CLEAR_CART:
            return { ...state, cart: [] };
        case DECREASE:
            console.log("decrese");
            const decreaseItemCart = state.cart
                .map((item) => {
                    if (item.id === action.payload.id) {
                        return { ...item, amount: item.amount - 1 };
                    }
                    return item;
                })
                .filter((item) => item.amount !== 0);
            return { ...state, cart: decreaseItemCart };
        case INCREASE:
            const increaseItemCart = state.cart.map((item) => {
                if (item.id === action.payload.id) {
                    return { ...item, amount: item.amount + 1 };
                }
                return item;
            });
            return { ...state, cart: increaseItemCart };
        case REMOVE:
            const tempCart = state.cart.filter(
                (item) => item.id !== action.payload.id
            );
            return { ...state, cart: tempCart };
        // case TOGGLE_AMOUNT:
        //     console.log("toggle");
        //     const toggleAmountCart = state.cart.map((item) => {
        //         if (item.id === action.payload.id) {
        //             if (action.payload.type === "increase") {
        //                 console.log("toggle increase");
        //             } else if (action.payload.type === "decrease") {
        //                 console.log("toggle decrease");
        //             }
        //         }
        //     });
        //     return { ...state, cart: toggleAmountCart };
        default:
            return state;
    }
}

export default reducer;
