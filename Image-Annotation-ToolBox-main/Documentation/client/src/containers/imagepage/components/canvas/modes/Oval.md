# `Oval.js` Documentation

## Description

The `Oval.js` file is responsible for rendering elliptical bounding boxes on the canvas. This component provides the functionality to create and display elliptical regions, allowing users to define and visualize elliptical shapes for annotations.

## Implementation

### Creating Elliptical Regions

The `Oval.js` component approximates an ellipse by generating a set of points around a center point. The number of points used to approximate the ellipse can be adjusted, providing control over the smoothness of the elliptical shape. The ellipse is created based on the following parameters:

- Center point (x, y)
- Semi-major axis (a)
- Semi-minor axis (b)

The component then calculates the coordinates of points on the ellipse using the trigonometric functions `cos` and `sin`.

### Usage

The `Oval.js` component is integrated into the application's `Canvas.js` file, which offers various annotation tools and modes. When the "Oval" tool is selected, this component is responsible for rendering elliptical bounding boxes on the canvas.

### Example

```jsx
import React from 'react';
import Oval from './Oval'; // Replace with the actual path to your Oval.js file

function Canvas({ imagelist, gridsize, tool, imageURL }) {
  const setCanvasMode = (id, imageURL) => {
    switch (id) {
      case 10:
        return <Oval imageURL={imageURL} />;
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
