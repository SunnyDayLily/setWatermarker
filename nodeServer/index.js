console.log('haha')
//ffmpeg 操作类
const ffmpeg = require('ffmpeg')

function getVideoTotalDuration(videoPath) {
  var process = new ffmpeg(videoPath)
  return process.then(function (video) {
    console.log('dddd',video)
      console.log('getVideoTotalDuration,seconds:' + video.metadata.duration.seconds)
      return video.metadata.duration.seconds || 0
  }, function (err) {
      console.log('getVideoTotalDuration,err:' + err.message)
      return -1
  })
}

//获取视频缩略图
function getVideoSceenshots(videoPath, outPutPath, frameRate, frameCount){
  const process = new ffmpeg(videoPath);
  return process.then(function (video) {
    console.log('dddd',video)
      video.fnExtractFrameToJPG(outPutPath, {
          frame_rate : frameRate,
          number : frameCount,
          file_name : 'my_frame_%t_%s'
      }, function (error, files) {
          if (!error)
              console.log('Frames: ' + files)
      })
  }, function (err) {
      console.log('Error: ' + err)
  })
}

//设置水印
function setWaterMarker(){
  const process = new ffmpeg(videoPath);
  return process.then(function(video){
    var name = video.metadata.filename.split('/').pop().split('.')[0];
    video.setWatermark('./input/logo.png',{
      margin_sud:'10',
      margin_west:'10'
    }).setVideoSize("1080x1960").save('./output/'+name+'_'+new Date().getTime()+'.mp4', function (error, file) {
      if (!error)
        console.log('Video file: ' + file);
    });
  },function(error,files){
    console.log(error)
  })
}

//测试方法
function testFfmpeg(videoPath){
  try {
		var process = new ffmpeg(videoPath);
		process.then(function (video) {

      console.log('成功了')
     // console.log(video)
			video
			.setVideoSize('640x?', true, true, '#fff')
			.setAudioCodec('libfaac')
			.setAudioChannels(2)
			.save('/output/your_movie.avi', function (error, file) {
				if (!error)
					console.log('Video file: ' + file);
			});

		}, function (err) {
			console.log('Error: ' + err);
		});
	} catch (e) {
		console.log(e.code);
		console.log(e.msg);
	}
}

var videoPath = './input/DJS.mp4'
var outputPath = './output/'
// getVideoTotalDuration(videoPath).then(function (seconds){
//   console.log(seconds)
// },function(err){
//   console.log('dddd'+err)
// })
setWaterMarker()
//getVideoSceenshots(videoPath,outputPath,3,6)
//testFfmpeg(videoPath)