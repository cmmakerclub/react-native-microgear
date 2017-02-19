let keyMirror = require('key-mirror');
import {AsyncStorage} from 'react-native';


class IStorage {
  _storage = {}

  constructor () {
    // this._storage.prototype.toString = () => {
    //   return JSON.stringify(this)
    // }
  }

  get (k) {
    return this._storage[k];
  }

  set (k, v) {
    console.log(`${"CALL SET: "} ${k} => ${v}`)
    this._storage[k] = v;
  }

  commit () {
  }

}

class MyStorage {
  async setItem (key, value) {
    let val = await AsyncStorage.setItem(key, value);
    return val
  }

  async getItem (key, func) {
    let val = await AsyncStorage.getItem(key);
    return val;
  }

}

export class CMMC_Storage extends IStorage {
  _storage_driver = null
  _storage = {}

  static STATE = keyMirror({
    STATE_REQ_TOKEN: null,
    STATE_ACCESS_TOKEN: null,
  });

  static KEY_STATE = 0x01
  static KEY_OAUTH_REQUEST_TOKEN = 0x02
  static KEY_OAUTH_REQUEST_TOKEN_SECRET = 0x03
  static KEY_ACCESS_TOKEN = 0x04
  static KEY_ACCESS_TOKEN_SECRET = 0x05
  static KEY_REVOKE_TOKEN = 0x06
  static KEY_ENDPOINT = 0x07
  static KEY_FLAG = 0x08
  static KEY_APP_KEY = 0x09
  static KEY_APP_SECRET = 0x0a
  static KEY_VERIFIER = 0x0b

  constructor (name = 'tmp', open_now = true) {
    super();
    // this._storage_driver = new localStorage('./' + name);
    this._storage_driver = new MyStorage()
    this.load();
  }

  async load () {
    let loaded = await this._storage_driver.getItem("mg_cached");
    this._storage = JSON.parse(loaded)
    if (this._storage == null) {
      this._storage = {};
    }
  }

  async commit () {
    super.commit();
    await this._storage_driver.setItem("mg_cached", JSON.stringify(this._storage));
    // console.log(`OBJECT: ${JSON.stringify(this._storage)}`)
    // console.log(`${"COMMIT LOOOP: "}`)
    // this._storage.forEach((k, v) => {
    //   console.log(`k: ${k}, v: ${v}`)
    // });
    //
    // for (let obj of this._storage) {
    //   console.log("=>", obj);
    // }
  }
}
