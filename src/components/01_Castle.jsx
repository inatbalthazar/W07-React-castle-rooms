import Tower from "./02_Tower.jsx";

// Castle Component: รับ props ทั้งหมดและส่งต่อไปยัง Tower
export default function Castle(props) {
    return (
        <div className="rounded-[60px] flex flex-col justify-center items-center p-6 bg-[#0B0C10] w-[95%] max-w-5xl my-4 mx-auto">
            <h1 className="text-red-800 font-bold text-1xl tracking-wide mb-2">The Cornfield</h1>

            <Tower {...props} />
        </div>
    );
}
