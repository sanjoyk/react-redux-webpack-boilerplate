import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import { Modal, Button, Icon, notification, Layout, Menu } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
} from 'react-router-dom';
import {
  clearAppMessage,
  removeAppNotification,
  clearAllAppMessages,
} from './app-actions.js';

import { MessageBox } from './app-components/index.jsx';

const Loading = () => (<div>loading...</div>)
const BooksPage = Loadable({
  loader: () => import('./books/books-page.jsx'),
  loading: Loading,
});
const BookPage = Loadable({
  loader: () => import('./book/book-page.jsx'),
  loading: Loading,
});

const NoMatch = () => (
  <div>
    <h2>Whoops</h2>
    <p>Sorry but {location.pathname} didn’t match any pages</p>
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.showNotification = this.showNotification.bind(this);
    this.openNotification = this.openNotification.bind(this);
  }
  componentDidUpdate() {
    const { notifications, removeNotification } = this.props;
    this.showNotification(notifications, removeNotification);
  }
  openNotification(noti, removeNotification) {
    if (noti) {
      const key = noti.id;
      notification[noti.type.toLowerCase()]({
        btn: null,
        key,
        placement: 'bottomLeft',
        message: noti.message,
        onClose: (id => removeNotification(id))(noti.id),
        duration: 1,
      });
    }
  }

  showNotification(notifications, removeNotification) {
    const notification = notifications && notifications.length
      ? notifications[notifications.length - 1]
      : null;
    if (notification) {
      this.openNotification(notification, removeNotification);
    }
  }
  render() {
    const { messages, onAcknowledgedAppMessage } = this.props;
    return (
      <Router>
        <div>
          <MessageBox
            messages={messages}
            onAcknowledgedAppMessage={onAcknowledgedAppMessage}
          />
          <div style={{ minWidth: '100%', minHeight: '100%' }}>
            <Switch>
              <Route path="/" component={BooksPage} />
              <Route path="/book/:bookId" component={BookPage} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
const mapStateToProps = state => {
  return {
    messages: state.app.messages,
    notifications: state.app.notifications,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAcknowledgedAppMessage: id => dispatch(clearAppMessage(id)),
    clearAllAppMessages: _ => dispatch(clearAllAppMessages()),
    removeNotification: id => dispatch(removeAppNotification(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
