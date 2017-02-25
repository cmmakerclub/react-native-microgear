/**
 * Created by nat on 2/25/2017 AD.
 */

'use strict';
var {EventEmitter} = require('fbemitter');

let instance = null;

class CMMC_EventEmitter extends EventEmitter {

  static get instance () {
    if (!instance) {
      instance = new CMMC_EventEmitter();
    }
    return instance;
  }

  on (eventName: string, callback: () => void) {
    instance.addListener.call(instance, eventName, callback)
  }

  static syncEmit (eventName: string, metadata: object) {
    CMMC_EventEmitter.emitWrapper(eventName, metadata);
  }

  static emitWrapper (eventName: string, metadata: object) {
    try {
      CMMC_EventEmitter.instance.emit(eventName, metadata);
    } catch (exception) {
      console.log(exception);
    }
  }
}
module.exports = CMMC_EventEmitter;
