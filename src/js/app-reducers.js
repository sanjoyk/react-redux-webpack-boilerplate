import { combineReducers } from "redux";
import { AppAction } from "./app-constants/index.js";

import books from "./books/books-reducers.js";
import booksSettings from "./book/book-reducers.js";

const app = (state ={messages:[], notifications:[], }, action) =>{
  const newMessages = [...state.messages];
  const existingMessageIdx = newMessages.findIndex(message => (message.message === action.message) 
        && (action.params? message.type === action.params.type : true));

  const newNotifications = [...state.notifications];
  const newNotificationsIdx = newNotifications.findIndex(noti =>(noti.message === action.message)
        && (action.params? noti.type === action.params.type: true));
  switch(action.type){
  case AppAction.SET.MESSAGE:{
    if(existingMessageIdx === -1){
      newMessages.push({
        id: state.messages.length,
        message: action.message,
        type: action.params && action.params.type,
        onOk: action.params.onOk
      });
    }
    return { ...state, messages: newMessages }; 
  }
  case AppAction.CLEAR.MESSAGE:{
    if(newMessages && newMessages.length > 0){
      newMessages.splice(action.id, 1);
      return { ...state, messages: newMessages }; 
    }
    return state;
  }
  case AppAction.CLEAR.ALL_MESSAGES:{
    return { ...state, messages:[]};
  }
  case AppAction.ADD.NOTIFICATION:{
    if(newNotificationsIdx === -1){
      newNotifications.push({
        id: state.notifications.length,
        message: action.message,
        type: action.params && action.params.type
      });
      return { ...state, notifications: newNotifications };
    }
    return state;
  }
  case AppAction.REMOVE.NOTIFICATION:{
    if(newNotifications && newNotifications.length > 0){
      newNotifications.splice(action.id, 1);
      return{ ...state, notifications: newNotifications };
    }
    return state;
  }
  case AppAction.REMOVE.ALL_NOTIFICATION:{
    return { ...state, notifications:[]};
  }
  default: return state;
  }
};
const reducers = combineReducers({
  app: app,
  books: books,
  bookSettings: booksSettings
});
export default reducers;