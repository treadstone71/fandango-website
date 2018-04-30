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
                case "GET_MOVIE_HALL_SUCCESS":
                    return {
                        ...state,
                        name: action.name
                    }
                    break;
                    case "UPDATE_MOVIE_INFO_SUCCESS":
                        return {
                            ...state
                        }
                        break;
                    case "UPDATE_MOVIE_HALL_INFO_SUCCESS":
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
        case "GETBILLS_SUCCESS":
            return {
                ...state,
                bills: action.bills
            }
            break;
        case "GETBILL_SUCCESS":
            return {
                ...state,
                bill: action.bill
            }
            break;
        case "GETUSER_SUCCESS":
            return {
                ...state,
                userInfo: action.userInfo
            }
            break;

            case "POSTMOVIE_SUCCESS":
                return {
                    ...state,
                    movie_id:action.movie_id
                }
                break;
                case "GETMOVIEREVENUE_SUCCESS":
                    return {
                        ...state,
                        movie: action.movie
                    }
                    break;

        case "GETCLICKS_SUCCESS": 
            return {
                ...state,
                clicks: action.clicks
            }
            break;
        case "GETREVIEWS_SUCCESS":
            return {
                ...state,
                reviews: action.reviews
            }
            break;
        default:
            return state;
    }
}