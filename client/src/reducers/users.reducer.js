const initialState = {}

export function user(state = initialState, action){
	switch(action.type){
		case "GETMOVIECATEGORY_SUCCESS":
			return {
				...state,
				movie: action.movie
			}
		break;
		case "GETMOVIEHALL_SUCCESS":
			return {
				...state,
				hall: action.hall
			}
		break;
		case "GETMOVIEINFO_SUCCESS":
			return {
				...state,
				movie: action.movie
			}
		break;
		default:
            return state;
	}
}