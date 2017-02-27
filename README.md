# react-native-microgear


# example application
*  git clone https://github.com/cmmakerclub/react-native-microgear
* `cd react-native-microgear/examples/netpie_demo`
* `npm install`
* `react-native run-ios`

# your own application

* `react-native init yourapp`
* `cd yourapp`
* `npm install --save https://github.com/cmmakerclub/react-native-microgear.git`


<img src="https://lh3.googleusercontent.com/IY93JnBMaPAu8iL0yoIJjMKc77eSEpbp8eRAeBYaWYqS_xbEEkbmeAh-j_tavhSVy7ULxzSTqmBUSWQue8SdggnsrmgsyQLbb2cKSo5hMw419fa5M2T008qtfkLUNDsJdNc0kN9KXeVdqU2obTp0d1Qwx4MRmV5VDy0rhsCbQdl2_1bgMGA8I-TRu5LptOl7Bxh8GgYtnFZkZJNA9s_WaV6DfqqQyV5DHXb6zntBL6y82FyJ9SVlDyG91vrBJnoQAo_6q70dvg1WkYO_pFgYMwsVG3GeXL5QchWRtDyimJ2z5wtL86-J5fJ5ZxGis7WTt_N7PYwSEMVfXNIVOHognE1oPdSoJGV79H3Uy07aaTed9h1YpSdOdGYmRrbBfxp5jXFCchtPwaez9BtbHBl9oAngIWQQLagQZm8IdlVQ6TsWbCphmbBVE4aTw6MEWS8dWzZEtP4fddmA8gw-29VZtSCUQr4ZsemV71bIc1RXI7hn8f61GMDClr3xvW2qHVo3t6ylY1rXVsx4CdMsW1vjhWK-1QmYdNw3hJhEHooRisIIeM09JNGdjwmzAFtHfJBnye5zgqImJ4oPyyPPgMTxws5CZtR2V0Y0YQzXnuxS1Bc6IUCWIlqriesn2DvXet8edondYSj1cLSiaEoAmZCP2muKhYse3DmzcomlW3agB9U=w375-h689-no" width="240">


# Code

## import

    import {MicroGear} from 'react-native-microgear'

## initialize

    const appid = "app-id";
    this.microgear = MicroGear.create({
         key: 'yourkey',
         secret: 'your-secret',
         alias: "alias"
    });

## event listeners
    
    this.microgear.on("connected", (...args) => {
     console.log(">>> on connected...", ...args)

    this.microgear.on("message", (message) => {
     console.log(`topic: ${message.destinationName}, payload: ${message.payloadString}`);
     //this.setState({text: message.payloadString})
    });
   
     this.microgear.on("disconnected", () => {
       console.log("Disconnected...")
       setTimeout(() => {
         microgear.connect(appid)
       }, 2000)
     })

## connect

     microgear.connect(appid)
     
## subscribe


     this.microgear.subscribe("/gearname/#").then(() => {
       console.log('subscribe..')
     });
     
## publish

     let counter = 0
     let interval = setInterval(() => {
       let text = `${++counter} ok: ${new Date().getTime()}`
       console.log("publishing..", text);
       if (this.microgear.isConnected()) {
         // microgear.publish("/gearname/hello", text)
         this.microgear.chat("hello", text)
       }
       else {
         clearInterval(interval)
       }
     }, 500)
    });
   
