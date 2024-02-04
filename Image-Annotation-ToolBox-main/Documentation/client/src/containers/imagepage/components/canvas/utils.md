# `utils.js` Documentation

## Description

The `utils.js` file contains a set of utility functions for controlling and limiting attributes within the canvas. One such function is `limitAttributes`, which is utilized to manage the positioning and scaling of elements in the application.

## Functions

### `limitAttributes`

This function is responsible for constraining attributes such as the position and scale of elements within the canvas to prevent them from exceeding certain boundaries. It takes a stage and new attributes as parameters and returns updated attributes with limitations applied.

#### Parameters

- `stage` (object, required): The stage (canvas) on which the attributes are applied.

- `newAttrs` (object, required): An object containing new attributes for positioning and scaling.

#### Example

Here's an example of how the `limitAttributes` function is used within a React component:

```jsx
import React from 'react';
import { limitAttributes } from './utils'; // Replace with the actual path to your utils.js file

function MyComponent() {
  const stageRef = React.createRef(); // Replace with your actual stage reference

  // ...

  return (
    <div>
      {/* Other components or UI elements */}
      <div
        onWheel={(e) => {
          e.evt.preventDefault();
          const stage = stageRef.current;

          const dx = -e.evt.deltaX;
          const dy = -e.evt.deltaY;
          const pos = limitAttributes(stage, {
            x: stage.x() + dx,
            y: stage.y() + dy,
            scale: stage.scaleX(),
          });
          stageRef.current.position(pos);
        }}
      >
        {/* Render your canvas or elements here */}
      </div>
      {/* Other components or UI elements */}
    </div>
  );
}

export default MyComponent;
