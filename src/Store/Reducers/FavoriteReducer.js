const initialState = {favoritesFilm: []};

function toggleFavorite(state = initialState, action) {
  let nextState;

  switch (action.type) {
    case 'TOOGLE_FAVORITE':
      const favoritesFilmIndex = state.favoritesFilm.findIndex(
        item => item.id === action.value.id,
      );

      favoritesFilmIndex !== -1
        ? (nextState = {
            ...state,
            favoritesFilm: state.favoritesFilm.filter(
              (item, index) => index !== favoritesFilmIndex,
            ),
          })
        : (nextState = {
            ...state,
            favoritesFilm: [...state.favoritesFilm, action.value],
          });

      return nextState || state;
    default:
      return state;
  }
}

export default toggleFavorite;
