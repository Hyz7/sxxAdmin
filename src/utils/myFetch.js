import { fetch } from 'whatwg-fetch'
import Promise from 'promise-polyfill/src/polyfill';
import setAsap from 'setasap';
Promise._immediateFn = setAsap;

/*const require=()=>{
    return new Promise((resolve,reject)=>{

    })
}*/

export function myFetch(url,options){
    let myConfig={
        method: options.method||"GET",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: 'Hubot',
            login: 'hubot',
        }),
        credentials: 'include'
    }
    if (options.method === 'GET') {
        myConfig.headers={

        }
    }else{

    }

    return fetch(url,myConfig)
}