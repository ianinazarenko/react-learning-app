import {
    INCREASE,
    DECREASE,
    CLEAR_CART,
    REMOVE,
    TOGGLE_AMOUNT,
    GET_TOTALS,
} from "./actions";

function reducer(state, action) {
    switch (action.type) {
        // Clear cart
        case CLEAR_CART:
            return { ...state, cart: [] };

        // Decrease amount
        case DECREASE:
            const decreaseItemCart = state.cart.map((item) => {
                if (item.id === action.payload.id) {
                    return { ...item, amount: item.amount - 1 };
                }
                return item;
            });
            // .filter((item) => item.amount !== 0);
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
            console.log("remove");
            const tempCart = state.cart.filter(
                (item) => item.id !== action.payload.id
            );
            return { ...state, cart: tempCart };

        case TOGGLE_AMOUNT:
            console.log("toggle");
            const toggleAmountCart = state.cart
                .map((item) => {
                    if (item.id === action.payload.id) {
                        if (action.payload.type === "increase") {
                            return { ...item, amount: item.amount + 1 };
                        } else if (action.payload.type === "decrease") {
                            return { ...item, amount: item.amount - 1 };
                        }
                    }
                    return item;
                })
                .filter((item) => item.amount !== 0);
            return { ...state, cart: toggleAmountCart };

        case GET_TOTALS:
            let { totalAmount, totalSum } = state.cart.reduce(
                (acc, curr) => {
                    const { amount, price } = curr;
                    acc.totalAmount += amount;
                    acc.totalSum += amount * price;
                    return acc;
                },
                {
                    totalSum: 0,
                    totalAmount: 0,
                }
            );

            totalSum = parseFloat(totalSum.toFixed(2));
            return {
                ...state,
                amount: totalAmount,
                total: totalSum,
            };

        default:
            return state;
    }
}

export default reducer;
