import { IMaskInput } from "react-imask";

function Input({ label, mask, ...props }) {
  const inputClass =
    "border-2 border-[#0a1945] rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 italic text-sm text-gray-700";

  return (
    <div className="flex flex-col mb-4">
      <label className="text-[#0a1945] font-extrabold mb-1">{label}</label>

      {mask ? (
        <IMaskInput mask={mask} className={inputClass} {...props} />
      ) : (
        <input className={inputClass} {...props} />
      )}
    </div>
  );
}

export default Input;
