import React, { useState, useEffect } from 'react';
import './index.css';

const Jobs = ({ onBookmark, bookmarkedJobs }) => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchJobs(page);
  }, [page]);

  const fetchJobs = async (pageNum) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://testapi.getlokalapp.com/common/jobs?page=${pageNum}`);
      const data = await response.json();
      if (data.length === 0) setHasMore(false);
      setJobs((prevJobs) => [...prevJobs, ...data.results]);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore,handleScroll]);

  const isBookmarked = (jobId) => {
    return bookmarkedJobs.some((job) => job.id === jobId);
  };

  const handleBookmarkClick = (job) => {
    if (isBookmarked(job.id)) {
      // Handle unbookmarking logic if needed
    } else {
      onBookmark(job);
    }
  };

  return (
    <div className="jobs-container">
      {jobs.length === 0 && !isLoading && <p className="empty-state">No jobs available.</p>}
      {jobs.map((job) => (
        <div key={job.id} className="job-card">
          <h3 className="job-title">{job.title}</h3>
          <p className="job-location">{job.location}</p>
          <p className="job-salary">Salary: {job.salary}</p>
          <p className="job-phone">Phone: {job.phone}</p>
          <button
            className={`bookmark-button ${isBookmarked(job.id) ? 'bookmarked' : ''}`}
            onClick={() => handleBookmarkClick(job)}
          >
            {isBookmarked(job.id) ? 'Bookmarked' : 'Bookmark'}
          </button>
        </div>
      ))}
      {isLoading && <p className="loading">Loading...</p>}
      {!hasMore && <p className="no-more">No more jobs available.</p>}
    </div>
  );
};

export default Jobs;
