import React from 'react';
import './App.css'
import BusinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';

// App will be the component to first receive data from Yelp API - a list of business. simulate that by hard coding list of businesses here. 
const business = {
  imageSrc: 'https://content.codecademy.com/programs/react/ravenous/pizza.jpg',
  name: 'MarginOtto Pizzeria',
  address: '1010 Paddington Way',
  city: 'Flavortown',
  state: 'NY',
  zipCode: '10101',
  category: 'Italian',
  rating: 4.5,
  reviewCount: 90
}

const businesses = [business, business, business, business, business, business];

class App extends React.Component {
  render(){
    return (
      <div class="App">
        <h1>ravenous</h1>
        <SearchBar />
        <BusinessList />
      </div>    
    )
  }
}

export default App;