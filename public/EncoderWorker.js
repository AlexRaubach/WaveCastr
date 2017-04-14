importScripts('WavAudioEncoder.js');
importScripts('Mp3LameEncoder.min.js');

var buffers, encoder;

self.onmessage = function(event) {
  var data = event.data;
  switch (data.command) {
    case 'start':
      encoder = data.encoder === 'mp3' ?
        new Mp3LameEncoder(data.sampleRate, 128) :
        new WavAudioEncoder(data.sampleRate, data.numChannels);
      buffers = [];
      break;
    case 'record':
      buffers.push(data.buffers);
      break;
    case 'finish':
      while (buffers.length > 0)
        encoder.encode(buffers.shift());
      self.postMessage({ blob: encoder.finish() });
      encoder = undefined;
  }
}

