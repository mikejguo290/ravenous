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
    //function to simulate what clicking on "Let's go" button would do. - making a call to Yelp API.
    // will need to bind this when I use a constructor in App
    console.log(`Searching Yelp with ${term}, ${location}, ${sortBy}`);
  }

  render(){
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar searchYelp={this.searchYelp}/>
        <BusinessList businesses={businesses} />
      </div>    
    )
  }
}

export default App;