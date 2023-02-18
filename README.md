```ts
import { addWaveHeader } from "https://deno.land/x/wave_header";

function generateNoise(samples: number) {
  const data = new Int16Array(samples);
  for (let i = 0; i < samples; i++) {
    data[i] = Math.floor(Math.random() * 65536) - 32768;
  }
  return data;
}

const sampleRate = 8000;
const duration = 2; // seconds
const numSamples = sampleRate * duration;
const channels = 1;
const bitsPerSample = 16; // 16-bit depth
const pcmData = generateNoise(numSamples);
const wavData = addWavHeader(pcmData, channels, sampleRate, bitsPerSample);
Deno.writeFileSync("random_noise.wav", wavData);
```