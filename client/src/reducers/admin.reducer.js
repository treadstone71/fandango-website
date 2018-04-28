const initialState = {}

export function admin (state = initialState, action){
    console.log(action);
    switch(action.type){
        case "GETTOPMOVIES_SUCCESS":
            return {
                ...state,
                topmovies: action.topmovies
            }
            break;
        case "GETCITY_SUCCESS":
            return {
                ...state,
                citywiselist: action.citywiselist
            }
        default:
            return state;
    }
}