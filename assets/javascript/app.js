//Document ready
//Create buttons selected by maker, loop
//Ajax call to pull gifs
//Create new buttons by user input, loop
$(document).ready(function () {
    var list = ["Friends", "Parks and Recreation", "Brooklyn 99", "Seinfeld", "Psych"];
    console.log(list[1])
    //GIF function
    $(document).on("click", ".showBtn", function() {
        console.log('Click');
        var show = $(this).attr("data-label");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=33y1uwrgHHUHfqtkDlYEd12S1OPdqCqE&limit=10";

        //Ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    //Create div
                    var showDiv = $("<div>");
                    //variable to hold rating
                    var rating = results[i].rating;
                    //create p tag
                    var p = $("<p>").text("Rating: " + rating);
                    //Append rating to html
                    showDiv.append(p);
                    // var imgStill = results[i].images.fixed_height_still;

                    var image = $("<img>");
                    image.attr("src", results[i].images.fixed_height_still.url);
                    showDiv.append(image);
                    $("#shows-view").prepend(showDiv);
                }
            }

        });

    });


    //Button loop
    function renderButtons() {
        $("#buttonPlace").empty();

        for (var i = 0; i < list.length; i++) {
            var y = $("<button>");
            y.addClass("showBtn");
            y.attr("data-label", list[i]);
            y.text(list[i]);
            $("#buttonPlace").append(y);
        }
    }

    // $(document).on("click", ".tvShow", displayGIF);

    renderButtons();

})