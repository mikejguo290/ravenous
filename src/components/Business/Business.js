import React from 'react';
import './Business.css' // import the css file which is on the same level as the .js file

// data container of relevant fields we want to render in Business

class Business extends React.Component {
    render(){
        return (
            <div class="Business">
                <div class="image-container">
                    <img src={business.imageSrc} alt=''/>
                </div>
                <h2>{business.name}</h2>
                <div class="Business-information">
                    <div class="Business-address">
                    <p>{business.address}</p>
                    <p>{business.city}</p>
                    <p>{`${business.state} ${business.zipCode}`}</p>
                    </div>
                    <div class="Business-reviews">
                    <h3>{business.category.toUpperCase()}</h3>
                    <h3 class="rating">{`${business.rating} stars`}</h3>
                    <p>{`${business.reviewCount} reviews`}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Business;