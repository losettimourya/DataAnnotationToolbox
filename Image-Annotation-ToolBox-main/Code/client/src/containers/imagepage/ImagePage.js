import React, { useEffect, useState } from "react";
import "./ImagePage.css";
import axios from "axios";
import GetFiles from "./components/GetFiles";
import { config } from "./config";
import { useParams } from "react-router-dom";
import useStore from "./library/store";

function ImagePage() {
  /**
   * Functional component representing the page for managing image uploads.
   *
   * @component
   * @returns {JSX.Element} The React component.
   *
   * @example
   * // Example usage:
   * <ImagePage />
   */
  const [currentFile, setCurrentFile] = useState({
    count: 0,
    name: "",
  });
  const [isUploaded, setIsUploaded] = useState(false);
  let d_id = useParams();
  let shortEmail = d_id.dataset_id;

  function handleChange(e) {
    /**
     * Event handler for updating the selected file when the input changes.
     *
     * @function
     * @param {Object} e - The event object triggered by the file input change.
     * @returns {void}
     *
     * @example
     * // Example usage:
     * <input type="file" onChange={handleChange} />
     */
    const file = e.target.files[0];
    setCurrentFile((prevValue) => ({
      ...prevValue,
      name: file,
    }));
  }

  async function uploadFile(e) {
    /**
     * Asynchronous function for uploading the selected file.
     *
     * @async
     * @function
     * @param {Object} e - The event object triggered by the form submission.
     * @returns {void}
     *
     * @example
     * // Example usage:
     * <form onSubmit={uploadFile}>
     */
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", currentFile.name);
    let bucketURL = config.BASE_URL + "/objects/" + shortEmail;
    try {
      const response = await axios.post(bucketURL, formData);
      setIsUploaded(true);
      setCurrentFile((prevValue) => ({
        ...prevValue,
        count: prevValue.count + 1,
      }));
    } catch (error) {
      console.log(error);
    }
  }
  const setfullscreen = useStore((state) => state.setfullscreen);
  const fullscreen = useStore((state) => state.fullscreen);

  return (
    <div className="App">
      {!fullscreen ? (
        <div className="main-btn">
          <div className="form-container">
            <form className="ml-4">
              <input
                type="file"
                id="fileInput"
                onChange={handleChange}
                className="input-file"
              />
              <button
                type="submit"
                onClick={uploadFile}
                className="upload-button"
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      ) : null}
      <div className="get-files">
        <GetFiles
          fileObj={currentFile}
          uploadStatus={isUploaded}
          email={shortEmail}
        />
      </div>
    </div>
  );
}

export default ImagePage;
