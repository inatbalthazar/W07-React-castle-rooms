import SecretRoom from "./09_SecretRoom";
export default function Nook({ question, answer, handleAnswer }) {
    return (
        <div className="rounded-[180px] flex flex-col justify-center items-center pt-4 bg-[#E2E8F0] w-[90%]">
            <h1>Nook</h1>

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

            <SecretRoom
                question={question}
                answer={answer}
                handleAnswer={handleAnswer}
            />
        </div>
    );
}
