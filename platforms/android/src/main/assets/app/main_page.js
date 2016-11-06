var createViewModel = require("./main-view-model").createViewModel;
var view = require("ui/core/view");
var application = require('application');
var ActivityCompat = application.android.context;

var frame = require('ui/frame');

var LocalMedia = com.twilio.video.LocalMedia;
var CameraCapturer = com.twilio.video.CameraCapturer;
var VideoView = com.twilio.video.VideoView;

function onNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = createViewModel();

    

    // console.dir(page);

    var pHolder = view.getViewById(page, "video_view");
    var name = view.getViewById(page, "name");

    var localMedia = LocalMedia.create(application.android.currentContext);
    
    var localAudioTrack = localMedia.addAudioTrack(true);

    var cameraCapturer = new CameraCapturer(application.android.currentContext, CameraCapturer.CameraSource.FRONT_CAMERA, null);

    var localVideoTrack = localMedia.addVideoTrack(true, cameraCapturer); // make sure you have camera permissions at this point or it will crash

    var inflator = application.android.currentContext.getLayoutInflater();

    var layout = android.R.layout;

    


    var v = inflator.inflate()

    // console.dir(v);
    
    // var rootView = inflator.inflate();
    
    
    // console.dir(inflator);

    // console.dir(localVideoTrack);

    // var pHolder = view.getViewById(page, 'video_view');

    // console.dir(args);

    // var primaryVideoView = VideoView();

    // console.dir(primaryVideoView);


    // var viewID = android.view.View.generateViewId();

    // console.dir(VideoView);

    // localVideoTrack.addRenderer(viddds);
}


function createCamera(args) { 

    // console.dir(ActivityCompat.getResources().getXml());
    
    // var localMedia = LocalMedia.create(application.android.currentContext);
    
    // var localAudioTrack = localMedia.addAudioTrack(true);

    // var cameraCapturer = new CameraCapturer(application.android.currentContext, CameraCapturer.CameraSource.FRONT_CAMERA, null);

    // var localVideoTrack = localMedia.addVideoTrack(true, cameraCapturer); // make sure you have camera permissions at this point or it will crash

    // var file = 'main-page.xml';

    // var viewID = android.view.View.generateViewId();

    // // console.dir(android.R.layout.file);

    // // console.dir(android.R.layout);

    // var inflator = application.android.currentContext.getLayoutInflater();

    
    // var view = inflator.inflate(file, null);




    // console.dir(android.R.xml('main-page.xml'));

    // console.dir(view.getViewById(args,'video_view'));
    // console.dir(ActivityCompat.getApplicationContext());

    // console.log(args.context.findViewById(viewID));

    // console.dir(view);

    //console.dir(android.R.id);
    // console.dir(android.view);

    // var videoView = android.view.View.findViewById(android.R.id.viewID);

    // console.dir(videoView);


    
    // console.dir(VideoView.generateViewId());
    // console.log(args.object.parent.getViewById('local'));
     
    // localVideoTrack.addRenderer(args.context.findViewById(viewID));

  
}

exports.createCamera = createCamera;
exports.onNavigatingTo = onNavigatingTo;






// this.primaryVideoView = view.getViewById('local');
// console.log(this.localVideoTrack);
// console.dir(this.localVideoTrack);
// console.dir(this.primaryVideoView);
// this.primaryVideoView.setMirror(true);
// this.localAudioTrack.addRenderer(this.primaryVideoView);

// this.localVideoView = this.primaryVideoView;