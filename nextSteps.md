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
4. implement my own search! by distance from a central location
??? how to do it?
5. add an event listener on the approriate element in SearchBar.js to listen for 'Enter' key press.
6. ?????