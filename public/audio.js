// manually rewritten from CoffeeScript output
// (see dev-coffee branch for original source)

// navigator.getUserMedia shim
navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

// URL shim
window.URL = window.URL || window.webkitURL;

// audio context + .createScriptProcessor shim
var audioContext = new AudioContext;
if (audioContext.createScriptProcessor == null)
  audioContext.createScriptProcessor = audioContext.createJavaScriptNode;

// elements (jQuery objects)
var $start = $('#start'),
  $stop = $('#stopButton'),
  $init = $('#init');

var microphone = undefined,     // obtained by user click
  microphoneLevel = audioContext.createGain(),
  mixer = audioContext.createGain(),
  input = audioContext.createGain(),
  processor = undefined;      // created on recording

microphoneLevel.gain.value = 1;
microphoneLevel.connect(mixer);
mixer.connect(input);
// mixer.connect(audioContext.destination);

// obtaining microphone input
$init.click(function() {
  if (navigator.mediaDevices)
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
        microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(microphoneLevel);
      })
      .catch(function(error) {
        console.log(error);
        window.alert("Could not get audio input.");
      });
});

// encoding process selector
var encodingProcess = 'separate';       // separate | background | direct

var defaultBufSz = (function() {
  processor = audioContext.createScriptProcessor(undefined, 2, 2);
  return processor.bufferSize;
})();

// save/delete recording
function saveRecording(blob) {
  console.log("Saving recording...");
  var url = URL.createObjectURL(blob);
  blob.name = "__" + $('#current_user').text() + '__' + new Date().toISOString() + ".wav";

  var link = document.createElement('a');
  link.href = url;
  link.download = blob.name;
  link.innerHTML = link.download;
  document.getElementsByClassName('container')[0].appendChild(link);
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
  if (encodingProcess === 'direct') {
    encoder = new WavAudioEncoder(audioContext.sampleRate, 2);
    processor.onaudioprocess = function(event) {
      encoder.encode(getBuffers(event));
    };
  } else {
    worker.postMessage({
      command: 'start',
      process: encodingProcess,
      sampleRate: audioContext.sampleRate,
      numChannels: 2
    });
    processor.onaudioprocess = function(event) {
      worker.postMessage({ command: 'record', buffers: getBuffers(event) });
    };
  }
}

function stopRecordingProcess(finish) {
  input.disconnect();
  processor.disconnect();
  if (encodingProcess === 'direct')
    if (finish)
      saveRecording(encoder.finish());
    else
      encoder.cancel();
  else
    worker.postMessage({ command: finish ? 'finish' : 'cancel' });
}

// recording buttons interface
function disableControlsOnRecord(disabled) {
  //TODO: disable controls on record
}

function startRecording() {
  console.log('Recording started');
  disableControlsOnRecord(true);
  startRecordingProcess();
}

function stopRecording(finish) {
  console.log('Recording ended');
  disableControlsOnRecord(false);
  stopRecordingProcess(finish);
}

$start.click(function() {
  startRecording();
  $stop.attr('disabled', false);
});

$stop.click(function() {
  stopRecording(true);
})
