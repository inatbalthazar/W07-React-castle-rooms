import Gallery from "./07_Gallery.jsx";

// Corridor Component: รับ props ทั้งหมดและส่งต่อไปยัง Gallery
export default function Corridor(props) {
    return (
        <div className="rounded-[35px] flex flex-col justify-center items-center p-5 bg-[#3A86FF] w-[95%] my-1">
            <h1 className="text-red-800 font-bold text-1xl tracking-wide mb-2">Endurance</h1>

            <Gallery {...props} />
        </div>
    );
}