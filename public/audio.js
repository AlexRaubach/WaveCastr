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

var microphoneLevel = audioContext.createGain(),
  mixer = audioContext.createGain(),
  input = audioContext.createGain(),
  processor = undefined;      // created on recording

microphoneLevel.gain.value = 1;
microphoneLevel.connect(mixer);
mixer.connect(input);

// obtaining microphone input
function initRecording() {
  if (navigator.mediaDevices) {
    navigator.mediaDevices.getUserMedia({audio: true})
      .then(function (stream) {
        var microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(microphoneLevel);

        App.appearance.perform("update", {status: "ready"});
        App.chat.addMessageToChat("SYSTEM: <i>Audio stream is ready</i>");
        start.disabled = false;
      })
      .catch(function (error) {
        console.log(error);
        App.appearance.perform("update", {status: "error"});
        $('#flash').flash("Sorry, could not get audio input");
      });
  } else {
    App.appearance.perform("update", {status: "error"});
    $('#flash').flash("Sorry, recording features are not supported in your browser.", { class: 'alert' });
    console.log("getUserMedia not supported in your browser!");
  }
}

var defaultBufSz = (function() {
  processor = audioContext.createScriptProcessor(undefined, 2, 2);
  return processor.bufferSize;
})();

// save/delete recording
function saveRecording(blob) {
  console.log("Saving recording...");
  var url = URL.createObjectURL(blob);
  blob.name = "__" + $('#current_user').text() + '__' + new Date().toISOString() + ".wav";

  // Append local copy of recording to page
  var link = document.createElement('a');
  link.style.color = "#C7B185";
  link.href = url;
  link.download = blob.name;
  link.innerHTML = link.download
  $('#localRecording').append(link);
}

// recording process
var worker = new Worker('/EncoderWorker.js')

worker.onmessage = function(event) { saveRecording(event.data.blob); };

function getBuffers(event) {
  var buffers = [];
  for (var ch = 0; ch < 2; ++ch)
    buffers[ch] = event.inputBuffer.getChannelData(ch);
  return buffers;
}

function startRecordingProcess() {
  var bufSz = defaultBufSz;
  processor = audioContext.createScriptProcessor(bufSz, 2, 2);
  input.connect(processor);
  processor.connect(audioContext.destination);
  worker.postMessage({
    command: 'start',
    sampleRate: audioContext.sampleRate,
    numChannels: 2
  });
  processor.onaudioprocess = function(event) {
    worker.postMessage({ command: 'record', buffers: getBuffers(event) });
  };
}

function stopRecordingProcess() {
  input.disconnect();
  processor.disconnect();
  worker.postMessage({ command: 'finish' });
}

// recording buttons interface
function disableControlsOnRecord(disabled) {
  init.disabled = disabled;
  start.disabled = disabled;
}

function startRecording() {
  disableControlsOnRecord(true);
  stopButton.disabled = false;
  startRecordingProcess();
}

function stopRecording() {
  disableControlsOnRecord(false);
  stopRecordingProcess();
}

