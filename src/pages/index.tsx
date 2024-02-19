// pages/index.js
import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import html2canvas from "html2canvas";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

// Dynamically import components to disable SSR
const PixiComponentNoSSR = dynamic(
  () => import("../components/PixiComponent"),
  { ssr: false }
);
const LottieComponent = dynamic(
  () => import("../components/LottiePixiComponent"),
  { ssr: false }
);

const Home = () => {
  const [frames, setFrames] = useState([]);
  const [frameRate, setFrameRate] = useState(30);
  const [duration, setDuration] = useState(1); // Duration in seconds
  const animationContainerRef = useRef<HTMLElement | null>(null);

  const captureFrames = async () => {
    setFrames([]); // Reset frames state
    const totalFrames = frameRate * duration;
    const captureInterval = 1000 / frameRate; // Milliseconds between frames

    for (let i = 0; i < totalFrames; i++) {
      setTimeout(async () => {
        const htmlCanvas = await html2canvas(animationContainerRef.current);
        const dataUrl = htmlCanvas.toDataURL("image/png");
        setFrames((prevFrames) => [...prevFrames, dataUrl]);
      }, i * captureInterval);
    }
  };

  return (
    <>
      <Head>
        <title>Next.js with PixiJS and Lottie</title>
      </Head>
      <main className="container mx-auto p-4">
        <div>
          <label htmlFor="frameRate">Frame Rate:</label>
          <select
            id="frameRate"
            value={frameRate}
            onChange={(e) => setFrameRate(Number(e.target.value))}
          >
            <option value={24}>24 FPS</option>
            <option value={30}>30 FPS</option>
            <option value={60}>60 FPS</option>
          </select>
        </div>
        <div>
          <label htmlFor="duration">Duration (Seconds):</label>
          <select
            id="duration"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          >
            <option value={1}>1 Second</option>
            <option value={2}>2 Seconds</option>
            <option value={3}>3 Seconds</option>
            <option value={4}>4 Seconds</option>
            <option value={5}>5 Seconds</option>
          </select>
        </div>
        <button
          onClick={captureFrames}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Capture Frames
        </button>
        <div
          ref={animationContainerRef}
          className="bg-white w-[400px] h-[300px] flex relative border-2 border-red my-4"
        >
          <PixiComponentNoSSR />
          <LottieComponent />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {frames.length}
          {frames.map((frame, index) => (
            <Image
              key={index}
              src={frame}
              width={20}
              height={40}
              alt={`Frame ${index + 1}`}
              style={{ width: "100%", border: "1px solid black" }}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
