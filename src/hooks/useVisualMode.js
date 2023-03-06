import { useState } from "react";

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition (mode, replace = false) {
    const historyClone = history;
    // historyClone variable because you cannot mutate state directly
    
    if(replace) {
      setMode(mode);
      setHistory(historyClone);
    } else {
      historyClone.push(mode);
      setMode(mode);
      setHistory(historyClone);
    }
  };

  function back () {
    const historyClone = history;
    const newHistory = historyClone.slice(0, historyClone.length - 1);

    if(newHistory.length < 1) {
      newHistory.push(mode);
    }

    setMode(newHistory[newHistory.length - 1]);
    setHistory(newHistory);
  }

  return { mode, transition, back };
};