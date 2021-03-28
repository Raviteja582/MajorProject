import * as ActionType from './ActionTypes';
export const Subject = (
    state = {
        loading: '...',
        subjects: [],
        error: null
    },
    action
) => {
    switch(action.type) {
        case ActionType.FETCH_SUBJECTS_LOADING:
            return state;
        case ActionType.FETCH_SUBJECTS_SUCCESS:
            return {
                ...state,
                subjects: action.payload,
                error: null,
            };
        case ActionType.FETCH_SUBJECTS_FAILURE:
            return {
                ...state,
                subjects: null,
                error: action.payload,
            };
        default:
            return state;
    }
};
            

