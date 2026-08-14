import Hall from "./05_Hall.jsx";

export default function Room({ question, answer, handleAnswer }) {
    return (
        <div className="rounded-[180px] flex flex-col justify-center items-center pt-4 bg-[#4B2E83] w-[90%]">
            <h1>Room</h1>

        <p className="text-purple-300">
            Message from Earth:{""}
            <span>{question
                ? `✅ ${question}` 
                : "⌛ Waiting for a message..."}
            </span>
        </p>

        <p className="text-purple-300">
            Message from Cooper:{""}
            <span className="text-yellow-300">
                {answer 
                ? `✅ ${answer}` 
                : "⌛ Waiting for a message..."}
            </span>
        </p>

            <Hall 
                question={question}
                answer={answer}
                handleAnswer={handleAnswer}
            />
        </div>
    );
}