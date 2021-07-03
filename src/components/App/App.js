import React from 'react';
import './App.css'
import BusinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';
import Yelp from '../../util/Yelp';

class App extends React.Component {
  // having deleted mock data, use App to store result of calling Yelp api in this.state.businesses. 
  // pass data as props
  // modify searchYelp with Yelp from utils.
  constructor(props){
    super(props);
    this.state = {
      businesses:[]
    }
    this.searchYelp = this.searchYelp.bind(this);
  }

  searchYelp(term, location, sortBy){
    // call Yelp.search and update state businesses.

    // Yelp is an object exported as default by Yelp.js
    Yelp.search(term, location, sortBy).then(businesses => this.setState({businesses: businesses})); 
    // .then() allows the async Yelp.search() to complete before setting state.
  }

  render(){
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar searchYelp={this.searchYelp}/>
        <BusinessList businesses={this.state.businesses} />
      </div>    
    )
  }
}

export default App;