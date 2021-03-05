import React, { useState, useEffect } from 'react';
import { useFetch } from './useFetch';
import Follower from './Follower';
function App() {
  const { loading, data } = useFetch();
  const [page, setPage] = useState(0);
  const [followers, setFollowers] = useState([]);

  const handlePage = (index) => {
    setPage(index);
  };

  const prevPage = () => {
    if (page === 0) {
      setPage(data.length - 1);
    } else {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    console.log('click');
    if (page === data.length - 1) {
      setPage(0);
    } else {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (loading) return;
    setFollowers(data[page]);
  }, [loading, page]);

  return (
    <main>
      <div className='section-title'>
        <h1>{loading ? 'loading...' : 'pagination'}</h1>
        <div className='underline' />
      </div>
      <section className='followers'>
        <div className='container'>
          {followers.map((follower) => {
            return <Follower key={follower.id} {...follower} />;
          })}
        </div>
        {loading || (
          <div className='btn-container'>
            <button className='prev-btn' onClick={prevPage}>
              prev
            </button>
            {data.map((_, index) => {
              return (
                <button
                  key={index}
                  className={
                    index === page ? 'page-btn active-btn' : 'page-btn'
                  }
                  onClick={() => {
                    handlePage(index);
                  }}>
                  {index + 1}
                </button>
              );
            })}
            <button className='next-btn' onClick={nextPage}>
              next
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
