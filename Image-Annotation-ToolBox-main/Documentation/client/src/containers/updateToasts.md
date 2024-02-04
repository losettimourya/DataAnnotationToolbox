# `updateToasts.js` Documentation

## Description

The `UpdateToastData.js` module contains a utility function called `UpdateToastData` that is used to manage the state of toast notifications. This function can add new toast notifications and close existing ones.

## Function Overview

- **Function Name**: `UpdateToastData`
- **File Name**: `UpdateToastData.js`

## Function Parameters

The `UpdateToastData` function takes the following parameters:

1. `isAdd` (Number):
   - Indicates whether to add a new toast notification (1) or close an existing one (0).

2. `toastData` (Array):
   - An array that holds the current toast notification data.

3. `setToastData` (Function):
   - A function used to update the `toastData` array.

4. `countRef` (Reference):
   - A reference to maintain a count of toast notifications.

5. `message` (String):
   - The message or content to be displayed in the new toast notification (if adding a toast).

6. `variant` (String):
   - Defines the type of toast (e.g., 'info', 'success', 'warning', 'error) for the new toast notification (if adding a toast).

7. `timeout` (Number):
   - The duration (in milliseconds) for which the new toast notification will be displayed (if adding a toast).

8. `index` (Number):
   - The index of the toast notification to be closed (if closing a toast).

## Function Behavior

- The `UpdateToastData` function manages the addition and removal of toast notifications based on the provided parameters.

- When `isAdd` is set to 1 (add a toast), a new toast notification is added to the `toastData` array with the specified `message`, `variant`, and `timeout`. If the number of active toast notifications is already at the limit of 5, the oldest active toast is replaced with the new one.

- When `isAdd` is set to 0 (close a toast), the function marks the toast notification at the specified `index` as inactive.

## Usage

The `UpdateToastData` utility function can be used in conjunction with the `CustomToast` component to add and close toast notifications in response to various events or user actions.

**Example Usage:**

```javascript
import { UpdateToastData } from './UpdateToastData';

// Add a new success toast notification
UpdateToastData(1, toastData, setToastData, countRef, 'Operation completed successfully', 'success', 3000);

// Close a toast notification at index 2
UpdateToastData(0, toastData, setToastData, countRef, '', '', 0, 2);
