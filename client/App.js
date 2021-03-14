import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Main from './Main';
import Venue from './Venue';

class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: [],
      selectedVenue: '',
      artists: [],
    };
    this.addVenue = this.addVenue.bind(this);
  }
  async addVenue() {
    const venue = (await axios.post('/api/venues')).data;
    console.log(venue);
  }
  async componentDidMount() {
    const artists = (await axios.get('/api/performances')).data;
    const venues = (await axios.get('/api/venues')).data;
    this.setState({ venues, artists });
    window.addEventListener('hashchange', () => {
      this.setState({ selectedVenue: window.location.hash.slice(1) });
    });
    this.setState({ selectedVenue: window.location.hash.slice(1) });
  }
  render() {
    const { venues, selectedVenue, artists } = this.state;
    const { addVenue } = this;
    return (
      <div>
        {selectedVenue !== '' ? (
          <Venue
            selectedVenue={selectedVenue}
            venues={venues}
            artists={artists}
          />
        ) : (
          <Main venues={venues} addVenue={addVenue} />
        )}
      </div>
    );
  }
}

export default App;
