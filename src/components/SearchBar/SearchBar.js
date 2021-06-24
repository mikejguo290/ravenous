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

        this.sortByOptions = {
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
        if(this.state.sortBy===sortByOption){
            return 'active';
        }
        return '';
    }

    handleSortByChange(sortByOption){
        this.setState({sortBy:sortByOption});
    }

    renderSortByOptions() {
        // dynamically display the list used to show the three sort options
        return (
            // more semantic to use singular form of the thing you are applying .map() to instead of key, val, all the way. Although harder to read without creating intermediate variables.
            Object.keys(this.sortByOptions).map((sortByOption)=> {
                const sortByOptionValue = this.sortByOptions[sortByOption]; // confusiongly, sortByOptionValue is used for the key of the list item. 
                return <li className={this.getSortByClass(sortByOptionValue)} key={sortByOptionValue}>{sortByOption}</li>
            })
        )
    }

    render (){
        return (
            <div class="SearchBar">
                <div class="SearchBar-sort-options">
                    <ul>
                        {this.renderSortByOptions()}
                    </ul>
                </div>
                <div class="SearchBar-fields">
                    <input placeholder="Search Businesses" />
                    <input placeholder="Where?" />
                </div>
                <div class="SearchBar-submit">
                    <a href="#">Let's Go</a>
                </div>
            </div>        
        )
    }
}

export default SearchBar;