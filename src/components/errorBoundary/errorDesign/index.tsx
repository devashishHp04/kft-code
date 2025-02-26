"use client";
import React from "react";
import styles from "./errorDesign.module.css";

const ErrorDesign: React.FC = () => {
  const handleRetry = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.center}>
          <div className={styles.icon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M2.725 21q-.275 0-.5-.137t-.35-.363t-.137-.488t.137-.512l9.25-16q.15-.25.388-.375T12 3t.488.125t.387.375l9.25 16q.15.25.138.513t-.138.487t-.35.363t-.5.137zM12 18q.425 0 .713-.288T13 17t-.288-.712T12 16t-.712.288T11 17t.288.713T12 18m0-3q.425 0 .713-.288T13 14v-3q0-.425-.288-.712T12 10t-.712.288T11 11v3q0 .425.288.713T12 15"
              />
            </svg>
          </div>
        </div>
        <h2 className={styles.title}>Oops! Something went wrong</h2>
        <p className={styles.message}>
          We encountered an issue while processing your request. Please try
          again or contact support if the issue persists.
        </p>
        <button onClick={handleRetry} className={styles.button}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorDesign;
