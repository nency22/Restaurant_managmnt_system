const SOUND_KEY = "ww_sound";

let audioContext = null;

export const isSoundOn = () => {
  try {
    return localStorage.getItem(SOUND_KEY) === "on";
  } catch {
    return false;
  }
};

export const setSoundOn = (on) => {
  try {
    localStorage.setItem(SOUND_KEY, on ? "on" : "off");
  } catch {
    return;
  }
};

export const playFlip = () => {
  if (!isSoundOn()) return;
  try {
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) return;
    audioContext = audioContext || new Context();

    const duration = 0.2;
    const buffer = audioContext.createBuffer(1, Math.floor(audioContext.sampleRate * duration), audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / data.length) ** 2;
    }

    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    const filter = audioContext.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 2400;
    filter.Q.value = 0.7;
    const gain = audioContext.createGain();
    gain.gain.value = 0.22;

    source.connect(filter);
    filter.connect(gain);
    gain.connect(audioContext.destination);
    source.start();
  } catch {
    return;
  }
};
