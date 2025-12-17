// (82) 98222-5210
const phoneMask = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  const len = digits.length;

  if (!len) return "";
  if (len <= 2) return digits;
  if (len <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (len <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const numberMask = (value: string) => {
  return value.replace(/\D/g, "");
};
const cepMask = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
};

export const Masks = {
  phoneMask,
  numberMask,
  cepMask,
};
