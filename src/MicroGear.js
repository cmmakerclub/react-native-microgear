'use strict';

import {Client, Message} from 'react-native-paho-mqtt';
import * as CMMC from '../../react-native-netpie-auth'
let CMMC_EventEmitter = require("./CMMC_EventEmitter")

//Set up an in-memory alternative to global localStorage
const myStorage = {
  setItem: (key, item) => {
    myStorage[key] = item;
  },
  getItem: (key) => myStorage[key],
  removeItem: (key) => {
    delete myStorage[key];
  },
};

class MicroGearEventEmitter extends CMMC_EventEmitter {

}

class MicroGear {
  appid = ''
  appkey = ''
  appsecret = ''
  prefix = ''
  mqtt = {}

  events = MicroGearEventEmitter.instance

  constructor (config) {
    this.appid = config.appid
    this.appkey = config.key
    this.appsecret = config.secret
  }

  static create (config) {
    console.log("config ====>", config)

    return new MicroGear(config);
  }

  subscribe (topic: string) {
    // let topic = `${mqtt.prefix}/#`
    return this.client.subscribe(topic)
  }

  connect (appid) {
    this.appid = appid

    console.log('appid ', this.appid)
    console.log('appkey', this.appkey)
    console.log('appsecret', this.appsecret)

    this.netpie_auth = new CMMC.NetpieAuth({appid: this.appid, appkey: this.appkey, appsecret: this.appsecret});
    this.netpie_auth.events.on("ready", () => {
      this.netpie_auth.getMqttAuth((mqtt) => {
        Object.assign(this.mqtt, mqtt);
        this.prefix = this.mqtt.prefix
        this.client = new Client({
          uri: `ws://${this.mqtt.host}:8083/`, clientId: this.mqtt.client_id, storage: myStorage
        });

        // set event handlers
        this.client.on('connectionLost', (responseObject) => {
          if (responseObject.errorCode !== 0) {
            console.log(responseObject.errorMessage);
          }
          MicroGearEventEmitter.syncEmit("lost", responseObject)
        });

        this.client.on('messageReceived', (message) => {
          MicroGearEventEmitter.syncEmit("message", message)
        });

        this.client.connect({
          cleanSession: true,
          userName: `${mqtt.username}`,
          password: mqtt.password,
          useSSL: false
        }).then((...args) => {
          MicroGearEventEmitter.syncEmit("connected", ...args)
        }).then(() => {
        });


      });
    });

  }

}
module.exports = MicroGear;
