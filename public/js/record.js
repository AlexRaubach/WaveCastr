var $flashDiv = $('#flash'),
  $spinner = $('.spinner'),
  encoder = $('#encoder').text(),
  timerDiv = document.getElementById('timer'),
  timer = new Timer(timerDiv);

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
  App.chat.addMessageToChat("SYSTEM: <i>Recording has started</i>");
  startRecording();
});
document.addEventListener('stopRecording', function(e) {
  App.chat.addMessageToChat("SYSTEM: <i>Recording has stopped</i>");
  stopRecording();
});
document.addEventListener('initRecording', function(e) {
  initRecording();
});

// URL shim
window.URL = window.URL || window.webkitURL;

// audio context + .createScriptProcessor shim
var audioContext = new AudioContext;
if (audioContext.createScriptProcessor === null)
  audioContext.createScriptProcessor = audioContext.createJavaScriptNode;

var microphone, // created on init
  microphoneLevel = audioContext.createGain(),
  mixer = audioContext.createGain(),
  input = audioContext.createGain(),
  processor = undefined;      // created on recording

// obtaining microphone input
function initRecording() {
  if (navigator.mediaDevices) {
    navigator.mediaDevices.getUserMedia({audio: true})
      .then(function (stream) {
        timer.reset();
        microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(microphoneLevel);

        App.appearance.perform("update", {status: "ready"});
        App.chat.addMessageToChat("SYSTEM: <i>Your audio stream is ready</i>");
        start.disabled = false;
      })
      .catch(function (error) {
        console.log(error);
        App.appearance.perform("update", {status: "error"});
        $flashDiv.flash("Error: " + error.message, { class: 'alert' });
        start.disabled = true;
      });
  } else {
    App.appearance.perform("update", {status: "error"});
    $flashDiv.flash("Sorry, recording features are not supported in your browser.", { class: 'alert' });
    console.log("getUserMedia not supported in your browser!");
  }
}

var defaultBufSz = (function() {
  processor = audioContext.createScriptProcessor(undefined, 2, 2);
  return processor.bufferSize;
})();

// save/delete recording
function saveRecording(blob) {
  var url = URL.createObjectURL(blob);
  blob.name = "__" + $('#current_user').text() + '__' + new Date().toISOString() + "." + encoder;

  // Initialize jQuery file upload
  var $directUpload = $('.directUpload');
  var $episodeTrack = $('#episode_track');

  $episodeTrack.fileupload({
    url: $directUpload.data('url'),
    type:            'POST',
    autoUpload:       true,
    formData: $directUpload.data('form-data'),
    paramName: 'file',
    dataType: 'XML',
    replaceFileInput: false
  });

  $episodeTrack.fileupload('send', {
    files: [blob]
  }).done(function(response){
    var episodeSharableLink = window.location.pathname.replace(/\/episodes\//, '');
    var xmlSerializer = new XMLSerializer();
    var s3String = xmlSerializer.serializeToString(response);
    var newTrackData = { sharable_link: episodeSharableLink, track: { s3_string: s3String } };

    // Save s3 track info to our database
    $.ajax({
      url: "/tracks",
      method: "POST",
      data: newTrackData
    }).done(function(){
      $flashDiv.flash("Your recording was successfully saved.", {
        fadeOut: 2000
      });
      $spinner.hide();
      init.disabled = false;
    }).fail(function(){
      $flashDiv.flash(
        'Sorry, something went wrong.\n\
        A local version of your recording is available under the control panel, \
        which you can send to the host as a back up.',
      {
        class: 'alert'
      });
      displayLocalRecording(blob, url);
    });
  }).fail(function() {
    $flashDiv.flash(
      'Sorry, something went wrong.\n\
      A local version of your recording is available under the control panel, \
      which you can send to the host as a back up.',
      {
        class: 'alert'
      });
    displayLocalRecording(blob, url);
  });
}

function displayLocalRecording(blob, url) {
  var link = document.createElement('a');
  link.style.color = "#C7B185";
  link.href = url;
  link.download = blob.name;
  link.className = 'text-lg';
  link.innerHTML = link.download
  $('#local-recording').html(link);
}

// recording process
var worker = new Worker('/js/EncoderWorker.js')

worker.onmessage = function(event) { saveRecording(event.data.blob); };

function getBuffers(event) {
  var buffers = [];
  for (var ch = 0; ch < 2; ++ch)
    buffers[ch] = event.inputBuffer.getChannelData(ch);
  return buffers;
}

function startRecordingProcess() {
  App.appearance.perform("update", {status: "recording"});
  timer.start();
  var bufSz = defaultBufSz;

  microphoneLevel.gain.value = 1;
  microphoneLevel.connect(mixer);
  mixer.connect(input);

  processor = audioContext.createScriptProcessor(bufSz, 2, 2);
  input.connect(processor);
  processor.connect(audioContext.destination);

  worker.postMessage({
    command: 'start',
    encoder: encoder,
    sampleRate: audioContext.sampleRate,
    numChannels: 2
  });
  processor.onaudioprocess = function(event) {
    worker.postMessage({ command: 'record', buffers: getBuffers(event) });
  };
}

function stopRecordingProcess() {
  App.appearance.perform("update", {status: "stopping"});
  microphone.disconnect();
  microphoneLevel.disconnect();
  mixer.disconnect();
  input.disconnect();
  processor.disconnect();
  worker.postMessage({ command: 'finish' });
}

// recording buttons interface
function disableControlsOnRecord(disabled) {
  init.disabled = disabled;
  start.disabled = disabled;
}

function disableAllControls() {
  init.disabled = true;
  start.disabled = true;
  stopButton.disabled = true;
}

function startRecording() {
  disableControlsOnRecord(true);
  stopButton.disabled = false;
  startRecordingProcess();
}

function stopRecording() {
  timer.stop();
  $spinner.show();
  disableAllControls();
  stopRecordingProcess();
}
