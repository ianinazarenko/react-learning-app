import React, { useState, useContext, useReducer, useEffect } from "react";
import cartItems from "./data";
import reducer from "./reducer";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-useReducer-cart-project";
const AppContext = React.createContext();

const initialState = {
    loading: false,
    cart: cartItems,
    total: 0,
    amount: 0,
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    };

    const removeItem = (id) => {
        dispatch({ type: "REMOVE", payload: id });
    };

    const increaseAmount = (id) => {
        dispatch({ type: "INCREASE", payload: id });
    };

    const decreaseAmount = (id) => {
        dispatch({ type: "DECREASE", payload: id });
    };

    const toggleAmount = (id, type) => {
        dispatch({ type: "TOGGLE_AMOUNT", payload: { id, type } });
    };

    const fetchData = async () => {
        dispatch({ type: "LOADING" });
        try {
            const response = await fetch(url);
            if (response.ok) {
                const cart = await response.json();
                dispatch({ type: "DISPLAY_ITEMS", payload: cart });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        dispatch({ type: "GET_TOTALS" });
    }, [state.cart]);

    return (
        <AppContext.Provider
            value={{
                ...state,
                clearCart,
                removeItem,
                decreaseAmount,
                increaseAmount,
                toggleAmount,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
// make sure use
export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };
