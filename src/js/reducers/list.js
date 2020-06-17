import * as ACTION from '../constants'


export default  (state = [], action) => {
	switch (action.type) {
		
            
        case ACTION.DELETE_REWARD:
            return state.filter(({ id }) => id !== action.id);

            
        default:
            return state;                
    }
};        