"use client";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { formSchema } from "@/schema";
import styles from "./contactForm.module.css";
import Loader from "../loader";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { UserPlus } from "lucide-react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "sonner";
import { FirebaseError } from "firebase/app";
import { FcGoogle } from "react-icons/fc";
import { getErrorMessage } from "@/lib/errorStatus";
import axios from "axios";

interface LoginValues {
  email: string;
  password: string;
}

const initialValues: LoginValues = { email: "", password: "" };

const LoginForm = () => {
  const { push } = useRouter();

  const handleSubmit = async (
    values: LoginValues,
    { setSubmitting }: FormikHelpers<LoginValues>
  ) => {
    try {
      await axios.post("/api/login", values);
      toast.success("Login successful!");
      push("/profile");
    } catch (error) {
      let errorMessage = "";
      if (error instanceof FirebaseError) {
        errorMessage = getErrorMessage(error.response?.data?.error);
      }
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      push("/profile");
    } catch (error) {
      let errorMessage = "";
      if (error instanceof FirebaseError) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.formWrapper}>
        <div className={styles.formContainer}>
          <h2 className={styles.formHeading}>Login</h2>
          <p className={styles.formSubheading}>
            Enter your credentials to access your account.
          </p>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={toFormikValidationSchema(formSchema)}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className={styles.form}>
                <div className={styles.formField}>
                  <label htmlFor="email" className={styles.label}>
                    Email
                  </label>
                  <Field
                    id="email"
                    type="email"
                    name="email"
                    className={`${styles.inputField} ${
                      errors.email && touched.email
                        ? styles.inputFieldError
                        : ""
                    }`}
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>
                <div className={styles.formField}>
                  <label htmlFor="password" className={styles.label}>
                    Password
                  </label>
                  <Field
                    id="password"
                    type="password"
                    name="password"
                    className={`${styles.inputField} ${
                      errors.password && touched.password
                        ? styles.inputFieldError
                        : ""
                    }`}
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.formButton}
                >
                  {isSubmitting ? <Loader /> : "Login"}
                </button>
              </Form>
            )}
          </Formik>
          <button
            type="button"
            className={styles.googleButton}
            onClick={handleGoogleLogin}
          >
            <FcGoogle size={20} className={styles.googleIcon} />
            Login with Google
          </button>
          <button
            type="button"
            className={styles.createAccountButton}
            onClick={() => push("/create-account")}
          >
            <UserPlus size={20} className={styles.googleIcon} />
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
