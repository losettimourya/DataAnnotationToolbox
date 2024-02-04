# `SignUpForm.js` Documentation

## Description

`SignUpForm.js` is a React component that provides a user interface for user registration. It contains form fields for collecting user information such as first name, last name, email, password, institution, and designation. The component performs validation on the input fields and displays appropriate error messages. Upon successful validation, the component sends a POST request to the server to create a new user account.

## Implementation

### Input Field Components

- **SignUpInputField Component:** This component is used to create individual input fields. It handles validation logic, onBlur events, and displays error messages when necessary.

### Form Handling

- **State Management:** The component uses the `useState` hook to manage the states of input fields and their touched states (to trigger validation onBlur).
- **Validation:** Validation functions check the input fields for various criteria such as email format, password length, and alphanumeric names. Error messages are displayed based on the validation results.
- **Form Submission:** When the form is submitted, the `handleSubmit` function checks for validation errors. If there are no errors, it constructs a request object and sends a POST request to the server for user registration.
- **Error Handling:** If there are errors during registration, appropriate toast messages are displayed to the user.

### UI Elements

- **Input Fields:** The component contains input fields for first name, last name, email, password, institution, and designation. Each input field is validated individually.
- **Role Selection:** Users can select their role from the available options (user, admin, moderator). Admin role selection is disabled.
- **Remember Me:** Users can choose to enable the "Remember me" feature.
- **Forgot Password:** Users can click on "Forgot password?" to navigate to a page for password recovery.
- **Login Link:** Users are provided with a link to log in if they are already a member.

### Validation

- **Regex Patterns:** Regular expressions are used to validate email format and name inputs.
- **Length Check:** Password length is validated to ensure it is at least 6 characters long.
- **Field Presence:** All fields are validated for presence to prevent empty submissions.

## Usage

The `SignUpForm.js` component is used in the registration page of the application. It allows new users to enter their details and register for an account.

## Example

```jsx
import React from 'react';
import SignUpForm from './SignUpForm'; // Replace with the actual path to your SignUpForm.js file

function SignUpPage() {
  return (
    <div className="sign-up-page">
      <SignUpForm />
      {/* ...other components and content... */}
    </div>
  );
}
```

## Functionality

The `SignUpForm.js` component facilitates user registration by providing a user-friendly interface for entering registration details. It enhances user experience by displaying appropriate error messages and allowing users to register for an account.

## Notes

- Ensure proper backend server endpoints are configured for user registration.
- Customize the error messages and validation logic based on the specific requirements of the application.