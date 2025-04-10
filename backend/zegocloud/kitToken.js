
const { generateToken04 } = require('./zegoServerAssistant');

const getKitToken = (userId, roomId, publishStream) => {
    const appID = Number(process.env.ZEGOCLOUD_APP_ID); // type: number
    const serverSecret = process.env.ZEGOCLOUD_SERVER_SECRET;// type: 32 byte length string
    
    const effectiveTimeInSeconds = 3600; //type: number; unit: s； token expiration time, unit: seconds
    const payloadObject = {
        room_id: roomId, // Please modify to the user's roomID
        // The token generated in this example allows loginRoom.
        // The token generated in this example does not allow publishStream.
        privilege: {
            1: 1,   // loginRoom: 1 pass , 0 not pass
            2: publishStream    // publishStream: 1 pass , 0 not pass
        },
        stream_id_list: null
    }; // 
    const payload = JSON.stringify(payloadObject);
    // Build token 
    const token = generateToken04(appID, userId, serverSecret, effectiveTimeInSeconds, payload);
    return token;
}

module.exports = {getKitToken};