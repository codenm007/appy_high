require("dotenv").config();
const {RtcTokenBuilder,RtcRole} = require('agora-access-token')
// Rtc Examples
const appID = process.env.AGORA_appID;
const appCertificate = process.env.AGORA_appCertificate;

const uid = 0;

const expirationTimeInSeconds = 3600
 
const currentTimestamp = Math.floor(Date.now() / 1000)
 
const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

const role = RtcRole.PUBLISHER;

const agora_access_token = function(channel_name) { 
   const token = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channel_name, uid, role, privilegeExpiredTs);
   console.log("Token" , token);
    return token;
}
// Build token with user account


exports.agora_access_token = agora_access_token;