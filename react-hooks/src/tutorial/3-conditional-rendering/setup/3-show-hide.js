import React, { useState, useEffect } from "react";

const ShowHide = () => {
    const [show, setShow] = useState(false);

    return (
        <>
            <button
                className="btn"
                onClick={() => {
                    setShow(!show);
                }}
            >
                show/hide
            </button>
            {show && <Item />}
        </>
    );
};

const Item = () => {
    return (
        <div style={{ marginTop: "2rem" }}>
            <h1>window</h1>
            <h2>size:</h2>
        </div>
    );
};

class User {
    constructor(name, job = "admin") {
        this.name = name;
        this.job = job;
    }
}

class Admin extends User {
    constructor(name, isAdmin) {
        super();
        this.isAdmin = isAdmin;
        // this.name = name;
    }
}

const user1 = new User("Jake", "farmer");
const admin1 = new Admin("Tom", true);

console.log(user1);
console.log(admin1);

export default ShowHide;
