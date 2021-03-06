const apiKey = process.env.REACT_APP_YELP_API_KEY;
/* client side apps like React cannot store client secrets securely. These environment variables are 
exposed at build as they become part of the React app.
secrets must be secured on the back end and front-end should make calls to the back-end which then makes calls to
third party APIs and return data to the front-end client app.
but then. what's the point of having a front end app which should update automatically without making calls to its server?
*/

const Yelp = {
    search (term, location, sortBy){
        /* return a promise which will resolve to list of businesses. */
        const url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;
        
        return fetch(url,{
            headers: {
                'Authorization':`Bearer ${apiKey}`,
            }
        }).then((response)=>{
            if(response.ok){
                return response.json();
            }
            throw new Error('request has failed!')
        }, networkError => console.log(networkError.message)
        ).then((jsonResponse) =>{
            // validate returned response - check if response obj contains businesses key 
            // which would represent a valid response; 

            // Object.prototype.hasOwnProperty can test whether an object has a property as its own property (as opposed to inheriting it.)
            // codeCademy suggested code is if(jsonResponse.businesses) which seem to test both if key exists and if there is a value!
            if (jsonResponse.hasOwnProperty('businesses')){
                // jsonRes.businesses returns list of individual business objects.
                // map jsonRes object properties to the props passed from App -> BusinessList -> Business                
                const businesses = jsonResponse.businesses.map(business => {
                    return {
                        id: business.id,
                        imageSrc: business.image_url,
                        name: business.name,
                        address: business.location.address1,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location.zip_code,
                        category: business.categories[0].title,
                        rating: business.rating,
                        reviewCount: business.review_count,
                        latitude: business.coordinates.latitude,
                        longitude: business.coordinates.longitude,
                        url: business.url
                    }
                })
                return businesses; // must return an array when Promise successfully resolves.
            }
        });
    },
    searchAutocomplete(term) {
        console.log('ok')
        const corsAnywhereServerUrl = 'https://cors-anywhere.herokuapp.com/'
        const url = `${corsAnywhereServerUrl}https://api.yelp.com/v3/autocomplete?text=${term}&locale=en_GB`
        return fetch(url, { 
            headers:{
                'Authorization': `bearer ${apiKey}`
            }
        }).then(response => {
            if(response.ok){
                return response.json(); 
                // response.json() returns a Promise which resolves with the result of parsing body text as JSON();
                // the above returns a Promise for the chained .then()to work with. 
                // .then allows the Promise handed to it, to resolve fully before working on them
                // this means the Promise doesn't have to resolve earlier!
            }
            throw new Error('Request has failed!')
        }, networkError => console.log(networkError.message)
        ).then(jsonResponse => {
            console.log(jsonResponse.terms);
            const options = jsonResponse.terms.map(term => term.text);
            return options;
            }
        ).catch(error => console.log(error));
    }
};

/* 
  imageSrc: 'https://content.codecademy.com/programs/react/ravenous/pizza.jpg',
  name: 'MarginOtto Pizzeria',
  address: '1010 Paddington Way',
  city: 'Flavortown',
  state: 'NY',
  zipCode: '10101',
  category: 'Italian',
  rating: 4.5,
  reviewCount: 90
*/

/*  CORS - Cross Origin Resource Sharing 
    access of data and files across different origins. e.g. website and the api it calls. 
    the browsers implement a Same Origin Resource policy which allows sites to request 
    resources from server with the same origin but forbids cross origin resource sharing.
    details: 
    browser adds origin header to requests 
    server adds Access-Control-Allow-Origin header to its response 
    both headers needs to match
    otherwise browser will prevent response data from being shared with its client. 

    the solution is to FIRST, enable CORS on the server, SECOND, match url on the server to the client's url. 

    e.g. the spotify Jamming project avoided this because there was a requirement 
    to register app's url with spotify app account. 
    
    We can bypass this restriction with an API called CORS Anywhere. 
    CORS Anywhere will take requests sent to its API endpoint, make them for the requesting app with 
    the proper CORS permissions, and then return the response back to the requesting app.

    In your own browser, visit https://cors-anywhere.herokuapp.com/corsdemo and click 
    ???Request temporary access to the demo server???
    Back in your code, prepend the URL path you passed to the first argument in fetch() with the following:
    https://cors-anywhere.herokuapp.com/
    */

    export { Yelp as default };