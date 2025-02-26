# Project Documentation

## Project Overview

This project is a **contact form** built with **Next.js**, **TypeScript**, and several modern libraries to create a dynamic and responsive user interface. The form allows users to submit their **name**, **email**, and **message**. Upon submission, the form is validated using **Formik** and **Zod**. The project also integrates **Apollo Client** for interacting with a **GraphQL** endpoint and **Sonner Toast** for handling success and error notifications.

---

## Technologies Used

- **Next.js**: A React framework for building **SSR (Server Side Rendering)** applications, providing routing and API routes for backend logic.
- **Tailwind CSS**: A utility-first CSS framework for building responsive and flexible layouts.
- **TypeScript**: A typed superset of JavaScript that enhances development with type safety and tooling.
- **Apollo Client**: A library for managing data and state in JavaScript apps, used to connect to a GraphQL API.
- **GraphQL**: A query language for APIs that provides a flexible and efficient way to fetch data.
- **Formik**: A library for managing form state, handling form validation, and handling form submission.
- **Zod**: A TypeScript-first schema validation library used with Formik to validate form inputs.
- **Sonner Toast**: A lightweight toast notification library used to display success or error messages to users after form submission.

---

## Features

- **Responsive Form**: The contact form is fully responsive, built with Tailwind CSS, adapting to different screen sizes.
- **Form Validation**: The form fields (name, email, subject, and message) are validated using Formik and Zod, ensuring that the data is valid before submission.
- **Error Handling**: User-friendly error messages are displayed if the form inputs are invalid.
- **Success Feedback**: After the form submission, users receive a toast notification via Sonner Toast to indicate whether the submission was successful or if there was an error.
- **GraphQL API Integration**: The form data is sent to a GraphQL API using Apollo Client, either for processing or saving to a database.
- **Type Safety**: TypeScript ensures that the form data, validation, and API interactions are type-safe and error-free.

---

## Folder Structure

This structure maintains clarity and separation of concerns, making the app more maintainable and scalable.

## Folder Breakdown

### `/components`

Contains all the reusable UI components in the application.

- **Examples**: Contact form components, input fields, buttons, etc.
- **Purpose**: Helps in keeping the UI elements modular and easy to manage.

### `/lib`

Contains configuration files for libraries or external services.

- **Examples**: Apollo Client setup for GraphQL integration.
- **Purpose**: Centralizes configuration and allows for easier reusability.

### `/providers`

Holds the provider components that wrap the application in contexts or third-party providers.

- **Examples**: `ApolloProvider` for providing the Apollo Client context to the app.
- **Purpose**: Can also include other global state management providers (e.g., context for global app state).

### `/queries`

Contains GraphQL queries and mutations for the application.

- **Examples**: A mutation file for submitting the contact form data to the backend.
- **Purpose**: Keeps all GraphQL-related operations in one place for better organization.

### `/schema`

Holds the schema definitions, especially for form validation using Zod.

- **Examples**: Zod schema for validating form inputs (name, email, subject, etc.).
- **Purpose**: Helps ensure type safety and validation consistency across the app.

### `/types`

Contains TypeScript types used throughout the application.

- **Examples**: Types for the form data structure and API responses.
- **Purpose**: Helps ensure type safety and consistency, avoiding errors related to data structure mismatches.

### `/utils`

Stores utility functions that help in performing common tasks or operations.

- **Examples**: Functions for handling toast notifications or form validation helpers.
- **Purpose**: Helps in avoiding code repetition and centralizes commonly used functions.

## Benefits of this Structure

- **Modularity**: Each folder focuses on a specific concern, making the codebase easier to manage and scale.
- **Maintainability**: With a clear separation of concerns, it's easier to make updates or changes without affecting unrelated parts of the code.
- **Scalability**: As the app grows, this structure allows for easy additions of new features or components.

This approach promotes organization, reusability, and scalability, which are crucial for maintaining clean and efficient codebases.

## Error Handling

- **Global Error**: An error boundary is used for component-level error handling with proper error messages.
- **API Error**: Errors are displayed using toast notifications with clear and helpful error messages.
- **Form Error**: Invalid form inputs display error messages in red, ensuring clarity for users.
