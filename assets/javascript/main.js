// list of topics 
var topics = ["nba","gaming","technology","movies"];

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
    getData(); 
};
gifButtons();

   
    // assigns an onclick for each button
function getData() {
    $(".gif-buttons").on("click",function() {

    // each buttons gifs will stack without using this to clear
    $("#giphy-images").empty();

    // grabs each data-name for each button
    var gifs = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifs + "&api_key=XpxRBrBVmqjZojqEls4PAFtCfCBJjp9K&limit=10";

    // calling our ajax
    $.ajax({
      url:queryURL,
      method: "GET"
    }) // after the ajax call do this
    .done(function(response) {
        // testing
        console.log(queryURL);
        console.log(response);

        // creating a variable to hold our objects data
        var data = response.data;
        console.log(data);

        $(".giphy-images").empty();
        // looping over the data
        // assigning attributes and appending to page
        for (var x = 0 ; x < data.length; x++){
            
            // grabbing its rating and creating a text variable
            var gifDiv = $("<div>");
            var rating = data[x].rating;
            var ratingText = $("<p>").text("Rating: " + rating);
            console.log(rating);

            // assigning attributes based on animation
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
    var search = $("#search-input").val().trim();
    topics.push(search);
    console.log(search);
    $("#search-input").val('');
    gifButtons();
});