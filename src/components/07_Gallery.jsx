import Nook from "./08_Nook.jsx";

// Gallery Component: รับ props ทั้งหมดและส่งต่อไปยัง Nook
export default function Gallery(props) {
    return (
        <div className="rounded-[30px] flex flex-col justify-center items-center p-5 bg-[#4CC9F0] w-[95%] my-1">
            <h1 className="text-red-800 font-bold text-1xl tracking-wide mb-2">Gargantua</h1>

            <Nook {...props} />
        </div>
    );
}