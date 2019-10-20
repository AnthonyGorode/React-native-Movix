const API_TOKEN = "2fae416c150ee4b2e2c62a138bf9b3ea"
const apiUrl = "https://api.themoviedb.org/3"

// FETCH FOR HOME
export const moviesDiscover = (page = 1) => {
    const url = `${apiUrl}/discover/movie?api_key=${API_TOKEN}&language=fr&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;

    return fetch(url).then(
        response => response.json(),
        error => console.log(error)
    )
}

export const moviesDrama = (page = 1) => {
    const url = `${apiUrl}/discover/movie?with_genres=18&primary_release_year=2018&api_key=${API_TOKEN}&language=fr`;

    return fetch(url).then(
        response => response.json(),
        error => console.log(error)
    )
}

export const moviesScifi = (page = 1) => {
    const url = `${apiUrl}/discover/movie?with_genres=878&primary_release_year=2019&api_key=${API_TOKEN}&language=fr`;

    return fetch(url).then(
        response => response.json(),
        error => console.log(error)
    )
}

// FETCH FOR SEARCH
export const searchMovieByQuery = (query, page) => {
    const url = `${apiUrl}/search/movie?api_key=${API_TOKEN}&language=fr&query=${query}&page=${page}`;

    return fetch(url).then(
        response => response.json(),
        error => console.log(error)
    )
}

// FETCH FOR DETAILS
export const getFilmDetailFromApi = (id) => {
    const url = `${apiUrl}/movie/${id}?api_key=${API_TOKEN}&language=fr`
    return fetch(url).then(
        (response) => response.json(),
        (error) => console.log(error)    
    )
}

// FETCH VIDEOS FOR DETAILS
export const getFilmVideosFromApi = (id) => {
    const url = `${apiUrl}/movie/${id}/videos?api_key=${API_TOKEN}&language=fr-FR`
    return fetch(url).then(
        (response) => response.json(),
        (error) => console.log(error)    
    )
}