import React from 'react';
import './BusinessList.css';
import Business from '../Business/Business';

// render a list of returned Businesses from calling on YELP API

class BusinessList extends React.Component {
    render() {
        return (
            <div class="BusinessList">
                <Business />
                <Business />
                <Business />
                <Business />
                <Business />
                <Business />
            </div>
        )
    }
}

export default BusinessList;