"use client";

import React, { useState, useEffect } from "react";
import { Pause } from "lucide-react";
import { Play } from "lucide-react";
import { RotateCcw } from "lucide-react";
import { X } from "lucide-react";

const Timer = ({ initialTime, timerId, removeTimer }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1000);
      }, 1000);
    } else if (isRunning && timeLeft <= 0) {
      clearInterval(interval);
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startTimer = (e) => {
    e.preventDefault();
    if (isRunning) {
      setIsRunning(false);
    } else {
      setIsRunning(true);
    }
  };

  const resetTimer = (e) => {
    e.preventDefault();
    setTimeLeft(initialTime);
    setIsRunning(true);
  };

  const handleRemoveTimer = () => {
    removeTimer(timerId);
  };

  const convertToHoursMinutesSeconds = (ms) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="mt-4 bg-zinc-700 w-[220px] h-[200px] text-white p-4 rounded-md shadow-md">
      <p className="mt-10 mb-10 mx-auto my-auto h-fit w-fit text-4xl">
        {convertToHoursMinutesSeconds(timeLeft)}
      </p>

      <div className="flex justify-between">
        <button onClick={handleRemoveTimer} className="w-fit ml-0 mr-auto">
          <div className="bg-zinc-600 px-1.5 py-1.5 rounded-full">
            <X size={20} />
          </div>
        </button>

        {timeLeft > 0 ? (
          isRunning ? (
            <button onClick={startTimer} className="w-fit ml-auto mr-0">
              <div className="bg-primary px-1.5 py-1.5 rounded-full">
                <Pause size={20} />
              </div>
            </button>
          ) : (
            <button onClick={startTimer} className="w-fit ml-auto mr-0">
              <div className="bg-success px-1.5 py-1.5 rounded-full">
                <Play size={20} />
              </div>
            </button>
          )
        ) : (
          <button onClick={resetTimer} className="w-fit ml-auto mr-0">
            <div className="bg-success px-1.5 py-1.5 rounded-full">
              <RotateCcw size={20} />
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default Timer;
