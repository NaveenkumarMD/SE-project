import { act } from 'react-dom/test-utils'
import {LOGIN, SIGNUP,GETCLUBS} from '../Actions/Types'
const initialstate={
    userdetails:{},
    clubs:[]
}
export default (state=initialstate,action)=>{
    switch (action.type) {
        case LOGIN:
            return(
                {
                    ...state,
                    userdetails:action.payload
                }
            )
        case SIGNUP:
            return(
                {
                    ...state,
                    userdetails:action.payload
                }
            )
        case GETCLUBS:
            return(
                {
                    ...state,
                    clubs:action.payload
                }
            )
        default:
            return state
    }
}