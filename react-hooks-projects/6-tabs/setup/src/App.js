import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";

const url = "https://course-api.com/react-tabs-project";
function App() {
    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [value, setValue] = useState(0);

    const fetchJobs = () => {
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

    const { company, dates, duties, id, order, title } = jobs[value];

    return (
        <section className="section">
            <div className="title">
                <h2>experience</h2>
                <div className="underline"></div>
            </div>
            <div className="jobs-center">
                {/* btns */}
                <div className="btn-container">
                    {jobs.map((job, index) => {
                        return (
                            <button
                                key={index}
                                className={`job-btn ${
                                    index === value && "active-btn"
                                }`}
                                onClick={() => setValue(index)}
                            >
                                {job.company}
                            </button>
                        );
                    })}
                </div>
                {/* jobs-info */}
                <article className="job-info">
                    <h3>{title}</h3>
                    <h4>{company}</h4>
                    <p className="job-date">{dates}</p>
                    {duties.map((duty, index) => {
                        return (
                            <div key={index} className="job-desc">
                                <FaAngleDoubleRight className="job-icon" />
                                <p>{duty}</p>
                            </div>
                        );
                    })}
                </article>
            </div>
        </section>
    );
}

export default App;
