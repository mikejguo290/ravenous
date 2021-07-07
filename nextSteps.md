Below is a list of some potential features to add to Ravenous:

1.Make addresses clickable and have them open the address in Google Maps in a new tab
2.Make images clickable and have them open the business’ website in a new tab
3.Clicking on a different sorting option automatically requeries the Yelp API, rather than having to manually click “Let’s Go” again
4.Implement your own type of sort (for example, by entering a distance or radius from a central location)
5.Allow you to search by pressing “Enter” (or “Return”) on your keyboard, as opposed to manually clicking
6.Add autocompletion of addresses to the “Location” input

Answers:
1. embed link in address
format call to google maps with latitude and longitude, target attribute set to '_blank'
latitude and longtitude from business.coordinates.latitude etc
https://www.google.com/maps?q=37.819722,-122.478611
2. embed link in image, target attribute set to "_blank"
api response's business.url contains the information
3. clicking on a different sorting option triggers call to Yelp API. 
onClick(eventHandler) where each eventHandler checks on state and if different. makes a different call. without clicking on let's go. 
4. implement my own type of sort! e.g. by distance from a central location. use offset if possible? 
a. user input to pass radius as a parameter to search request. 
b. pass sort_by=distance parameter to search request to pre-sort api response.
create a fourth sortBy option
allow a new input box to be rendered. along side the two existing search bar inputs. although as location accepts postcodes, this may be be redundant. 

Yelp API allows for four types of sort. The type not yet implemented is sort by distance. 
5. add an event listener on the approriate element in SearchBar.js to listen for 'Enter' key press.
6. Yelp autocomplete documentation
https://www.yelp.com/developers/documentation/v3/autocomplete
display api request response's categories

searchBar check if state.location is changed in componentDidUpdate
if so, call Yelp function to get autocomplete suggestions. 
save response results to state.locationAutocompletions
display results in location input. 

yelp autocomplete documentation doesn't seem to return the appropriate locations!
location suggestion doesn't have to be postcode specific, as it is not about delivery to a house, it's about businesses within a radius. 
just the businesses in an area. e.g. sheffield city centre, sheffield train station. 

google maps places autocomplete seems like a decent fix. 
https://postcoder.com/docs/address-lookup#address-autocomplete is also good and has a free month trial
I haven't seen the ability to autocomplete a broad location like London, Euston station or sheffield, city centre however. 
cors-anywhere has refused connection due to too many requests! 

I have implemented calls to Yelp Autocomplete website although I have not found a way to return expected results. Nevermind displaying the suggested results to the user, other than log to console.
Nor of ways to try autocomplete apis for free. 

instead, I added autocomplete option to terms input. dynamically rendering the datalist options with a newly created state, populated by calls to Yelp's autocomplete api whenever term changes (and is above 3 characters. etc. )