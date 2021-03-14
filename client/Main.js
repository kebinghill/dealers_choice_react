import React from 'react';

const Main = ({ venues, addVenue }) => {
  return (
    <div>
      <h1>Venues</h1>
      <ul>
        {venues.map((venue, idx) => (
          <li key={idx}>
            <a href={`#${venue.id}`}>{venue.name}</a>
          </li>
        ))}
      </ul>
      <button onClick={addVenue}>Add a Venue</button>
    </div>
  );
};

export default Main;
