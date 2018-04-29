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
        default:
            return state;
    }
}