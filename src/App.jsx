import Castle from "./components/01_Castle";
import { useState } from "react";

export default function App() {
  // declare React's state variable
  const [question, setQuestion] = useState("hello-world!");
  const [answer, setAnswer] = useState("hello-moon!");

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-300">
      <Castle />
      {question}
      {answer}
    </div>
  );
}