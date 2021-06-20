import React from 'react';

// data container of relevant fields we want to render in Business
business = {
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

class Business extends React.component {
    render(){
        return (
            <div class="business">
                <div class="imageContainer">
                    <img src={business.imageSrc} alt=''/>
                </div>
                <h2>{business.name}</h2>
                <div class="businessInformation">
                    <div class="businessAddress">
                    <p>{busines.address}</p>
                    <p>{busines.city}</p>
                    <p>{business.state} {business.zipCode}</p>
                    </div>
                    <div class="businessReviews">
                    <h3>{business.category}</h3>
                    <h3 class="rating">{business.rating}</h3>
                    <p>{business.reviewCount}</p>
                    </div>
                </div>
            </div>
        )
    }
}