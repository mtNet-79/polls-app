import { showLoading, hideLoading } from "react-redux-loading-bar";
import { getInitialData } from "../utils/api";
import { setAuthedUser } from "./authedUser";

export const RECEIVE_DATA = 'RECIVE_DATA'


// const AUTHED_ID = "mthornton";

const recieveData = (users, questions) => {
    return {
        type: RECEIVE_DATA,
        users, 
        questions,
    };
}



export const handleInitialData = () => {
    return (dpatch) => {
        dpatch(showLoading());
        return getInitialData().then(({users, questions}) => {           
          
            // dpatch(setAuthedUser(AUTHED_ID));   
            dpatch(recieveData(users, questions));         
            dpatch(hideLoading());
        })

    }
}

