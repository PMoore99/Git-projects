const tmdbKey = '91abe775c035d30aae5b96464b741b1f';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');
const likeBtn = document.getElementById('likeBtn');
const dislikeBtn = document.getElementById('dislikeBtn');
const movieArray = [];
const likedMovies = [];
const dislikedMovies = [];

const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams;
  try {
    const response = await fetch(urlToFetch, { cache: 'no-cache' });
    if (response.ok) {
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres;
      return genres;
    }
  }
  catch (error) {
    console.log(error);
  }
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
  const randPage = Math.ceil(Math.random() * 500);
  const requestParams = `?api_key=${tmdbKey}&with_original_language=en&with_genres=${selectedGenre}&page=${randPage}`;
  const urlToFetch = tmdbBaseUrl + discoverMovieEndpoint + requestParams;

  try {
    const response = await fetch(urlToFetch, { cache: 'no-cache' });
    if (response.ok) {
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      return movies;
    }
  }
  catch (error) {
    console.log(error);
  }
};

const getMovieInfo = async movie => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = tmdbBaseUrl + movieEndpoint + requestParams;
  try {
    const response = await fetch(urlToFetch, { cache: 'no-cache' });
    if (response.ok) {
      const movieInfo = await response.json();
      return movieInfo;
    }
  }
  catch (error) {
    console.log(error);
  }
};

const getMovieCredits = async movie => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}/credits`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = tmdbBaseUrl + movieEndpoint + requestParams;
  try {
    const response = await fetch(urlToFetch, { cache: 'no-cache' });
    if (response.ok) {
      const movieCredits = await response.json();
      if (movieCredits.cast.length >= 2) {
        const twoCast = [movieCredits.cast[0].name, movieCredits.cast[1].name];
        return twoCast;
      }
      else if (movieCredits.cast.length === 1) {
        const oneCast = [movieCredits.cast[0].name];
        return oneCast;
      }
      else {
        return [];
      }
    }
  }
  catch (error) {
    console.log(error);
  }
};

const likeMovieRecord = () => {
  const store = movieArray.slice(-1);
  likedMovies.unshift(store);
  return likedMovies;
}

const dislikeMovieRecord = () => {
  const store = movieArray.slice(-1);
  dislikedMovies.unshift(store);
  return dislikedMovies;
}

const displayRecordLiked = () => {
  let listData = document.getElementById('liked');
  while (listData.hasChildNodes()) {
    listData.removeChild(listData.firstChild);
  }
  const title = document.createElement('li');
  title.innerHTML = "<em>Liked Movies</em>";
  listData.appendChild(title);
  for (const movie of likedMovies) {
    let displayList = document.createElement('li');
    displayList.innerHTML = movie;
    listData.appendChild(displayList);
  }
}

const displayRecordDisliked = () => {
  let listData = document.getElementById('disliked');
  while (listData.hasChildNodes()) {
    listData.removeChild(listData.firstChild);
  }
  const title = document.createElement('li');
  title.innerHTML = "<em>Disliked Movies</em>";
  listData.appendChild(title);
  for (const movie of dislikedMovies) {
    let displayList = document.createElement('li');
    displayList.innerHTML = movie;
    listData.appendChild(displayList);
  }
}

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  const credits = await getMovieCredits(randomMovie);
  movieArray.push(info.title);
  displayMovie(info, credits);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
likeBtn.addEventListener('click', likeMovieRecord);
dislikeBtn.addEventListener('click', dislikeMovieRecord);
likeBtn.addEventListener('click', likeMovie);
dislikeBtn.addEventListener('click', dislikeMovie);
