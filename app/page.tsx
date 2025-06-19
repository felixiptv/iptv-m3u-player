'use client';

import { useState } from 'react';
import ArtPlayerComponent from '../components/ArtPlayerComponent';
import { parse } from 'm3u8-parser';

export default function Home() {
  const [playlistText, setPlaylistText] = useState('');
  const [channels, setChannels] = useState<any[]>([]);
  const [selectedUrl, setSelectedUrl] = useState<string>('');

  const parseM3U8 = () => {
    try {
      const lines = playlistText.split('\n');
      const items = [];
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('#EXTINF')) {
          const title = lines[i].split(',')[1] || `Channel ${i}`;
          const url = lines[i + 1];
          if (url && !url.startsWith('#')) {
            items.push({ title, url });
          }
        }
      }
      setChannels(items);
      if (items[0]) setSelectedUrl(items[0].url);
    } catch (err) {
      alert('Failed to parse playlist.');
    }
  };

  return (
    <main>
      <h1>📺 IPTV M3U8 Player</h1>
      <textarea
        placeholder='Paste your .m3u8 playlist here...'
        value={playlistText}
        onChange={(e) => setPlaylistText(e.target.value)}
      />
      <button onClick={parseM3U8}>Load Playlist</button>

      {channels.length > 0 && (
        <select onChange={(e) => setSelectedUrl(e.target.value)}>
          {channels.map((ch, idx) => (
            <option key={idx} value={ch.url}>
              {ch.title}
            </option>
          ))}
        </select>
      )}

      {selectedUrl && <ArtPlayerComponent url={selectedUrl} />}
    </main>
  );
}