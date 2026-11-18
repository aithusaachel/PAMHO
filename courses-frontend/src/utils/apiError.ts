const FIELD_LABELS: Record<string, string> = {
  full_name: 'Full name',
  name: 'Name',
  email: 'Email',
  whatsapp: 'WhatsApp number',
  cv_file_name: 'CV file name',
  enquiry_type: 'Enquiry type',
  non_field_errors: '',
};

/**
 * Turns a failed API response into a message a visitor can act on,
 * e.g. "Email: Enter a valid email address."
 */
export async function readApiError(res: Response, fallback: string): Promise<string> {
  let data: unknown;
  try {
    data = await res.json();
  } catch {
    return fallback;
  }
  if (!data || typeof data !== 'object') return fallback;

  const obj = data as Record<string, unknown>;
  if (typeof obj.detail === 'string') return obj.detail;
  if (typeof obj.error === 'string') return obj.error;

  const parts = Object.entries(obj).map(([field, errs]) => {
    const text = Array.isArray(errs) ? errs.join(' ') : String(errs);
    const label = field in FIELD_LABELS
      ? FIELD_LABELS[field]
      : field.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase());
    return label ? `${label}: ${text}` : text;
  });
  return parts.length ? parts.join(' ') : fallback;
}
