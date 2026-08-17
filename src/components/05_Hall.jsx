import Corridor from "./06_Corridor.jsx";

// Hall Component: รับ props ทั้งหมดและส่งต่อไปยัง Corridor
export default function Hall(props) {
    return (
        <div className="rounded-[40px] flex flex-col justify-center items-center p-5 bg-[#7B2CBF] w-[95%] my-1">
            <h1 className="text-red-800 font-bold text-1xl tracking-wide mb-2">Mann's Planet</h1>

            <Corridor {...props} />
        </div>
    );
}