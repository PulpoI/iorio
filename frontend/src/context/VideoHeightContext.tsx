import { createContext, useContext, useState, useEffect } from "react";
import { VideoHeightContextValue } from "./types";

export const VideoHeightContext = createContext<VideoHeightContextValue>({
  videoHeight: 0,
  setVideoHeight: () => {},
});
//

export const useVideoHeight = () => {
  const context = useContext(VideoHeightContext);
  if (!context) {
    throw new Error(
      "useVideoHeight debe estar dentro del proveedor VideoHeightContext"
    );
  }
  return context;
};

interface VideoHeightProviderProps {
  children: React.ReactNode;
}

export const VideoHeightProvider = ({ children }: VideoHeightProviderProps) => {
  const [videoHeight, setVideoHeight] = useState(0);

  useEffect(() => {
    const video = document.querySelector("video");
    window.onload = () => {
      if (video) {
        setVideoHeight(video.clientHeight);
      }
    };
  }, []);

  window.addEventListener("resize", () => {
    const video = document.querySelector("video");
    if (video) {
      setVideoHeight(video.clientHeight);
    }
  });

  return (
    <VideoHeightContext.Provider value={{ videoHeight, setVideoHeight }}>
      {children}
    </VideoHeightContext.Provider>
  );
};
