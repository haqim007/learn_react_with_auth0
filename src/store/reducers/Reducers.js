import * as ACTION_TYPES from 'store/actions/action_type'

const initState = {
    stateProp1: false
}

const rootReducer = (state = initState, action) =>{
    switch (action.type) {
      case ACTION_TYPES.SUCCESS:
          return {
              ...state,
              stateProp1: true
          }

      case ACTION_TYPES.FAILURE:
          return {
              ...state,
            stateProp1: false,
          };

      default:
        return state
    }
}

export default rootReducer