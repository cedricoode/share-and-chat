import { endpoints } from '../../../config/constants';
import _ from 'lodash';   
export const actions = {
    DOWNLOADHTML: 'DOWNLOADHTML',
    LOADHTML: 'LOADHTML',
    DOWNLOAD_HTML_ERROR: 'DOWNLOAD_HTML_ERROR',
};
// get program html url 
function programRequest(orderId) {
    let id = orderId.substring(2);
    let url = `${endpoints.orderProgram}?id=` + id;
    const options = {
        method: 'GET'
    };
    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log("programRequest fetch error" + err);
        });
}
// get program html by url 
function getProgramHtml(url) {
    const options = {
        method: 'GET'
    };
    return fetch(url, options)
        .then(response => {  
            let errorContent  = '<div style = "font-size:15px">Loading page error ...<div>';
            if(response.ok == true)
             return response.text();
            else 
             return errorContent;
        })
        .catch(err => {
            console.log("getProgramHtml fetch error" + err);
        });
}
 
export const actionCreatorFactory = {
    programActionCreator: () => {
        return (dispatch, getState) => { 
            let orderId  = getState().selectedId.orderId;
            console.log("orderId  " + orderId); 
             programRequest(orderId).then((data) => { 
                let url = data.url;
                if(url){
                    getProgramHtml(url).then((data) => {  
                            dispatch({ type: actions.LOADHTML, content: { id: orderId, html: data } });  
                    }).catch(error => { 
                        dispatch({ type: actions.LOADHTML, content: { id: orderId, html: data } });
                        console.log("getProgramHtml   error " + error);
                    });
                }else{
                    dispatch({ type: actions.LOADHTML, content: { id: orderId, html: data } }); 
                }
                
            }).catch(error => {
                dispatch({ type: actions.LOADHTML, content: { id: orderId, html: data } });
                console.log("programRequest   error " + error);
            });
        };
    }
};
