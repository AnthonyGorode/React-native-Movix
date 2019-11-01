const API_TOKEN = "2fae416c150ee4b2e2c62a138bf9b3ea"
const apiUrl = "https://api.themoviedb.org/3"

// FETCH FOR HOME
    // DEPRECATED
    // https://api.themoviedb.org/3/movie/popular?api_key=2fae416c150ee4b2e2c62a138bf9b3ea&language=fr&include_adult=true
    // https://api.themoviedb.org/3/discover/movie?api_key=2fae416c150ee4b2e2c62a138bf9b3ea&language=fr&with_companies=420&sort_by=popularity.desc
    export const moviesDiscover = (page = 1) => {
        const url = `${apiUrl}/discover/movie?api_key=${API_TOKEN}&language=fr&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;

        return fetch(url).then(
            response => response.json(),
            error => console.log(error)
        )
    }

    // https://api.themoviedb.org/3/movie/now_playing?api_key=2fae416c150ee4b2e2c62a138bf9b3ea&language=fr
    export const moviesPlayingNow = () => {
        const url = `${apiUrl}/movie/now_playing?api_key=${API_TOKEN}&language=fr`;
        console.log(url)
        return fetch(url).then(
            response => {
                console.log(response)
                return response.json()
            },
            error => console.log(error)
        )
    }

    // https://api.themoviedb.org/3/trending/movie/day?api_key=2fae416c150ee4b2e2c62a138bf9b3ea&language=fr
    export const moviesTrending = () => {
        const url = `${apiUrl}/trending/movie/day?api_key=${API_TOKEN}&language=fr`;
        console.log(url)

        return fetch(url).then(
            response => response.json(),
            error => console.log(error.message)
        )
    }

    // https://api.themoviedb.org/3/movie/popular?api_key=2fae416c150ee4b2e2c62a138bf9b3ea&language=fr&with_companies=420
    export const moviesMarvel = () => {
        const url = `${apiUrl}/movie/popular?api_key=${API_TOKEN}&language=fr&with_companies=420`;

        return fetch(url).then(
            response => response.json(),
            error => console.log(error)
        )
    }

    // https://api.themoviedb.org/3/movie/popular?api_key=2fae416c150ee4b2e2c62a138bf9b3ea&language=fr&with_companies=9993
    export const moviesDC = () => {
        const url = `${apiUrl}/movie/popular?api_key=${API_TOKEN}&language=fr&with_companies=9993`;

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
// https://api.themoviedb.org/3/search/movie?api_key=2fae416c150ee4b2e2c62a138bf9b3ea&language=fr&query=joker&page=1
    export const searchMovieByQuery = (query, page) => {
        const url = `${apiUrl}/search/movie?api_key=${API_TOKEN}&language=fr&query=${query}&page=${page}`;

        return fetch(url).then(
            response => response.json(),
            error => console.log(error)
        )
    }

// FETCH FOR DETAILS FILM
// https://api.themoviedb.org/3/movie/475557?api_key=2fae416c150ee4b2e2c62a138bf9b3ea&language=fr
    export const getFilmDetailFromApi = (id) => {
        const url = `${apiUrl}/movie/${id}?api_key=${API_TOKEN}&language=fr`
        return fetch(url).then(
            (response) => response.json(),
            (error) => console.log(error)    
        )
    }
    // FETCH VIDEOS FOR DETAILS FILM
    export const getFilmVideosFromApi = (id) => {
        const url = `${apiUrl}/movie/${id}/videos?api_key=${API_TOKEN}&language=fr-FR`
        return fetch(url).then(
            (response) => response.json(),
            (error) => console.log(error)    
        )
    }
    // FETCH ACTORS FOR DETAILS FILM
    export const getFilmActorsFromApi = (id) => {
        const url = `${apiUrl}/movie/${id}/credits?api_key=${API_TOKEN}`
        return fetch(url).then(
            (response) => response.json(),
            (error) => console.log(error)    
        )
    }
    // FETCH ACTORS FOR DETAILS FILM
    export const getFilmImagesFromApi = (id) => {
        const url = `${apiUrl}/movie/${id}/images?api_key=${API_TOKEN}`
        return fetch(url).then(
            (response) => response.json(),
            (error) => console.log(error)    
        )
    }
    // FETCH ACTORS FOR DETAILS FILM
    export const getFilmRecommandationsFromApi = (id) => {
        const url = `${apiUrl}/movie/${id}/recommendations?api_key=${API_TOKEN}&language=fr`
        return fetch(url).then(
            (response) => response.json(),
            (error) => console.log(error)    
        )
    }
// RECOMMANDATIONS
// https://api.themoviedb.org/3/movie/475557/recommendations?api_key=2fae416c150ee4b2e2c62a138bf9b3ea&language=fr

// SIMILAIRES
// https://api.themoviedb.org/3/movie/475557/similar?api_key=2fae416c150ee4b2e2c62a138bf9b3ea&language=fr

// EN SALLES
// https://api.themoviedb.org/3/movie/now_playing?api_key=2fae416c150ee4b2e2c62a138bf9b3ea&language=fr

// TENDANCES
// https://api.themoviedb.org/3/trending/movie/day?api_key=2fae416c150ee4b2e2c62a138bf9b3ea&language=fr

// POPULAIRES
// https://api.themoviedb.org/3/movie/popular?api_key=2fae416c150ee4b2e2c62a138bf9b3ea&language=fr