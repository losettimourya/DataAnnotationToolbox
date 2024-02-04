# `TopBar.js` Documentation

## Description

`TopBar.js` is a React component that provides a top bar with essential tools and functionalities for controlling the canvas and managing annotations. This component is typically located at the top of the application interface and is used to control aspects like zooming, history, full screen, and label box visibility.

## Implementation

### Zooming

- **Zoom In and Zoom Out:** The component allows users to zoom in and out of the canvas using the "Zoom In" and "Zoom Out" buttons. The zoom level affects the canvas's scale, which can be manipulated for detailed annotation tasks. The zoom behavior depends on the current scale and available zoom options.

### Full Screen

- **Full Screen:** Users can toggle the application between full-screen and standard display modes. This feature enhances the viewing experience for annotators working on various devices and screen sizes.

### History Management

- **Undo and Redo:** Users can navigate through the annotation history using the "Undo" and "Redo" buttons. These options allow for efficient corrections and revisions during the annotation process. The component stores annotation history in local storage.

### Annotation Management

- **Save and Load Annotations:** The "Save" and "Load" buttons enable users to persist their annotations temporarily. Annotations can be hidden or displayed as needed, offering flexibility during the annotation process. Annotations are stored in local storage.

### Panel Toggles

- **Label Box Toggle:** The "Toggle Label Box" button allows users to hide or reveal the label box, depending on their needs. This feature provides a clean workspace for annotation.

### Navigation

- **Previous and Next Image:** The "Previous" and "Next" buttons help users navigate through a series of images, facilitating a smooth workflow when dealing with multiple images in a dataset.

## Usage

`TopBar.js` is an integral part of your application's interface, offering users the tools and options they need to effectively control the annotation canvas, manage annotations, and navigate between images.

## Example

```jsx
import React from 'react';
import TopBar from './TopBar'; // Replace with the actual path to your TopBar.js file

function MainApp() {
  return (
    <div className="main-app">
      <TopBar />
      {/* ...other components and content... */}
    </div>
  );
}
