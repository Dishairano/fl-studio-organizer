import { useState, useCallback, useEffect } from 'react';

// KickForge Types
interface Layer {
  id: string;
  name: string;
  type: 'sine' | 'triangle' | 'square' | 'noise';
  frequency: number;
  attack: number;
  decay: number;
  sustain: number;
  release: number;
  volume: number;
  distortion: number;
  enabled: boolean;
}


export function KickForge() {
  const [layers, setLayers] = useState<Layer[]>([
    {
      id: '1',
      name: 'Body',
      type: 'sine',
      frequency: 50,
      attack: 0,
      decay: 300,
      sustain: 0,
      release: 100,
      volume: 0.8,
      distortion: 0,
      enabled: true,
    },
    {
      id: '2',
      name: 'Punch',
      type: 'sine',
      frequency: 150,
      attack: 0,
      decay: 100,
      sustain: 0,
      release: 50,
      volume: 0.6,
      distortion: 20,
      enabled: true,
    },
  ]);

  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioContext(ctx);
    return () => {
      ctx.close();
    };
  }, []);

  const playKick = useCallback(() => {
    if (!audioContext || isPlaying) return;
    
    setIsPlaying(true);
    const now = audioContext.currentTime;
    
    layers.forEach(layer => {
      if (!layer.enabled) return;
      
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const distortion = audioContext.createWaveShaper();
      
      if (layer.type !== 'noise') {
        osc.type = layer.type as OscillatorType;
      }
      osc.frequency.setValueAtTime(layer.frequency, now);
      osc.frequency.exponentialRampToValueAtTime(20, now + layer.decay / 1000);
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(layer.volume, now + layer.attack / 1000);
      gain.gain.linearRampToValueAtTime(layer.sustain, now + layer.decay / 1000);
      gain.gain.linearRampToValueAtTime(0, now + (layer.decay + layer.release) / 1000);
      
      if (layer.distortion > 0) {
        const curve = new Float32Array(256);
        const deg = Math.PI / 180;
        const k = layer.distortion;
        for (let i = 0; i < 256; i++) {
          const x = (i * 2) / 256 - 1;
          curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
        }
        distortion.curve = curve;
        osc.connect(distortion);
        distortion.connect(gain);
      } else {
        osc.connect(gain);
      }
      
      gain.connect(audioContext.destination);
      osc.start(now);
      osc.stop(now + (layer.decay + layer.release) / 1000 + 0.1);
    });
    
    setTimeout(() => setIsPlaying(false), 500);
  }, [audioContext, layers, isPlaying]);

  const updateLayer = (id: string, updates: Partial<Layer>) => {
    setLayers(prev => prev.map(layer => 
      layer.id === id ? { ...layer, ...updates } : layer
    ));
  };

  const exportWav = () => {
    alert('Export functionality requires offline audio rendering. This will save a .wav file of your kick.');
  };

  return (
    <div className="h-full overflow-auto bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">KickForge</h2>
          <p className="text-gray-400">Professional kick designer for harder styles</p>
        </div>

        {/* Controls */}
        <div className="mb-6 flex gap-4">
          <button
            onClick={playKick}
            disabled={isPlaying}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isPlaying ? 'Playing...' : 'Play Kick'}
          </button>
          <button
            onClick={exportWav}
            className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition"
          >
            Export WAV
          </button>
        </div>

        {/* Layers */}
        <div className="space-y-4">
          {layers.map(layer => (
            <div key={layer.id} className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={layer.enabled}
                    onChange={(e) => updateLayer(layer.id, { enabled: e.target.checked })}
                    className="w-5 h-5 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-2 focus:ring-cyan-500"
                  />
                  <h3 className="text-lg font-semibold text-white">{layer.name}</h3>
                </div>
                <select
                  value={layer.type}
                  onChange={(e) => updateLayer(layer.id, { type: e.target.value as Layer['type'] })}
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="sine">Sine</option>
                  <option value="triangle">Triangle</option>
                  <option value="square">Square</option>
                  <option value="noise">Noise</option>
                </select>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Frequency: {layer.frequency}Hz</label>
                  <input
                    type="range"
                    min="20"
                    max="500"
                    value={layer.frequency}
                    onChange={(e) => updateLayer(layer.id, { frequency: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Attack: {layer.attack}ms</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={layer.attack}
                    onChange={(e) => updateLayer(layer.id, { attack: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Decay: {layer.decay}ms</label>
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    value={layer.decay}
                    onChange={(e) => updateLayer(layer.id, { decay: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Release: {layer.release}ms</label>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={layer.release}
                    onChange={(e) => updateLayer(layer.id, { release: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Volume: {Math.round(layer.volume * 100)}%</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={layer.volume}
                    onChange={(e) => updateLayer(layer.id, { volume: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Distortion: {layer.distortion}%</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={layer.distortion}
                    onChange={(e) => updateLayer(layer.id, { distortion: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="mt-8 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
          <p className="text-sm text-cyan-400">
            💡 Tip: Layer multiple oscillators with different frequencies and envelopes to create professional kicks.
            Start with a low sine wave for body, add a higher frequency for punch, and use distortion for rawness.
          </p>
        </div>
      </div>
    </div>
  );
}
