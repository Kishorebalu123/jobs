import React from 'react';
import './index.css';

const Bookmarks = ({ bookmarks, removeBookmark }) => {
  return (
    <div className="bookmarks-container">
      {bookmarks.length === 0 ? (
        <p className="empty-state">No jobs bookmarked yet.</p>
      ) : (
        bookmarks.map((job) => (
          <div key={job.id} className="job-card">
            <h3 className="job-title">{job.title}</h3>
            <p className="job-location">{job.location}</p>
            <p className="job-salary">Salary: {job.salary}</p>
            <p className="job-phone">Phone: {job.phone}</p>
            <button className="remove-button" onClick={() => removeBookmark(job.id)}>Remove Bookmark</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Bookmarks;
