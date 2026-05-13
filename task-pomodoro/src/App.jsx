import { useState, useEffect } from 'react';

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [minutes, setMinutes] = useState(25);
  const [remainingTime, setRemainingTime] = useState(minutes * 60);
  const [hasCurrentFinished, setHasCurrentFinished] = useState(false);

  useEffect(() => {
    if (!isRunning || remainingTime <= 0) return;

    const timer = setInterval(() => {
      setRemainingTime((i) => i - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, remainingTime]);

  useEffect(() => {
    if (remainingTime === 0 && !hasCurrentFinished) {
      setSessionsDone((i) => i + 1);
      setHasCurrentFinished(true);
      setIsRunning(false);
    }

    if (remainingTime > 0 && hasCurrentFinished) {
      setHasCurrentFinished(false);
    }
  }, [remainingTime, hasCurrentFinished]);
  const min = Math.floor(remainingTime / 60).toString().padStart(2, '0');
  const sec = (remainingTime % 60).toString().padStart(2, '0');

  const startResumeButton = () => {
    setIsRunning(!isRunning);
  };

  const resetButton = () => {
    setIsRunning(false);
    setRemainingTime(minutes * 60);
  };
  const focus = () => {
    setMinutes(25);
    setRemainingTime(25 * 60);
    setIsRunning(false);
  };

  const short = () => {
    setMinutes(5);
    setRemainingTime(5 * 60);
    setIsRunning(false);
  };

  const long = () => {
    setMinutes(20);
    setRemainingTime(20 * 60);
    setIsRunning(false);
  };

  return (
    <>
    <div className="bg-rose-300 flex flex-col items-center justify-start pt-12 px-4 space-y-4 min-h-screen">
      <h1 className="text-stone-950 text-center text-2xl font-bold">⋆.⟡࿔*:⋆. POMODORO TIMER .⋆:*࿔⟡.⋆</h1>

      <div className="w-full max-w-md rounded-3xl bg-rose-300 p-0 mt-8 ">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <button className="flex-1 rounded px-4 py-2 bg-rose-900 text-gray-200 font-bold border border-gray-200 hover:bg-rose-700 cursor-pointer shadow-2xl shadow-rose-900/40 "onClick={focus}>
            FOCUS
          </button>
          <button className="flex-1 rounded px-4 py-2 bg-rose-900 text-gray-200 font-bold border border-gray-200 hover:bg-rose-700 cursor-pointer shadow-2xl shadow-rose-900/40 "onClick={short}>
            SHORT BREAK
          </button>
          <button className="flex-1 rounded px-4 py-2 bg-rose-900 text-gray-200 font-bold border border-gray-200 hover:bg-rose-700 cursor-pointer shadow-2xl shadow-rose-900/40"onClick={long}>
            LONG BREAK
          </button>
        </div>
      </div>

      <div className="w-full max-w-md rounded-xl border border-gray-500 bg-gray-200/60 mt-6 mb-2 px-4 py-10 shadow-2xl shadow-rose-900/50">
        <div className="text-stone-950 text-center text-4xl font-bold mt-6">
          {min}:{sec}
        </div>
      </div>
      
      <div className="w-full max-w-md rounded-xl border border-gray-500 bg-gray-200/60  p-4  shadow-2xl shadow-rose-900/50 flex justify-center gap-4 ">
          <button 
            className="rounded px-6 py-2 bg-orange-100 text-stone-950 font-bold hover:bg-lime-100 shadow-inner border border-gray-400 cursor-pointer"
            onClick={startResumeButton}
          >
            {isRunning ? 'RESUME' : 'START'}
          </button>
          <button 
            className="rounded px-6 py-2 bg-rose-400 text-stone-950 font-bold hover:bg-rose-600 shadow-inner border border-gray-400 cursor-pointer"
            onClick={resetButton}
          >
            RESET
          </button>
        </div>

      
      </div>
    
    </>
  );
}

export default App;