import { useState, useRef } from 'react';
import { Play, Pause, AlertCircle } from 'lucide-react';

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = async () => {
    if (videoRef.current) {
      try {
        if (isPlaying) {
          videoRef.current.pause();
          setIsPlaying(false);
        } else {
          await videoRef.current.play();
          setIsPlaying(true);
        }
        setError(null);
      } catch (err) {
        setError('Failed to play video. Check source or permissions.');
        console.error('Video playback error:', err);
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden relative shadow-2xl shadow-[#F5BE2D]/20 border border-gray-800 mb-16 group hover:shadow-[#F5BE2D]/30 transition-all duration-500">
      <div className="aspect-video relative">
        {/* Video Element */}
        
        <video
          ref={videoRef}
          className="absolute inset-0 object-cover w-full h-full"
          playsInline
          poster="/images/demo-highlight-reel.png"
          onClick={togglePlay}
          muted
          preload="metadata"
          loop
          onError={(e) => {
            setError('Video failed to load. Check the source file.');
            console.error('Video error:', e);
          }}
        >
          <source src="/videos/videoplayback.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay Gradient */}
        {!isPlaying && (
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-gray-900/40"></div>
        )}


        {/* Play/Pause Button and Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center pointer-events-auto">
            <button
              onClick={togglePlay}
              className={`w-12 h-12 md:w-24 md:h-24 bg-[#F5BE2D]/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#F5BE2D]/30 transition-all duration-300 border border-[#F5BE2D]/30 ${
                isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
              }`}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 md:h-10 md:w-10 text-[#F5BE2D] ml-1" />
              ) : (
                <Play className="w-6 h-6 md:h-10 md:w-10 text-[#F5BE2D] ml-1" />
              )}
            </button>
            {!isPlaying && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
                <p className="text-white font-bold text-lg md:text-xl md:mb-2">
                  Demo Highlight Reel
                </p>
                <p className="text-gray-300">Basketball Session - 2:34</p>
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-red-600/80 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center text-sm text-white">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        {/* AI Detection Overlay Elements */}
        {!isPlaying && (
          <div className="absolute inset-0 pointer-events-none hidden md:block">
            {/* Player Detection Boxes */}
            <div className="absolute top-1/4 left-1/4 w-20 h-20 border-2 border-[#F5BE2D] rounded-lg animate-pulse opacity-80"></div>
            <div className="absolute top-1/2 right-1/3 w-24 h-24 border-2 border-[#F5BE2D] rounded-lg animate-pulse opacity-80"></div>
            <div className="absolute bottom-1/3 left-1/3 w-16 h-16 border-2 border-[#F5BE2D] rounded-lg animate-pulse opacity-80"></div>

            {/* Ball Tracking */}
            <div className="absolute top-1/3 left-1/2 w-8 h-8 border-2 border-[#F5BE2D] rounded-full animate-pulse"></div>

            {/* Detection Labels */}
            <div className="absolute top-1/4 left-1/4 transform translate-x-12 -translate-y-6 bg-black/90 backdrop-blur-sm px-3 py-2 rounded-lg text-sm text-[#F5BE2D] font-medium border border-[#F5BE2D]/30">
              Player 1 (94%)
            </div>
            <div className="absolute top-1/2 right-1/3 transform translate-x-14 -translate-y-6 bg-black/90 backdrop-blur-sm px-3 py-2 rounded-lg text-sm text-[#F5BE2D] font-medium border border-[#F5BE2D]/30">
              Player 2 (89%)
            </div>
            <div className="absolute top-1/3 left-1/2 transform translate-x-10 -translate-y-6 bg-black/90 backdrop-blur-sm px-3 py-2 rounded-lg text-sm text-[#F5BE2D] font-medium border border-[#F5BE2D]/30">
              Ball Tracking
            </div>
            <div className="absolute bottom-1/3 left-1/3 transform translate-x-10 translate-y-10 bg-black/90 backdrop-blur-sm px-3 py-2 rounded-lg text-sm text-[#F5BE2D] font-medium border border-[#F5BE2D]/30">
              Key Moment
            </div>

            {/* Movement Trajectory Lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M200,150 C250,130 300,200 350,180"
                fill="none"
                stroke="#F5BE2D"
                strokeWidth="2"
                strokeDasharray="6,6"
                opacity="0.6"
                className="animate-pulse"
              />
              <path
                d="M400,200 C450,180 500,250 550,230"
                fill="none"
                stroke="#F5BE2D"
                strokeWidth="2"
                strokeDasharray="6,6"
                opacity="0.6"
                className="animate-pulse"
              />
            </svg>
          </div>
        )}

        {/* Corner AI Status Indicators */}
        {!isPlaying && (
          <>
            <div className="absolute top-4 left-4 bg-black/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-[#F5BE2D]/30">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#F5BE2D] rounded-full mr-2 animate-pulse"></div>
                <span className="text-[#F5BE2D] text-sm font-medium">
                  AI ACTIVE
                </span>
              </div>
            </div>
            <div className="absolute top-4 right-4 bg-black/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-[#F5BE2D]/30">
              <span className="text-[#F5BE2D] text-sm font-medium">
                4K • 60FPS
              </span>
            </div>
          </>
        )}
      </div>

      {/* Processing Status Bar */}
      
        <div className="p-6 bg-black/80 backdrop-blur-sm border-t border-gray-800">
          <div className="flex justify-between items-center mb-3">
            <div className="text-sm font-mono text-[#F5BE2D] font-medium">
              AI Processing: 94% Complete
            </div>
            <div className="text-sm font-mono text-gray-400">
              Generating Highlights
            </div>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full w-[94%] bg-gradient-to-r from-[#F5BE2D] to-[#F5BE2D]/80 rounded-full transition-all duration-1000 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
            <span>Objects Detected: 3 Players, 1 Ball</span>
            <span>Key Moments: 5 Found</span>
          </div>
        </div>
      
    </div>
  );
}