var recorder;

start.addEventListener( "click", function(){
  App.recorder.perform("receive", {command: 'start'});
});
stopButton.addEventListener( "click", function(){
  App.recorder.perform("receive", {command: 'stop'});
});
init.addEventListener( "click", function(){
  App.recorder.perform("receive", {command: 'init'});
});

var startEvent = new Event('startRecording');
var stopEvent = new Event('stopRecording');
var initEvent = new Event('initRecording');

document.addEventListener('startRecording', function(e) {
  recorder.start();
});
document.addEventListener('stopRecording', function(e) {
  recorder.stop();
});
document.addEventListener('initRecording', function(e) {
  initRecording();
});


function initRecording() {

  if (!Recorder.isRecordingSupported()) {
    return screenLogger("Recording features are not supported in your browser.");
  }

  recorder = new Recorder({
    // Settings like bitrate or sampleRate would go here
    encoderPath: "/recorderjs/encoderWorker.min.js"
  });

  recorder.addEventListener( "start", function(e){
    screenLogger('Recorder is started');
    init.disabled = start.disabled = true;
    stopButton.disabled = false;
  });

  recorder.addEventListener( "stop", function(e){
    screenLogger('Recorder is stopped');
    init.disabled = false;
    stopButton.disabled = start.disabled = true;
  });

  recorder.addEventListener( "streamError", function(e){
    screenLogger('Error encountered: ' + e.error.name );
  });

  recorder.addEventListener( "streamReady", function(e){
    init.disabled = stopButton.disabled = true;
    start.disabled = false;
    screenLogger('Audio stream is ready.');
  });

  recorder.addEventListener( "dataAvailable", function(e){
    var dataBlob = new Blob( [e.detail], { type: 'audio/ogg' } );
    dataBlob.name = "__" + $('#current_user').text() + '__' + new Date().toISOString() + ".ogg";
    var fileName = dataBlob.name;
    var url = URL.createObjectURL( dataBlob );
    var audio = document.createElement('audio');
    audio.controls = true;
    audio.src = url;

    var link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.innerHTML = link.download;

    var li = document.createElement('li');
    li.appendChild(link);
    li.appendChild(audio);

    recordingslist.appendChild(li);

    $('#episode_track').fileupload({
      url: $('.directUpload').data('url'),
      type:            'POST',
      autoUpload:       true,
      formData: $('.directUpload').data('form-data'),
      paramName: 'file',
      dataType: 'XML',
      replaceFileInput: false
    });
    $('#episode_track').fileupload('send', {
      files: [dataBlob],
    })
    .done(function(response){
      var buckObjectUrl = $($(response).children().children()[0]).text();
      buckObjectUrl = buckObjectUrl.match(/\wavecastr(.*)/)[1]

      var newTrackData = {episode_id: episodeId, s3_string: buckObjectUrl };
      $.ajax({
        url: "/tracks",
        method: "POST",
        data: newTrackData
      })
      .done(function(response){
        console.log("successful link save");
      })
      .fail(function(response){
        console.log("failed link save");
      })
    })
  });
  recorder.initStream();
}

function screenLogger(text, data) {
  log.innerHTML += "\n" + text + " " + (data || '');
}
