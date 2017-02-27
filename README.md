# react-native-microgear


* `react-native init yourapp`
* `cd yourapp`
* `npm install --save https://github.com/cmmakerclub/react-native-microgear.git`


<img src="https://lh3.googleusercontent.com/2l-jZl9sKx81ZYdiBeBKM284Fe0Vu7q9zHJOX2iNQUODqCD1G86q8GkQwuIeoAjfHGcOOtMa-ychcGlMciR4micS-obvkQOE-0b80dXaXpEuvPZ9dcpPrvo_Zy_5fjkABxPuNCgAcMXNE74l2LKs7ELHbBFpu5bp-7EOkwyCLjuTXnvW3opL1IyB_5DIE1JoHRq7EUnd3zNuzfAkDfPIIS2X6TAQwxCNrr045X4UrTGB3sO0p1tlk1bEshPD0uOod2CNeg9rq_zRwuxmeOlEvUa3e31tzrcHC65dPt6Dlqj6gDUq-txAxHnxnUdUhHU6r_-vjqdjPB7cxo021RvcnYvTH47uru5gUOVoE2eGq3YscjDpswFypuzZXlr19qOaJP9MMKAPQETaJBgN3ojov0LC6VEO4YVqLi99wOnqVX6Z1w959o_p-a1CFfmSohpurV5EiBfbF3jEBIzs_7lmN9QONopKV3NRk9LWzXK3jJGj-V9U5sNziT6dgpA_ELsoCskOzqieSGJPtl3MP2YfqnC3OrrLpLXEFCpCrrYmpziC2qCRsqtjnVogU68L8ML4L68WUs_7cQTGA-Nom8azhmDXWHRfJzNyqGURqWXxqyMOwt_woE4IrHwvni7tDG4l4_TO0I-ajnt21kQ9npdv9zaPMna2O_eorDi0W8eHQms=w375-h689-no" width="240">


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
   
