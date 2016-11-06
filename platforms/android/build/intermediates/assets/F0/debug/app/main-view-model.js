var Observable = require("data/observable").Observable;
var application = require('application');
var view = require("ui/core/view");
var perm = require('./perm');

var AccessManager = com.twilio.common.AccessManager;
var ActivityCompat = application.android.context;
var ContextCompat = android.support.v4.content.ContextCompat;
var PackageManager = android.content.pm.PackageManager;
var Manifest = android.Manifest;
var AppCompatActivity = android.support.v7.app.AppCompatActivity;

var AudioTrack = com.twilio.video.AudioTrack;
var CameraCapturer = com.twilio.video.CameraCapturer;
var CameraSource = com.twilio.video.CameraCapturer.CameraSource;
var ConnectOptions = com.twilio.video.ConnectOptions;
var LocalAudioTrack = com.twilio.video.LocalAudioTrack;
var LocalMedia = com.twilio.video.LocalMedia;
var LocalVideoTrack = com.twilio.video.LocalVideoTrack;
var Media = com.twilio.video.Media;
var Participant = com.twilio.video.Participant;
var Room = com.twilio.video.Room;
var VideoClient = com.twilio.video.VideoClient;
var VideoException = com.twilio.video.VideoException;
var VideoTrack = com.twilio.video.VideoTrack;
var VideoView = com.twilio.video.VideoView;
var handleAMListener = {};
var handleRoomListener = {};

var code = 5;

var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2EyYjE2OGFlNDA3ODRlZmJkNWRlMTVlMGJlZjhjNzMxLTE0Nzc4MTI1ODYiLCJuYmYiOjE0Nzc4MTI1ODYsImdyYW50cyI6eyJpZGVudGl0eSI6InRva2VuIiwicnRjIjp7ImNvbmZpZ3VyYXRpb25fcHJvZmlsZV9zaWQiOiJWU2Q2YmYzM2FmZGJjZDI1MmZkYjI5NWE3ZTRmMDhhNTZlIn19LCJpYXQiOjE0Nzc4MTI1ODYsImV4cCI6MTQ3NzgxNjE4NiwiaXNzIjoiU0thMmIxNjhhZTQwNzg0ZWZiZDVkZTE1ZTBiZWY4YzczMSIsInN1YiI6IkFDOTYxYWYzM2JlMmQyNjliM2UzNjU4YjYyZTVlNWQ1NTgifQ.wqlroDs4EqzDqXoDYmR1dVQo_F6Urc1KpLuO_xa66Kg";
var room;

var VideoActivity = AppCompatActivity.extend(function() {
  this.room;
  this.videoClient;
  this.primaryVideoView;
  this.TWILIO_ACCESS_TOKEN;
  this.accessManager;
  this.cameraCapturer;
  this.localMedia;
  this.localAudioTrack;
  this.localVideoTrack;
  this.localVideoView;
});


VideoActivity.prototype.destroyCall = function() {
    
  if (this.localMedia !== null) {
    this.localMedia.release();
    this.localMedia = null;
  }


  if (this.accessManager !== null) {
    this.accessManager.dispose();
    this.accessManager = null;
  }

};


VideoActivity.prototype.createLocalMedia = function() {


  

  this.localMedia = LocalMedia.create(application.android.currentContext);
  this.localAudioTrack = this.localMedia.addAudioTrack(true);

  this.cameraCapturer = new CameraCapturer(application.android.currentContext, CameraCapturer.CameraSource.FRONT_CAMERA, null);
  // console.dir(this.localMedia.addVideoTrack());
  // console.dir(this.localMedia);

  this.localVideoTrack = this.localMedia.addVideoTrack(true, this.cameraCapturer); // make sure you have camera permissions at this point or it will crash
  
  // this.localVideoTrack.addRenderer(view);
  
  // console.dir(this.primaryVideoView);

  // this.primaryVideoView = view.getViewById('local');
  // console.log(this.localVideoTrack);
  // console.dir(this.localVideoTrack);
  // console.dir(this.primaryVideoView);
  // this.primaryVideoView.setMirror(true);
  // this.localAudioTrack.addRenderer(this.primaryVideoView);

  // this.localVideoView = this.primaryVideoView;

};


VideoActivity.prototype.connectToRoom = function() {

  var connectOptions = new ConnectOptions.Builder()
    .roomName(roomName)
    .localMedia(this.localMedia)
    .build();

  this.room = this.videoClient.connect(connectOptions, this.roomListener());

};

VideoActivity.prototype.accessManagerListener = function() {
  return new AccessManager.Listener(handleAMListener);
};

handleAMListener.onTokenExpired = function(arg) {
  console.log('onTokenExpired');
  console.log(arg);
};

handleAMListener.onTokenUpdated = function(arg) {
  console.log('onTokenUpdated');
  console.log(arg);
};


handleAMListener.onError = function(arg) {
  console.log('onError');
  console.log(arg);
};


VideoActivity.prototype.createVideoClient = function() {
  
  this.accessManager = new AccessManager(ActivityCompat, token, this.accessManagerListener());
  this.videoClient = new VideoClient(ActivityCompat, this.accessManager);
    
};

var vid = new VideoActivity();

// vid.createVideoClient();
// vid.createLocalMedia();

perm.requestPermission(Manifest.permission.MODIFY_AUDIO_SETTINGS, code).then(function(){
  perm.requestPermission(Manifest.permission.ACCESS_NETWORK_STATE, code).then(function(){
    perm.requestPermission(Manifest.permission.ACCESS_WIFI_STATE, code).then(function(){      
    });
  });
});

perm.requestPermission(Manifest.permission.CAMERA, code).then(function(){
  perm.requestPermission(Manifest.permission.RECORD_AUDIO, code).then(function(){      
  });
});



VideoActivity.prototype.roomListener = function() {
  return new Room.Listener(handleRoomListener);
};

handleRoomListener.onConnected = function(room) {
  console.log('onConnected');
  console.log(room);

  for (var participantIndex = 0; participantIndex < room.entry.length; participantIndex+=1) {

    addParticipant(room.entry[participantIndex].getValue());  

  }
  
};

handleRoomListener.onConnectFailure = function(room) {
  console.log('onConnectFailure');
  console.log(room);
};


handleRoomListener.onDisconnected = function(room) {
  console.log('onDisconnected');
  console.log(room);
  this.room = null;
};


handleRoomListener.onParticipantConnected = function(participant) {
  console.log('onParticipantConnected');
  addParticipant(participant);
};

handleRoomListener.onParticipantDisconnected = function(participant) {
  console.log('onParticipantDisconnected');
};


function addParticipant(participant) {
  // render remote video view
  participant.getMedia().setListener(mediaListener());
}


function getMessage(counter) {
  if (counter <= 0) {
    return "Hoorraaay! You unlocked the NativeScript clicker achievement!";
  } else {
    return counter + " taps left";
  }
}

function createViewModel(args) {
  // console.dir(vid);
  vid.createLocalMedia(args);
  // return vid;
}



exports.createViewModel = createViewModel;





