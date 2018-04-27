const initialState = {}

export function authentication (state = initialState, action){
    console.log(action);
    switch(action.type){
        case "LOGIN_SUCCESS":
            return {
                ...state,
                loggedIn : true,
            username: action.username
            }
            break;
            case "LOGIN_FAILURE":
        return {
            ...state,
            loggedIn: false,
        }
        break;
            case "CHECK_SUCCESS":
                return {
                    ...state,
                    loggedIn: true,
                    username: action.username
                }
                break;
                case "CHECK_FAILURE":
                    return {
                        ...state,
                        loggedIn: false
                    }
                    break;
            default:
                return state;
    }
}