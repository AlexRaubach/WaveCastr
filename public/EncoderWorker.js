importScripts('WavAudioEncoder.js');

var buffers, encoder;

self.onmessage = function(event) {
  var data = event.data;
  switch (data.command) {
    case 'start':
      encoder = new WavAudioEncoder(data.sampleRate, data.numChannels);
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

