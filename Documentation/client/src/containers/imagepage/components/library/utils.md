# `utils.js` Documentation

## Description

`utils.js` is a module containing utility functions that are commonly used in the context of working with the Konva library, a 2D drawing library for the web.

## Functions

### `limitAttributes(stage: Konva.Stage, newAttrs: Object): Object`

- **Description**: This function is used to restrict the attributes of a Konva stage (canvas) to certain limits, typically for zooming and panning functionality. It ensures that the stage doesn't exceed defined boundaries.

- **Parameters**:
  - `stage` (Konva.Stage): The Konva stage for which attributes are being limited.
  - `newAttrs` (Object): An object containing the new attributes, typically `x`, `y`, and `scale`.

- **Returns**:
  - An object with limited attributes:
    - `x`: Limited x-coordinate within the defined boundaries.
    - `y`: Limited y-coordinate within the defined boundaries.
    - `scale`: Limited scale value (minimum 0.05) for zooming.

- **Usage**:
  ```javascript
  const limitedAttributes = limitAttributes(stage, { x: 100, y: 50, scale: 1.2 });
