import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
    const [name, setName] = useState("");
    const [list, setList] = useState([]);
    const [isEditing, setIsEditig] = useState(false);
    const [editID, setEditID] = useState(null);
    const [alert, setAlert] = useState({
        show: false,
        msg: "",
        type: "",
    });

    const showAlert = (show = false, type = "", msg = "") => {
        setAlert({ show, type, msg });
    };

    const clearList = () => {
        showAlert(true, "danger", "empty list");
        setList([]);
    };

    const removeItem = (id) => {
        showAlert(true, "danger", "item removed");
        setList(list.filter((item) => item.id !== id));
    };

    const editItem = (id) => {
        const specificItem = list.find((item) => item.id === id);
        setIsEditig(true);
        setEditID(id);
        setName(specificItem.title);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submit");
        if (!name) {
            // set alert
            showAlert(true, "danger", "please enter value");
        } else if (name && isEditing) {
            // deal with editing
        } else {
            showAlert(true, "success", "item added to the list");
            const newItem = {
                id: new Date().getTime().toString(),
                title: name,
            };
            setList([...list, newItem]);
            setName("");
        }
    };

    return (
        <section className="section-center">
            <form className="grocery-form" onSubmit={handleSubmit}>
                {alert.show && (
                    <Alert {...alert} removeAlert={showAlert} list={list} />
                )}
                <div className="form-control">
                    <input
                        type="text"
                        name=""
                        id=""
                        className="grocery"
                        placeholder="e.g. eggs"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button className="submit-btn">
                        {isEditing ? "edit" : "submit"}
                    </button>
                </div>
            </form>
            {list.length > 0 && (
                <div className="grocery-container">
                    <List
                        items={list}
                        removeItem={removeItem}
                        editItem={editItem}
                    />
                    <button className="clear-btn" onClick={clearList}>
                        remove item
                    </button>
                </div>
            )}
        </section>
    );
}

export default App;
