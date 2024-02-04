# `navConfig.js` Documentation

## Description

`navConfig.js` is a configuration file that defines the navigation menu structure of a web application. It specifies various menu items with their names, URLs, and the required user permissions to access them. The configuration provides flexibility in defining different sections of the application and their accessibility based on the user's login state.

## Import Statements

- `USER_STATE`: Constants from `../../withAuth` representing different user login states.

## Configuration Structure

- **Each Menu Item Object:**
  - `name`: A string representing the display name of the menu item.
  - `pathname`: The URL path to navigate when the menu item is clicked.
  - `permissions`: The required user state to access the menu item. It can be one of the `USER_STATE` constants (e.g., `USER_STATE.SIGNED_IN`, `USER_STATE.ANY`, `USER_STATE.ADMIN`).
  - `options` (Optional): An array of sub-menu items, each following the same structure as the parent menu item. Used for dropdown menus or nested menu items.

## Menu Items Explanation

1. **My Data:**
   - Accessible to: Signed-in users (`USER_STATE.SIGNED_IN`).
   - URL: `/my-data`.

2. **My Models:**
   - Accessible to: Signed-in users (`USER_STATE.SIGNED_IN`).
   - URL: `/dataModels`.

3. **Datasets:**
   - Accessible to: Any user (`USER_STATE.ANY`).
   - URL: `/datasets`.
   - No sub-menu options.

4. **About Us:**
   - Accessible to: Any user (`USER_STATE.ANY`).
   - No direct URL.
   - Sub-menu options:
     - **Architecture:**
       - URL: `/architecture`.
     - **Overview:**
       - URL: `/`.
     - **About:**
       - URL: `/about`.
     - **Team:**
       - URL: `/team`.

5. **Groups:**
   - Accessible to: Signed-in users (`USER_STATE.SIGNED_IN`).
   - URL: `/groups`.
   - No sub-menu options.

6. **Contact:**
   - Accessible to: Any user (`USER_STATE.ANY`).
   - URL: `/contact`.
   - No sub-menu options.

7. **Verify Datasets:**
   - Accessible to: Admin users (`USER_STATE.ADMIN`).
   - URL: `/verify`.
   - No sub-menu options.

8. **Domains:**
   - Accessible to: Admin users (`USER_STATE.ADMIN`).
   - URL: `/domain`.
   - No sub-menu options.

## Usage

The `NAV_CONFIG` constant is used to dynamically generate the navigation menu based on the user's login state. It allows developers to easily configure menu items and their accessibility rules. The configuration can be used in components like the `Navbar` component to render the menu items dynamically.

## Example

```jsx
import React from 'react';
import { NAV_CONFIG } from './navConfig'; // Replace with the actual path to your navConfig.js file

function Navbar() {
  // ... component logic to determine user's login state

  return (
    <div className="navbar">
      {NAV_CONFIG.map((menuItem) => (
        // Render menu items based on menuItem object properties
      ))}
    </div>
  );
}

export default Navbar;
```

## Notes

- Ensure that the `USER_STATE` constants are correctly defined and imported from the `../../withAuth` module.
- Customize the `NAV_CONFIG` constant to match the specific menu structure and permissions required by your web application.