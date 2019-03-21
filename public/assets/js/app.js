// WAIT UNTIL DOM FULLY LOADS TO ATTACH EVENT HANDLERS:
// BELOW IS THE SHORT-HAND FOR THE $(document).ready(function() {...});
$(function() {

    // FOR USER TO ADD A NEW BURGER:
        // Attach $().on("click") event handler to user input field, when user hits submit button
            // Use event.preventDefault(); 
            // "Grab" value of burger name from input field --> store in as object
            // "Send" the new burger Object to db using ajax POST request
    
    // FOR USER TO CHANGE THE STATUS OF A STORED BURGER (TO TOGGLE B/W DEVOURED STATE OF TRUE OR FALSE):
        // Attach $().on("click") event handler to the 'change-status' button
            // "Grab" the id of that specific burger stored in db (held by the data-id value of button) --> store in variable
            // "Grab" the current boolean value of that specific burger (held by data-newdevourstate value of button) --> store in variable 
            // Create new object for updated devoured state --> store as object
                // "Set" current devoured key value to value of current boolean
            // "Send" the new status to db using ajax PUT request
            
    // FOR USER TO DELETE A BURGER:
        // Attach $().on("click") event handler to the 'delete-btn' button 
            // "Grab" the id of that specific burger stored in db (held by the data-id value of button) --> store in variable
            // Delete the burger by using ajax DELETE request

});