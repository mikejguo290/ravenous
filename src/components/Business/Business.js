import React from 'react';
import './Business.css' // import the css file which is on the same level as the .js file

// data container of relevant fields we want to render in Business

class Business extends React.Component {
    render(){
        const latitude = this.props.business.latitude;
        const longitude = this.props.business.longitude;
        // click on this formatted url to access location on google maps, in another tab
        const locationURL = `https://www.google.com/maps?q=${latitude},${longitude}`;
        const locationStyle = {textDecoration: 'none'}
        return (
            <div className="Business">
                <div className="image-container">
                    <img src={this.props.business.imageSrc} alt=''/>
                </div>
                <h2>{this.props.business.name}</h2>
                <div className="Business-information">
                    <a href={locationURL} target="_blank" rel="noreferrer noopener" style={locationStyle}>
                        <div className="Business-address">
                            <p>{this.props.business.address}</p>
                            <p>{this.props.business.city}</p>
                            <p>{`${this.props.business.state} ${this.props.business.zipCode}`}</p>
                        </div>
                    </a>
                    <div className="Business-reviews">
                    <h3>{this.props.business.category.toUpperCase()}</h3>
                    <h3 className="rating">{`${this.props.business.rating} stars`}</h3>
                    <p>{`${this.props.business.reviewCount} reviews`}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Business;