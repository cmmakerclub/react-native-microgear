/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';


import {MicroGear} from 'react-native-microgear'
const appid = "Goose";

let thermo = require("./thermometer.png");

export default class netpie_demo extends Component {
  constructor () {
    super();

    this.microgear = MicroGear.create({
      key: 'rO8JeDs3SGALNQI',
      secret: 'X78Z18tX09vDI44fErSlKqmix',
      alias: "alias"
    });

    this.state = {
      temp: 0,
      height: 405,
      marginTop: 0,
      color: 'cornflowerblue'
    }

  }

  setTemp (c: number) {
    let resultHeightPx = (405 * c) / 100;
    let resultMarginTop = 405 - resultHeightPx + 30;
    this.setState({temp: c, height: resultHeightPx, marginTop: resultMarginTop});
  }

  componentWillMount () {
    this.microgear.on("connected", (...args) => {
      console.log(">>> on connected...", ...args)
      let counter = 0
      this.microgear.subscribe("/gearname/#").then(() => {
        console.log('subscribe..')
      });

      let interval = setInterval(() => {
        let text = `${++counter} ok: ${new Date().getTime()}`
        console.log("publishing..", text);
        if (this.microgear.isConnected()) {
          let random = (Math.round(Math.random() * 100) % 100)
          // microgear.publish("/gearname/hello", text)
          this.microgear.chat("temp", `${random}`);
        }
        else {
          clearInterval(interval)
        }
      }, 2000)
    });

    this.microgear.on("message", (message) => {
      console.log(`topic: ${message.destinationName}, payload: ${message.payloadString}`);
      this.setTemp(parseFloat(message.payloadString))
    });

    this.microgear.on("disconnected", () => {
      console.log("Disconnected...")
      setTimeout(() => {
        this.microgear.connect(appid)
      }, 2000)
    })
  }

  componentDidMount () {
    this.setTemp(30)
    this.microgear.connect(appid)
  }


  render () {
    return (
      <View style={styles.container}>
        <View style={styles.contentLeft}>
          <Image source={ thermo } style={styles.thermo}>
            <View style={[styles.heightTemp, {marginTop: this.state.marginTop}, {height: this.state.height}]}></View>
            <View style={styles.defaultTemp}></View>
          </Image>
        </View>
        <View style={styles.contentRight}>
          <Text style={styles.dataTemp}>{this.state.temp} &#176;C</Text>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'mistyrose',
    // borderColor: 'red',
    // borderWidth: 4
  },
  contentLeft: {
    // flex: 1,
    // borderColor: 'blue',
    // borderWidth: 4
    marginLeft: 30
  },
  contentRight: {
    flex: 1,
    alignItems: 'center',
    // borderColor: 'green',
    // borderWidth: 4
  },
  thermo: {},
  dataTemp: {
    fontSize: 80,
    fontWeight: '100'
    // borderColor: 'green',
    // borderWidth: 4
  },
  heightTemp: {
    // marginTop: 30,
    marginLeft: 45,
    // borderColor: 'yellow',
    // borderWidth: 3,
    // height: 375,
    width: 20,
    backgroundColor: 'cornflowerblue',
    position: 'absolute',
    borderRadius: 10
  },
  defaultTemp: {
    // flex: 1,
    borderColor: 'cornflowerblue',
    borderWidth: 4,
    marginTop: 424,
    marginLeft: 33,
    width: 44,
    height: 44,
    borderRadius: 50,
    backgroundColor: 'cornflowerblue'
  }
});


AppRegistry.registerComponent('netpie_demo', () => netpie_demo);
