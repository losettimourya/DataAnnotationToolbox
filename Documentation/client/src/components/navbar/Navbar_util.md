# `Navbar_util.jsx` Documentation

## Description

`Navbar_util.js` exports a utility function `CheckPermissions(given)` that checks the user's permissions based on the provided argument. It reads the user data from the local storage and validates the user's role to determine if they have the required permissions.

## Implementation

The utility function `CheckPermissions` accepts a permission level as an argument and returns a boolean value indicating whether the user has the required permissions.

- **Input Parameter:**
  - `given`: A string indicating the required permission level. Possible values are `'ANY'`, `'LOGGED_IN'`, and `'ADMIN'`.

- **User Data Retrieval:**
  - The function retrieves the user data from the local storage using `localStorage.getItem('dfs-user')`. If the user data is not available, an empty object is used to prevent errors.

- **Permission Checks:**
  - If the `given` argument is `'ANY'`, the function returns `true`, indicating that any user has permission.
  - If the `given` argument is `'LOGGED_IN'`, the function checks if the user is logged in (`user.user` exists) and returns `true` if the user is logged in.
  - If the `given` argument is `'ADMIN'`, the function checks if the user is logged in and has an admin role (`user.user.user_role === "admin"`) and returns `true` if the user is an admin.
  - If the `given` argument does not match any valid permission level, the function returns `false`.

## Usage

The `CheckPermissions` utility function can be used to control access to specific parts of the application based on user roles and permissions.

## Example

```jsx
import React from 'react';
import CheckPermissions from './Navbar_util'; // Replace with the actual path to your Navbar_util.js file

function Navbar() {
  const isLoggedIn = CheckPermissions('LOGGED_IN');
  const isAdmin = CheckPermissions('ADMIN');

  return (
    <nav className="navbar">
      {isLoggedIn && <div>Welcome, User!</div>}
      {isAdmin && <div>Admin Dashboard</div>}
      {/* ...other navigation components... */}
    </nav>
  );
}
```

## Functionality

The `CheckPermissions` utility function enhances the security of the application by allowing conditional rendering of components based on the user's role and permissions. It enables developers to control the visibility and functionality of specific features based on user roles, ensuring a secure and tailored user experience.

## Notes

- Ensure that the `localStorage` item `'dfs-user'` is properly set after user authentication to enable accurate permission checks.
- Customize the permission levels and logic as per the requirements of the application.