# react-native-microgear

* `react-native init yourapp`
* `cd yourapp`
* `npm install --save https://github.com/cmmakerclub/react-native-microgear.git`

Code

    import {MicroGear} from 'react-native-microgear'
    const appid = "app-id";



    this.microgear = MicroGear.create({
         key: 'yourkey',
         secret: 'your-secret',
         alias: "alias"
    });
    
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
         // microgear.publish("/gearname/hello", text)
         this.microgear.chat("hello", text)
       }
       else {
         clearInterval(interval)
       }
     }, 500)
    });
   
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
     microgear.connect(appid)
