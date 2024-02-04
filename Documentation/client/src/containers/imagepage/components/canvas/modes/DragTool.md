# `DragTool.js` Documentation

## Description

The `DragTool.js` file provides the functionality to move or displace regions on an image within the application. This tool is used when precise adjustments or repositioning of regions are required. Users can select a region and drag it to a new location on the canvas.

## Implementation

### Dragging Regions

The `DragTool` component allows users to perform the following actions:

- Select a region by clicking on it.
- Drag the selected region to a new position.
- Release the region to confirm the new location.

The component captures the mouse's initial and final positions to calculate the displacement of the region and move it accordingly.

### Usage

The `DragTool.js` component is integrated into the application's `Canvas.js` file, which provides a set of tools and modes for displaying on the canvas. When the "Drag Tool" is selected, this component is responsible for enabling the drag-and-drop functionality for repositioning regions.

### Example

```jsx
import React from 'react';
import DragTool from './DragTool'; // Replace with the actual path to your DragTool.js file

function Canvas({ imagelist, gridsize, tool, imageURL }) {
  const setCanvasMode = (id, imageURL) => {
    switch (id) {
      case 4:
        return <DragTool imageURL={imageURL} />;
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
