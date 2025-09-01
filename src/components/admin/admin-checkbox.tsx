import { InputHTMLAttributes } from "react";

type Props = {
  text: string;
  errors?: string[];
} & InputHTMLAttributes<HTMLInputElement>;

export default function AdminCheckBox({ text, name, errors, ...rest }: Props) {
  return (
    <div className="daisy-form-control w-full max-w-md">
      <label className="daisy-label cursor-pointer">
        <span className="daisy-label-text">{text}</span>
        <input
          type="checkbox"
          className="daisy-checkbox daisy-checkbox-primary"
          name={name}
          {...rest}
        />
      </label>

      {errors && (
        <div
          id={`${name ?? ""}-error`}
          aria-live="polite"
          className="text-sm text-red-500 font-semibold text-center mt-1"
        >
          {errors.map((error: string) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
    </div>
  );
}
