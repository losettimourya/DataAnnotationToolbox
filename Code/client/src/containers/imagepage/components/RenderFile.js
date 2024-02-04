import React, { useEffect, useState } from "react";
import axios, { all } from "axios";
import OpenSeadragonViewer from "./OpenSeadragonViewer";
import "./RenderFile.css";
import BarLoader from "react-spinners/BarLoader";
import { config } from "../config";
import Canvas from "./canvas/Canvas";
import { StageContextProvider } from "../ContextProvider";
import { Stage } from "react-konva";
import { createRef } from "react";
import ToolBox from "./toolbox/ToolBox";
import LabelBox from "./labelbox/LabelBox";
import { Container, Row, Col, Nav, Navbar } from "react-bootstrap";
import TopBar from "./topBar/TopBar";
import MainBanner from "./mainbanner/MainBanner";
import SetupPipeline from "./pipeline/SetupPipeline";
import Toolbar from "./pipelinetool/Toolbar";
import Dropdown from "react-dropdown";
import { Button } from "react-bootstrap";
import useStore from "../library/store";
import { v4 as uuid } from "uuid";
import { memo } from "react";
import { useCallback } from "react";
import {
  PencilIcon,
  ArrowDownIcon,
  DownloadIcon,
  ChatIcon,
  InformationCircleIcon,
  ChartBarIcon,
} from "@heroicons/react/outline";

function RenderFile(props) {
  const [viewerImage, setViewerImage] = useState();
  const [imageName, setImageName] = useState();
  const server = useStore((s) => s.server);
  const [allImages, setAllImages] = useState([]);
  const [allImageName, setAllImageName] = useState([]);
  const isFirstRender = React.useRef(true);
  const [selected, setSelected] = useState([false, false, false, false, false]);
  const [mouseDowntime, setMouseDowntime] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [selectedOption, setSelectedOption] = useState("Annotate");
  const setfullscreen = useStore((state) => state.setfullscreen);
  const fullscreen = useStore((state) => state.fullscreen);
  const hidelabelbox = useStore((state) => state.hidelabelbox);
  const sethidelabelbox = useStore((state) => state.sethidelabelbox);
  const [open2, setOpen2] = useState(true);
  const gridsize = useStore((state) => state.gridsize);
  const viewimage = useStore((state) => state.viewimage);
  const setviewimage = useStore((state) => state.setviewimage);
  const gridimages = useStore((state) => state.gridimages);
  const setgridimages = useStore((state) => state.setgridimages);
  const gridview = useStore((state) => state.gridview);
  const setgridview = useStore((state) => state.setgridview);
  const currimageid = useStore((state) => state.currimageid);
  const setcurrimageid = useStore((state) => state.setcurrimageid);
  const regions = useStore((state) => state.regions);
  const setRegions = useStore((state) => state.setRegions);
  const regionsdict = useStore((state) => state.regionsdict);
  const setregionsdict = useStore((s) => s.setregionsdict);
  const prevregionsdict = useStore((state) => state.prevregionsdict);
  const setprevRegions = useStore((state) => state.setprevRegions);
  const currUser = useStore((state) => state.currUser);
  const adminMode = useStore((state) => state.adminMode);
  const showHideAnnotations = useStore((s) => s.showHideAnnotations);
  const setShowHideAnnotations = useStore((s) => s.setShowHideAnnotations);
  let user = adminMode ? "mod" : "user";

  const options = [
    "Annotate",
    "Download(with annotation)",
    "Download(without annotation)",
    "Comments",
    "Pipeline",
    "Image Details",
  ];
  const onOptionChangeHandler = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleMouseDown = (e) => {
    setMouseDowntime(e.timeStamp);
  };
  const handleMouseUp = (e) => {};

  useEffect(() => {
    setAllImageName(props.info);
    if (isFirstRender.current) {
      getAllImageLinks();
      if (props.info.length > 0) {
        isFirstRender.current = false;
      }
      return;
    }
    if (props.currFile != null) {
      if (isFirstRender.current) {
        getAllImageLinks();
        if (props.info.length > 0) {
          isFirstRender.current = false;
        }
        return;
      } else {
        let imageObj = { imageName: props.currFile };
        axios
          .get(config.BASE_URL + "/getURL/" + props.email, { params: imageObj })
          .then((response) => response.data.image)
          .then((image) => {
            setAllImages((prevValue) => [...prevValue, image]);
          })
          .catch((error) => {
            console.log(error);
            return null;
          });
      }
    } else {
      setAllImages((prevFilesLink) => {
        return prevFilesLink.filter((link, index) => {
          return index !== allImageName.indexOf(props.deletedFileName);
        });
      });
    }
  }, [props.info]);

  async function getAllImageLinks() {
    /**
     * Asynchronously fetches image URLs for a given list of image names.
     * This function uses the information provided in the `props` object, including
     * user email, image names, and the base URL. It utilizes the Axios library to
     * make parallel GET requests for each image name to the server's "/getURL" endpoint.
     * The function catches errors during the requests and logs them to the console.
     * Once all requests are completed, the function sets the state with the array
     * of image URLs, and logs the response.
     *
     * @async
     * @function
     * @returns {Promise<void>} A Promise that resolves once all image URLs are fetched.
     */
    try {
      const response = await Promise.all(
        props.info.map((image) => {
          let imageObj = { imageName: image };
          return axios
            .get(config.BASE_URL + "/getURL/" + props.email, {
              params: imageObj,
            })
            .then((response) => response.data.image)
            .catch((error) => {
              console.log(error);
              return null;
            });
        })
      );
      setAllImages(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadRegions(id) {
    /**
     * Asynchronously fetches and loads regions for a given image ID.
     * This function makes a GET request to the server's "/get_annotation" endpoint
     * to retrieve region data for a specific image. The fetched data is then
     * processed to group points into regions, and the resulting region array
     * is stored in the component's state. Additionally, the function updates the
     * regions dictionary and the local storage based on the showHideAnnotations state.
     *
     * @async
     * @function
     * @param {string} id - The ID of the image for which regions are to be loaded.
     * @returns {Promise<object>} A Promise that resolves to the updated regions dictionary.
     */
    let url = "";
    if (!adminMode) {
      url = server + "/posts/get_user" + "_annotation/" + id;
    } else {
      url = server + "/posts/get_image_user_annotations/"+id;
    }
    let res = await fetch(url, {
      method: "GET",
      headers: { "auth-token": currUser },
    });
    let result = await res.json();
    const groupedPoints = result.data.reduce((acc, point) => {
      const regionId = point.user_annotations_region_id;
      let new_label = {
        name: point.user_annotation_region_name,
        color: point.user_annotations_region_color,
      };
      if (!acc[regionId]) {
        acc[regionId] = {
          id: regionId,
          color: point.user_annotations_region_color,
          label: new_label,
          user_id: point.user_id,
          isComplete: Boolean(point.user_annotations_region_is_Complete),
          isEditable: Boolean(point.user_annotations_region_is_Editable),
          comment: point.user_annotation_region_comment,
          points: [],
        };
      }
      acc[regionId].points.push({
        x: point.region_point_x,
        y: point.region_point_y,
      });
      return acc;
    }, {});
    const regionArray = Object.values(groupedPoints);
    setRegions(regionArray);
    let regionsdict_copy = { ...regionsdict, [id]: regionArray };
    if (showHideAnnotations === "Show") {
      localStorage.setItem("regions", JSON.stringify(regions));
      regionsdict_copy[id] = [];
      setRegions([]);
    } else {
      setRegions(regionArray);
    }
    setregionsdict(regionsdict_copy);
    return regionsdict_copy;
  }

  function handleClick(e) {
    /**
     * Handles the click event on an image thumbnail in the grid view.
     * This function is triggered when a user clicks on an image thumbnail,
     * updating the state to display the clicked image in the viewer, along with
     * associated metadata. It also loads and sets the regions for the clicked image,
     * updates the grid of displayed images, and ensures the correct regions are
     * shown based on the image index.
     *
     * @function
     * @param {object} e - The click event object containing information about the clicked element.
     * @returns {void}
     */
    let num = e.target.id;
    setViewerImage(allImages[num]);
    setImageName(props.info[num]);
    setviewimage(allImages[num]);
    setcurrimageid(num);
    let newregionsdict = loadRegions(num);
    setgridimages(
      gridimages.slice(gridimages.length - gridview[0] * gridview[1])
    );
    setRegions(newregionsdict[num] ? newregionsdict[num] : []);
    setprevRegions(prevregionsdict[num] ? prevregionsdict[num] : []);
    if (gridimages.length < gridview[0] * gridview[1])
      setgridimages([...gridimages, { image: allImages[num], index: num }]);
    else {
      gridimages.shift();
      setgridimages([...gridimages, { image: allImages[num], index: num }]);
    }
  }

  function handleDelete(event, file) {
    /**
     * Handles the deletion of a file. Invokes the onDelete callback provided by the parent component,
     * passing the event and file details. Additionally, clears the currently displayed viewer image.
     *
     * @function
     * @param {object} event - The event object representing the triggering action.
     * @param {object} file - The file object to be deleted.
     * @returns {void}
     */
    props.onDelete(event, file);
    setViewerImage();
  }

  function updateStateArr(idx) {
    /**
     * Updates the state array at a specific index. Toggles the boolean value at the specified index
     * in the 'selected' state array, providing a mechanism to track the selection status of items.
     *
     * @function
     * @param {number} idx - The index at which to update the state array.
     * @returns {void}
     */
    const newArray = [...selected];
    newArray[idx] = !newArray[idx];
    setSelected(newArray);
  }

  const stageRef = createRef();
  return (
    <div className="render-file-container">
      {!fullscreen ? (
        <div className="grid grid-cols-1">
          <div className="button-container">
            {allImageName.map((file, i) => {
              const buttonStyles_nonselected = {
                margin: "10px",
                backgroundImage: allImages[i] ? `url(${allImages[i]})` : "none",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                color: "#333",
                objectFit: "cover",
                cursor: "pointer",
                whiteSpace: "nowrap",
                height: "100px",
                width: "100px",
                opacity: 1,
              };
              const buttonStyles_selected = {
                margin: "10px",
                backgroundImage: allImages[i] ? `url(${allImages[i]})` : "none",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                color: "#333",
                objectFit: "cover",
                cursor: "pointer",
                whiteSpace: "nowrap",
                height: "100px",
                width: "100px",
                opacity: 0.5,
              };
              return (
                <div>
                  <img
                    onClick={handleClick}
                    style={
                      selected[i]
                        ? buttonStyles_selected
                        : buttonStyles_nonselected
                    }
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    key={i}
                    id={i}
                  />
                  <div className="name-del">
                    <p id="image-name">{file.split("/")[2]}</p>
                    <input
                      type="checkbox"
                      checked={selected[i]}
                      onClick={() => updateStateArr(i)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-span-1 p-4">
            <div className="flex">
              <select
                onChange={onOptionChangeHandler}
                id="countries"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {options.map((option, i) => {
                  return <option value={option}>{option}</option>;
                })}
              </select>
              <button class="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded ml-2">
                Go
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div>
        {selectedOption === "Annotate" && (
          <div
            className="viewer-container"
            style={{
              width: fullscreen ? "auto" : "75vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgb(218,235,250)",
              textAlign: "center",
              overflow: "hidden",
              flex: "100%",
            }}
          >
            <div className="viewer" style={{ width: "100%", height: "100%" }}>
              {viewerImage ? (
                <StageContextProvider stageRef={stageRef}>
                  <div
                    style={{
                      width: "113%",
                    }}
                  >
                    <TopBar />
                  </div>
                  <Row>
                    <Col xs={10}>
                      <div style={{ width: "100%", overflow: "hidden" }}>
                        <Row>
                          <span
                            style={{
                              width: "50vw",
                              height: "100vh",
                              overflow: "hidden",
                              position: "absolute",
                            }}
                          >
                            <ToolBox />
                          </span>
                          <span
                            style={{
                              overflow: "hidden",
                              marginTop: "5px",
                              marginLeft: "55px",
                              width: hidelabelbox ? "150vw" : "100vw",
                              height: "100vh",
                              maxHeight: "100vh",
                            }}
                            className="right-panel"
                          >
                            <Canvas
                              imageURL={viewerImage}
                              imagelist={gridimages}
                            />
                          </span>
                        </Row>
                      </div>
                    </Col>
                    {!hidelabelbox && (
                      <Col xs={2}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "auto",
                            marginRight: "20px",
                          }}
                        >
                          <Row>
                            {" "}
                            <LabelBox open2={open2} />
                          </Row>
                        </div>
                      </Col>
                    )}
                  </Row>
                </StageContextProvider>
              ) : (
                <p>Select an image to view</p>
              )}
            </div>
          </div>
        )}
        {selectedOption === "Pipeline" && (
          <div style={{ width: "80vw" }}>
            <MainBanner />
            <SetupPipeline />
            <Toolbar />
          </div>
        )}
      </div>
    </div>
  );
}

export default RenderFile;
