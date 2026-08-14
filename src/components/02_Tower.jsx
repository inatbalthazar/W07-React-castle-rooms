import Chamber from "./03_Chamber.jsx";

export default function Tower({ question, answer, handleAnswer }) {
    return (
        <div className="rounded-[180px] flex flex-col justify-center items-center pt-4 bg-[#1F2833] w-[90%]">
            <h1 className="text-red-800 font-bold text-1xl tracking-wide">NASA Facility</h1>

        {/* ข้อความจากกล่อง input */}
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

            <Chamber
                question={question}
                answer={answer}
                handleAnswer={handleAnswer}
            />
        </div>
    )
}