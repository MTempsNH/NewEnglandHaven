export const CONSULTATION_TO = "hello@newenglandhavenhomewatch.com";

export type ConsultationPayload = {
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  notes: string;
};

export type ConsultationErrors = Partial<Record<keyof ConsultationPayload | "contact", string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ZIP_PATTERN = /^\d{5}(?:-\d{4})?$/;

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function digits(value: string) {
  return value.replace(/\D/g, "");
}

export function parseConsultation(input: unknown): {
  data?: ConsultationPayload;
  errors: ConsultationErrors;
} {
  const raw = (input ?? {}) as Record<string, unknown>;
  const data: ConsultationPayload = {
    firstName: clean(raw.firstName),
    lastName: clean(raw.lastName),
    city: clean(raw.city),
    state: clean(raw.state),
    zip: clean(raw.zip),
    phone: clean(raw.phone),
    email: clean(raw.email),
    notes: clean(raw.notes),
  };

  const errors: ConsultationErrors = {};

  if (!data.firstName) errors.firstName = "Enter your first name.";
  if (!data.lastName) errors.lastName = "Enter your last name.";
  if (!data.city) errors.city = "Enter your city.";
  if (!data.state) errors.state = "Select your state.";
  if (!ZIP_PATTERN.test(data.zip)) errors.zip = "Enter a valid ZIP code.";

  const phoneDigits = digits(data.phone);
  const hasPhone = phoneDigits.length >= 10;
  const hasEmail = EMAIL_PATTERN.test(data.email);

  if (data.phone && !hasPhone) errors.phone = "Enter a valid phone number.";
  if (data.email && !hasEmail) errors.email = "Enter a valid email address.";
  if (!hasPhone && !hasEmail) {
    errors.contact = "Provide a phone number or email so we can reach you.";
  }
  if (data.notes.length > 2000) {
    errors.notes = "Please keep this under 2,000 characters.";
  }

  return { data: Object.keys(errors).length ? undefined : data, errors };
}

export function formatConsultationEmail(data: ConsultationPayload) {
  const lines = [
    "A new consultation request was submitted on newenglandhavenhomewatch.com.",
    "",
    `Name: ${data.firstName} ${data.lastName}`,
    `City: ${data.city}`,
    `State: ${data.state}`,
    `ZIP: ${data.zip}`,
    `Phone: ${data.phone || "—"}`,
    `Email: ${data.email || "—"}`,
    "",
    "Notes:",
    data.notes || "—",
  ];

  return lines.join("\n");
}
