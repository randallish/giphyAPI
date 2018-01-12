// list of topics 
var topics = ["nba","gaming","technology","movies"];

// creating the buttons for each topic
// assigning a data attribute/class name
// appending to page
function gifButtons() {
    for (var i = 0; i < topics.length; i++){
        var buttons = $("<button>" + topics[i] + "</button>");
        buttons.attr("data-name",topics[i]);
        buttons.addClass("gif-buttons");
        $("#giphy").append(buttons);
    }
}
gifButtons();
getData();
   
    // assigns an onclick for each button
    // grabs each data-name for each button
    // calls our ajax
function getData() {
    $(".gif-buttons").on("click",function() {

    // gifs wouldn't clear on each button press
    // googled this to clear on each press
    $("#giphy-images").empty();

    var gifs = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifs + "&api_key=XpxRBrBVmqjZojqEls4PAFtCfCBJjp9K&limit=10";
    $.ajax({
      url:queryURL,
      method: "GET"
    }) // after the ajax call do this
    .done(function(response) {
        // testing
        console.log(queryURL);
        console.log(response);
        var data = response.data;
        console.log(data);

        // looping over the data
        // grabbing its rating and image urls
        // assigning attributes and appending to page
        for (var x = 0 ; x < data.length; x++){
            var gifDiv = $("<div>");

            var rating = data[x].rating;
            var ratingText = $("<p>").text("Rating: " + rating);
            console.log(rating);
            
            var gifImage = $("<img>");
            gifImage.attr("data-animate", data[x].images.fixed_height.url);
            gifImage.attr("src", data[x].images.fixed_height_still.url);
            gifImage.attr("data-still", data[x].images.fixed_height_still.url);
            console.log(gifImage);
          
            gifDiv.append(ratingText);
            gifDiv.append(gifImage);
            $("#giphy-images").append(gifDiv);

        };
    });
});
};




// function getAttr () {
//     var gifs = $(this).attr("data-name");
//     console.log(gifs);
// };