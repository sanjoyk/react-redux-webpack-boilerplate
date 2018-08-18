const AppAction = {
  SET: {
    MESSAGE: "AppAction.Set.Message"
  },
  CLEAR:{
    MESSAGE: "AppAction.Clear.Message",
    ALL_MESSAGES: "AppAction.Clear.AllMessages"
  },
  ADD:{
    NOTIFICATION: "AppAction.Set.Notification",
  },
  REMOVE:{
    NOTIFICATION: "AppAction.Remove.Notification",
    ALL_NOITFICATIONS: "AppAction.Remove.ALlNotifications"
  }
};

export default AppAction;