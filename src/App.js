import React, { useState } from 'react';
import Jobs from './components/Jobs';
import Bookmarks from './components/Bookmarks';
import './App.css';

const App = () => {
  const [activeSection, setActiveSection] = useState('jobs');
  const [bookmarkedJobs, setBookmarkedJobs] = useState(() => {
    return JSON.parse(localStorage.getItem('bookmarks')) || [];
  });

  const handleBookmark = (job) => {
    const updatedBookmarks = [...bookmarkedJobs, job];
    setBookmarkedJobs(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  };

  const removeBookmark = (jobId) => {
    const updatedBookmarks = bookmarkedJobs.filter(job => job.id !== jobId);
    setBookmarkedJobs(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  };

  return (
    <div className="app-container">
      {activeSection === 'jobs' ? (
        <Jobs bookmarkedJobs={bookmarkedJobs} onBookmark={handleBookmark} />
      ) : (
        <Bookmarks bookmarks={bookmarkedJobs} removeBookmark={removeBookmark} />
      )}

      <div className="bottom-nav">
        <button onClick={() => setActiveSection('jobs')}>Jobs</button>
        <button onClick={() => setActiveSection('bookmarks')}>Bookmarks</button>
      </div>
    </div>
  );
};

export default App;
