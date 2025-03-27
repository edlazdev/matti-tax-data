export const REGEX = {
  RFC: {
    FISICA: /^[A-ZÑ&]{4}\d{6}[A-Z\d]{3}$/,
    MORAL: /^[A-ZÑ&]{3}\d{6}[A-Z\d]{2}$/,
  },
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Basic email format
  ZIP_CODE: /^\d{5}$/, // Mexican ZIP code format: 5 digits
};
