// 09_SecretRoom Component: ห้องคุกชั้นในสุด
export default function SecretRoom({
  question,
  answer,
  handleAnswer,
  prisoner,
  rescuePokemon,
  gamePhase,
  handleCallPod,
  handleEnterPod,
  handleTransportOutside,
}) {
  return (
    <div className="rounded-[20px] flex flex-col justify-center items-center p-6 bg-[#FFD166] w-[95%] my-1 text-slate-900 shadow-inner">
      <div className="flex flex-col items-center text-center w-full max-w-md">
        <h2 className="font-bold text-2xl mb-3 text-purple-950 tracking-wide">Tesseract</h2>

        {/* ------------------------------------------------------------- */}
        {/* การแสดงผลคุกและตัวละครนักโทษ (Seaking) */}
        {/* ------------------------------------------------------------- */}
        {gamePhase !== "escaped" ? (
          <div className="border-2 border-red-500 rounded-xl p-4 bg-slate-900/90 text-white w-full mb-4 shadow-md flex flex-col items-center">
            <h3 className="font-bold text-red-400 text-lg mb-2">
              {gamePhase === "prisoner_entered_pod" ? "Entering the pod..." : "A prisoner is trapped here!"}
            </h3>

            {prisoner ? (
              <div className="flex flex-col items-center">
                <img
                  src={prisoner.sprites.front_default}
                  alt={prisoner.name}
                  className={`w-20 h-20 object-contain transition-all duration-500 ${
                    gamePhase === "prisoner_entered_pod" ? "opacity-30 grayscale scale-90" : "opacity-100"
                  }`}
                />
                <span className="capitalize text-sm font-semibold text-slate-300">
                  {prisoner.name}
                </span>
              </div>
            ) : (
              <p className="text-slate-400 text-sm">Loading prisoner...</p>
            )}
          </div>
        ) : (
          /* เมื่อหนีออกไปข้างนอกสำเร็จ (Stage 8) */
          <div className="border-2 border-green-500 rounded-xl p-4 bg-slate-900/90 text-white w-full mb-4 shadow-md text-center">
            <h3 className="font-bold text-green-400 text-xl mb-1">The prisoner has escaped!</h3>
            <p className="text-slate-400 text-sm">The Secret Room is empty.</p>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* Stage 5: สัมผัสได้ว่ามี Escape Pod รออยู่ข้างนอก -> แสดงปุ่ม Call the Pod! */}
        {/* ------------------------------------------------------------- */}
        {gamePhase === "pod_built" && (
          <div className="my-2 p-3 bg-purple-950/80 border border-purple-400 rounded-lg text-white w-full text-center">
            <p className="text-purple-200 text-xs mb-2">You sense something waiting just outside...</p>
            <button
              type="button"
              onClick={handleCallPod}
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2 rounded-lg shadow transition-all"
            >
              Call the Pod!
            </button>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* Stage 6 & 7: Escape Pod มาถึง Secret Room -> แสดงตัวละครใน Pod และปุ่มดำเนินการ */}
        {/* ------------------------------------------------------------- */}
        {(gamePhase === "pod_at_secret_room" || gamePhase === "prisoner_entered_pod") && (
          <div className="my-3 p-4 border-2 border-yellow-400 rounded-xl bg-slate-900 text-white w-full text-center shadow-lg">
            <p className="text-yellow-400 font-bold text-sm mb-3">The Escape Pod is here!</p>
            
            {/* รายชื่อโปเกมอนใน Escape Pod */}
            <div className="flex justify-center items-center gap-3 flex-wrap mb-3">
              {rescuePokemon.map((p) => (
                <div key={p.name} className="flex flex-col items-center">
                  <img src={p.sprites.front_default} alt={p.name} className="w-10 h-10" />
                  <span className="capitalize text-[10px] text-slate-300">{p.name}</span>
                </div>
              ))}

              {/* เมื่อกด Enter the Pod แล้ว นักโทษจะเข้ามาใน Pod */}
              {gamePhase === "prisoner_entered_pod" && prisoner && (
                <div className="flex flex-col items-center border border-green-400 rounded p-1 bg-green-950/60">
                  <img src={prisoner.sprites.front_default} alt={prisoner.name} className="w-10 h-10" />
                  <span className="capitalize text-[10px] text-green-300 font-bold">{prisoner.name} ✓</span>
                </div>
              )}
            </div>

            {/* ปุ่ม Stage 6: Enter the Pod! */}
            {gamePhase === "pod_at_secret_room" && (
              <button
                type="button"
                onClick={handleEnterPod}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2 rounded-lg shadow transition-all"
              >
                Enter the Pod!
              </button>
            )}

            {/* ปุ่ม Stage 7: Transport Outside! */}
            {gamePhase === "prisoner_entered_pod" && (
              <button
                type="button"
                onClick={handleTransportOutside}
                className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-extrabold px-6 py-2 rounded-lg shadow-lg transition-all animate-bounce"
              >
                Transport Outside!
              </button>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* ข้อความรับส่งภายนอก-ภายใน */}
        {/* ------------------------------------------------------------- */}
        <p className="text-purple-900 font-semibold text-sm">
          Message from outside:{" "}
          <span className="text-purple-950 font-bold">{question || "Waiting for a message..."}</span>
        </p>

        <textarea
          value={answer}
          onChange={handleAnswer}
          placeholder="Type your reply here..."
          className="bg-white text-black rounded px-3 py-2 text-center mt-2 mb-1 w-64 focus:outline-none focus:ring-2 focus:ring-purple-700"
        />

        <p className="text-emerald-900 font-semibold text-sm">
          Your reply: <span className="text-emerald-950 font-bold">{answer || "..."}</span>
        </p>
      </div>
    </div>
  );
}