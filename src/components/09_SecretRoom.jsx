export default function SecretRoom({ question, answer, handleAnswer }) {
    return (
        <div className="rounded-[180px] flex flex-col justify-center items-center pt-10 bg-[#FFD166] w-[90%]">
            <div className="flex flex-col items-center mb-6">
                <h2 className="font-bold text-3xl mt-4 text-pink-300 tracking-wide"> Secret Room</h2>
                <p className="text-gray-400 text-sm">Message From The Outside</p>
            
        {/* ข้อความจากกล่อง input */}
        <p className="text-purple-300">
            Message from Earth:{""}
            <span>{question
                ? `✅ ${question}` 
                : "⌛ Waiting for a message..."}
            </span>
        </p>
        <p className="text-purple-300">
            Message for Secret Room:{""}
            <span className="text-yellow-300">
                {answer 
                ? `✅ ${answer}` 
                : "⌛ Waiting for a message..."}
            </span>
        </p>

            </div>
        </div>
    );
}