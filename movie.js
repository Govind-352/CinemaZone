
const apiKey = '5642e496';
const searchBtn = document.getElementById('load-data-btn');
const dataContainer = document.getElementById('data-container');

// const searchInput = document.getElementById('searchInput');

const input = document.getElementById('searchInput');

// let suggestions = [];    
const suggestionsList = document.createElement('ul');
suggestionsList.classList.add("suggestions")
suggestionsList.style.display = "none"; // hide by default
document.querySelector(".gb-search-wrapper ").appendChild(suggestionsList);

// Attach an event listener to the input field
input.addEventListener('input', async () => {
    const inputValue = input.value.toLowerCase();

    // Clear the suggestions array and the suggestions list

    suggestions = [];
    suggestionsList.innerHTML = '';

    if (inputValue.length >= 3) {
        const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${inputValue}&type=movie`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.Response === 'True') {
                const movieTitles = data.Search.map(movie => movie.Title);
                suggestions = movieTitles.slice(0, 5).filter(title => title.length >= 4);
            }
        } catch (error) {
            console.error(error);
        }
    }
    if (suggestions.length > 0) {
        suggestionsList.style.display = "flex";
    } else {
        suggestionsList.style.display = "none";
    }
    // Add click event listeners to suggestion li elements
    suggestionsList.addEventListener('click', event => {
        // Check if the clicked element is an li
        if (event.target && event.target.nodeName == "LI") {
            // Set the value of the clicked suggestion to the search input field
            searchInput.value = event.target.textContent;

            // Hide the suggestions list
            suggestionsList.style.display = "none";
        }
    });

    renderSuggestions(suggestions);
});
// hide suggestions list when click outside of list and input field
document.addEventListener('click', event => {
    if (event.target != input && event.target.parentNode != suggestionsList) {
        suggestionsList.style.display = "none";
    }
});
// display again when click on input field
input.addEventListener('click', () => {
    if (suggestions.length > 0) {
        suggestionsList.style.display = "flex";
    }
});


// Add a click event listener to the search button
searchBtn.addEventListener('click', async () => {
    const searchQuery = searchInput.value;
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${searchQuery}`;

    // hide suggestion list when btn is clicked
    suggestionsList.style.display = "none";

    // notificatins for successfull and unsuccessfull response
    const emoji = String.fromCodePoint(0x1F60D);
    const emoji_1 = String.fromCodePoint(0x1FAE1);
    var successNoty = new Noty({
        text: `Thanks for using this app ! ${emoji}`,
        layout: 'topRight',
        theme: 'successNoty'
    });
    var errorNoty = new Noty({
        text: `Movie does not found !! ${emoji_1}`,
        layout: 'topRight',
        theme: 'errorNoty'
    });
    try {
        const response = await fetch(url);
        const data = await response.json();

        const poster = data.Poster;
        const title = data.Title;
        const language = data.Language;
        const date = data.Released;
        const plot = data.Plot;
        const rate = data.Rated;
        const time = data.Runtime;
        const genre = data.Genre;
        const director = data.Director;
        const actor = data.Actors;

        dataContainer.innerHTML = ''; // clear previous content

        // Create a new div element
        const movieContent = document.createElement('div');

        // Add a class to the div element
        movieContent.classList.add('movie-details');
        dataContainer.appendChild(movieContent);

        if (poster !== 'N/A' || data.Response == 'True') {

            // Update poster image
            const img = document.createElement('img');
            img.src = poster;
            dataContainer.appendChild(img);

            // Update movie title
            const movieTitle = document.createElement('h2');
            movieTitle.textContent = title;
            movieContent.appendChild(movieTitle);

            // Update movie language
            const movieLangauge = document.createElement('h5');
            movieLangauge.textContent = `( ${language} )`;
            movieContent.appendChild(movieLangauge);

            // Update movie date
            const releaseDate = document.createElement('p');
            releaseDate.innerHTML = `<span>Release date</span>: ${date}`;
            movieContent.appendChild(releaseDate);

            // Update movie plot
            const moviePlot = document.createElement('p');
            moviePlot.innerHTML = `<span>Plot</span> : ${plot}`;
            movieContent.appendChild(moviePlot);

            // Update movie rated
            const movieRate = document.createElement('p');
            movieRate.innerHTML = `<span>Rated</span> : ${rate}`;
            movieContent.appendChild(movieRate);

            // Update movie runtime
            const movieTime = document.createElement('p');
            movieTime.innerHTML = `<span>Runtime</span> : ${time}`;
            movieContent.appendChild(movieTime);

            // Update movie ratings
            if (data.Ratings && data.Ratings.length > 1) {
                const ratings = data.Ratings[0].Value;
                const ratings_1 = data.Ratings[1].Value;
                const movieRating = document.createElement('p');
                movieRating.innerHTML = `<span>Ratings</span> : Imdb - ${ratings} , &nbsp Rotten Tomatoes - ${ratings_1}`;
                movieContent.appendChild(movieRating);
            }

            // Update movie genre
            const movieGenre = document.createElement('p');
            movieGenre.innerHTML = `<span>Genre</span> : ${genre}`;
            movieContent.appendChild(movieGenre);

            // Update movie director
            const movieDirector = document.createElement('p');
            movieDirector.innerHTML = `<span>Director</span> : ${director}`;
            movieContent.appendChild(movieDirector);

            // Update movie actor
            const movieActor = document.createElement('p');
            movieActor.innerHTML = `<span>Actors</span> : ${actor}`;
            movieContent.appendChild(movieActor);


            dataContainer.style.backgroundImage = "none";

            successNoty.show();
            setTimeout(function () {
                successNoty.close();
            }, 3000);

        }
        if (data.Response !== 'True') {
            dataContainer.innerHTML = ''; // clear previous content
            dataContainer.style.backgroundImage = "url('./Group 51.png')"
            successNoty.close();
            errorNoty.show();
            setTimeout(function () {
                errorNoty.close();
            }, 3000);
        }
    }
    catch (error) {
        console.error(error);
    }
});

function renderSuggestions(suggestions) {
    // Use a Set to store unique suggestions
    const uniqueSuggestions = new Set(suggestions);

    // Clear the suggestions list
    suggestionsList.innerHTML = '';

    // Add each unique suggestion to the list
    uniqueSuggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion;
        suggestionsList.appendChild(li);
    });
}

const resetBtn = document.querySelector('#reset-btn');

resetBtn.addEventListener('click', () => {
    dataContainer.innerHTML = '';
    dataContainer.style.backgroundImage = "url('/Group 59.png')";
});


// if (Notification.permission === "granted") {
//     new Notification("Hello Friend, This is Cinema zone in your service!!")
// }
// else if (Notification.permission === "default") {
//     Notification.requestPermission().then(permission => {
//         if (permission === "granted") {
//             new Notification("Hello My Friend, This is Your Cinema zone !!")
//         }
//     })
// };
