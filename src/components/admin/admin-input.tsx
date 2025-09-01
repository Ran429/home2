import { cn } from "@/lib/utils";
import { InputHTMLAttributes, LegacyRef } from "react";

type InputWithLabelProps = {
  topLeft?: string;
  topRight?: string;
  topRightClass?: string;
  errors?: string[];
  inputRef?: LegacyRef<HTMLInputElement> | undefined;
  wrapperClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function AdminInput({
  name,
  topLeft,
  topRight,
  topRightClass,
  errors,
  inputRef,
  wrapperClassName,
  type,
  ...rest
}: InputWithLabelProps) {
  return (
    <div
      className={cn(
        "daisy-form-control w-full max-w-md",
        wrapperClassName ?? ""
      )}
    >
      {(topLeft || topRight) && (
        <label className="daisy-label">
          <span className="daisy-label-text">{topLeft ?? ""}</span>

          {topRight && (
            <span className={cn("daisy-label-text-alt", topRightClass ?? "")}>
              {topRight}
            </span>
          )}
        </label>
      )}

      <input
        name={name ?? ""}
        type={type ?? "text"}
        className={cn(
          "w-full max-w-md",
          {
            "border-red-500": errors != null && errors.length > 0,
          },
          type !== "file"
            ? "daisy-input daisy-input-bordered"
            : "daisy-file-input daisy-file-bordered"
        )}
        aria-describedby={`${name ?? "input"}-error`}
        ref={inputRef}
        {...rest}
      />

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
