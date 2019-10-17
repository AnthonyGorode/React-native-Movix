const initialState = { avatar: require('../../assets/Images/ic_tag_faces.png') }

const setAvatar = (state = initialState, action) => {
    let nextState
    switch (action.type) {
        case 'SET_AVATAR':
            nextState = {
                ...state,
                avatar: action.value
            }
            return nextState || state
    
        default:
            return state
    }
}

export default setAvatar