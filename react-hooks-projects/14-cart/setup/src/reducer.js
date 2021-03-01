function reducer(state, action) {
    // switch (action.type) {
    //     case "CLEAR_CART":
    //         return { ...state, cart: [], amount: state.cart.length };
    //     case "REMOVE":
    //         const newCart = state.cart.filter(
    //             (item) => item.id !== action.payload
    //         );
    //         return { ...state, cart: newCart, amount: newCart.length };
    //     case "INCREASE":
    //         const newCart = state.cart.map((item) => {
    //             if (item.id === action.payload) {
    //                 ++item.amount;
    //             }
    //             return item;
    //         });
    //         console.log(currentItem);
    //         return { ...state, cart: newCart, amount: state.amount + 1 };
    //     case "DECREASE":
    //         return { ...state, cart: [], amount: state.amount - 1 };
    //     default:
    //         throw new Error("error!");
    // }

    if (action.type === "CLEAR_CART") {
        return { ...state, cart: [] };
    } else if (action.type === "REMOVE") {
        const newCart = state.cart.filter((item) => item.id !== action.payload);
        return { ...state, cart: newCart };
    } else if (action.type === "INCREASE") {
        const newCart = state.cart.map((item) => {
            if (item.id === action.payload) {
                return { ...item, amount: item.amount + 1 };
            }
            return item;
        });
        return { ...state, cart: newCart };
    } else if (action.type === "DECREASE") {
        const newCart = state.cart
            .map((item) => {
                if (item.id === action.payload) {
                    return { ...item, amount: item.amount - 1 };
                }
                return item;
            })
            .filter((item) => item.amount !== 0);
        return { ...state, cart: newCart };
    } else if (action.type === "GET_TOTALS") {
        let { itemsAmount, totalPrice } = state.cart.reduce(
            (acc, curr) => {
                const { price, amount } = curr;
                acc.itemsAmount += amount;
                acc.totalPrice += price * amount;
                return acc;
            },
            {
                itemsAmount: 0,
                totalPrice: 0,
            }
        );

        totalPrice = parseFloat(totalPrice.toFixed(2));

        return {
            ...state,
            amount: itemsAmount,
            total: totalPrice,
        };
    } else if (action.type === "LOADING") {
        return { ...state, loading: true };
    } else if (action.type === "DISPLAY_ITEMS") {
        return { ...state, cart: action.payload, loading: false };
    } else if (action.type === "TOGGLE_AMOUNT") {
        let newCart = state.cart
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
        return { ...state, cart: newCart };
    }

    throw state;
}

export default reducer;
