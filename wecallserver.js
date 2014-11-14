var gcm = require('node-gcm');
var message = new gcm.Message();
var sender = new gcm.Sender('AIzaSyDzgtR66yu2QhKK692VDEyzex2H-Q9ufq4');
var registrationIds = [];
var contacts = [];
var today = Math.floor(Math.random()*contacts.length);

 
message.addData('title','My Game');
message.addData('message','Your turn!!!!');
message.addData('msgcnt','1');
message.collapseKey = 'demo';
message.delayWhileIdle = true;
message.timeToLive = 5;
 
// At least one token is required - each app will register a different token
registrationIds.push('APA91bE4mT62wzMTq97SapcubdDivau32uMxE5tR_dmwxIaXFaGP61wrs4jRQKbSAEswOfkumslbj_-bNAR1_D-DZoc9_iVp-kjOfQ_UxEWFiYeqpyAB9mNH1W2i9EThtLfKhVRvvWrIid7bB5QL-_VFF3q8Mztifg');
//registrationIds.push('APA91bFrj9d0oNFtH5uMEMU23-c8gzNyG9j8ERHyQl7PmiJ20cyhGeX3CLCct9PJWoUC-NDIdj99CH7e9JM5xZ8uX8n2Q_67UywZoEYbjQOhT2JED8k4m1rVK9yW9RBFGI_e7fbvzm_SBxFEzZd4LjXbkz56615oMuQ6R1HeLn_ibdrq3dJ-Bas');
//registrationIds.push('APA91bHspF195O6SVJnEc1R42A9M3SduVZesUYVzmdAZL-EOE3cm448Ywu1lT1RiZsKnkkN6lIDhsb-THBNtg7BPFdsTyvlKi_r45ZEa3uH2h-0fB2jS-sA7TiCpJoZJV2n8Wqm10tAu62nFIu49NPg-b9vHP3rOiVYUZHuuwplSgBXsRXhzzck');

/**
 * Parameters: message-literal, registrationIds-array, No. of retries, callback-function
 */
sender.send(message, registrationIds, 4, function (result) {
    console.log(result);
}); 
