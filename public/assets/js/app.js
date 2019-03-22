// WAIT UNTIL DOM FULLY LOADS TO ATTACH EVENT HANDLERS:
// BELOW IS THE SHORT-HAND FOR THE $(document).ready(function() {...});
$(function() {

    // FOR USER TO ADD A NEW BURGER:
        // Attach $().on("submit") event handler to user input field, when user hits submit button
        $(".create-burger-form").on("submit", function(event) {
            // Use event.preventDefault(); 
            event.preventDefault(); 
            
            // "Grab" value of burger name from input field --> store in as object
            var newBurg = {
                burger_name: $("#userInputBurger").val().trim()
            }
            // "Send" the new burger Object to db using ajax POST request
            $.ajax("/api/burgers", {
                type: "POST", 
                data: newBurg
            }).then(
                function() {
                    console.log("successfully created new burger");
                    // reload to update page 
                    location.reload();
                }
            );
        });
    
    // FOR USER TO CHANGE THE STATUS OF A STORED BURGER (TO TOGGLE B/W DEVOURED STATE OF TRUE OR FALSE):
        // Attach $().on("click") event handler to the 'change-status' button
        $(".change-status").on("click", function(event) {
            // "Grab" the id of that specific burger stored in db (held by the data-id value of button) --> store in variable
            var id = $(this).data("id");

            // "Grab" the current boolean value of that specific burger (held by data-newdevourstate value of button) --> store in variable 
            var newState = $(this).data("newdevourstate");

            // Create new object for updated devoured state --> store as object
            var newState = {
                // "Set" current devoured key value to value of current boolean
                devoured: newState
            };
            
            // "Send" the new status to db using ajax PUT request
            $.ajax("/api/burgers/" + id, {
                type: "PUT", 
                data: newState
            }).then(
                function() {
                    console.log("changed devoured state to: " + newState);
                    location.reload();
                }
            );
        });
            
    // FOR USER TO DELETE A BURGER:
        // Attach $().on("click") event handler to the 'delete-btn' button 
        $(".delete-btn").on("click", function(event) {
            // "Grab" the id of that specific burger stored in db (held by the data-id value of button) --> store in variable
            var id = $(this).data("id");

            // Delete the burger by using ajax DELETE request
            $.ajax("/api/burgers/" + id, {
                type: "DELETE"
            }).then(
                function() {
                    console.log("successfully deleted burger: " + id);
                    location.reload();
                }
            );
        });

});