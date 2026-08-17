import SecretRoom from "./09_SecretRoom";
export default function Nook({ question, answer, handleAnswer }) {
    return (
        <div className="rounded-[25px] flex flex-col justify-center items-center p-5 bg-[#E2E8F0] w-[95%] my-1">
            <h1 className="text-red-800 font-bold text-1xl tracking-wide mb-2">Event Horizon</h1>

            <SecretRoom
                question={question}
                answer={answer}
                handleAnswer={handleAnswer}
            />
        </div>
    );
}
