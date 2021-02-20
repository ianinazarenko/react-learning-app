import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tabs-project";
function App() {
    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [value, setValue] = useState(0);

    const fetchJobs = async () => {
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.statusText);
                }
            })
            .then((data) => {
                setJobs(data);
                setLoading(false);
            })
            .catch((err) => console.log(err));

        // try {
        //     const response = await fetch(url);
        //     if (response.ok) {
        //         const data = await response.json();
        //         setLoading(false);
        //         setJobs(data);
        //     } else {
        //         throw new Error(response.statusText);
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    if (loading) {
        console.log("loading...");
        return (
            <section className="loading section">
                <h1>loading...</h1>
            </section>
        );
    }

    console.log("After loading");
    console.log(jobs);
    console.log(jobs[value]);
    // const { company, dates, duties, id, order, title } = jobs[value];

    return (
        <h1>Hello</h1>
        // <section className="section">
        //     <div className="title">
        //         <h2>experience</h2>
        //         <div className="underline"></div>
        //     </div>
        //     <div className="jobs-container">
        //         {/* btns */}
        //         {/* jobs-info */}
        //         <article className="job-info">
        //             <h3>{title}</h3>
        //             <h4>{company}</h4>
        //             <p className="job-date">{dates}</p>
        //             {duties.map((duty, index) => {
        //                 return (
        //                     <div key={index} className="job-desc">
        //                         <FaAngleDoubleRight className="job-icon" />
        //                         <p>{duty}</p>
        //                     </div>
        //                 );
        //             })}
        //         </article>
        //     </div>
        // </section>
    );
}

export default App;
