export default (state=[], action) => {
  let {type, payload} = action;

  switch(type){
    case 'CATEGORY_CREATE':
      return [...state, payload];
      break;
    case 'CATEGORY_UPDATE':
      return state.map(category => category.id === payload.id ? payload : category);
      break;
    case 'CATEGORY_DELETE':
      return state.filter(category => category.id !== payload.id);
      break;
    default:
      return state;
      break;
  }
}
