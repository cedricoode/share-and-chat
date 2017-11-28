import { endpoints } from '../../../config/constants';
import _ from 'lodash';
 
export const actions = {
    DOWNLOADHTML: 'DOWNLOADHTML',
    LOADHTML: 'LOADHTML',
    DOWNLOAD_HTML_ERROR: 'DOWNLOAD_HTML_ERROR',  
}; 
function programRequest(orderId) { 
    let id =  orderId.substring(2);  
    let url =  `${endpoints.orderProgram}?id=` + id;    
    const options = {
        method: 'GET' 
    };   
   return  fetch(url,options)
    .then(response => {   
        return response.json();
    }) 
    .catch(err => {
        console.log("programRequest fetch error" + err);
    }); 
} 
function getProgramHtml(url) {  
    const options = {
        method: 'GET' 
    };   
   return  fetch(url,options)
    .then(response => {   
        return response.text();
    }) 
    .catch(err => {
        console.log("getProgramHtml fetch error" + err);
    }); 
}

function storeProgram(program) {  
  

} 

function getProgramHtmlFromStorage(orderId) {  
    
} 

export const actionCreatorFactory = {
        programActionCreator: () => {
            return (dispatch, getState) => { 
                let orderId = getState().selectedId;   
                console.log("orderId  " + orderId);
              programRequest(orderId).then((data) => {  
                     let url =  data.url ;
                     getProgramHtml(url).then((data) => { 
                        dispatch({type: actions.LOADHTML, content: { id : orderId , html : data }});
                        console.log("getProgramHtml   data " + data);
                     }).catch(error => {
                        dispatch({type: actions.DOWNLOAD_HTML_ERROR, content: {error}});
                        console.log("getProgramHtml   error " + err);
                    });   
                }).catch(error => {
                    dispatch({type: actions.DOWNLOAD_HTML_ERROR, content: {error}});
                    console.log("programRequest   error " + err);
                }); 
        };
    }
};
