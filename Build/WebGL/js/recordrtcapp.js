// const mine = async () => {
  // let stream = await navigator.mediaDevices.getUserMedia({video: false, audio: true});
  // let recorder = new RecordRTCPromisesHandler(stream, {
  //     type: 'audio'
  // });
//   recorder.startRecording();
  
//   const sleep = m => new Promise(r => setTimeout(r, m));
//   await sleep(3000);
  
//   await recorder.stopRecording();
//   let blob = await recorder.getBlob();
//   invokeSaveAsDialog(blob);
// }

// mine();

let stream = null;
let recorder = null;

const recordStart = async () => {
  stream = await navigator.mediaDevices.getUserMedia({video: false, audio: true});
  recorder = new RecordRTCPromisesHandler(stream, {
      type: 'audio',
      mimeType: 'audio/webm'
  });
  recorder.startRecording();
}

const recordStop = async () => {
  await recorder.stopRecording();
  let blob = await recorder.getBlob();
  console.log(blob);
  invokeSaveAsDialog(blob);
}