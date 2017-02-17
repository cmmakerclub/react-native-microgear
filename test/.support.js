import { Server } from 'mosca';

let broker = null;

const PORT = 3005;

export const startBroker = () => new Promise((resolve, reject) => {
  broker = new Server({
    port: 18830,
    backend: {
      //using ascoltatore
      type: 'mongo',
      url: 'mongodb://localhost:27017/mqtt',
      pubsubCollection: 'ascoltatori',
      mongo: {}
    },
    http: {
      port: PORT,
      bundle: true,
      static: './'
    }
  });
  broker.on('ready', resolve);
});

export const stopBroker = () => {
  if (broker) {
    return new Promise((resolve, reject) => {
      broker.close(resolve);
      broker = null;
    });
  }
  return Promise.resolve();
};

export const uri = 'ws://localhost:'+PORT+'/';
export const webSocket = require('websocket').w3cwebsocket;
export const storage = require('node-localstorage');
export const mqttVersion = 3;
