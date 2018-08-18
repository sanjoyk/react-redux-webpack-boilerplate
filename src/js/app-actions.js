import {AppAction} from "./app-constants/index.js";

//************** End Errors ************************
export function setAppMessage(message, params){
  return {
    type: AppAction.SET.MESSAGE,
    message: message,
    params: params
  };
}

export function clearAppMessage(id){
  return {
    type: AppAction.CLEAR.MESSAGE,
    id: id
  };
}

export function clearAllAppMessages(){
  return {
    type: AppAction.CLEAR.ALL_MESSAGES
  };
}
//************** End Errors *************************

//************** Start Notification *****************
export function addAppNotification(message, params){
  return{
    type: AppAction.ADD.NOTIFICATION,
    message: message,
    params: params
  };
}

export function removeAppNotification(id){
  return{
    type: AppAction.REMOVE.NOTIFICATION,
    id: id,
  };
}
export function clearAppNotifications(){
  return {
    type: AppAction.REMOVE.ALL_NOTIFICATIONS
  };
}
//************** End Notification *****************
