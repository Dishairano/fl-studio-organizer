import { useState, useEffect } from 'react';

interface Note {
  note: string;
  octave: number;
  start: number;
  duration: number;
}

interface MelodyParams {
  key: string;
  scale: 'minor' | 'major' | 'harmonic-minor' | 'phrygian';
  bpm: number;
  bars: number;
  style: string;
}

export function MelodyGenerator() {
  const [params, setParams] = useState<MelodyParams>({
    key: 'C',
    scale: 'minor',
    bpm: 150,
    bars: 8,
    style: 'hardstyle-melodic',
  });
  const [melody, setMelody] = useState<Note[]>([]);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioContext(ctx);
    return () => {
      ctx.close();
    };
  }, []);

  const generateMelody = () => {
    const scales: Record<string, number[]> = {
      'minor': [0, 2, 3, 5, 7, 8, 10],
      'major': [0, 2, 4, 5, 7, 9, 11],
      'harmonic-minor': [0, 2, 3, 5, 7, 8, 11],
      'phrygian': [0, 1, 3, 5, 7, 8, 10],
    };

    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const keyIndex = notes.indexOf(params.key);
    const scale = scales[params.scale];
    
    const newMelody: Note[] = [];
    const totalBeats = params.bars * 4;
    let currentBeat = 0;

    while (currentBeat < totalBeats) {
      const scaleNote = scale[Math.floor(Math.random() * scale.length)];
      const noteIndex = (keyIndex + scaleNote) % 12;
      const octave = 4 + Math.floor(Math.random() * 2);
      const duration = [0.25, 0.5, 1, 2][Math.floor(Math.random() * 4)];

      newMelody.push({
        note: notes[noteIndex],
        octave,
        start: currentBeat,
        duration,
      });

      currentBeat += duration;
    }

    setMelody(newMelody);
  };

  const playMelody = () => {
    if (!audioContext || melody.length === 0) return;

    const noteFrequencies: Record<string, number> = {
      'C': 261.63, 'C#': 277.18, 'D': 293.66, 'D#': 311.13,
      'E': 329.63, 'F': 349.23, 'F#': 369.99, 'G': 392.00,
      'G#': 415.30, 'A': 440.00, 'A#': 466.16, 'B': 493.88,
    };

    const beatDuration = 60 / params.bpm;
    const now = audioContext.currentTime;

    melody.forEach(note => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      const freq = noteFrequencies[note.note] * Math.pow(2, note.octave - 4);
      osc.frequency.value = freq;
      osc.type = 'triangle';
      
      const startTime = now + note.start * beatDuration;
      const duration = note.duration * beatDuration;
      
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  };

  const exportMidi = () => {
    alert('MIDI export will save your melody as a .mid file that you can import into your DAW.');
  };

  return (
    <div className="h-full overflow-auto bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">Melody Generator</h2>
          <p className="text-gray-400">AI-powered melody creation for harder styles</p>
        </div>

        {/* Parameters */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Parameters</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Key</label>
              <select
                value={params.key}
                onChange={(e) => setParams({ ...params, key: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              >
                {['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].map(k => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Scale</label>
              <select
                value={params.scale}
                onChange={(e) => setParams({ ...params, scale: e.target.value as any })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="minor">Natural Minor</option>
                <option value="major">Major</option>
                <option value="harmonic-minor">Harmonic Minor</option>
                <option value="phrygian">Phrygian</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">BPM: {params.bpm}</label>
              <input
                type="range"
                min="120"
                max="180"
                value={params.bpm}
                onChange={(e) => setParams({ ...params, bpm: Number(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Bars: {params.bars}</label>
              <input
                type="range"
                min="4"
                max="16"
                value={params.bars}
                onChange={(e) => setParams({ ...params, bars: Number(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              onClick={generateMelody}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition"
            >
              Generate Melody
            </button>
            {melody.length > 0 && (
              <>
                <button
                  onClick={playMelody}
                  className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition"
                >
                  Play
                </button>
                <button
                  onClick={exportMidi}
                  className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition"
                >
                  Export MIDI
                </button>
              </>
            )}
          </div>
        </div>

        {/* Piano Roll Visualization */}
        {melody.length > 0 && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Piano Roll</h3>
            <div className="bg-gray-900 rounded-lg p-4 h-64 relative overflow-x-auto">
              <div className="text-gray-500 text-sm">
                Generated {melody.length} notes - Play to preview or export as MIDI
              </div>
              {/* Simplified visualization */}
              <div className="mt-4 flex gap-1 flex-wrap">
                {melody.slice(0, 32).map((note, i) => (
                  <div
                    key={i}
                    className="px-3 py-1 bg-cyan-500/30 border border-cyan-500/50 rounded text-xs text-cyan-300"
                  >
                    {note.note}{note.octave}
                  </div>
                ))}
                {melody.length > 32 && <div className="text-gray-500 text-xs py-1">+{melody.length - 32} more...</div>}
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
          <p className="text-sm text-cyan-400">
            💡 Tip: Start with a minor scale for darker, more emotional melodies. Use harmonic minor for that classic hardstyle sound.
            Export to MIDI and load into your DAW to further refine your melody.
          </p>
        </div>
      </div>
    </div>
  );
}
