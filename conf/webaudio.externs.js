var noop = function() {};
window.AudioContext = function() {};

var AudioContext = window.AudioContext;
AudioContext.prototype.createBuffer = function(a, b, sampleRate) {
  return new AudioBuffer();
};
AudioContext.prototype.decodeAudioData = function(audioData, successCallback, errorCallback) {};
AudioContext.prototype.createBufferSource = function() {
  return new AudioBufferSourceNode();
};
AudioContext.prototype.createJavaScriptNode = function(bufferSize, numberOfInputs, numberOfOuputs) {
  return new JavaScriptAudioNode();
};
AudioContext.prototype.createScriptProcessor = function() {
  return new ScriptProcessorNode();
};
AudioContext.prototype.createAnalyser = function() {
  return new RealtimeAnalyserNode();
};
AudioContext.prototype.createGainNode = function() {
  return new AudioGainNode();
};
AudioContext.prototype.createDelayNode = function(maxDelayTime) {
  return new DelayNode();
};
AudioContext.prototype.createBiquadFilter = function() {
  return new BiquadFilterNode();
};
AudioContext.prototype.createOscillator = function() {
  return new OscillatorNode();
};
AudioContext.prototype.createWaveShaper = function() {
  return new WaveShaperNode();
};
AudioContext.prototype.createPanner = function() {
  return new AudioPannerNode();
};
AudioContext.prototype.createConvolver = function() {
  return new ConvolverNode();
};
AudioContext.prototype.createChannelSplitter = function() {
  return new AudioChannelSplitter();
};
AudioContext.prototype.createChannelMerger = function() {
  return new AudioChannelMerger();
};
AudioContext.prototype.createDynamicsCompressor = function() {
  return new DynamicsCompressorNode();
};

var AudioNode = function() {};
AudioNode.prototype.connect = function(destination, output, input) {};
AudioNode.prototype.disconnect = function(output) {};
AudioNode.prototype.context = new AudioContext();
AudioNode.prototype.numberOfInputs;
AudioNode.prototype.numberOfOutputs;

var AudioSourceNode = function() {};
AudioSourceNode.prototype = new AudioNode();
var AudioDestinationNode = function() {};
AudioDestinationNode.prototype = new AudioNode();
AudioDestinationNode.prototype.numberOfChannels;

var AudioParam = function() {};
AudioParam.prototype.value;
AudioParam.prototype.maxValue;
AudioParam.prototype.minValue;
AudioParam.prototype.defaultValue;
AudioParam.prototype.units;
AudioParam.prototype.setValueAtTime = function(value, time) {};
AudioParam.prototype.linearRampToValueAtTime = function(value, time) {};
AudioParam.prototype.exponentialRampToValueAtTime = function(value, time) {};
AudioParam.prototype.setTargetValueAtTime = function(targetValue, time, timeConstant) {};
AudioParam.prototype.setValueCurveAtTime = function(values, time, duration) {};
AudioParam.prototype.cancelScheduledValues = function(startTime) {};

var AudioGainNode = function() {};
AudioGainNode.prototype.__proto__ = new AudioNode();
AudioGainNode.prototype.gain = new AudioParam();

var DelayNode = function() {};
DelayNode.prototype.__proto__ = new AudioNode();
DelayNode.prototype.delayTime = new AudioParam();

var AudioBuffer = function() {};
AudioBuffer.prototype.sampleRate;
AudioBuffer.prototype.length;
AudioBuffer.prototype.duration;
AudioBuffer.prototype.numberOfChannels;
AudioBuffer.prototype.getChannelData = function(channel) {};

var AudioBufferSourceNode = function() {};
AudioBufferSourceNode.prototype.__proto__ = new AudioSourceNode();
AudioBufferSourceNode.prototype.buffer;
AudioBufferSourceNode.prototype.gain;
AudioBufferSourceNode.prototype.playbackRate = new AudioParam();
AudioBufferSourceNode.prototype.loop;
AudioBufferSourceNode.prototype.noteOn = function(when) {};
AudioBufferSourceNode.prototype.noteGrainOn = function(when, grainOffset, grainDuration) {};
AudioBufferSourceNode.prototype.noteOff = function(when) {};

var MediaElementAudioSourceNode = function() {};

var JavaScriptAudioNode = function() {};
JavaScriptAudioNode.prototype.__proto__ = new AudioNode();
JavaScriptAudioNode.prototype.onaudioprocess;
JavaScriptAudioNode.prototype.bufferSize;
JavaScriptAudioNode.prototype.noGC = function() {};

var AudioProcessingEvent = function() {};
AudioProcessingEvent.prototype.node = new JavaScriptAudioNode();
AudioProcessingEvent.prototype.playbackTime;
AudioProcessingEvent.prototype.inputBuffer;
AudioProcessingEvent.prototype.outputBuffer = new AudioBuffer();

var AudioPannerNode = function() {};
AudioPannerNode.prototype.__proto__ = new AudioNode();
AudioPannerNode.prototype.EQUALPOWER = 0;
AudioPannerNode.prototype.HRTF = 1;
AudioPannerNode.prototype.SOUNDFIELD = 2;
AudioPannerNode.prototype.LINEAR_DISTANCE = 0;
AudioPannerNode.prototype.INVERSE_DISTANCE = 1;
AudioPannerNode.prototype.EXPONENTIAL_DISTANCE = 2;
AudioPannerNode.prototype.panningModel;
AudioPannerNode.prototype.setPosition = function(x, y, z) {};
AudioPannerNode.prototype.setOrientation = function(x, y, z) {};
AudioPannerNode.prototype.setVelocity = function(x, y, z) {};
AudioPannerNode.prototype.distanceModel;
AudioPannerNode.prototype.refDistance;
AudioPannerNode.prototype.maxDistance;
AudioPannerNode.prototype.rolloffFactor;
AudioPannerNode.prototype.coneInnerAngle;
AudioPannerNode.prototype.coneOuterAngle;
AudioPannerNode.prototype.coneOuterGain;
AudioPannerNode.prototype.coneGain = new AudioGainNode();
AudioPannerNode.prototype.distanceGain = new AudioGainNode();

var AudioListener = function() {};
AudioListener.prototype.gain;
AudioListener.prototype.dopplerFactor;
AudioListener.prototype.speedOfSound;
AudioListener.prototype.setPosition = function(x, y, z) {};
AudioListener.prototype.setOrientation = function(x, y, z, xUp, yUp, zUp) {};
AudioListener.prototype.setVelocity = function(x, y, z) {};

var ConvolverNode = function() {};
ConvolverNode.prototype.__proto__ = new AudioNode();
ConvolverNode.prototype.buffer = new AudioBuffer();
ConvolverNode.prototype.normalize;

var RealtimeAnalyserNode = function() {};
RealtimeAnalyserNode.prototype.__proto__ = new AudioNode();
RealtimeAnalyserNode.prototype.getFloatFrequencyData = function(array) {};
RealtimeAnalyserNode.prototype.getByteFrequencyData = function(array) {};
RealtimeAnalyserNode.prototype.getByteTimeDomainData = function(array) {};
RealtimeAnalyserNode.prototype.fftSize;
RealtimeAnalyserNode.prototype.frequencyBinCount;
RealtimeAnalyserNode.prototype.minDecibels;
RealtimeAnalyserNode.prototype.maxDecibels;
RealtimeAnalyserNode.prototype.smoothingTimeConstant;

var AudioChannelSplitter = function() {};
AudioChannelSplitter.prototype.__proto__ = new AudioNode();

var AudioChannelMerger = function() {};
AudioChannelMerger.prototype.__proto__ = new AudioNode();

var DynamicsCompressorNode = function() {};
DynamicsCompressorNode.prototype.__proto__ = new AudioNode();
DynamicsCompressorNode.prototype.threshold = new AudioParam();
DynamicsCompressorNode.prototype.knee = new AudioParam();
DynamicsCompressorNode.prototype.ratio = new AudioParam();
DynamicsCompressorNode.prototype.reduction = new AudioParam();
DynamicsCompressorNode.prototype.attack = new AudioParam();
DynamicsCompressorNode.prototype.release = new AudioParam();

var BiquadFilterNode = function() {};
BiquadFilterNode.prototype.__proto__ = new AudioNode();
BiquadFilterNode.prototype.LOWPASS = 0;
BiquadFilterNode.prototype.HIGHPASS = 1;
BiquadFilterNode.prototype.BANDPASS = 2;
BiquadFilterNode.prototype.LOWSHELF = 3;
BiquadFilterNode.prototype.HIGHSHELF = 4;
BiquadFilterNode.prototype.PEAKING = 5;
BiquadFilterNode.prototype.NOTCH = 6;
BiquadFilterNode.prototype.ALLPASS = 7;
BiquadFilterNode.prototype.type;
BiquadFilterNode.prototype.frequency = new AudioParam();
BiquadFilterNode.prototype.Q = new AudioParam();
BiquadFilterNode.prototype.gain = new AudioParam();
BiquadFilterNode.prototype.getFrequencyResponse = function(frequencyHz, magResponse, phaseResponse) {};

var WaveShaperNode = function() {};
WaveShaperNode.prototype.__proto__ = new AudioNode();
WaveShaperNode.prototype.curve;

function OscillatorNode() {
  this.context = new AudioContext();
  this.detune = new AudioParam();
  this.frequency = new AudioParam();
};
OscillatorNode.prototype = {
  __proto__: new AudioSourceNode(),
  setPeriodicWave: noop,
  start: noop,
  stop: noop
};

function ScriptProcessorNode() {};
ScriptProcessorNode.prototype.__proto = new AudioNode();
ScriptProcessorNode.prototype.noGC = function() {};

AudioContext.prototype.createMediaElementSource;
AudioContext.prototype.createMediaStreamSource;
AudioContext.prototype.destination = new AudioDestinationNode();
AudioContext.prototype.sampleRate;
AudioContext.prototype.currentTime;
AudioContext.prototype.listener = new AudioListener();
