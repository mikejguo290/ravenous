import React from 'react';
import './BusinessList.css';
import Business from '../Business/Business';

// render a list of returned Businesses from calling on YELP API

class BusinessList extends React.Component {
    render() {
        return (
            <div class="BusinessList">
                {this.props.bussinesses.map((business)=>{
                    return <Business business={business}/>;
                })}
            </div>
        )
    }
}

export default BusinessList;