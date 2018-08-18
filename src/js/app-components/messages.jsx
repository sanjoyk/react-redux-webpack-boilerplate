import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Modal, Icon, Button} from 'antd';
import {MessageTypes} from '../app-constants/index.js';

class MessageBox extends Component {
  constructor (props) {
    super (props);
  }
  render () {
    const {messages, onAcknowledgedAppMessage} = this.props;

    const message = messages && messages.length
      ? messages[messages.length - 1]
      : null;
    const getIcon = type => {
      switch (type) {
        case MessageTypes.ERROR:
          return (
            <Icon
              style={{color: 'red', textAlign: 'center'}}
              type="close-circle-o"
            />
          );
        case MessageTypes.SUCCESS:
          return (
            <Icon
              style={{color: 'green', textAlign: 'center'}}
              type="check-circle-o"
            />
          );
        case MessageTypes.INFO:
          return (
            <Icon
              style={{color: 'grey', textAlign: 'center'}}
              type="info-circle-o"
            />
          );
        default:
          return null;
      }
    };

    const title = (
      <div style={{textAlign: 'center', fontSize: '30px'}}>
        {message && getIcon (message.type)}
        <p
          style={{
            marginTop: '15px',
            marginBottom: '10px',
            display: 'inline-block',
            paddingLeft: '20px',
          }}
        >
          {message && message.type}
        </p>
      </div>
    );

    const messageText = message && message.message;
    return (
      <div>
        <Modal
          title={title}
          visible={messageText != null}
          closable={false}
          maskClosable={false}
          zIndex={3000}
          bodyStyle={{
            textAlign: 'center',
            fontSize: '16px',
          }}
          footer={[
            null,
            <Button
              key="ok"
              onClick={() => {
                message.onOk && message.onOk ();
                onAcknowledgedAppMessage (message.id);
              }}
            >
              OK
            </Button>,
          ]}
        >
          {messageText}
        </Modal>
      </div>
    );
  }
}

export default MessageBox;
