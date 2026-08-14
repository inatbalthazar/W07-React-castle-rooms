import Room from "./04_Room.jsx";

export default function Chamber({ question, answer, handleAnswer }) {
    return (
        <div className="rounded-[180px] flex flex-col justify-center items-center pt-4 bg-[#2E1A47] w-[90%]">
            <h1>Chamber</h1>

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

            <Room 
                question={question}
                answer={answer}
                handleAnswer={handleAnswer}
            />
        </div>
    );
}