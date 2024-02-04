# `ToolBox.js` Documentation

## Description

`ToolBox.js` is a React component responsible for displaying a set of annotation tools on the left panel of your application. These tools serve various purposes, including annotation creation, selection, and moderation.

## Implementation

### Tool Selection

The core functionality of `ToolBox.js` is to allow users to select a specific annotation tool from the provided set. When a tool is selected, it becomes the active tool, enabling the user to interact with the canvas and perform various annotation tasks. The selection is managed by the `setTool` function.

### Tool Display

- **Tool List:** The tool collection consists of various tools, each represented as a graphical icon with a tooltip displaying its name. Users can click on a tool to select it for annotation purposes.

- **Hover Effect:** When a user hovers over a tool, a hover effect is applied to highlight the tool. The `isHovering` state manages this visual feedback.

### Tool Types

The tool collection is divided into two categories: `toolbox_items` and `moderation_items`. These categories are populated based on user privileges, where certain tools are restricted for non-administrative users.

- **`toolbox_items`**: A collection of standard annotation tools, including tools for creating arrows, polygons, custom shapes, rectangles, dragging, ovals, and circles.

- **`moderation_items`**: A set of moderation tools, such as deleting, finding the intersection of selected regions, and finding the union of selected regions.

### Tool Interaction

The user's interaction with tools triggers specific actions in the application, depending on the selected tool type. For instance, selecting the "Delete" tool triggers a region deletion action, while selecting the "Union" tool performs a union operation on selected regions.

## Usage

`ToolBox.js` is used in the left panel of your application to provide easy access to a range of annotation and moderation tools. It enhances the user experience by offering a unified interface for managing and interacting with annotations.

## Example

```jsx
import React from 'react';
import ToolBox from './ToolBox'; // Replace with the actual path to your ToolBox.js file

function LeftPanel() {
  return (
    <div className="left-panel">
      <ToolBox />
      {/* ...other left panel content... */}
    </div>
  );
}
