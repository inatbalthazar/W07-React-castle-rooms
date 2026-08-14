// import SecretRoom from "./09_SecretRoom";
import Tower from "./02_Tower.jsx";

export default function Castle({ question, answer, handleAnswer }) {
    return (
        <div className="rounded-[180px] flex flex-col justify-center items-center pt-4 bg-[#0B0C10] w-[70%] scale-90">
            <h1 className="text-red-800 font-bold text-1xl tracking-wide">The Cornfield</h1>

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
                    
            <Tower 
                question={question} 
                answer={answer} 
                handleAnswer={handleAnswer} 
            />
        </div>
    );
}
