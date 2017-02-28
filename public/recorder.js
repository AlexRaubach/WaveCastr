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
        encoderPath: "/encoderWorker.min.js"
      });

      recorder.addEventListener( "start", function(e){
        screenLogger('Recorder is started');
        init.disabled = start.disabled = true;
        stopButton.disabled = false;
      });

      recorder.addEventListener( "stop", function(e){
        screenLogger('Recorder is stopped');
        init.disabled = false;
        resume.disabled = stopButton.disabled = start.disabled = true;
      });

      recorder.addEventListener( "pause", function(e){
        screenLogger('Recorder is paused');
        init.disabled = start.disabled = true;
        resume.disabled = stopButton.disabled = false;
      });

      recorder.addEventListener( "resume", function(e){
        screenLogger('Recorder is resuming');
        init.disabled = start.disabled = true;
        pause.disabled = stopButton.disabled = false;
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
          console.log(buckObjectUrl);
          console.log(episodeId);

          var newTrackData = {episode_id: episodeId, s3_string: buckObjectUrl };
          console.log(newTrackData);
          $.ajax({
            url: "/tracks",
            method: "POST",
            data: newTrackData
          })
          .done(function(response){
            console.log("success");
          })
          .fail(function(response){
            console.log("fail");
          })
        })
      });
      recorder.initStream();
    }

    function screenLogger(text, data) {
      log.innerHTML += "\n" + text + " " + (data || '');
    }
