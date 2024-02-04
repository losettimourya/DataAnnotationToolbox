# `store.js` Documentation

## Description

`store.js` is a module responsible for managing the application's state using Zustand, a small and fast state management library for React. It defines and exports a set of variables and functions that help in maintaining and updating the state of the application. These variables cover a wide range of data, including user interface properties, drawing tools, image data, and more.

## Variables and Functions

Below is a breakdown of the variables and functions defined in the `store.js` file:

- **Width and Height:**
  - `width`: Represents the application window's width.
  - `height`: Represents the application window's height.
  - `setSize`: A function to set the width and height.

- **Image Size:**
  - `imageWidth`: Represents the width of an image.
  - `imageHeight`: Represents the height of an image.
  - `setImageSize`: A function to set the image's size.

- **Drawing and Annotations:**
  - `isDrawing`: Indicates whether a user is drawing.
  - `toggleIsDrawing`: A function to toggle the drawing state.
  - `regions`: Stores region data.
  - `setRegions`: A function to set regions.
  - `prevregions`: Stores previous region data.
  - `setprevRegions`: A function to set previous regions.
  - `fillinside`: Stores the fill inside flag.
  - `setFillinside`: A function to set the fill inside flag.
  - `regionopacity`: Stores the region opacity.
  - `setRegionopacity`: A function to set the region opacity.
  - `pointwidth`: Stores the point width.
  - `setPointwidth`: A function to set the point width.
  - `linewidth`: Stores the line width.
  - `setLinewidth`: A function to set the line width.
  - `pointcolor`: Stores the point color.
  - `setPointcolor`: A function to set the point color.

- **History:**
  - `history`: Maintains the history of actions.
  - `setHistory`: A function to set the history.
  - `historySelected`: Stores selected history items.
  - `setHistorySelected`: A function to set selected history items.

- **Region Start Point:**
  - `isMouseOverStartPoint`: Indicates if the mouse is over the start point.
  - `setIsMouseOverStartPoint`: A function to set the mouse-over status.
  - `currStart`: Stores the current start point.
  - `setCurrStart`: A function to set the current start point.
  - `prevStart`: Stores the previous start point.
  - `setPrevStart`: A function to set the previous start point.

- **Selected Region:**
  - `selectedRegionId`: Stores the ID of the selected region.
  - `selectRegion`: A function to select a region.

- **Tools and Drawing Properties:**
  - `tool`: Represents the active drawing tool.
  - `setTool`: A function to set the active tool.
  - `checkList`: Maintains a checklist of items.
  - `setCheckList`: A function to set the checklist.
  - `color`: Stores the color for drawing.
  - `setColor`: A function to set the drawing color.

- **Image and Data:**
  - `dataset`: Stores the current dataset.
  - `setDataset`: A function to set the dataset.
  - `labels`: Stores label data.
  - `setLabels`: A function to set labels.
  - `imageList`: Stores a list of images.
  - `setImageList`: A function to set the image list.

- **Users and Authentication:**
  - `userList`: Stores a list of users.
  - `setUserList`: A function to set the user list.
  - `currUser`: Stores the current user.
  - `setCurrUser`: A function to set the current user.

- **Server and Communication:**
  - `server`: Stores the server URL.
  - `setServer`: A function to set the server URL.

- **Annotations and Regions:**
  - `annotaionsList`: Stores a list of annotations.
  - `setAnnotaionsList`: A function to set annotations.
  - `regionsdict`: A dictionary for storing annotations for each image.
  - `setregionsdict`: A function to set the annotations dictionary.
  - `prevregionsdict`: A dictionary for storing previous annotations.
  - `setprevregionsdict`: A function to set the previous annotations dictionary.
  - `selectedlabel`: Stores the selected label.
  - `setselectedlabel`: A function to set the selected label.

- **Image Viewing and Grid Layout:**
  - `imageIndex`: Stores the index of the currently viewed image.
  - `setImageIndex`: A function to set the image index.
  - `selectedRegions`: Stores a set of selected regions.
  - `setSelectedRegions`: A function to set the selected regions.
  - `screensize`: Stores the screen size.
  - `setscreensize`: A function to set the screen size.
  - `stageScale`: Stores the scale of the stage.
  - `setStageScale`: A function to set the stage scale.
  - `orignalScale`: Stores the original scale of the stage.
  - `setOrignalScale`: A function to set the original scale.
  - `brightness`: Stores the brightness level.
  - `setBrightness`: A function to set the brightness.
  - `fullscreen`: Indicates the fullscreen mode.
  - `setfullscreen`: A function to set the fullscreen mode.
  - `hidelabelbox`: Indicates the visibility of the label box.
  - `sethidelabelbox`: A function to set the label box visibility.
  - `gridsize`: Stores the grid size.
  - `setgridsize`: A function to set the grid size.
  - `viewimage`: Stores the currently viewed image.
  - `setviewimage`: A function to set the viewed image.
  - `gridimages`: Stores a list of images in the grid layout.
  - `setgridimages`: A function to set the grid images.
  - `currimageid`: Stores the ID of the currently viewed image.
  - `setcurrimageid`: A function to set the current image ID.

- **Admin Mode:**
  - `adminMode`: Indicates the admin mode.
  - `setAdminMode`: A function to set the admin mode.

## Usage

The `store.js` file exports a custom hook, `useStore`, which can be used within your application's components to access and modify the application state.

To use it in a component, import `useStore` and call it to access and update the state properties as needed. Example:

```jsx
import useStore from './store'; // Replace with the actual path to your store.js file

function MyComponent() {
  const width = useStore(state => state.width); // Accessing a state property
  useStore.setState({ width: 800 }); // Modifying a state property

  // ...component code...
}
