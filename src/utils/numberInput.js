export const MAX_GRAMS_INPUT = 1000000;

export function sanitizeDecimalInput(value) {
  const cleaned = value.replace(',', '.').replace(/[^\d.]/g, '');
  const firstDotIndex = cleaned.indexOf('.');

  if (firstDotIndex === -1) {
    return cleaned;
  }

  const integerPart = cleaned.slice(0, firstDotIndex + 1);
  const decimalPart = cleaned.slice(firstDotIndex + 1).replace(/\./g, '');

  return `${integerPart}${decimalPart}`;
}

export function sanitizeIntegerInput(value) {
  return value.replace(/\D/g, '');
}

export function parseNonNegativeDecimal(value) {
  if (value.trim() === '') return null;
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric < 0) return null;
  return numeric;
}

export function parseNonNegativeInteger(value) {
  if (value.trim() === '') return null;
  const numeric = Number(value);
  if (!Number.isInteger(numeric) || numeric < 0) return null;
  return numeric;
}

export function clampGrams(value) {
  return Math.min(value, MAX_GRAMS_INPUT);
}
