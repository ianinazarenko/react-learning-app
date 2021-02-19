import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tours-project";

function App() {
    const [loading, setLoading] = useState(true);
    const [tours, setTours] = useState([]);

    const removeTour = (id) => {
        const newTours = tours.filter((tour) => tour.id !== id);
        setTours(newTours);
    };

    const fetchTours = async () => {
        setLoading(true);

        try {
            const response = await fetch(url);

            if (!response.ok) {
                setLoading(true);
                throw new Error(response.statusText);
            }

            const data = await response.json();
            setTours(data);
            setLoading(false);
        } catch (error) {
            console.log("There is a problelm with fetch");
        }
    };

    useEffect(() => {
        fetchTours();
        setLoading(false);
    }, []);

    if (tours.length === 0) {
        return (
            <main>
                <div className="title">
                    <h2>No tours left</h2>
                    <button className="btn" onClick={fetchTours}>
                        Refresh
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main>
            {loading ? (
                <Loading />
            ) : (
                <Tours tours={tours} removeTour={removeTour} />
            )}
        </main>
    );
}

export default App;
