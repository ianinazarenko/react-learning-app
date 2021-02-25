import React, { useState, useReducer } from "react";
import Modal from "./Modal";
import { data } from "../../../data";
// reducer function
const reducer = (state, action) => {
    console.log(state, action);
    return state;
};

const initialState = {
    people: [],
    isModalOpen: false,
    modalContent: "",
};

const Index = () => {
    // const [state, dispatch] = useReducer(reducer, initialState, init);
    const [state, dispatch] = useReducer(reducer, initialState);

    let a = true;
    if (a) {
        dispatch({ type: "TESTING" });
        a = false;
    }
    return <h2>useReducer</h2>;
};

export default Index;
