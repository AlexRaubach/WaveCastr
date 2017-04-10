function captureUserMedia(mediaConstraints, successCallback, errorCallback) {
        navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch(errorCallback);
    }
    var mediaConstraints = {
        audio: true
    };
    document.querySelector('#start-recording').onclick = function() {
        this.disabled = true;
        captureUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
    };
    document.querySelector('#stop-recording').onclick = function() {
        this.disabled = true;
        mediaRecorder.stop();
        mediaRecorder.stream.stop();
        document.querySelector('#start-recording').disabled = false;
    };
        // alert('Drop WebM file on Chrome or Firefox. Both can play entire file. VLC player or other players may not work.');

    var mediaRecorder;
    function onMediaSuccess(stream) {
        var audio = document.createElement('audio');
        audio = mergeProps(audio, {
            controls: true,
            muted: true,
            src: URL.createObjectURL(stream)
        });
        audio.play();
        // audiosContainer.appendChild(audio);
        // audiosContainer.appendChild(document.createElement('hr'));
        mediaRecorder = new MediaStreamRecorder(stream);
        mediaRecorder.stream = stream;
        mediaRecorder.recorderType = StereoAudioRecorder;
        mediaRecorder.mimeType = 'audio/wav';
        mediaRecorder.ondataavailable = function(blob) {
            var a = document.createElement('a');
            a.target = '_blank';
            a.innerHTML = 'Open Recorded Audio No. ' + (index++) + ' (Size: ' + bytesToSize(blob.size) + ') Time Length: ' + getTimeLength(timeInterval);
            a.href = URL.createObjectURL(blob);
            localRecording.appendChild(a);
            localRecording.appendChild(document.createElement('hr'));
            this.save();
        };
        var timeInterval = 5000;
        // get blob after specific time interval
        mediaRecorder.start(timeInterval);
        document.querySelector('#stop-recording').disabled = false;
    }
    function onMediaError(e) {
        console.error('media error', e);
    }
    var index = 1;
    // below function via: http://goo.gl/B3ae8c
    function bytesToSize(bytes) {
        var k = 1000;
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0 Bytes';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
    }
    // below function via: http://goo.gl/6QNDcI
    function getTimeLength(milliseconds) {
        var data = new Date(milliseconds);
        return data.getUTCHours() + " hours, " + data.getUTCMinutes() + " minutes and " + data.getUTCSeconds() + " second(s)";
    }
    window.onbeforeunload = function() {
        document.querySelector('#start-recording').disabled = false;
    };
