let keyMirror = require('key-mirror');
import {AsyncStorage} from 'react-native';

import * as Helper from './Util'
let Util = Helper.Util

const CACHE_KEY = "mg_cached"
class IStorage {
  _storage = {}

  constructor () {

  }

  get (k) {
    Util.log("Call get: ", this)
    return this._storage[k];
  }

  set (k, v) {
    this._storage[k] = v;
  }

  commit () {
  }

}

class MyStorage {
  constructor (name) {

  }

  async setItem (key, value) {
    Util.log("[1] setItem", key, value, new Date().getTime())
    let val = await AsyncStorage.setItem(key, value);
    Util.log("[2] setItem", key, value, new Date().getTime())
    return val
  }

  async getItem (key, func) {
    console.log("[1] GET ITEM", new Date().getTime());
    let val = await AsyncStorage.getItem(key);
    console.log("[2] GET ITEM", new Date().getTime());
    return val;
  }

}

let KEYS = {
  STATE: 0x01,
  OAUTH_REQUEST_TOKEN: 0x02,
  OAUTH_REQUEST_TOKEN_SECRET: 0x03,
  ACCESS_TOKEN: 0x04,
  ACCESS_TOKEN_SECRET: 0x05,
  REVOKE_TOKEN: 0x06,
  ENDPOINT: 0x07,
  FLAG: 0x08,
  APP_KEY: 0x09,
  APP_SECRET: 0x0a,
  VERIFIER: 0x0b,
  APP_ID: 0x0c,
}

let KEYS_MIRRORED = keyMirror(KEYS)

export class CMMC_Storage extends IStorage {
  _storage_driver = null

  static STATE = keyMirror({
    STATE_REQ_TOKEN: null,
    STATE_ACCESS_TOKEN: null,
    STATE_REVOKE_TOKEN: null,
  });

  static KEY_STATE = KEYS_MIRRORED.STATE
  static KEY_OAUTH_REQUEST_TOKEN = KEYS_MIRRORED.OAUTH_REQUEST_TOKEN
  static KEY_OAUTH_REQUEST_TOKEN_SECRET = KEYS_MIRRORED.OAUTH_REQUEST_TOKEN_SECRET
  static KEY_ACCESS_TOKEN = KEYS_MIRRORED.ACCESS_TOKEN
  static KEY_ACCESS_TOKEN_SECRET = KEYS_MIRRORED.ACCESS_TOKEN_SECRET
  static KEY_REVOKE_TOKEN = KEYS_MIRRORED.REVOKE_TOKEN
  static KEY_ENDPOINT = KEYS_MIRRORED.ENDPOINT
  static KEY_FLAG = KEYS_MIRRORED.FLAG
  static KEY_APP_KEY = KEYS_MIRRORED.APP_KEY
  static KEY_APP_SECRET = KEYS_MIRRORED.APP_SECRET
  static KEY_VERIFIER = KEYS_MIRRORED.VERIFIER
  static KEY_APP_ID = KEYS_MIRRORED.APP_ID;

  constructor (name = 'tmp', loaded_fn) {
    super();
    this._storage = {}
    this._storage_driver = new MyStorage(name);
  }

  async load () {
    let loaded = await this._storage_driver.getItem(CACHE_KEY);
    console.log("LOADED = ", loaded);
    this._storage = await JSON.parse(loaded)
    if (this._storage === null) {
      this._storage = {};
      this.commit();
    }
    return this._storage;
  }

  clear() {
    this._storage = {}
    this.commit()
  }

  commit () {
    Util.log("... commit")
    return this._storage_driver.setItem(CACHE_KEY, JSON.stringify(this._storage));
  }
}
