// list of topics 
var topics = ["nba","gaming","technology","movies","television","sports","bitcoin","apple","cars"];

// creating the buttons for each topic
function gifButtons() {
    $("#giphy").empty();
    for (var i = 0; i < topics.length; i++){
        var buttons = $("<button class='btn btn-info'>" + topics[i] + "</button>");
        
        // assigning a data attribute/class name
        buttons.attr("data-name",topics[i]);
        buttons.addClass("gif-buttons");

        // appending to page
        $("#giphy").append(buttons);
    }
    // calling our ajax after each element is dynamically created
    getData(); 
};
gifButtons();

   
    // assigns an onclick for each button
function getData() {
    $(".gif-buttons").on("click",function() {

    // each buttons gifs will stack without using this to clear it
    $("#giphy-images").empty();

    // grabs each data-name for each button
    var gifs = $(this).attr("data-name");

    // main url to grab data from
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifs + "&api_key=XpxRBrBVmqjZojqEls4PAFtCfCBJjp9K&limit=10";

    // calling our ajax
    $.ajax({
      url:queryURL,
      method: "GET"
    }) // after the ajax call finishes
    .done(function(response) {
        // testing
        console.log(queryURL);
        console.log(response);

        // creating a variable to hold our objects data
        var data = response.data;
        console.log(data);

        // clearing previous images for each click
        $(".giphy-images").empty();
        
        // looping over the data
        // assigning attributes and appending to page
        for (var x = 0 ; x < data.length; x++){
            
            // variables for the rating and where to append it
            var gifDiv = $("<div>");
            var rating = data[x].rating;
            var ratingText = $("<p>").text("Rating: " + rating);
            ratingText.addClass('rating');
            console.log(rating);

            // assigning attributes based on state
            var gifImage = $("<img>");
            var animation = data[x].images.fixed_height.url;
            var still = data[x].images.fixed_height_still.url;
            gifImage.attr("data-animate", animation);
            gifImage.attr("src", still);
            gifImage.attr("data-still",still);
            gifImage.attr('data-state', 'still');
            gifImage.on("click", animate);
            console.log(gifImage);
          
            // appending to page
            gifDiv.append(ratingText);
            gifDiv.append(gifImage);
            $(".giphy-images").append(gifDiv);
        }
    });

    // checking for condition of the gif
    function animate() {
        // $(".giphy-images").on("click",function() {
        var state = $(this).attr('data-state');
        if (state == 'still'){
             $(this).attr('src', $(this).attr('data-animate'));
              $(this).attr('data-state', 'animate');
         } else{
             $(this).attr('src', $(this).attr('data-still'));
             $(this).attr('data-state', 'still');
            }
        };
    });
};
    



// search input that adds a new button
$("#search").on("click",function(event) {
    event.preventDefault();
    // creating variable for user input value
    var search = $("#search-input").val().trim();

    // inserting new search into topics array
    topics.push(search);
    console.log(search);

    // clearing the text
    $("#search-input").val('');

    // calling our create buttons function
    gifButtons();
});