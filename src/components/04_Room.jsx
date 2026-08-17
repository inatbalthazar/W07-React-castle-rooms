import Hall from "./05_Hall.jsx";

// Room Component: รับ props ทั้งหมดและส่งต่อไปยัง Hall
export default function Room(props) {
    return (
        <div className="rounded-[45px] flex flex-col justify-center items-center p-5 bg-[#4B2E83] w-[95%] my-1">
            <h1 className="text-red-800 font-bold text-1xl tracking-wide mb-2">Miller's Planet</h1>

            <Hall {...props} />
        </div>
    );
}