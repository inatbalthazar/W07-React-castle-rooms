import Corridor from "./06_Corridor.jsx";
export default function Hall({ question, answer, handleAnswer }) {
    return (
        <div className="rounded-[180px] flex flex-col justify-center items-center pt-4 bg-[#7B2CBF] w-[90%]">
            <h1 className="text-red-800 font-bold text-1xl tracking-wide">Mann's Planet</h1>

        {/* <p className="text-purple-300">
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
        </p> */}

            <Corridor 
                question={question}
                answer={answer}
                handleAnswer={handleAnswer}
            />
        </div>
    );
}