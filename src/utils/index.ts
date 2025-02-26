import DOMPurify from "dompurify";

export const customSanitizeValue = (value: string) => {
  return DOMPurify.sanitize(value);
};
