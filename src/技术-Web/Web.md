

# 多媒体设备（`MediaDevices`）

> MediaDevices 接口提供访问连接媒体输入的设备，如照相机和麦克风，以及屏幕共享等。它可以使你取得任何硬件资源的媒体数据。通过`navigator.mediaDevices`访问

## 媒体选项（`MediaTrackConstraints`）

> [`MediaTrackConstraints`](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints)

音频：

- [`autoGainControl`](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSupportedConstraints/autoGainControl)：是否开启自动增益
- [`channelCount`](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSupportedConstraints/channelCount)：声道数，单声道`0`，双声道`1`
- [`echoCancellation`](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSupportedConstraints/echoCancellation)：是否开启回声消除
- [`latency`](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSupportedConstraints/latency)：声音延迟大小（毫秒）
- [`noiseSuppression`](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSupportedConstraints/noiseSuppression)：是否开启降噪
- [`sampleRate`](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSupportedConstraints/sampleRate)：采样率（如CD采样率为44000samples/s，即44kHz）
- [`sampleSize`](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSupportedConstraints/sampleSize)：采样点大小（如CD采样大小为16bits，即每个样本16bits数据）
- [`volume`](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSupportedConstraints/volume)：音量，范围为`0 ~ 1.0`

视频：

- [`aspectRatio`](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSupportedConstraints/aspectRatio)：画面比例
- [`facingMode`](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSupportedConstraints/facingMode)：指定摄像头，前置（`user`）、后置（`environment`）等。
- [`frameRate`](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSupportedConstraints/frameRate)：帧率
- [`height`](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSupportedConstraints/height)
- [`width`](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSupportedConstraints/width)
- [`resizeMode`]()：指定导出视频轨道分辨率所允许使用的模式，包括`none`, `crop-and-scale`（允许裁剪缩放原始画面）

图片：

- `whiteBalanceMode`：白平衡，可选值`none`, `manual`, `single-shot`, `continuous`
- `exposureMode`：曝光模式，可选值同上
- `focusMode`：聚焦模式，可选值同上
- `pointsOfInterest`：传感器特征点，值为坐标`{ x:value, y:value } `列表
- `exposureCompensation`：曝光补偿，光圈范围为`±3`
- `colorTemperature`：色温，单位为开尔文
- `iso`：感光度
- `brightness`：亮度
- `contrast`：对比度
- `saturation`：饱和度
- `sharpness`：锐度
- `focusDistance`：对焦距离
- `zoom`：焦距
- `torch`：补光灯是否持续点亮

通用选项：

- [`deviceId`](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSupportedConstraints/deviceId)：虚拟设备ID
- [`groupId`](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSupportedConstraints/groupId)：物理设备ID

共享屏幕：

- [`displaySurface`](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/displaySurface)：共享屏幕的类型，可选值`browser`, `window`, `monitor`，或其数组
- [`logicalSurface`](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/logicalSurface)：是否允许用户选择对应的（数组）共享屏幕的不可见部分（如被遮蔽、缓冲区、超出屏幕范围等）
- [`suppressLocalAudioPlayback`](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/suppressLocalAudioPlayback)：捕获选项卡时，选项卡中播放的音频是否将继续通过用户的本地扬声器播放

## 获取客户端支持的输入输出设备列表（`enumerateDevices`）

```typescript
const enumerator: MediaDeviceInfo[] = navigator.mediaDevices.enumerateDevices();
```

## 获取客户端支持的媒体设备选项（`getSupportedConstraints`）

> [`getSupportedConstraints(): MediaTrackSupportedConstraints`](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getSupportedConstraints)，[`MediaTrackSupportedConstraints`](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSupportedConstraints)中的选项可能应用在不同的媒体类型（`audio`、`video`等）。

## 获取多媒体输入（`getUserMedia`）

> [`getUserMedia(MediaStreamConstraints): MediaStream`](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia)，在用户通过提示允许的情况下，打开系统上的相机或屏幕共享和/或麦克风等。

```js
var video = document.querySelector('video');
const constraints = window.constraints = {
  audio: false,
  video: true
};
navigator.mediaDevices.getUserMedia(constraints)
.then(function(stream) {
  var videoTracks = stream.getVideoTracks();
  console.log('Got stream with constraints:', constraints);
  console.log('Using video device: ' + videoTracks[0].label);
  stream.onended = function() {
    console.log('Stream ended');
  };
  window.stream = stream; // make variable available to browser console
  video.srcObject = stream;
}).catch(function(error) {
  if (error.name === 'ConstraintNotSatisfiedError') {
    errorMsg('The resolution ' + constraints.video.width.exact + 'x' +
        constraints.video.width.exact + ' px is not supported by your device.');
  } else if (error.name === 'PermissionDeniedError') {
    errorMsg('Permissions have not been granted to use your camera and ' +
      'microphone, you need to allow the page access to your devices in ' +
      'order for the demo to work.');
  }
  errorMsg('getUserMedia error: ' + error.name, error);
});
```

## 获取多媒体输出（`getDisplayMedia`）

> [`getDisplayMedia(MediaStreamConstraints): MediaStream`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia)，提示用户选择捕获扬声器、显示器或显示器的一部分（例如窗口）等等。

```typescript
const captureStream: MediaStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
```

## 监听输入输出设备的连接或移除（`devicechange`）

```javascript
window.navigator.mediaDevices.addEventListener('devicechange', async e => {
    console.log(Array.from(await e.target.enumerateDevices()))
})
```

## 选择音频输出设备（`selectAudioOutput`）

> `selectAudioOutput(options)`提示用户选择特定的音频输出设备，例如扬声器或耳机，成功时，返回用户选择的设备信息（`MediaDeviceInfo`）。可提供选项`options`供用户选择。

```js
await navigator.mediaDevices.selectAudioOutput({ deviceId: '...' })
```

## 多媒体流（`MediaStream`）

> [多媒体流](https://developer.mozilla.org/zh-CN/docs/Web/API/Media_Capture_and_Streams_API)：
> 一个 [MediaStream](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaStream) 包含零个或更多的 [MediaStreamTrack](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaStreamTrack) 对象，代表着各种的声轨和视频轨。
> 每一个 MediaStreamTrack 可能有一个或更多的通道。这个通道代表着媒体流的最小单元，比如一个音频信号对应着一个对应的扬声器，像是在立体声音轨中的左通道或右通道。

# 在 web 应用程序中使用文件

> [在 web 应用程序中使用文件](https://developer.mozilla.org/zh-CN/docs/Web/API/File_API/Using_files_from_web_applications#example.3a_using_object_urls_to_display_images)
