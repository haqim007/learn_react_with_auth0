import * as ACTION_TYPES from 'store/actions/action_type'

const initState1 = {
    input_text: ''
}

const formReducer = (state = initState1, action) => {
    switch (action.type) {
        case ACTION_TYPES.INPUT_TEXT:
            return {
                ...state,
                input_text: action.payload
            }

        default:
            return state
    }
}

export default formReducer