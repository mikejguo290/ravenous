import React from 'react';
import './SearchBar.css';

//The search bar will communicate with the Yelp API. it will format the requests sent to the api 
// and allow users to search by best match, highest rated and most reviewed.

class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            term:'',
            location:'',
            sortBy: 'best_match'
        };
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

        this.sortByOptions = {
            // member variable - variable inside constructor method.
            // save list of key value pairs to format API GET requests later on. 
            // keys = human readable text
            // values = api sortBy parameter values
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count',
        }

    }

    getSortByClass(sortByOption) {
        //return a class for css conditionally on whether its sortByOption parameter = this.state.sortBy
        //runs all the time, isn't triggered by an event. On each render, this method evaluate to a class name for the li element.
        if(this.state.sortBy===sortByOption){
            return 'active';
        }
        return '';
    }

    handleSortByChange(sortByOption){
        // use .bind() in its call on <li onClick={}> to pass along its context this and the arg for sortByOption.
        this.setState({sortBy:sortByOption});
    }

    handleTermChange(event) {
        // handle term change to be triggered by events - ie. input onChange event, accept event as input. 
        const term = event.target.value;
        this.setState({term: term});
    }

    handleLocationChange(event) {
        // take the typed input to the element and update the state of the element.
        const location = event.target.value;
        this.setState({location: location});
    }

    handleSearch(event){
        // handle what should happen when the 'Let's go' button is pressed

        let term = this.state.term;
        let location = this.state.location;
        let sortBy = this.state.sortBy
        this.props.searchYelp( term, location, sortBy);
        event.preventDefault();
    }

    /* 
    1.conditional css class name, upon rerendering , call on a method to check whether attribute of rendered element is the same as state.
    2.member parameter for the sortByOptions object, 
    3.iterate through the Object.keys to map each option to a returned jsx element. 
    4.bind inline, outsisde of constructor and use func.bind(this,para) to pass in a parameter as well as bind this.
    */

    renderSortByOptions() {
        // dynamically display the list used to show the three sort options

        // aside. more semantic to use singular form of the thing you are applying .map() to instead of key, val, all the way. Although harder to read without creating intermediate variables.

        return Object.keys(this.sortByOptions).map((sortByOption)=> {
            const sortByOptionValue = this.sortByOptions[sortByOption]; // confusiongly, sortByOptionValue is used for the key of the list item. 
            return (<li className={this.getSortByClass(sortByOptionValue)} 
                        key={sortByOptionValue} 
                        onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>
                        {sortByOption}
                    </li>);
            });
        
    }
    
    
    render (){
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>
                        {this.renderSortByOptions()}
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input placeholder="Search Businesses" onChange={this.handleTermChange}/>
                    <input placeholder="Where?" onChange={this.handleLocationChange}/>
                </div>
                <div className="SearchBar-submit">
                    <a href="#" onClick={this.handleSearch}>Let's Go</a>
                </div>
            </div>        
        );
    }
}

export default SearchBar;