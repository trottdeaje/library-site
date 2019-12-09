let apiUrl = "https://library-bm.herokuapp.com"
// http://library-bm.herokuapp.com
// let authorId = authors.id
// On submit target the form search and save the user input inside variable value
$("#form__search").on("submit", function (event) {
    event.preventDefault()
    let user_search = $('#user_text').val();

    //clear the search bar
    $('#user_text').val("");

    //concatenate the api route with the user value
    let searchUrl = apiUrl + "/search?term=" + user_search;

    // return the response from the bookRequest query
    $.get(searchUrl, (response) => {
        console.log(response)
        createBookCards(response.books)
    })
    console.log(user_search)
});

$('.txt').html(function (i, html) {
    var chars = $.trim(html).split("");

    return '<span>' + chars.join('</span><span>') + '</span>';
});


// GOAL - take the users input and search for books from the database matching that term
//

// GOAL - display all authors in database on the page in their own card

// make a get request to the database to get all authors
// create a for loop that iterates over the length of author object
let authorUrl = apiUrl + "/authors"
$.get(authorUrl, (response) => {
    // console.log(response)
    for (let index = 0; index < response.authors.length; index++) {
        const authors = response.authors[index];
        console.log(authors)

        // take the response from get and assign each key in the object to a variable
        let name = authors.firstName + " " + authors.lastName
        console.log(name)

        let bio = authors.bio
        console.log(bio)

        let avatar = authors.avatar
        console.log(avatar)
        // create a card
        let authorId = authors.id
        // Create card template to append all your content to
        let card = $("<div>").attr({
            class: "hvr-grow-shadow card nes-container is-rounded is-dark",
            id: "card-target",
            authorId: authorId

        })

        // append avatar name and bio to a card template
        let authorAvatar = $("<img>").attr({
            class: "author_avatar",
            src: avatar,
            authorId: authorId
        })
        let authorName = $("<h6>").html(name).attr({
            id: "card__title",
            style: "padding-top:10px",
            authorId: authorId
        })
        let authorBio = $("<p>").html(bio).attr({
            authorId: authorId
        })
        let authorBio__div = $("<div>").html(authorBio).attr({
            class: "author__bio__contain",
            authorId: authorId
        })
        let gb_icons = $("<img>").attr({
            src: "./resources/gb_btns2.png",
            class: "gb_icons"
        })

        let dpad_btn = $("<img>").attr({
            src: "./resources/dpad_btn.png",
            class: "dpad_icon"
        })

        let btns = $("<div>").attr({
            class: "btns_contain"
        }).html([dpad_btn, gb_icons])

        let cardFinal = card.append([authorAvatar, authorName, authorBio__div, btns])

        $("#cards__contain").append(cardFinal)
    }
})

function createBookCards(books) {
    // Clear the books first
    $('#books').empty();

    // loop over the books array
    // Create a book card for each of them
    for (let index = 0; index < books.length; index++) {
        const element = books[index];
        let {
            id,
            title,
            isbn,
            author_id
        } = element

        let booksByAuthor = $("<h4>").attr({
            style: "color:white;justify-self:flex-start;width:100%;"
        }).html(`Books by Jordan Peterson`)

        let deleteBtn = $("<button>").attr({
            bookId: id,
            class: "btn btn-danger delete-btn"
        }).html("Delete")
        let bookCard = $("<div>").addClass("bookCard custom_card book_card");
        title = $('<p>').html(title).addClass("book_title")
        $(bookCard).append([title, deleteBtn])
        $('#books').append(bookCard)
    }
}

// $("body").on("click", ".delete-btn", (event) => {
//     let bookId = $(event.target).attr("bookId")
//     let url = `http://library-bm.herokuapp.com/authors${}`
// })




//Goal - On click create Author / book template beneath author cards
// On card author click create section 

function authorBookTemplate() {
    $("#page-template").html("")

    let booksGridTarget = $("<div>").attr("id", "books__grid")

    let h2Target = $("<h2>").attr({
        class: "books__grid--title",
        id: "books_by"
    })

    let posterGridTarget = $("<div>").attr({
        class: "poster__grid__item--col1row2 nes-container with-title is-rounded is-dark",
        id: "poster--grid"
    })
    let posterTitleTarget = $("<p>").attr("class", "title").html("Poster")

    // let imgTarget = $("<img>").attr({
    //     src: "https://covers.openlibrary.org/b/id/8834227-L.jpg",
    //     alt: "poster",
    // })
    let infoGridTarget = $("<div>").attr({
        class: "info__grid__item--col2row2 nes-container with-title is-rounded is-dark"
    })
    let infoTitleTarget = $("<p>").attr("class", "title").html("Info")

    let infoTarget = $("<div>").attr("class", "books__grid--info__grid")

    let pTarget = $("<p>").html("Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, id.")

    let linksGridTarget = $("<div>").attr({
        class: "links__grid__item--col3row2 nes-container with-title is-rounded is-dark"
    })
    let linksTitleTarget = $("<p>").attr("class", "title")
    // Append all the poster targets
    let poster = posterGridTarget.append([posterTitleTarget]) //, imgTarget
    // Append all the info paragraphs 
    let infoP = infoTarget.append([pTarget, pTarget])
    // Append all the info elements
    let info = infoGridTarget.append([infoTitleTarget, infoP])

    //Append all the link targets
    let links = linksGridTarget.append([linksTitleTarget, pTarget, pTarget])

    // Append Everything
    let booksGrid = booksGridTarget.append([h2Target, poster, info, links])

    let createSection = $(`<section id="section-target" class="section--page nes-container with-title is-centered is-rounded is-dark" style="margin: 117px 0 0 0;">`);
    $("div#page-template").html(createSection)
    $("#section-target").append(booksGrid)

}


$("body").on("click", "#card-target", (event) => {
    // console.log(event.target);
    let authorid = $(event.target).attr("authorid")
    // console.log(authorid)
    let getAuthors = apiUrl + `/authors/${authorid}`
    authorBookTemplate()

    //Get author name and Append Book posters to poster grid item template
    $.get(getAuthors, (response) => {
        // console.log(response.authors[0].firstName + " " + response.authors[0].lastName)
        let authorName = response.authors[0].firstName + " " + response.authors[0].lastName
        $("#books_by").html(`Books by ${authorName}`)

        let googleBooksApi = "https://www.googleapis.com/books/v1/volumes?q=" + authorName
        let encoded = encodeURI(googleBooksApi)
        // console.log(encoded)
        //Goal - get 5 book posters for a author and put them into an array
        // Make a get request to googleapi, and target the book covers for each book
        $.get(encoded, (response) => {
            // let thumbnail = response.items[index].volumeInfo.imageLinks.thumbnail
            // console.log("Items returned: " + response.items)
            // let thumbnailResize = thumbnail.replace("zoom=1", "zoom=2")



            for (let index = 0; index < 3; index++) {
                // console.log("Length is: " + response.items.length)
                let posterImg = response.items[index].volumeInfo.imageLinks.thumbnail;
                // console.log("Image links are: " + response.items[index].volumeInfo.imageLinks.thum)
                let thumbnailResize = posterImg.replace("zoom=1", "zoom=2")
                // console.log("Poster resized url: " + thumbnailResize)
                let poster = $("<img>").attr({
                    src: thumbnailResize,
                    id: "book_img" + index,
                    class: "mySlides w3-animate-fading"
                })

                let posterContain = $("<div>").attr({
                    class: "w3-content w3-section"
                })

                let posterFinal = posterContain.append(poster)

                $("#poster--grid").append(posterFinal)
                slideshow()



                // Goal - create img elements and append the url images to them
                // how many images do you want? we want 10 images

            }
        })
        // take those book covers and append them to a variable or array
        // append the posters to the poster-grid-item with a slideshow
    })
})



function slideshow() {
    var myIndex = 0;
    carousel();

    function carousel() {
        var i;
        var x = $(".mySlides");
        console.log(x)
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        myIndex++;
        if (myIndex > x.length) {
            myIndex = 1
        }
        x[myIndex - 1].style.display = "block";
        setTimeout(carousel, 9000);
    }
}


$("body").on("click", "#btn_submit_author", (event) => {

    // Get the user input value
    let firstName = $("[name='first-name-input']").val()
    console.log(firstName)
    let lastName = $("[name='last-name-input']").val()
    console.log(lastName)
    let bio = $("[name='textarea-input']").val()
    console.log(bio)
    let avatar = $("[name='avatar-url-input']").val()
    console.log(avatar)

    let body = {
        firstName,
        lastName
    };

    if (bio !== "") {
        body.bio = bio
    }

    if (avatar !== "") {
        body.avatar = avatar
    }

    let postUrl = `${apiUrl}/authors`

    $.post(postUrl, body, function (response) {

        if (response.success) {
            $("#first-name").val("")
            $("#last-name").val("")
            $("#textarea").val("")

        } else {
            console.log(response.error)
        }
    })
})