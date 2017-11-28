import { endpoints } from '../../../config/constants';

export const actions = {
    DOWNLOADHTML: 'DOWNLOADHTML',
    LOADHTML: 'LOADHTML',
    DOWNLOAD_HTML_ERROR: 'DOWNLOAD_HTML_ERROR',  
}; 
function programRequest(orderId) { 
    let id =  orderId.substring(2);  
    let url =  `${endpoints.orderProgram}?id=` + id;   
    const options = {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json'
            }
    };   
   return  fetch(url,options)
    .then(response => {   
        return response.json();
    }) 
    .catch(err => {
        console.log("fetch error" + err);
    });
    
}  
export const actionCreatorFactory = {
        programActionCreator: () => {
            return (dispatch, getState) => { 
                let { orderId } = getState().selectedId;  
                programRequest(orderId).then((data) => {   
                     dispatch({type: actions.LOADHTML, content: data});
                }).catch(error => {
                    dispatch({type: actions.DOWNLOAD_HTML_ERROR, content: {error}});
                     console.log(error); 
                });   
        };
    }
};
