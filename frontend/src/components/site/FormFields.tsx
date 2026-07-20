import { type ReactNode } from "react";

export function Field({
  label,
  name,
  type = "text",
  required,
  wide,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  wide?: boolean;
  placeholder?: string;
}) {
  return (
    <label className={`flex flex-col gap-2 ${wide ? "sm:col-span-2" : ""}`}>
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/80">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="rounded-lg border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}

export function TextareaField({
  label,
  name,
  required,
  wide = true,
  rows = 5,
  hint,
}: {
  label: string;
  name: string;
  required?: boolean;
  wide?: boolean;
  rows?: number;
  hint?: ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-2 ${wide ? "sm:col-span-2" : ""}`}>
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/80">
        {label}
        {required && <span className="text-accent"> *</span>}
        {hint && <span className="ml-2 text-[10px] font-normal normal-case tracking-normal text-muted-foreground">{hint}</span>}
      </span>
      <textarea
        name={name}
        required={required}
        rows={rows}
        className="resize-y rounded-lg border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}

export function SelectField({
  label,
  name,
  options,
  required,
  value,
  onChange,
  wide,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  value?: string;
  onChange?: (v: string) => void;
  wide?: boolean;
}) {
  return (
    <label className={`flex flex-col gap-2 ${wide ? "sm:col-span-2" : ""}`}>
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/80">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      <select
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="rounded-lg border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export function RadioField({
  label,
  name,
  options,
  required,
  value,
  onChange,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <div className="sm:col-span-2 flex flex-col gap-3">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/80">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      <div className="flex flex-wrap gap-3">
        {options.map((o) => (
          <label
            key={o}
            className={`cursor-pointer rounded-full border px-5 py-2 text-sm transition ${
              value === o
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-foreground hover:border-primary/40"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={o}
              required={required}
              checked={value === o}
              onChange={() => onChange?.(o)}
              className="sr-only"
            />
            {o}
          </label>
        ))}
      </div>
    </div>
  );
}