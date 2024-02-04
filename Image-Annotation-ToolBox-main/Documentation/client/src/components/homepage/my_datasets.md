# `my_datasets.js` Documentation

## Description

`my_datasets.js` is a React component used for displaying projects created by the current user. This component fetches data from the backend API and renders it in a table format. It provides information about the user's projects, such as their name, description, creation date, and actions the user can perform.

## Implementation

### Data Fetching

- **Data Retrieval:** The component uses Axios to make an HTTP GET request to the backend API endpoint (`/get_dataset/:authorId`) to retrieve the projects created by the current user. The user's email is used as the authorId parameter in the request URL.

### Displaying Project Information

- **Table Structure:** The retrieved project information is displayed in a table format. The table columns include project name, description, actions, and creation date with both date and time.
- **Actions:** Users have several options, including viewing the project details, downloading the project, adding images to the project, and accessing project information.

## Usage

The `my_datasets.js` component is used to display the projects created by the current user within the application. It provides an overview of the user's projects and enables users to access specific project details and perform various actions related to their projects.

## Example

```jsx
import React from 'react';
import MyDatasets from './my_datasets'; // Replace with the actual path to your my_datasets.js file

function MyProjectsPage() {
  return (
    <div className="my-projects-page">
      <MyDatasets />
      {/* ...other components and content... */}
    </div>
  );
}
```

## Functionality

The `my_datasets.js` component enhances user experience by providing a clear and organized view of projects created by them. It simplifies project management and navigation, allowing users to efficiently access their projects, view details, and perform necessary actions.

## Notes

- The component relies on proper authentication to fetch user-specific project information.
- The component allows users to view project details, download projects, add images to projects, and access project-specific information.
- Project creation date and time are formatted for easy readability, displaying both the date and time in the table.