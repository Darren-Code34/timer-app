"use client";
import { useEffect, useState } from "react";
import Timer from "./Timer";

const useTimerStore = () => {
  const [time, setTime] = useState({ hrs: "00", mins: "01", secs: "00" });
  const [timers, setTimers] = useState([]);

  //Function to save timers to localStorage
  const saveTimers = () => {
    localStorage.setItem("timers", JSON.stringify(timers));
  };

  //Function to load timers from localStorage
  const loadTimers = () => {
    const storedTimers = localStorage.getItem("timers");
    if (storedTimers) {
      setTimers(JSON.parse(storedTimers));
    }
  };

  const addTimer = (ms) => {
    setTimers((prevTimers) => [
      ...prevTimers,
      { initialTime: ms, id: Date.now().toString() },
    ]);
    saveTimers();
  };

  const removeTimer = (idToRemove) => {
    setTimers(timers.filter((timer) => timer.id !== idToRemove));
    saveTimers();
  };

  useEffect(() => {
    loadTimers();
  },[]);

  return { time, setTime, timers, addTimer, removeTimer };
};

export default function Home() {
  const { time, setTime, timers, addTimer, removeTimer } = useTimerStore();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let max;
    let errorMessage = "";

    const formatTimeValue = (value, name) => {
      let intValue = parseInt(value, 10);

      if (isNaN(intValue) || intValue < 0) {
        setErrorMessage("Enter a valid number");
      } else if (intValue > max) {
        setErrorMessage(`the max value is ${max}`);
      }

      return intValue.toString().padStart(2, "0");
    };
    const formattedValue = formatTimeValue(
      value,
      name === "hrs" ? (max = 23) : (max = 59)
    );
    setTime((prevtime) => ({ ...prevtime, [name]: formattedValue }));
  };

  const handleAddTimer = (e) => {
    e.preventDefault();
    const ms =
      parseInt(time.hrs, 10) * 3600000 +
      parseInt(time.mins, 10) * 60000 +
      parseInt(time.secs, 10) * 1000;

    if (ms < 10000) {
      setErrorMessage("Le Timer dois être réglé au minimum à 10 seconds");
      return;
    }

    addTimer(ms);
  };

  useEffect(() => {
    let timeOut;

    if (errorMessage) {
      timeOut = setTimeout(() => setErrorMessage(null), 2000);
    }

    return () => {
      clearTimeout(timeOut);
    };
  }, [errorMessage]);

  return (
    <main className="min-h-full">
      <h2 className="mx-auto mt-4 mb-6 p-2 bg-zinc-700 w-fit rounded font-bold text-xl ">
        Timer
      </h2>

      <form className=" w-[700px] h-fit flex flex-col mx-auto ">
        <div className="flex flex-row justify-around mb-3">
          <label htmlFor="hrs">hr</label>
          <label htmlFor="mins">min</label>
          <label htmlFor="secs">sec</label>
        </div>

        <div className=" bg-zinc-700 w-[700px] flex flex-row justify-center p-3 border border-white h-fit rounded-md mb-6">
          <input
            type="number"
            name="hrs"
            value={time.hrs}
            onChange={(e) => handleInputChange(e)}
            className=" input bg-zinc-700 w-[160px] h-[140px] mr-8 p-5 py-auto text-4xl font-bold border-transparent rounded-md focus:bg-accent focus:outline-none "
          />
          <span className="bg-zinc-700 mr-8 flex align-middle text-4xl px-1 h-[150px] py-12">
            :
          </span>
          <input
            type="number"
            name="mins"
            value={time.mins}
            onChange={(e) => handleInputChange(e)}
            className="input bg-zinc-700 w-[160px] h-[140px] p-5 py-auto text-4xl font-bold border-transparent rounded-md focus:bg-accent focus:outline-none "
          />
          <span className="bg-zinc-700 mr-10 flex align-middle text-4xl px-1 h-[150px] py-12">
            :
          </span>
          <input
            type="number"
            name="secs"
            value={time.secs}
            onChange={(e) => handleInputChange(e)}
            className="input bg-zinc-700 w-[160px] h-[140px] p-5 py-auto text-4xl font-bold border-transparent rounded-md focus:bg-accent focus:outline-none "
          />
        </div>

        {errorMessage ? (
          <p className="text-red-600 font-medium text-xl mb-3">
            {errorMessage}
          </p>
        ) : null}

        <button
          type="submit"
          onClick={handleAddTimer}
          className=" bg-success text-success-content py-3 px-4 rounded-md ml-auto mr-0 mb-8"
        >
          Add Timer
        </button>

        <div className="grid grid-cols-3 gap-3">
          {timers.length > 0
            ? timers.map((timer) => (
                <Timer
                  initialTime={timer.initialTime}
                  timerId={timer.id}
                  key={timer.id}
                  removeTimer={removeTimer}
                />
              ))
            : null}
        </div>
      </form>
    </main>
  );
}
