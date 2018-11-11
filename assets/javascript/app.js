//Document ready
//Create buttons selected by maker, loop
//Ajax call to pull gifs
//Create new buttons by user input, loop
$(document).ready(function () {
    var topics = ["Friends", "Parks and Recreation", "Brooklyn 99", "Seinfeld", "Psych", "New Girl"];
    console.log(topics[1])
    //GIF function
    $(document).on("click", ".showBtn", function () {
        $("#shows-view").empty();
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
                    var image = $("<img>");
                    image.addClass("gif");
                    image.attr("src", results[i].images.fixed_height_still.url);
                    image.attr("data-still", results[i].images.fixed_height_still.url);
                    image.attr("data-animate", results[i].images.fixed_height.url);
                    image.attr("data-state", results[i].images.fixed_height_still.url);

                    //Append to html

                    showDiv.append(image);
                    showDiv.append(p);


                    $("#shows-view").prepend(showDiv);

                }
            };

            $(".gif").on("click", function () {
                var src = $(this).attr("data-animate");
                $(this).attr("src", src);
            // },
            // function(){
            //     var src = $(this).attr("data-still");
            //     $(this).attr("src", src);
            })

            // for (var i = 0; i < animatedGIFArray.length; i++) {
            //     var gifAnimated = $("<img>");
            //     gifAnimated.attr("src", results[i].images.original.url);
            //     gifAnimated.addClass("animated");
            //     gifAnimated.attr("data-animated");

            //     animatedGIFArray.push(gifAnimated);
            // }

        });


    });





    //Button loop
    function renderButtons() {
        $("#buttonPlace").empty();

        for (var i = 0; i < topics.length; i++) {
            var y = $("<button>");
            y.addClass("showBtn");
            y.attr("data-label", topics[i]);
            y.text(topics[i]);
            $("#buttonPlace").append(y);

        }
        $("#tv-input").empty();
    }

    $("#add-tvShow").on("click", function (event) {
        event.preventDefault();

        var tvShow = $("#tv-input").val().trim();

        topics.push(tvShow);

        renderButtons();

    });


    renderButtons();


})