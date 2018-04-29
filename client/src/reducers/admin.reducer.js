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
            break;
        case "GETTOPHALLS_SUCCESS":
            return {
                ...state,
                tophalls: action.tophalls
            }
            break;
            case "GET_MOVIE_SUCCESS":
                return {
                    ...state,
                    movie: action.movie
                }
                break;
                    case "UPDATE_MOVIE_INFO_SUCCESS":
                        return {
                            ...state
                        }
                        break;
        case "POSTHALL_SUCCESS":
            return {
                ...state,
                hall_id: action.hall_id
            }
            break;
        default:
            return state;
    }
}