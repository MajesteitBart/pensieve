import { RecordingConfig } from "../../types";

const createScreenRecorder = async (config: RecordingConfig) => {
  if (!config.screen) return null;

  const displayMedia = await navigator.mediaDevices.getUserMedia({
    audio: {
      // @ts-ignore
      mandatory: {
        chromeMediaSource: "desktop",
        chromeMediaSourceId: config.screen.id,
        sampleRate: 48000,
        sampleSize: 16,
        channelCount: 2,
      },
    },
    video: {
      // @ts-ignore
      mandatory: {
        chromeMediaSource: "desktop",
        chromeMediaSourceId: config.screen.id,
        minWidth: 1280,
        maxWidth: 1280,
        minHeight: 720,
        maxHeight: 720,
        maxFrameRate: 1,
      },
    },
  });
  displayMedia.getVideoTracks().forEach((t) => displayMedia.removeTrack(t));
  const screen = new MediaRecorder(displayMedia, {
    mimeType: "audio/webm",
  });
  screen.start();
  return screen;
};

const createMicRecorder = async (config: RecordingConfig) => {
  if (!config.mic) return null;
  const mic = new MediaRecorder(
    await navigator.mediaDevices.getUserMedia({ audio: true }),
    {
      mimeType: "audio/webm",
    },
  );
  mic.start();
  return mic;
};

export const createRecorder = async (config: RecordingConfig) => {
  const screen = await createScreenRecorder(config);
  const mic = await createMicRecorder(config);
  return { screen, mic };
};
