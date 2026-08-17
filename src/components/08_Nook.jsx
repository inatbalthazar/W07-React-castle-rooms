import SecretRoom from "./09_SecretRoom";

// Nook Component: รับ props ทั้งหมดและส่งต่อไปยัง SecretRoom
export default function Nook(props) {
    return (
        <div className="rounded-[25px] flex flex-col justify-center items-center p-5 bg-[#E2E8F0] w-[95%] my-1">
            <h1 className="text-red-800 font-bold text-1xl tracking-wide mb-2">Event Horizon</h1>

            <SecretRoom {...props} />
        </div>
    );
}
