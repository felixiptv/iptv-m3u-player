'use client';

import React, { useEffect, useRef } from 'react';
import Artplayer from 'artplayer';

interface ArtPlayerProps {
  url: string;
}

const ArtPlayerComponent = ({ url }: ArtPlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const art = new Artplayer({
        container: containerRef.current,
        url,
        isLive: true,
        autoSize: true,
        fullscreen: true,
        playbackRate: false,
        setting: true,
        hotkey: true,
        pip: true,
        mutex: true,
      });

      return () => {
        art.destroy();
      };
    }
  }, [url]);

  return <div ref={containerRef} style={{ width: '100%', height: '360px' }} />;
};

export default ArtPlayerComponent;