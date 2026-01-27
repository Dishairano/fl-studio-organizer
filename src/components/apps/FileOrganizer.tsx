import { useState } from 'react';
import { FolderOpen, Search, Star, Music } from 'lucide-react';

interface AudioFile {
  id: string;
  name: string;
  path: string;
  type: string;
  bpm?: number;
  key?: string;
  tags: string[];
  favorite: boolean;
}

export function FileOrganizer() {
  const [files, setFiles] = useState<AudioFile[]>([
    {
      id: '1',
      name: 'Kick_Hard_150.wav',
      path: '/samples/kicks/',
      type: 'kick',
      bpm: 150,
      key: 'C',
      tags: ['hard', 'punchy'],
      favorite: false,
    },
    {
      id: '2',
      name: 'Lead_Euphoric_Am.wav',
      path: '/samples/leads/',
      type: 'lead',
      bpm: 150,
      key: 'Am',
      tags: ['euphoric', 'melodic'],
      favorite: true,
    },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'all' || file.type === selectedType;
    return matchesSearch && matchesType;
  });

  const toggleFavorite = (id: string) => {
    setFiles(prev => prev.map(file => 
      file.id === id ? { ...file, favorite: !file.favorite } : file
    ));
  };

  const handleImport = () => {
    alert('File import functionality - This will open a dialog to select audio files from your computer.');
  };

  return (
    <div className="h-full overflow-auto bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">File Organizer</h2>
          <p className="text-gray-400">Intelligent sample library management</p>
        </div>

        {/* Controls */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search files, tags..."
                className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Types</option>
              <option value="kick">Kicks</option>
              <option value="lead">Leads</option>
              <option value="bass">Bass</option>
              <option value="fx">FX</option>
            </select>

            {/* Import Button */}
            <button
              onClick={handleImport}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition flex items-center gap-2 whitespace-nowrap"
            >
              <FolderOpen className="w-5 h-5" />
              Import Files
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="text-2xl font-bold text-white">{files.length}</div>
            <div className="text-sm text-gray-400">Total Files</div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="text-2xl font-bold text-cyan-400">{files.filter(f => f.favorite).length}</div>
            <div className="text-sm text-gray-400">Favorites</div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="text-2xl font-bold text-white">{new Set(files.flatMap(f => f.tags)).size}</div>
            <div className="text-sm text-gray-400">Tags</div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="text-2xl font-bold text-white">{filteredFiles.length}</div>
            <div className="text-sm text-gray-400">Filtered</div>
          </div>
        </div>

        {/* File List */}
        <div className="space-y-2">
          {filteredFiles.map(file => (
            <div
              key={file.id}
              className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-cyan-500/50 transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{file.name}</h3>
                    <p className="text-sm text-gray-400">{file.path}</p>
                  </div>

                  <div className="flex gap-2">
                    {file.bpm && (
                      <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                        {file.bpm} BPM
                      </span>
                    )}
                    {file.key && (
                      <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                        {file.key}
                      </span>
                    )}
                    {file.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-xs text-cyan-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => toggleFavorite(file.id)}
                  className="ml-4 p-2 hover:bg-gray-700 rounded-lg transition"
                >
                  <Star
                    className={`w-5 h-5 ${file.favorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredFiles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Music className="w-16 h-16 mx-auto mb-2 opacity-50" />
              <p>No files found</p>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
          <p className="text-sm text-cyan-400">
            💡 Tip: Import your sample library to automatically detect BPM, key, and add intelligent tags.
            Use the search and filter to quickly find the perfect sample for your track.
          </p>
        </div>
      </div>
    </div>
  );
}
