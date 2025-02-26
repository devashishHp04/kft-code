const errorMessages: Record<string, string> = {
  "auth/invalid-email": "Invalid email format.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/user-not-found": "No account found with this email.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/email-already-in-use": "Email is already in use.",
  "auth/weak-password": "Password should be at least 6 characters.",
  "auth/missing-password": "Password is required.",
  "auth/too-many-requests": "Too many login attempts. Please try again later.",
  "auth/network-request-failed": "Network error. Please check your connection.",
  "auth/internal-error": "An internal error occurred. Please try again.",
  "auth/requires-recent-login": "Please log in again to perform this action.",
  "auth/provider-already-linked":
    "This provider is already linked to your account.",
  "auth/popup-closed-by-user": "Popup closed before completing sign-in.",
  "auth/cancelled-popup-request": "Multiple popups detected. Try again.",
  "auth/account-exists-with-different-credential":
    "This email is already linked with a different sign-in method.",
  "auth/credential-already-in-use": "This credential is already in use.",
  "auth/invalid-credential": "Invalid credentials provided.",
  "auth/operation-not-allowed": "Sign-in method is disabled.",
  "auth/session-cookie-expired": "Session expired. Please log in again.",
  "auth/unauthorized-domain":
    "This domain is not authorized for authentication.",
  default: "Unexpected error encountered.",
};

export const getErrorMessage = (code: string): string => {
  return errorMessages[code] || errorMessages.default;
};
