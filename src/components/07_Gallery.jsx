import Nook from "./08_Nook.jsx";
export default function Gallery({ question, answer, handleAnswer }) {
    return (
        <div className="rounded-[180px] flex flex-col justify-center items-center pt-4 bg-[#4CC9F0] w-[90%]">
            <h1 className="text-red-800 font-bold text-1xl tracking-wide">Gargantua</h1>

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

            <Nook 
                question={question}
                answer={answer}
                handleAnswer={handleAnswer}
            />
        </div>
    );
}