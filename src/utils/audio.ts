let ctx: AudioContext | null = null;

export function initAudio() {
  if (!ctx) {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContext) {
      ctx = new AudioContext();
    }
  }
}

function play(freq: number, duration: number, type: OscillatorType = 'square', vol: number = 0.05) {
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(vol, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

export const sounds = {
  move: () => play(600, 0.02, 'square', 0.02),
  openFolder: () => play(800, 0.05, 'square', 0.03),
  openFile: () => play(1000, 0.05, 'sine', 0.03),
  back: () => play(400, 0.04, 'square', 0.03),
  error: () => play(150, 0.15, 'sawtooth', 0.05),
};
