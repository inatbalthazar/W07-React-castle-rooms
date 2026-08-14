import Castle from "./components/01_Castle";
import { useState } from "react";

export default function App() {
  // declare React's state variable
  const [question, setQuestion] = useState("hello-world!");

  const [answer, setAnswer] = useState("hello-moon!");

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
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-300">

      {/* ข้อความจากกล่อง input */}
      <p className="text-purple-300">
        Message for Secret Room:{""}
        <span>{question ? `✅ ${question}` : "⌛ Waiting for a message"}</span>
      </p>
    
      {/* กล่อง input */}
      <textarea
      value={question} 
      onChange={handleQuestion}
      placeholder="Type your message here..."
      className="bg-white text-black rounded px-2 py-1"
      />

      <Castle question={question} answer={answer} handleAnswer={handleAnswer} />
    </div>
  );
}