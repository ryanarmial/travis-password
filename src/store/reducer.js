const defaultState = {
  search: '',
  currentEditing: {},
}

function reducer (state = defaultState, action) {
  switch(action.type) {
    case 'SET_SEARCH':
      return {
        ...state,
        search: action.payload,
      }
    case 'SET_EDITING':
      return {
        ...state,
        currentEditing: action.payload,
      }
    default:
      return state
  }
}

export default reducer;