import { useState } from "react";
import Castle from "./components/01_Castle";

  // pokemon ทั้งหมดที่จะ fetch
  const pokemonOptions = ["pikachu", "bulbasaur", "charmander", "squirtle"];

export default function App() {
  // state ส่งข้อความ
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // const [pokemonName, setPokemonName] = useState("pikachu");
  // const [pokemon, setPokemon] = useState(null);

  const [starterPokemon, setStarterPokemon] = useState([]);
  const [prisoner, setPrisoner] = useState(null);
  const [rescuePokemon, setRescuePokemon] = useState([]);
  const [gamePhase, setGamePhase] = useState("idle");
  const [podProgress, setPodProgress] = useState(0);
  const [showBuildModal, setShowBuildModal] = useState(false);
  const [loadError, setLoadError] = useState(false);

  // useEffct fetch ข้อมูล pokemon ที่ใส่ชื่อได้
  useEffect(() => {
    async function fetchPokemon() {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,);
      const data = await response.json();
      setStarterPokemon(data);
    }
    fetchPokemon();
  }, [pokemonName]);

  // useEffct fetch ข้อมูล pokemon ที่ใส่ชื่อได้
    useEffect(() => {
    async function fetchPrisoner() {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/seaking`,);
      const data = await response.json();
      setPrisoner(data);
    }
    fetchPrisoner();
  }, []);

  // จัดการเปลี่ยนค่าคำภาม
  const handleQuestion = (e) => {
    console.log(e);
    setQuestion(e.target.value);
  }
  // จัดการเปลี่ยนค่าคำตอบ
    const handleAnswer = (e) => {
    console.log(e);
    setAnswer(e.target.value);
  }

  return (
    // card ห้อง secret room
    <div className="flex flex-col justify-center items-center min-h-screen bg-[url('https://i.postimg.cc/HjDB3LGc/ezgif-com-video-to-gif-converter.gif')] bg-repeat bg-gray-300 p-4">

      {/* ข้อความจากกล่อง input */}
      <p className="text-purple-800 text-center">
        Message to Cooper:{" "}
        <span>{question ? `🛰️ ${question}` : "⌛ Waiting for a message"}</span>
      </p>

      <p className="text-purple-800 text-center">
        Message from Cooper:{" "}
        <span className="text-yellow-800">
          {answer 
          ? `🛰️ ${answer}` 
          : "⌛ Waiting for a message..."}
        </span>
      </p>
    
      {/* กล่อง input */}
      <textarea
        value={question} 
        onChange={handleQuestion}
        placeholder="Type your message here..."
        className="bg-white text-black rounded px-2 py-1 text-center my-2"
      />

      <Castle question={question} answer={answer} handleAnswer={handleAnswer} />
    </div>
  );
}