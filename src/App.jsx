import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import Castle from "./components/01_Castle";

// ตัวเลือกโปเกมอนภายนอกปราสาท ตามโจทย์ที่ระบุ
const pokemonOptions = ["pikachu", "bulbasaur", "charmander", "squirtle"];

export default function App() {
  // 1. State สำหรับการรับส่งข้อความระหว่างข้างนอกและ SecretRoom
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // 2. State สำหรับระบบโปเกมอนและทีมช่วยเหลือ
  const [pokemonName, setPokemonName] = useState("pikachu");
  const [starterPokemon, setStarterPokemon] = useState(null); // ตัวละครนอกปราสาท
  const [prisoner, setPrisoner] = useState(null); // ตัวละครนักโทษใน SecretRoom (Seaking)
  const [rescuePokemon, setRescuePokemon] = useState([]); // ทีมช่วยเหลือ 4 ตัว

  // 3. State สำหรับสถานะเกมและการสร้าง Escape Pod
  // gamePhase มีสถานะ: "idle" -> "reinforcements_called" -> "pod_built" -> "pod_at_secret_room" -> "prisoner_entered_pod" -> "escaped"
  const [gamePhase, setGamePhase] = useState("idle");
  const [podProgress, setPodProgress] = useState(0); // เปอร์เซ็นต์การสร้าง Pod (0 - 100%)
  const [showBuildModal, setShowBuildModal] = useState(false); // แสดง/ซ่อน Modal โหลดการสร้าง Pod
  const [loadError, setLoadError] = useState(false);

  // -------------------------------------------------------------
  // useEffect 1: ดึงข้อมูลโปเกมอนภายนอกเมื่อเลือกปุ่มเปลี่ยนชื่อ (ตามโค้ดตัวอย่างที่โจทย์กำหนด)
  // -------------------------------------------------------------
  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        const data = await response.json();
        setStarterPokemon(data);
      } catch (error) {
        console.error("Error fetching pokemon:", error);
        setLoadError(true);
      }
    }
    fetchPokemon();
  }, [pokemonName]);

  // -------------------------------------------------------------
  // useEffect 2: ดึงข้อมูลตัวละครนักโทษ (Seaking) มาขังไว้ที่ SecretRoom เมื่อเปิดแอปขึ้นมาครั้งแรก
  // -------------------------------------------------------------
  useEffect(() => {
    async function fetchPrisoner() {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/seaking");
        const data = await response.json();
        setPrisoner(data);
      } catch (error) {
        console.error("Error fetching prisoner:", error);
      }
    }
    fetchPrisoner();
  }, []);

  // Handler สำหรับการพิมพ์ข้อความภายนอก
  const handleQuestion = (e) => {
    setQuestion(e.target.value);
  };

  // Handler สำหรับการพิมพ์ตอบกลับจากภายใน SecretRoom
  const handleAnswer = (e) => {
    setAnswer(e.target.value);
  };

  // -------------------------------------------------------------
  // Step 3: เรียกทีมช่วยเหลือ (Fetch ข้อมูลโปเกมอนทั้ง 4 ตัวพร้อมกันด้วย Promise.all)
  // -------------------------------------------------------------
  const handleCallReinforcements = async () => {
    try {
      const promises = pokemonOptions.map((name) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) => res.json())
      );
      const results = await Promise.all(promises);
      setRescuePokemon(results);
      setGamePhase("reinforcements_called");
    } catch (error) {
      console.error("Error fetching rescue team:", error);
    }
  };

  // -------------------------------------------------------------
  // Step 4: สร้าง Escape Pod พร้อมแสดง Modal และ Progress Bar เพิ่มทีละ 10%
  // -------------------------------------------------------------
  const handleBuildPod = () => {
    setShowBuildModal(true);
    setPodProgress(0);

    const interval = setInterval(() => {
      setPodProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowBuildModal(false);
            setGamePhase("pod_built"); // สร้าง Pod เสร็จสมบูรณ์
          }, 400);
          return 100;
        }
        return prev + 10;
      });
    }, 250);
  };

  // -------------------------------------------------------------
  // Step 6: นักโทษกดเรียก Pod มายัง SecretRoom
  // -------------------------------------------------------------
  const handleCallPod = () => {
    setGamePhase("pod_at_secret_room");
  };

  // -------------------------------------------------------------
  // Step 7: นักโทษกดเข้า Pod
  // -------------------------------------------------------------
  const handleEnterPod = () => {
    setGamePhase("prisoner_entered_pod");
  };

  // -------------------------------------------------------------
  // Step 8 & 9: กดวาร์ปออกไปข้างนอก (Transport Outside) + จุดพลุ Confetti ยินดี
  // -------------------------------------------------------------
  const handleTransportOutside = () => {
    setGamePhase("escaped");
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  // เช็คว่ามีสัญญาณขอความช่วยเหลือ "help" ส่งมาจากข้างในหรือไม่
  const isHelpReceived = answer.toLowerCase().includes("help");

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-8 text-slate-100 flex flex-col items-center">
      
      {/* --------------------------------------------------------- */}
      {/* ส่วนแสดงผล Outside the Castle */}
      {/* --------------------------------------------------------- */}
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-xl p-6 mb-6 text-center shadow-lg">
        <h1 className="text-yellow-400 font-bold text-2xl mb-4">Outside the Castle</h1>

        {/* ปุ่มเลือกเปลี่ยนโปเกมอนภายนอก (ตามโจทย์) */}
        <div className="flex justify-center gap-3 mb-4 flex-wrap">
          {pokemonOptions.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setPokemonName(name)}
              className={`rounded px-4 py-2 text-sm font-semibold capitalize transition-colors ${
                pokemonName === name
                  ? "bg-teal-300 text-slate-950"
                  : "bg-slate-800 text-slate-100 hover:bg-slate-700"
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        {/* แสดงโปเกมอนภายนอกที่ถูกเลือก */}
        <div className="flex flex-col items-center mb-4">
          <p className="text-slate-400 text-xs mb-1">Pokemon outside:</p>
          {starterPokemon ? (
            <div className="flex flex-col items-center">
              <img
                src={starterPokemon.sprites.front_default}
                alt={starterPokemon.name}
                className="w-16 h-16 object-contain"
              />
              <span className="capitalize text-sm font-semibold text-slate-200">
                {starterPokemon.name}
              </span>
            </div>
          ) : (
            <p className="text-slate-500 text-sm">Loading pokemon...</p>
          )}
        </div>

        {/* แสดงผลทีมช่วยเหลือที่ถูกเรียกมา (Stage 3 ขึ้นไป) */}
        {rescuePokemon.length > 0 && gamePhase !== "idle" && (
          <div className="my-4 p-4 border border-yellow-500/50 rounded-lg bg-slate-800/80">
            <p className="text-yellow-400 font-semibold text-sm mb-3">
              {gamePhase === "pod_built" || gamePhase === "pod_at_secret_room" || gamePhase === "prisoner_entered_pod"
                ? "All aboard the Escape Pod!"
                : "Rescue Team Ready:"}
            </p>
            <div className="flex justify-center items-center gap-4 flex-wrap">
              {rescuePokemon.map((p) => (
                <div key={p.name} className="flex flex-col items-center">
                  <img src={p.sprites.front_default} alt={p.name} className="w-12 h-12" />
                  <span className="capitalize text-xs text-slate-300">{p.name}</span>
                </div>
              ))}
              {/* เมื่อช่วยออกมาภายนอกสำเร็จ (Stage 8) แสดงนักโทษกับทีมข้างนอก */}
              {gamePhase === "escaped" && prisoner && (
                <div className="flex flex-col items-center border border-green-500 rounded p-1 bg-green-950/40">
                  <img src={prisoner.sprites.front_default} alt={prisoner.name} className="w-12 h-12" />
                  <span className="capitalize text-xs text-green-300 font-bold">{prisoner.name} ✓</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* แสดงปุ่มเรียกทีมช่วยเหลือ (Stage 2) */}
        {isHelpReceived && gamePhase === "idle" && (
          <div className="my-3">
            <p className="text-yellow-300 font-bold text-sm mb-2">Help signal received from inside!</p>
            <button
              type="button"
              onClick={handleCallReinforcements}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2 rounded-lg shadow-md transition-all"
            >
              Call for Reinforcements!
            </button>
          </div>
        )}

        {/* แสดงปุ่มสร้าง Escape Pod (Stage 3) */}
        {gamePhase === "reinforcements_called" && (
          <div className="my-3">
            <button
              type="button"
              onClick={handleBuildPod}
              className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-2 rounded-lg shadow-md transition-all"
            >
              Build Escape Pod!
            </button>
          </div>
        )}

        {/* ส่วนกล่องส่งข้อความจาก Outside ไปยัง Secret Room */}
        <div className="mt-4 flex flex-col items-center gap-2">
          <p className="text-purple-400 text-sm">
            Message to the Secret Room:{" "}
            <span className="text-yellow-300 font-semibold">{question || "Waiting..."}</span>
          </p>

          <textarea
            value={question}
            onChange={handleQuestion}
            placeholder="Type your message here..."
            className="bg-white text-black rounded px-3 py-2 text-center w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <p className="text-emerald-400 text-sm mt-1">
            Reply from the Secret Room:{" "}
            <span className="text-yellow-300 font-semibold">{answer || "Waiting for a reply..."}</span>
          </p>
        </div>
      </div>

      {/* --------------------------------------------------------- */}
      {/* Modal โหลดการสร้าง Escape Pod (Stage 4) */}
      {/* --------------------------------------------------------- */}
      {showBuildModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-slate-900 border-2 border-yellow-400 rounded-xl p-6 w-80 text-center shadow-2xl">
            <h2 className="text-yellow-400 font-bold text-lg mb-4">Building Escape Pod...</h2>
            
            {/* Progress Bar Container */}
            <div className="w-full bg-slate-700 rounded-full h-5 mb-3 overflow-hidden p-0.5 border border-slate-600">
              <div
                className="bg-yellow-400 h-full rounded-full transition-all duration-200"
                style={{ width: `${podProgress}%` }}
              />
            </div>
            
            <p className="text-white font-bold text-xl">{podProgress}%</p>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------- */}
      {/* Component ปราสาท (Castle) ส่ง Props ลงไปยัง SecretRoom */}
      {/* --------------------------------------------------------- */}
      <Castle
        question={question}
        answer={answer}
        handleAnswer={handleAnswer}
        prisoner={prisoner}
        rescuePokemon={rescuePokemon}
        gamePhase={gamePhase}
        handleCallPod={handleCallPod}
        handleEnterPod={handleEnterPod}
        handleTransportOutside={handleTransportOutside}
      />
    </div>
  );
}