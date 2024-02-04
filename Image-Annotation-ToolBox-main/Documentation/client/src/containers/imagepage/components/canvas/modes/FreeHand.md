# `FreeHand.js` Documentation

## Description

The `FreeHand.js` file is responsible for rendering freehand-drawn bounding boxes in the application. This component provides users with the capability to create regions with freehand sketches, allowing for flexible and irregular shapes in annotations. The freehand tool is particularly useful when precise outlining is required.

## Implementation

### Drawing Freehand Regions

The `FreeHand` component allows users to create regions by drawing freehand shapes on the canvas. The tool captures the user's input as they drag the cursor, and it dynamically adapts to their movements, creating a continuous and closed curve. Here's a summary of the key features:

- Clicking on the canvas initiates the freehand drawing.
- Users can move the cursor to create any desired shape.
- Releasing the cursor closes the shape and forms a region.
- Users can create multiple freehand regions within a single image.

### Usage

The `FreeHand.js` component is integrated into the application's `Canvas.js` file, which provides a set of tools and modes for displaying on the canvas. When the "Freehand" tool is selected, this component is responsible for rendering freehand-drawn bounding boxes. It can be utilized in a grid layout to display multiple images with freehand annotations.

### Example

```jsx
import React from 'react';
import FreeHand from './FreeHand'; // Replace with the actual path to your FreeHand.js file

function Canvas({ imagelist, gridsize, tool, imageURL }) {
  const setCanvasMode = (id, imageURL) => {
    switch (id) {
      case 2:
        return <FreeHand imageURL={imageURL} />;
      // Other cases for different tools
      default:
        return <PointerMode imageURL={imageURL} />;
    }
  }

  return (
    <React.Fragment>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {imagelist.map((item, index) => (
          <div
            key={index}
            style={{
              width: `${100 / gridsize}%`,
              height: `${100 / gridsize}%`,
              boxSizing: "border-box",
              padding: "4px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {setCanvasMode(tool.id, item)}
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};
