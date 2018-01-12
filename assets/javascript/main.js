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
    // calling our getData() because of the elements being created dynamically
    getData();
}
gifButtons();
   
    // assigns an onclick for each button
    // grabs each data-name for each button
    // calls our ajax
function getData() {
    $(".gif-buttons").on("click",function() {
    var gifs = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifs + "&api_key=XpxRBrBVmqjZojqEls4PAFtCfCBJjp9K&limit=10";
    $.ajax({
      url:queryURL,
      method: "GET"
    })
    .done(function(response) {
        console.log(queryURL);
        console.log(response);
        var data = response.data;
        console.log(data);

        for (var x = 0 ; x < data.length; x++){
            var gifDiv = $("<div>");
            var rating = data[x].rating;
            var ratingText = $("<p>").text("Rating: " + rating);
        }
    });
});
};




// function getAttr () {
//     var gifs = $(this).attr("data-name");
//     console.log(gifs);
// };