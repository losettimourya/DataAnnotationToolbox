# `ModerationTool.js` Documentation

## Description

The `ModerationTool.js` file serves as an essential component for moderating annotations within your application. It provides the capability to perform various moderation actions on annotations, such as deletion, intersection, and union.

## Implementation

### Moderation Actions

The primary purpose of the `ModerationTool.js` component is to facilitate moderation actions on annotations. This includes:

- **Deletion:** Moderators can select and delete specific annotations from the canvas.

- **Intersection:** The component allows for identifying and interacting with the intersection of annotations. Annotations that overlap or intersect can be handled appropriately.

- **Union:** Users can merge or unify annotations when they intersect, creating a single annotation that represents the combination of overlapping regions.

### Interaction with Annotations

- The component operates within the `Stage` element, providing an interactive interface for annotation moderation.

- Annotations can be selected and deselected by clicking on them, enabling efficient moderation.

- Users can control zoom levels using the mouse wheel for better visibility and interaction.

## Usage

The `ModerationTool.js` component is utilized within the application's `Canvas.js` file, where it plays a crucial role in the annotation moderation process. It enables moderators to efficiently manage and moderate annotations, making it an essential tool for maintaining data quality.

## Example

```jsx
import React from 'react';
import ModerationTool from './ModerationTool'; // Replace with the actual path to your ModerationTool.js file

function Canvas({ imagelist, gridsize, tool, imageURL }) {
  const setCanvasMode = (id, imageURL) => {
    switch (id) {
      case 0:
        return <PointerMode imageURL={imageURL} />;
      case 1:
        return <PolygonTool imageURL={imageURL} />;
      case 2:
        return <FreeHand imageURL={imageURL} />;
      case 3:
        return <Rectangle imageURL={imageURL} />;
      case 4:
        return <DragTool imageURL={imageURL} />;
      case 5:
        return <ModerationTool imageURL={imageURL} />;
      case 10:
        return <Oval imageURL={imageURL} />;
      case 9:
        return <Circle imageURL={imageURL} />;
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
}
