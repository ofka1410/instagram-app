const LikeSaver=(state=[], action)=>{
    switch(action.type){
        case 'FIND_USER_LIKE':
        return state=action.payload;
        default:
      return state;
    }
}
export default LikeSaver;