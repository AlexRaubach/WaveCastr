// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var pubnub = new PubNub({
    subscribeKey: "pub-c-d4381d4f-440f-4eef-b35c-5bc6e23b2d78",
    publishKey: "sub-c-d4379b4c-fc95-11e6-ba92-02ee2ddab7fe"
})

var box = PUBNUB.$('box'), input = PUBNUB.$('input'), channel = 'chat';
debugger;