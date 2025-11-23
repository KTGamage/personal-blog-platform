// import React from 'react';
// import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';

// const SpeechControls = ({ content, className = '' }) => {
//   const {
//     isSpeaking,
//     isPaused,
//     voices,
//     selectedVoice,
//     rate,
//     pitch,
//     speak,
//     pause,
//     resume,
//     stop,
//     changeVoice,
//     setRate,
//     setPitch
//   } = useSpeechSynthesis();

//   const handleSpeak = () => {
//     // Extract text from HTML content
//     const tempDiv = document.createElement('div');
//     tempDiv.innerHTML = content;
//     const text = tempDiv.textContent || tempDiv.innerText || '';
    
//     if (text.trim()) {
//       speak(text);
//     }
//   };

//   const handleToggle = () => {
//     if (isSpeaking) {
//       if (isPaused) {
//         resume();
//       } else {
//         pause();
//       }
//     } else {
//       handleSpeak();
//     }
//   };

//   return (
//     <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 ${className}`}>
//       <div className="flex flex-col space-y-4">
//         {/* Controls */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={handleToggle}
//               disabled={!content}
//               className={`p-2 rounded-lg transition-colors ${
//                 isSpeaking && !isPaused
//                   ? 'bg-red-100 text-red-600 hover:bg-red-200'
//                   : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
//               } disabled:opacity-50 disabled:cursor-not-allowed`}
//             >
//               {isSpeaking && !isPaused ? (
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//                 </svg>
//               ) : isPaused ? (
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
//                 </svg>
//               ) : (
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
//                 </svg>
//               )}
//             </button>

//             <button
//               onClick={stop}
//               disabled={!isSpeaking}
//               className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
//               </svg>
//             </button>
//           </div>

//           <div className="text-sm text-gray-500 dark:text-gray-400">
//             {isSpeaking && !isPaused && 'Speaking...'}
//             {isPaused && 'Paused'}
//             {!isSpeaking && !isPaused && 'Ready to listen'}
//           </div>
//         </div>

//         {/* Settings */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//           {/* Voice Selection */}
//           <div>
//             <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
//               Voice
//             </label>
//             <select
//               value={selectedVoice?.name || ''}
//               onChange={(e) => changeVoice(e.target.value)}
//               className="w-full text-xs p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//             >
//               {voices.map((voice) => (
//                 <option key={voice.name} value={voice.name}>
//                   {voice.name} ({voice.lang})
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Rate */}
//           <div>
//             <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
//               Speed: {rate}x
//             </label>
//             <input
//               type="range"
//               min="0.5"
//               max="2"
//               step="0.1"
//               value={rate}
//               onChange={(e) => setRate(parseFloat(e.target.value))}
//               className="w-full"
//             />
//           </div>

//           {/* Pitch */}
//           <div>
//             <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
//               Pitch: {pitch}
//             </label>
//             <input
//               type="range"
//               min="0.5"
//               max="2"
//               step="0.1"
//               value={pitch}
//               onChange={(e) => setPitch(parseFloat(e.target.value))}
//               className="w-full"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SpeechControls;







import React from 'react';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';

const SpeechControls = ({ content, className = '' }) => {
  const {
    isSpeaking,
    isPaused,
    voices,
    selectedVoice,
    rate,
    pitch,
    speak,
    pause,
    resume,
    stop,
    changeVoice,
    setRate,
    setPitch
  } = useSpeechSynthesis();

  const handleSpeak = () => {
    // Extract text from HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const text = tempDiv.textContent || tempDiv.innerText || '';
    
    if (text.trim()) {
      speak(text);
    }
  };

  const handleToggle = () => {
    if (isSpeaking) {
      if (isPaused) {
        resume();
      } else {
        pause();
      }
    } else {
      handleSpeak();
    }
  };

  return (
    <div className={`card p-4 ${className}`}>
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Listen to this post</h4>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleToggle}
              disabled={!content}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                isSpeaking && !isPaused
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isSpeaking && !isPaused ? (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Pause</span>
                </>
              ) : isPaused ? (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Resume</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Listen</span>
                </>
              )}
            </button>

            <button
              onClick={stop}
              disabled={!isSpeaking}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Stop</span>
            </button>
          </div>

          <div className="text-sm text-gray-500">
            {isSpeaking && !isPaused && 'Speaking...'}
            {isPaused && 'Paused'}
            {!isSpeaking && !isPaused && 'Ready'}
          </div>
        </div>

        {/* Settings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm pt-4 border-t border-gray-200">
          {/* Voice Selection */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Voice
            </label>
            <select
              value={selectedVoice?.name || ''}
              onChange={(e) => changeVoice(e.target.value)}
              className="w-full text-xs p-2 border border-gray-300 rounded bg-white text-gray-900"
            >
              {voices.map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>

          {/* Rate */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Speed: {rate}x
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Pitch */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Pitch: {pitch}
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeechControls;