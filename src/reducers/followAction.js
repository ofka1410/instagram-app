const followAction=(state=[], action)=>{
    switch(action.type){
        case 'FIND_FOLLOWERS':
        return state=action.payload;
        default:
      return state;
    }
}
export default followAction;