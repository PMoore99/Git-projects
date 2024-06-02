// Populate dropdown menu with all the available genres
const populateGenreDropdown = (genres) => {
    const select = document.getElementById('genres')

    for (const genre of genres) {
        let option = document.createElement("option");
        option.value = genre.id;
        option.text = genre.name;
        select.appendChild(option);
    }
};

// Returns the current genre selection from the dropdown menu
const getSelectedGenre = () => {
    const selectedGenre = document.getElementById('genres').value;
    return selectedGenre;
};

// Displays the like and dislike buttons on the page
const showBtns = () => {
    const btnDiv = document.getElementById('likeOrDislikeBtns');
    btnDiv.removeAttribute('hidden');
};

// Clear the current movie from the screen
const clearCurrentMovie = () => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    moviePosterDiv.innerHTML = '';
    movieTextDiv.innerHTML = '';
};

// After liking a movie, clears the current movie from the screen and gets another random movie
const likeMovie = () => {
    displayRecordLiked();
    displayRecordDisliked();
    clearCurrentMovie();
    showRandomMovie();
};

// After disliking a movie, clears the current movie from the screen and gets another random movie
const dislikeMovie = () => {
    displayRecordLiked();
    displayRecordDisliked();
    clearCurrentMovie();
    showRandomMovie();
};

// Create HTML for movie poster
const createMoviePoster = (posterPath) => {
    const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;

    const posterImg = document.createElement('img');
    posterImg.setAttribute('src', moviePosterUrl);
    posterImg.setAttribute('id', 'moviePoster');

    return posterImg;
};

// Create HTML for movie title
const createMovieTitle = (title) => {
    const titleHeader = document.createElement('h1');
    titleHeader.setAttribute('id', 'movieTitle');
    titleHeader.innerHTML = title;
    titleHeader.style.marginBottom = "-3rem";
    return titleHeader;
};

// Create HTML for movie overview
const createMovieOverview = (overview) => {
    const overviewParagraph = document.createElement('p');
    overviewParagraph.setAttribute('id', 'movieOverview');
    overviewParagraph.innerHTML = overview;

    return overviewParagraph;
};

// Create HTML for movie overview
const createMovieDate = (date) => {
    const year = date.substring(0, 4);
    const dateH2 = document.createElement('h2');
    dateH2.setAttribute('id', 'dateH2');
    dateH2.innerHTML = year;

    return dateH2;
};

const createMovieCast = (cast) => {
    if (cast.length === 2) {
        const castH3 = document.createElement('h3');
        castH3.setAttribute('id', 'castH3');
        castH3.innerHTML = `Starring <em>${cast[0]}</em> and <em>${cast[1]}</em>`;

        return castH3;
    }
    else if (cast.length === 1) {
        const castH3 = document.createElement('h3');
        castH3.setAttribute('id', 'castH3');
        castH3.innerHTML = `Starring <em>${cast[0]}</em>`;

        return castH3;
    }
    else {
        return 'Starring unknown';
    }
};

// Returns a random movie from the first page of movies
const getRandomMovie = (movies) => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    return randomMovie;
};

// Uses the DOM to create HTML to display the movie
const displayMovie = (movieInfo, movieCredits) => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');

    // Create HTML content containing movie info
    const moviePoster = createMoviePoster(movieInfo.poster_path);
    const titleHeader = createMovieTitle(movieInfo.title);
    const movieDate = createMovieDate(movieInfo.release_date);
    const movieCast = createMovieCast(movieCredits);
    const overviewText = createMovieOverview(movieInfo.overview);

    // Append title, poster, and overview to page
    moviePosterDiv.appendChild(moviePoster);
    movieTextDiv.appendChild(titleHeader);
    movieTextDiv.appendChild(movieDate);
    movieTextDiv.appendChild(movieCast);
    movieTextDiv.appendChild(overviewText);

    showBtns();
}