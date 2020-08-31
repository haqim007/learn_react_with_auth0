import * as ACTION_TYPES from 'store/actions/action_type'

const initState1 = {
    is_authenticated: false,
    profile: null
}

const authReducer = (state = initState1, action) => {
    switch (action.type) {
        case ACTION_TYPES.LOGIN_SUCCESS:
            return {
                ...state,
                is_authenticated: true
            }

        case ACTION_TYPES.LOGIN_FAILURE:
            return {
                ...state,
                is_authenticated: false
            }

        case ACTION_TYPES.ADD_PROFILE:
            return {
                ...state,
                profile: action.payload,

            }

        case ACTION_TYPES.REMOVE_PROFILE:
            return {
                ...state,
                profile: null
            }

        default:
            return state
    }
}

export default authReducer