const initialState = {};

const setYoutubeComponent = (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case 'SET_YOUTUBE_COMPONENT':
      nextState = {
        youtubeComponent: action.value,
      };
      return nextState || state;

    default:
      return state;
  }
};

export default setYoutubeComponent;
