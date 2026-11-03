"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { US_STATES } from "@/data/us-states";
import { ArrowRight, Close } from "./icons";
import { parseConsultation, type ConsultationErrors } from "@/lib/consultation";

type ConsultationContextValue = {
  open: () => void;
};

const ConsultationContext = createContext<ConsultationContextValue | null>(null);

export function useConsultation() {
  const context = useContext(ConsultationContext);
  if (!context) {
    throw new Error("useConsultation must be used within ConsultationProvider");
  }
  return context;
}

const emptyForm = {
  firstName: "",
  lastName: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  email: "",
  notes: "",
  company: "",
};

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ConsultationContext.Provider value={{ open }}>
      {children}
      <ConsultationDialog open={isOpen} onClose={close} />
    </ConsultationContext.Provider>
  );
}

export function ConsultationButton({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const { open } = useConsultation();

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onClick?.();
        open();
      }}
    >
      {children}
    </button>
  );
}

function ConsultationDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const titleId = useId();
  const firstField = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<ConsultationErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => firstField.current?.focus(), 30);

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(timer);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setForm(emptyForm);
      setErrors({});
      setStatus("idle");
      setServerError("");
    }
  }, [open]);

  function update(name: keyof typeof emptyForm, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = parseConsultation(form);
    setErrors(parsed.errors);
    if (!parsed.data) return;

    setStatus("submitting");
    setServerError("");

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = (await response.json()) as {
        errors?: ConsultationErrors;
        error?: string;
      };

      if (!response.ok) {
        if (payload.errors) setErrors(payload.errors);
        setServerError(payload.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setServerError("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (!open) return null;

  return (
    <div className="consult-backdrop" onClick={onClose}>
      <div
        className="consult-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="consult-close" aria-label="Close consultation form" onClick={onClose}>
          <Close size={22} />
        </button>

        {status === "success" ? (
          <div className="consult-success">
            <p className="eyebrow">Request received</p>
            <h2 id={titleId}>Thank you. We’ll be in touch shortly.</h2>
            <p>
              We sent your details to our team. Expect a thoughtful conversation about your home —
              no obligation.
            </p>
            <button type="button" className="button button-dark" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <form className="consult-form" onSubmit={onSubmit} noValidate>
            <p className="eyebrow">Schedule a consultation</p>
            <h2 id={titleId}>Tell us about your home.</h2>
            <p className="consult-lede">
              Share a few details and we’ll follow up to create a care plan that fits.
            </p>

            <div className="consult-grid">
              <Field label="First name" error={errors.firstName}>
                <input
                  ref={firstField}
                  name="firstName"
                  value={form.firstName}
                  onChange={(event) => update("firstName", event.target.value)}
                  autoComplete="given-name"
                />
              </Field>
              <Field label="Last name" error={errors.lastName}>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={(event) => update("lastName", event.target.value)}
                  autoComplete="family-name"
                />
              </Field>
              <Field label="City" error={errors.city}>
                <input
                  name="city"
                  value={form.city}
                  onChange={(event) => update("city", event.target.value)}
                  autoComplete="address-level2"
                />
              </Field>
              <Field label="State" error={errors.state}>
                <select
                  name="state"
                  value={form.state}
                  onChange={(event) => update("state", event.target.value)}
                  autoComplete="address-level1"
                >
                  <option value="">Select</option>
                  {US_STATES.map((state) => (
                    <option key={state.value} value={state.value}>
                      {state.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="ZIP code" error={errors.zip} className="consult-span-2">
                <input
                  name="zip"
                  inputMode="numeric"
                  value={form.zip}
                  onChange={(event) => update("zip", event.target.value)}
                  autoComplete="postal-code"
                />
              </Field>
              <Field label="Phone" error={errors.phone}>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  autoComplete="tel"
                />
              </Field>
              <Field label="Email" error={errors.email}>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(event) => update("email", event.target.value)}
                  autoComplete="email"
                />
              </Field>
            </div>

            <p className={errors.contact ? "consult-hint consult-hint-error" : "consult-hint"}>
              {errors.contact ?? "Phone or email — at least one is required."}
            </p>

            <Field
              label="Anything you'd like to share about your property or how we can help?"
              error={errors.notes}
              className="consult-span-2 consult-field-note"
            >
              <textarea
                name="notes"
                rows={4}
                maxLength={2000}
                value={form.notes}
                onChange={(event) => update("notes", event.target.value)}
              />
            </Field>

            <label className="consult-honeypot" aria-hidden="true">
              Company
              <input
                tabIndex={-1}
                autoComplete="off"
                value={form.company}
                onChange={(event) => update("company", event.target.value)}
              />
            </label>

            {serverError ? <p className="consult-hint consult-hint-error">{serverError}</p> : null}

            <button className="button button-dark consult-submit" type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending…" : "Send request"}
              <ArrowRight />
            </button>
            <small>No obligation. Just a thoughtful conversation.</small>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={className ? `consult-field ${className}` : "consult-field"}>
      <span>{label}</span>
      {children}
      {error ? <em>{error}</em> : null}
    </label>
  );
}
