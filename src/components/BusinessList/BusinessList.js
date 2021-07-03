import React from 'react';
import './BusinessList.css';
import Business from '../Business/Business';

// render a list of returned Businesses from calling on YELP API
/* each item in a React list component needs a unique key, 
set Business components key to be business.id from json response. 
key is defined only at the list component , not in the individual Business component level. */

class BusinessList extends React.Component {
    render() {
        return (
            <div className="BusinessList">
                {this.props.businesses.map((business)=>{
                    return <Business business={business} key={business.id}/>;
                })}
            </div>
        )
    }
}

export default BusinessList;