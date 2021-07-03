import React from 'react';
import './App.css'
import BusinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';
import Yelp from '../../util/Yelp';

class App extends React.Component {
  
  searchYelp(term, location, sortBy){
    //function to simulate what clicking on "Let's go" button would do. - making a call to Yelp API.
    // will need to bind this when I use a constructor in App
    console.log(`Searching Yelp with ${term}, ${location}, ${sortBy}`);
  }

  render(){
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar searchYelp={this.searchYelp.bind(this)}/>
        <BusinessList businesses={businesses} />
      </div>    
    )
  }
}

export default App;