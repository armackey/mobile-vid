var perm = {};
var application = require('application');

function permissionGranted(perm) {
  
  var hasPermission = android.os.Build.VERSION.SDK_INT < 23;
  
  if (!hasPermission) {
    hasPermission = android.content.pm.PackageManager.PERMISSION_GRANTED ==
    android.support.v4.content.ContextCompat.checkSelfPermission(application.android.startActivity.getApplicationContext(), perm);
  }
  
  return hasPermission;
}

exports.requestPermission = function(perm, requestCode) {

  return new Promise(function (resolve) {
    if (!permissionGranted(perm)) {  
      android.support.v4.app.ActivityCompat.requestPermissions(
          application.android.currentContext,
          [perm],
          requestCode);
       
      
      resolve();
    }
  });
};



