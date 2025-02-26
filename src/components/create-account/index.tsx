"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signUpSchema } from "@/schema";
import styles from "./create-account.module.css";
import Loader from "../loader";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { getErrorMessage } from "@/lib/errorStatus";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

interface HandleSubmitParams {
  setSubmitting: (isSubmitting: boolean) => void;
}

const CreateAccount = () => {
  const router = useRouter();

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: HandleSubmitParams
  ) => {
    try {
      await axios.post("/api/signup", values);
      toast.success("Account created successfully!");
    } catch (error) {
      let errorMessage = "Failed to create account";
      console.log(error.response?.data?.error, "error.response?.data?.error");

      if (axios.isAxiosError(error)) {
        errorMessage =
          getErrorMessage(error.response?.data?.error) || errorMessage;
      }

      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.formWrapper}>
        <div className={styles.formContainer}>
          <h2 className={styles.formHeading}>Create Account</h2>
          <p className={styles.formSubheading}>
            Sign up to start your journey with us.
          </p>
          <Formik
            initialValues={initialValues}
            validationSchema={toFormikValidationSchema(signUpSchema)}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className={styles.form}>
                <div className={styles.formField}>
                  <label htmlFor="name" className={styles.label}>
                    Full Name
                  </label>
                  <Field
                    id="name"
                    type="text"
                    name="name"
                    className={`${styles.inputField} ${
                      errors.name && touched.name ? styles.inputFieldError : ""
                    }`}
                    placeholder="Enter your full name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>

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

                <div className={styles.formField}>
                  <label htmlFor="confirmPassword" className={styles.label}>
                    Confirm Password
                  </label>
                  <Field
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    className={`${styles.inputField} ${
                      errors.confirmPassword && touched.confirmPassword
                        ? styles.inputFieldError
                        : ""
                    }`}
                    placeholder="Confirm your password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.formButton}
                >
                  {isSubmitting ? <Loader /> : "Create Account"}
                </button>
              </Form>
            )}
          </Formik>

          <p className={styles.alreadyHaveAccount}>
            Already have an account?
            <span className={styles.loginLink} onClick={() => router.push("/")}>
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
