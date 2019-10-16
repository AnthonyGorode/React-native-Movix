const API_TOKEN = "2fae416c150ee4b2e2c62a138bf9b3ea"

export const searchMovieByQuery = (query, page) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_TOKEN}&language=fr&query=${query}&page=${page}`;

    return fetch(url).then(
        response => response.json(),
        error => console.log(error)
    )
}

export const moviesDiscover = (page = 1) => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_TOKEN}&language=fr&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;

    return fetch(url).then(
        response => response.json(),
        error => console.log(error)
    )
}

// Récupération du détail d'un film
export function getFilmDetailFromApi(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_TOKEN}&language=fr`
    return fetch(url).then(
        (response) => response.json(),
        (error) => console.log(error)    
    )
}