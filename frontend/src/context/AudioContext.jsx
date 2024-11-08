// AudioContext.js

import React, { createContext, useState } from "react";

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  // ポイントIDとオーディオURIのマッピング
  const [audioMap, setAudioMap] = useState({});

  // 特定のポイントに対してオーディオURIを設定する関数
  const setAudioForPoint = (pointId, uri) => {
    setAudioMap((prev) => ({
      ...prev,
      [pointId]: uri,
    }));
  };

  return (
    <AudioContext.Provider value={{ audioMap, setAudioForPoint }}>
      {children}
    </AudioContext.Provider>
  );
};
