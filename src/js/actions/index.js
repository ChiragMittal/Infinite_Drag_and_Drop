import * as ACTION from '../constants'



export const deleteList = (id) => {
    return ({
        type: ACTION.DELETE_REWARD,
        
            id: id
        
    })
}
