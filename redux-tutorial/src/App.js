import React from "react";

// components
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";

// items
import cartItems from "./cart-items";

// redux stuff
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducer";

const initialStore = {
    cart: cartItems,
    amount: 3,
    total: 110,
};

const store = createStore(reducer, initialStore);

function App() {
    // cart setup

    return (
        <main>
            <Provider store={store}>
                <Navbar />
                <CartContainer cart={cartItems} />
            </Provider>
        </main>
    );
}

export default App;
