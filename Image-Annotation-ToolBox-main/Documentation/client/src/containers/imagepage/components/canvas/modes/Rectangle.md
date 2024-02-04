# `Rectangle.js` Documentation

## Description

The `Rectangle.js` file is responsible for rendering rectangular bounding boxes in the application. It allows users to define rectangular regions within images by specifying two diagonal vertices. The component calculates the breadth and height of the rectangle and displays it accordingly.

## Implementation

### Generating Rectangle Points

The `rectangle_points` array is generated using two diagonal vertices, `currStart` and `point`. It defines the rectangle's outline as follows:

```javascript
const rectangle_points = [
  {
    x: currStart.x,
    y: currStart.y,
  },
  {
    x: point.x,
    y: currStart.y,
  },
  {
    x: point.x,
    y: point.y,
  },
  {
    x: currStart.x,
    y: point.y,
  },
  {
    x: currStart.x,
    y: currStart.y,
  },
];
