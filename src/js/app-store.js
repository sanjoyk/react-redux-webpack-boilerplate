import {createStore, applyMiddleware} from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./app-reducers.js";
import { composeWithDevTools } from "redux-devtools-extension";

let middleware =[reduxThunk];//add logger for development

let  composeEnhancers ;

composeEnhancers = composeWithDevTools({}); //add params

let store ;
// console.log("process.env.NODE_ENV===", process.env.NODE_ENV);
if(process.env.NODE_ENV === "development"){
  store = createStore(reducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(...middleware),
  ));
}else{
  store = createStore(reducers, applyMiddleware(...middleware));
}

// console.log("store in app-store", store);
export default store;
