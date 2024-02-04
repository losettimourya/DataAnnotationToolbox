# `Requests.js` Documentation

## Description

`Requests.js` is a module responsible for handling HTTP requests, particularly GET and POST requests, using the Fetch API. It exports two functions that allow you to interact with external APIs and services.

## Functions

### `getRequest(url: string): Promise<any>`

- **Description**: A function for making GET requests to the specified URL and fetching data.

- **Parameters**:
  - `url` (string): The URL to send the GET request to.

- **Returns**:
  - A Promise that resolves with the JSON response from the GET request.
  - If an error occurs during the request, an empty array `[]` is returned.

- **Usage**:
  ```javascript
  import { getRequest } from './Requests';

  async function fetchData() {
    try {
      const data = await getRequest('https://example.com/api/data');
      // Process data here
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }
