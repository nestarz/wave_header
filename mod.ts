export const addWaveHeader = (
  pcmData: Int16Array,
  channels: number,
  sampleRate: number,
  bitsPerSample: number
): Uint8Array => {
  const bytesPerSample = bitsPerSample / 8;
  const dataSize = pcmData.length * bytesPerSample;
  const fileSize = dataSize + 44;
  const output = new Uint8Array(fileSize);
  [
    ["RIFF", 32],
    [fileSize - 8, 32],
    ["WAVE", 32],
    ["fmt ", 32],
    [16, 32],
    [1, 16],
    [channels, 16],
    [sampleRate, 32],
    [sampleRate * channels * bytesPerSample, 32],
    [channels * bytesPerSample, 16],
    [bytesPerSample * 8, 16],
    ["data", 32],
    [dataSize, 32],
  ].reduce((offset: number, [value, n]: any) => {
    const array =
      typeof value === "string"
        ? new TextEncoder().encode(value)
        : new Uint8Array(
            [...Array(n / 8).keys()].map((i) => (value >> (i * 8)) & 0xff)
          );
    output.set(array, offset);
    return offset + array.byteLength;
  }, 0);

  output.set(new Int8Array(pcmData.buffer), 44);
  return output;
};
