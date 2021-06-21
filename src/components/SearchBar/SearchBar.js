import React from 'react';
import './SearchBar.css';

//The search bar will communicate with the Yelp API. it will format the requests sent to the api 
// and allow users to search by best match, highest rated and most reviewed.

const sortByOptions = {
    // save list of key value pairs to format API GET requests later on. 
    // keys = human readable text
    // values = api sortBy parameter values
    'Best Match': 'best_match',
    'Highest Rated': 'rating',
    'Most Reviewed': 'review_count',
}

class SearchBar extends React.component {
    
    renderSortByOptions() {
        // dynamically display the list used to show the three sort options
        return (
            // more semantic to use singular form of the thing you are applying .map() to instead of key, val, all the way. Although harder to read without creating intermediate variables.
            Object.keys(sortByOptions).map((sortByOption)=> {
                const sortByOptionValue = sortByOptions[sortByOption]; // confusiongly, sortByOptionValue is used for the key of the list item. 
            <li key={sortByOptionValue}>{sortByOption}</li>
            })
        )
    }
}