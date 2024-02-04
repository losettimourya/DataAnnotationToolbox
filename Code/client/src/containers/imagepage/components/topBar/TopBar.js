import React, { Component, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../library/store";
import "./style.css";
import { v4 as uuid } from "uuid";
import {
  ZoomInIcon,
  ZoomOutIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/outline";
import {
  BsArrowClockwise,
  BsArrowCounterclockwise,
  BsArrowRepeat,
  BsFullscreen,
  BsFullscreenExit,
} from "react-icons/bs";
import { SaveIcon } from "@heroicons/react/outline";
import { FaEye, FaEyeSlash, FaSave, FaCloudUploadAlt } from "react-icons/fa";
import { MdSave } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import { IoSave } from "react-icons/io";
import { AiOutlineSave } from "react-icons/ai";
import StageContext from "../../ContextProvider";
import { limitAttributes } from "../../library/utils";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

function TopBar(props) {
  let [zoomOut, setZoomOut] = useState(true);
  const showHideAnnotations = useStore((s) => s.showHideAnnotations);
  const setShowHideAnnotations = useStore((s) => s.setShowHideAnnotations);
  const currUser = useStore((s) => s.currUser);
  const imageList = useStore((s) => s.imageList);
  const server = useStore((s) => s.server);
  const selectedId = useStore((s) => s.selectedRigionId);
  const regions = useStore((state) => state.regions);
  const setRegions = useStore((state) => state.setRegions);
  const prevregions = useStore((state) => state.prevregions);
  const setprevRegions = useStore((state) => state.setprevRegions);
  const prevregionsdict = useStore((state) => state.prevregionsdict);
  const setprevregionsdict = useStore((state) => state.setprevregionsdict);
  const setHistory = useStore((state) => state.setHistory);
  const setHistorySelected = useStore((state) => state.setHistorySelected);
  const selectedRegions = useStore((s) => s.selectedRegions);
  const setSelectedRegions = useStore((s) => s.setSelectedRegions);
  const screensize = useStore((s) => s.screensize);
  const setscreensize = useStore((s) => s.setscreensize);
  let imageIndex = useStore((state) => state.imageIndex);
  const setImageIndex = useStore((state) => state.setRegions);
  const { stageRef, count_images } = useContext(StageContext);
  const stageScale = useStore((state) => state.stageScale);
  const setStageScale = useStore((state) => state.setStageScale);
  const imageWidth = useStore((state) => state.imageWidth);
  const orignalScale = useStore((state) => state.orignalScale);
  const adminMode = useStore((state) => state.adminMode);
  const setfullscreen = useStore((state) => state.setfullscreen);
  const fullscreen = useStore((state) => state.fullscreen);
  const hidelabelbox = useStore((state) => state.hidelabelbox);
  const sethidelabelbox = useStore((state) => state.sethidelabelbox);
  const [nextDisable, setNextDisable] = useState(false);
  const [prevDisable, setPrevDisable] = useState(false);
  const setCurrImage = useStore((state) => state.setCurrImage);
  const navigate = useNavigate();
  let user = adminMode ? "mod" : "user";
  const currimageid = useStore((state) => state.currimageid);
  const regionsdict = useStore((s) => s.regionsdict);
  const setregionsdict = useStore((s) => s.setregionsdict);

  const saveRegions = () => {
    /**
     * Saves the current regions data for the image to the server and local storage.
     * The function constructs a request body containing user ID, image ID, and regions data.
     * It then makes a POST request to the server's API endpoint for adding annotations,
     * using the current user's authentication token for authorization.
     * After the server response is received, it logs the response and displays an alert.
     * Additionally, the function updates the local history by storing the current regions data.
     *
     * @function
     * @returns {void}
     */
    let curruser = "amey.choudhary@research.iiit.ac.in";
    let request_body = {
      user_id: curruser,
      image_id: currimageid,
      regions: regionsdict[currimageid],
    };
    let url = server + "/posts/add_" + user + "_annotation";
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token": currUser,
      },
      body: JSON.stringify(request_body),
    })
      .then((data) => data.json())
      .then((json) => {
        alert(JSON.stringify(json));
      });

    let prevHist = localStorage.getItem("history")
      ? JSON.parse(localStorage.getItem("history"))
      : [];
    let currRegion = regions;
    if (prevHist.length > 0 && prevHist[-1] !== currRegion) {
      prevHist.push(currRegion);
      localStorage.setItem("history", JSON.stringify(prevHist));
      setHistory(prevHist);
      setHistorySelected(prevHist.length - 1);
    } else if (prevHist.length == 0 && currRegion.length > 0) {
      prevHist.push(currRegion);
      localStorage.setItem("history", JSON.stringify(prevHist));
      setHistory(prevHist);
      setHistorySelected(prevHist.length - 1);
    }
  };

  async function loadRegions() {
    /**
     * Asynchronously loads regions for the current image from the server based on the user type.
     * The function makes a GET request to the server's API endpoint for retrieving annotations.
     * The received data is processed to group points by region, creating a dictionary of regions.
     * If the 'Show/Hide Annotations' state is 'Hide', it clears local storage and sets regions to an empty array.
     * Otherwise, it updates the regions, sets 'Show/Hide Annotations' state to 'Hide', and updates the regions dictionary.
     *
     * @async
     * @function
     * @returns {Promise<void>}
     */
    let id = currimageid;
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
    let regionsdict_copy = { ...regionsdict, [id]: regionArray };
    if (showHideAnnotations === "Hide") {
      localStorage.setItem("regions", JSON.stringify(regions));
      regionsdict_copy[id] = [];
      setRegions([]);
      setShowHideAnnotations("Show");
    } else {
      setRegions(regionArray);
      setShowHideAnnotations("Hide");
    }
    setregionsdict(regionsdict_copy);
  }

  async function prev() {
    /**
     * Navigates to the previous image in the sequence based on the provided image index.
     * If the current index is greater than 0, it decreases the index by 1,
     * sets the disable state accordingly, and updates the window location to the new index.
     *
     * @async
     * @function
     * @returns {Promise<void>}
     */
    let ser = "http://localhost:3000";
    let indx = Number(props.image_indx);
    if (indx > 0) {
      indx -= 1;
      if (indx == 0) {
        setPrevDisable(true);
      } else {
        setPrevDisable(false);
      }
      window.location.replace(ser + "/" + props.user_type + "/" + indx);
    }
  }

  async function next() {
    /**
     * Navigates to the next image in the sequence based on the provided image index.
     * If the current index is less than `count_images - 1`, it increases the index by 1,
     * sets the disable state accordingly, and updates the window location to the new index.
     *
     * @async
     * @function
     * @returns {Promise<void>}
     */
    let ser = "http://localhost:3000";
    let indx = Number(props.image_indx);
    if (indx < count_images - 1) {
      indx += 1;
      if (indx == count_images - 1) {
        setNextDisable(true);
      } else {
        setNextDisable(false);
      }
      window.location.replace(ser + "/" + props.user_type + "/" + indx);
    }
  }

  function zoomStage(stage, scaleBy) {
    /**
     * Zooms the provided stage by adjusting its scale based on the specified scaling factor.
     * If the scaling factor is greater than 1 or the zoomOut state is true, it zooms out.
     * The zooming operation takes into account the stage's current scale, width, height,
     * and the specified scaling factor. It also considers the mouse point for smoother zooming.
     *
     * @param {object} stage - The Konva stage to zoom.
     * @param {number} scaleBy - The scaling factor for zooming.
     *
     * @returns {void}
     */
    if (scaleBy > 1 || zoomOut) {
      const oldScale = stage.scaleX();

      const pos = {
        x: stage.width() / 2,
        y: stage.height() / 2,
      };
      const mousePointTo = {
        x: pos.x / oldScale - stage.x() / oldScale,
        y: pos.y / oldScale - stage.y() / oldScale,
      };

      const newScale = Math.max(stage.width() / imageWidth, oldScale * scaleBy);

      const newPos = {
        x: -(mousePointTo.x - pos.x / newScale) * newScale,
        y: -(mousePointTo.y - pos.y / newScale) * newScale,
      };
      const newAttrs = limitAttributes(stage, { ...newPos, scale: newScale });
      if (newAttrs.scale <= orignalScale) {
        stage.to(orignalScale);
        setStageScale(orignalScale);
        setZoomOut(false);
      } else {
        setZoomOut(true);
        setscreensize(screensize * scaleBy);
        stage.to({
          x: newAttrs.x,
          y: newAttrs.y,
          scaleX: newAttrs.scale,
          scaleY: newAttrs.scale,
          duration: 0.1,
        });
        setStageScale({
          x: newAttrs.x,
          y: newAttrs.y,
          scaleX: newAttrs.scale,
          scaleY: newAttrs.scale,
        });
      }
    }
  }

  const toggleFullScreen = () => {
    /**
     * Toggles fullscreen mode by updating the fullscreen state.
     * If the current fullscreen state is 1 (true), it sets it to 0 (false), and vice versa.
     * @function
     */
    setfullscreen(1 - fullscreen);
  };

  const togglehidelabelbox = () => {
    /**
     * Toggles the visibility of the label box by updating the hidelabelbox state.
     * If the current hidelabelbox state is 1 (true), it sets it to 0 (false), and vice versa.
     * @function
     */

    sethidelabelbox(1 - hidelabelbox);
  };

  const handleReset = () => {
    /**
     * Handles the reset action by clearing and resetting the annotation regions and history.
     * It sets the previous regions to the current regions, clears the previous regions history,
     * clears the current regions and their dictionary, resets the selected regions, and performs
     * additional actions (e.g., zooming to the original stage scale).
     * @function
     */
    setprevRegions(regions);
    let prevregions_copy = { ...prevregionsdict };
    prevregions_copy[currimageid] = [];
    setprevregionsdict(prevregions_copy);
    setprevRegions([]);
    let regionsdict_copy = { ...regionsdict };
    regionsdict_copy[currimageid] = [];
    setregionsdict(regionsdict_copy);
    setRegions([]);
    setSelectedRegions([]);
  };

  const handleUndo = () => {
    /**
     * Handles the undo action by reverting to the previous state in the annotation history.
     * If there are regions present, it retrieves the last region from the current state,
     * adds it to the previous regions, updates the state, and removes the last region from
     * the current state.
     * @function
     */
    if (regions.length > 0) {
      let prevregions_copy = { ...prevregionsdict };
      prevregions_copy[currimageid] = prevregions.concat([
        regions[regions.length - 1],
      ]);
      setprevregionsdict(prevregions_copy);
      setprevRegions(prevregions.concat([regions[regions.length - 1]]));
      let regionsdict_copy = { ...regionsdict };
      regionsdict_copy[currimageid] = regions.slice(0, -1);
      setregionsdict(regionsdict_copy);
      setRegions(regions.slice(0, -1));
    }
  };

  const handleRedo = () => {
    /**
     * Handles the redo action by restoring the next state in the annotation history.
     * If there are regions in the redo history, it retrieves the last region from the
     * redo history, adds it to the current regions, updates the state, and removes the
     * last region from the redo history.
     * @function
     */
    if (prevregions.length > 0) {
      let regionsdict_copy = { ...regionsdict };
      regionsdict_copy[currimageid] = regions.concat([
        prevregions[prevregions.length - 1],
      ]);
      setregionsdict(regionsdict_copy);
      setRegions(regions.concat([prevregions[prevregions.length - 1]]));
      let prevregions_copy = { ...prevregionsdict };
      prevregions_copy[currimageid] = prevregions.slice(0, -1);
      setprevregionsdict(prevregions_copy);
      setprevRegions(prevregions.slice(0, -1));
    }
  };

  return (
    <div
      className="zoom-container"
      style={{ fontFamily: "Roboto", fontSize: "1em", display: "flex" }}
    >
      <div className="toolbar-horizontal">
        <div className="container-fluid">
          <div className="btn-toolbar" style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={toggleFullScreen}
              className="btn btn-info"
              title="Full Screen"
            >
              {fullscreen ? <IoIosArrowForward /> : <IoIosArrowBack />}
            </button>
            <button
              className="btn btn-default"
              data-toggle="tooltip"
              data-placement="bottom"
              data-container="body"
              title="Zoom In"
              onClick={() => {
                zoomStage(stageRef.current, 1.2);
              }}
            >
              {" "}
              <ZoomInIcon className="block h-6 w-6 text-white" />
            </button>
            <button
              className="btn btn-default"
              data-toggle="tooltip"
              data-placement="bottom"
              data-container="body"
              title="Zoom Out"
              disabled={!zoomOut}
              onClick={() => {
                zoomStage(stageRef.current, 0.8);
              }}
            >
              <ZoomOutIcon className="block h-6 w-6 text-white" />
            </button>
            <button
              className="btn btn-success"
              onClick={() => {
                loadRegions();
              }}
            >
              {showHideAnnotations === "Hide" ? (
                <>
                  <FaEyeSlash />
                </>
              ) : (
                <>
                  <FaEye />
                </>
              )}
            </button>
            <button
              className="btn btn-success"
              onClick={() => {
                saveRegions();
              }}
            >
              <SaveIcon className="block h-6 w-6 text-white" />
            </button>
            <button
              onClick={handleReset}
              className="btn btn-info"
              style={{
                backgroundColor: "green",
                borderColor: "green",
                color: "#fff",
              }}
              title="Reset"
            >
              <BsArrowRepeat />
            </button>
            <button
              onClick={handleUndo}
              className="btn btn-info"
              style={{
                backgroundColor: "green",
                borderColor: "green",
                color: "#fff",
              }}
              title="Undo"
            >
              <BsArrowCounterclockwise />
            </button>
            <button
              onClick={handleRedo}
              className="btn btn-info"
              style={{
                backgroundColor: "green",
                borderColor: "green",
                color: "#fff",
              }}
              title="Redo"
            >
              <BsArrowClockwise />
            </button>
            <button
              onClick={togglehidelabelbox}
              className="btn btn-info"
              title="Redo"
            >
              {hidelabelbox ? <IoIosArrowBack /> : <IoIosArrowForward />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
