import { useState } from "react";
import { IMaskInput } from "react-imask";

function Input({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  mask,
  required,
  name,
}) {
  const [showPassword, setShowPassword] = useState(false);

  // Define dinamicamente se o tipo é texto ou senha baseado no olhinho
  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  // Extraímos as classes base do input para não repetir código
  const baseInputClass =
    "w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 bg-gray-50 text-[#0a1945]";

  return (
    <div className="flex flex-col mb-4">
      <label
        htmlFor={id}
        className="text-[#0a1945] font-extrabold text-sm mb-1"
      >
        {label}
      </label>

      <div className="relative flex items-center">
        {/* Renderiza o IMaskInput SE existir uma mask, senão renderiza o input normal */}
        {mask ? (
          <IMaskInput
            mask={mask}
            id={id}
            name={name}
            type={inputType}
            placeholder={placeholder}
            value={value}
            onAccept={(val) => {
              // O onAccept do IMask é um pouco diferente do onChange nativo.
              // Precisamos simular o evento (e) para o Form funcionar.
              onChange({ target: { name: name, value: val } });
            }}
            required={required}
            className={baseInputClass}
          />
        ) : (
          <input
            id={id}
            name={name}
            type={inputType}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            className={baseInputClass}
          />
        )}

        {/* Botão do Olhinho (Só renderiza se o tipo original era password) */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-gray-500 hover:text-[#0a1945] focus:outline-none transition-colors z-10"
          >
            {showPassword ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default Input;
