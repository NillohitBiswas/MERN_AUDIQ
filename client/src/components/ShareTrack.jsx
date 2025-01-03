import React, { useState } from 'react';
import { Share2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { shareTrack } from '../Redux/trackAPI';

export function ShareTrack({ track }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleShare = () => {
    dispatch(shareTrack(track._id));
    setIsOpen(true);
  };

  const shareUrl = `${window.location.origin}/track/${track._id}`;

  return (
    <>
      <button
        onClick={handleShare}
        className="rounded-full p-2 text-black bg-lime-400 hover:bg-lime-600 focus:outline-none"
      >
        <Share2 size={20} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-gray-900 text-lime-200 rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg text-lime-200 font-semibold mb-2">Share this track</h2>
            <p className="mb-4">
              Copy the link below to share "{track.title}" by {track.artist}
            </p>
            <input
              type="text"
              value={shareUrl}
              readOnly
              onClick={(e) => e.target.select()}
              className="w-full text-black p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
                setIsOpen(false);
              }}
              className="w-full bg-lime-700 text-black rounded py-2 hover:bg-lime-600 focus:outline-none"
            >
              Copy Link
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-2 w-full text-center text-gray-400 hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}