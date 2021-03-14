import React from 'react';

const Venue = ({ selectedVenue, venues, artists }) => {
  const performances = artists.map((artist) => artist.performances);
  return (
    <div>
      {venues.map((venue) => {
        if (venue.id === selectedVenue) {
          return (
            <h1 key={venue.id}>
              <a href="/">{venue.name}</a>
            </h1>
          );
        }
      })}
      <h2>
        Performances By:
        <ul>
          {performances.map((performance) => {
            const [dPerform] = performance;

            if (dPerform.venueId === selectedVenue) {
              return (
                <li key={dPerform.id}>
                  {artists.map((artist) => {
                    if (artist.id === dPerform.artistId) {
                      return (
                        <div key={artist.id}>
                          {artist.first_name} {artist.last_name}
                        </div>
                      );
                    }
                  })}
                  On {dPerform.date}
                </li>
              );
            }
          })}
        </ul>
      </h2>
    </div>
  );
};

export default Venue;
