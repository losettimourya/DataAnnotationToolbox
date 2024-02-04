# `ImagePage.js` Documentation

## Description

`ImagePage.js` is a React component responsible for rendering a page in a web application where users can upload and manage image files. It provides the ability to select an image file, upload it to the server, and view the uploaded images.

## Component Overview

- **React Component Name**: `ImagePage`
- **File Name**: `ImagePage.js`
- **Dependencies**: `React`, `axios`, `GetFiles`, `config`, `useParams`, `useStore`

## Component Structure

The `ImagePage` component is structured as follows:

1. **State Management**:
   - `currentFile`: Represents the currently selected file and its count.
   - `isUploaded`: Keeps track of whether a file has been successfully uploaded.

2. **URL Parameter Parsing**:
   - Utilizes the `useParams` hook to parse the dataset ID from the URL.

3. **File Selection**:
   - Provides an input field for selecting an image file.
   - `handleChange` function updates the `currentFile` state with the selected file.

4. **File Upload**:
   - Allows users to upload the selected file to the server.
   - `uploadFile` function sends a POST request with the file data to the server using Axios.

5. **Fullscreen Mode**:
   - Utilizes the `useStore` custom hook for managing application-wide state, specifically toggling fullscreen mode.
   - Displays the upload form only when not in fullscreen mode.

## Functions

- `handleChange(e: Event)`: Updates the `currentFile` state with the selected image file.
- `uploadFile(e: Event)`: Initiates the file upload process by sending a POST request to the server.

## Dependencies

- `axios`: Used for making HTTP requests.
- `GetFiles`: Imported component for displaying and managing uploaded files.
- `config`: Configuration file containing the base URL for server requests.
- `useParams` from `react-router-dom`: Used to extract parameters from the URL.
- `useStore` from `store.js`: Custom hook for managing application-wide state.

## Usage

The `ImagePage` component is typically used in a web application to provide users with a user-friendly interface for uploading, managing, and viewing image files. It can be integrated into a broader application structure where users need to interact with image data.

**Example Usage in a Parent Component:**

```javascript
import React from 'react';
import ImagePage from './ImagePage';

function App() {
  return (
    <div className="App">
      <ImagePage />
      {/* ... other components or content ... */}
    </div>
  );
}

export default App;
