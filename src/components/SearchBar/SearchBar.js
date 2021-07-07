import React from 'react';
import './SearchBar.css';
import Yelp from '../../util/Yelp'
//The search bar will communicate with the Yelp API. it will format the requests sent to the api 
// and allow users to search by best match, highest rated and most reviewed.

class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            term:'',
            location:'',
            sortBy: 'best_match',
            autocompleteOptions:[]
        };
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.keyDownSearch = this.keyDownSearch.bind(this);
        this.autocompleteTerm=this.autocompleteTerm.bind(this);
        this.sortByOptions = {
            // member variable - variable inside constructor method.
            // save list of key value pairs to format API GET requests later on. 
            // keys = human readable text
            // values = api sortBy parameter values
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count',
            'Shortest Distance': 'distance',
        }

    }

    getSortByClass(sortByOption) {
        //return a class for css conditionally on whether its sortByOption parameter = this.state.sortBy
        //runs all the time, isn't triggered by an event. On each render, this method evaluate to a class name for the li element.
        if(this.state.sortBy===sortByOption){
            return 'active';
        }
        return '';
    }

    handleSortByChange(sortByOption){
        // use .bind() in its call on <li onClick={}> to pass along its context this and the arg for sortByOption.
        this.setState({sortBy:sortByOption});
    }

    handleTermChange(event) {
        // handle term change to be triggered by events - ie. input onChange event, accept event as input. 
        const term = event.target.value;
        this.setState({term: term});
    }

    handleLocationChange(event) {
        // take the typed input to the element and update the state of the element.
        const location = event.target.value;
        this.setState({location: location});
    }


    handleSearch(event){
        // handle what should happen when the 'Let's go' button is pressed

        let term = this.state.term;
        let location = this.state.location;
        let sortBy = this.state.sortBy
        if(location){
            // location is the only required parameter in absence of latitude and longitude!
            this.props.searchYelp( term, location, sortBy);
        }
        event.preventDefault();
    }

    /* 
    1.conditional css class name, upon rerendering , call on a method to check whether attribute of rendered element is the same as state.
    2.member parameter for the sortByOptions object, 
    3.iterate through the Object.keys to map each option to a returned jsx element. 
    4.bind inline, outsisde of constructor and use func.bind(this,para) to pass in a parameter as well as bind this.
    */

    renderSortByOptions() {
        // dynamically display the list used to show the three sort options

        // aside. more semantic to use singular form of the thing you are applying .map() to instead of key, val, all the way. Although harder to read without creating intermediate variables.
        // aside. as the buttons are coded in React from the member variable, simple to add another option -> functional button. no changes required to methods because options abstracted to state.sortBy
        return Object.keys(this.sortByOptions).map((sortByOption)=> {
            const sortByOptionValue = this.sortByOptions[sortByOption]; // confusiongly, sortByOptionValue is used for the key of the list item. 
            return (<li className={this.getSortByClass(sortByOptionValue)} 
                        key={sortByOptionValue} 
                        onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>
                        {sortByOption}
                    </li>);
            });
        
    }
    
    /* whenever sortByOption changes, initiate a new search without clicking Let's go. 
    it would require setting state for sortByOption, then checking on each update-render whether its state has changed
    and if so, implement a search with componentDidUpdate lifecycle method
    */

    renderAutocompleteOptions(){
        const options = this.state.autocompleteOptions;
        // if there is just one suggestion and it is identical to the term. don't render suggestion below input. 
        const duplicateSuggestion = options.length===1 && options.includes(this.state.term); 
        /*
        alternatively, in componentDidUpdate
        if prev.state.autocompleteOptions.includes(this.state.term), then one of the options was selected. don't call autocomplete.
        but then this method's autocompleteOption isn't updated.
        */
        // autocomplete is called whenever options change.
        if (options && !duplicateSuggestion){
            // don't render if this.state.autocompleteOptions is empty!
            // after clicking on an option , i don't want to trigger autocomplete again...
            
            return options.map(option=>{
                return (<option key={option} value={option}/>)
            });
        }
    }

    keyDownSearch(event){
        // on pressing enter key, trigger search of Yelp API
        if(event.key==="Enter"){
            this.handleSearch(event);
        }
      }
    
    autocompleteTerm(){
        // this method is called in componentDidUpdate when this.state.term updates. 
        // it calls Yelp module's searchAutocomplete and then use the array of options to set this.state.autocompleteOptions.
        let term = this.state.term;
        // do something with the response. note Yelp.search ... is asnyc code. await or chain .then() 
        // .searchAutocomplete(term) will need to return an array. 
        Yelp.searchAutocomplete(term).then(options => this.setState({autocompleteOptions:options}));
        
    }

    componentDidMount(){
        // want to listen for key down enter on whole document, not just on a component.
        document.addEventListener('keydown', this.keyDownSearch);
    }

    componentWillUnmount(){
        document.removeEventListener('keydown', this.keyDownSearch);
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        // componentDidUpdate will only take three arguments in this order. 
        
        // if sortBy option changes, and term and location are filled in, call searchYelp again.
        if (this.state.sortBy !== prevState.sortBy){
            const {term, location, sortBy}= this.state;
            
            if (term && location){
                this.props.searchYelp( term, location, sortBy);
            }
        }

        // if state location changes. call Yelp's autocomplete endpoint. 
        if(this.state.term !== prevState.term){
            if(this.state.term.length> 3){
                // if state location isn't empty. do something. 
                this.autocompleteTerm();
            }
        }
    }
    
    render (){
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>
                        {this.renderSortByOptions()}
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input placeholder="Search Businesses" list="autocomplete" onChange={this.handleTermChange}/>
                    <datalist id="autocomplete">
                        {this.renderAutocompleteOptions()}
                    </datalist>
                    <input placeholder="Where?" onChange={this.handleLocationChange}/>

                </div>
                <div className="SearchBar-submit">
                    <a href="#" onClick={this.handleSearch}>Let's Go</a>
                </div>
            </div>        
        );
    }
}

export default SearchBar;