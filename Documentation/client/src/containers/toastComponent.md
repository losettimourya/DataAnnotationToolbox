# `toastCOmponent.js` Documentation

## Description

The `CustomToast.js` module is a React component designed to display customized toast notifications within a web application. Toast notifications are typically used to provide feedback or alerts to users in a non-intrusive manner.

## Component Overview

- **React Component Name**: `CustomToast`
- **File Name**: `CustomToast.js`
- **Dependencies**: `FireIcon`, `CheckIcon`, `XIcon`, `ExclamationIcon`, `Toast` (from 'flowbite-react'), `UpdateToastData`

## Component Structure

The `CustomToast` component is structured as follows:

1. **Component State**:
   - The component primarily relies on data passed as props (through `toastData`) to render toast notifications.
   - Each toast notification includes properties such as `variant`, `message`, and `active` to determine its appearance and behavior.
   - The `toastData` array is mapped to render individual toast notifications.

2. **Dependencies**:
   - `FireIcon`, `CheckIcon`, `XIcon`, `ExclamationIcon`: Icon components used to represent different toast variants.
   - `Toast` (from 'flowbite-react'): A component for rendering toast notifications.
   - `UpdateToastData`: A function or utility used to update the toast data when a toast notification is closed.

3. **Methods**:
   - The `CustomToast` component does not define specific methods within itself but relies on the `UpdateToastData` function to handle the closing of toast notifications.

4. **Rendering Toasts**:
   - The `CustomToast` component maps through the `toastData` array, generating individual toast notifications based on the provided data.
   - Each toast includes an icon, message, and a close button.
   - The `variant` property determines the icon's appearance and the visual style of the toast (info, success, warning, error).
   - The `active` property controls whether the toast is displayed.

5. **User Interaction**:
   - Users can close a toast notification by clicking the close button (X icon).
   - The `UpdateToastData` function is called to update the `toastData` array when a toast is closed.

## Props

The `CustomToast` component accepts the following props:

- `toastData` (Array): An array of toast data objects, where each object includes:
  - `variant` (String): Defines the type of toast (e.g., 'info', 'success', 'warning', 'error').
  - `message` (String): The content or message to be displayed in the toast.
  - `active` (Boolean): Determines whether the toast is visible or not.

- `setToastData` (Function): A function to update the `toastData` array when a toast is closed.

- `countRef` (Reference): A reference used to maintain a count of toast notifications.

## Usage

The `CustomToast` component is typically used to display toast notifications in response to various user actions or system events. It can be integrated into the application's user interface to provide timely feedback.

**Example Usage in a Parent Component:**

```javascript
import React, { useState } from 'react';
import CustomToast from './CustomToast';

function App() {
  const [toastData, setToastData] = useState([]);
  const countRef = useRef(0);

  // Function to add new toast notifications
  const addToastNotification = (variant, message) => {
    const newToast = {
      variant,
      message,
      active: true,
    };
    setToastData([...toastData, newToast]);
    countRef.current += 1;
  };

  return (
    <div className="app-container">
      <header>
        {/* Header content */}
      </header>
      <main>
        <button onClick={() => addToastNotification('success', 'Operation completed successfully')}>Show Success Toast</button>
        <button onClick={() => addToastNotification('error', 'An error occurred')}>Show Error Toast</button>
        <CustomToast toastData={toastData} setToastData={setToastData} countRef={countRef} />
      </main>
      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
}

export default App;
