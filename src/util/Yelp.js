
const Yelp = {
    search (term, location, sortBy){
        /* return a promise which will resolve to list of businesses. */
        const url = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;
        return fetch(url);
    }
};