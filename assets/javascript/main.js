
// global variables
var topics = ["nba","gaming","cryptocurrency","technology","movies"];
//var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topics + "&api_key=XpxRBrBVmqjZojqEls4PAFtCfCBJjp9K";


// for loop to append our topics into buttons
// and assigning a data attribute to use later
function gifButtons() {
    for (var i = 0; i<topics.length; i++){
    var buttons = $("<button>" + topics[i] + "</button>");
    buttons.appendTo("#giphy-buttons");
    buttons.attr("data-topics",topics[i]);
}
};


$("#giphy-buttons").on("click",function() {
    
    var input = $(this).attr("data-topics");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=XpxRBrBVmqjZojqEls4PAFtCfCBJjp9K";

    $.ajax({
    url: queryURL,
    method: "GET"
  })

  .done(function(response) {
    console.log(queryURL);
  });



});
gifButtons();

