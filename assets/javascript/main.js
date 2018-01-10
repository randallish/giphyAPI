var topics = ["nba","gaming","technology","movies"];

function createGifs() {
    for (var i = 0; i < topics.length; i++){
        var buttons = $("<button>" + topics[i] + "</button>");
        buttons.attr("data-name",topics[i]);
        buttons.addClass(".gif-buttons");
        $("#giphy").append(buttons);
    }
    };
    createGifs();

    