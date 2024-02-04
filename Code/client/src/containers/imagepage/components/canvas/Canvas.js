import PointerMode from "./modes/PointerMode";
import PolygonTool from "./modes/PolygonTool";
import FreeHand from "./modes/FreeHand";
import Rectangle from "./modes/Rectangle";
import DragTool from "./modes/DragTool";
import React from "react";
import Circle from "./modes/Circle";
import Oval from "./modes/Oval";
import { useState, useContext } from "react";
import useStore from "../../library/store";
import ModerationTool from "./modes/ModerationTool";
import TempImage from "../../../../assets/photo.jpeg";

export default (props) => {
  const imageURL = props.imageURL;
  const imagelist = props.imagelist;
  const gridsize = useStore((state) => state.gridsize);
  const setgridsize = useStore((state) => state.setgridsize);
  const gridview = useStore((state) => state.gridview);
  const setgridview = useStore((state) => state.setgridview);
  const currimageid = useStore((state) => state.currimageid);
  const setcurrimageid = useStore((state) => state.setcurrimageid);
  const setgridimages = useStore((state) => state.setgridimages);
  const tool = useStore((state) => state.tool);
  const setviewimage = useStore((state) => state.setviewimage);
  const setViewerImage = useStore((state) => state.setViewerImage);
  const setImageName = useStore((state) => state.setImageName);
  const setRegions = useStore((state) => state.setRegions);
  const setprevRegions = useStore((state) => state.setprevRegions);
  const allImages = useStore((state) => state.allImages);
  const prevregionsdict = useStore((state) => state.prevregionsdict);
  const setregionsdict = useStore((state) => state.setregionsdict);
  const server = useStore((s) => s.server);
  const currUser = useStore((state) => state.currUser);
  const adminMode = useStore((state) => state.adminMode);
  let user = adminMode ? "mod" : "user";
  const regionsdict = useStore((state) => state.regionsdict);
  const regions = useStore((state) => state.regions);
  const showHideAnnotations = useStore((s) => s.showHideAnnotations);
  const selectedCell = useStore((state) => state.selectedCell);
  const setSelectedCell = useStore((state) => state.setSelectedCell);
  const setSize = useStore((state) => state.setSize);

  const setCanvasMode = (id, imageURL, index) => {
    /**
     * Sets the canvas mode based on the given identifier and returns the corresponding React component.
     *
     * @function
     * @param {number} id - The identifier representing the canvas mode.
     * @param {string} imageURL - The URL of the image to be displayed in the canvas.
     * @param {number} index - The index of the canvas mode.
     * @returns {React.Component} A React component representing the selected canvas mode.
     */
    switch (id) {
      case 0:
        return (
          <PointerMode
            imageURL={imageURL}
            index={index}
            zoom={props.zoom}
            setzoom={props.setzoom}
            test={props.test}
          />
        );
      case 1:
        return (
          <PolygonTool
            imageURL={imageURL}
            index={index}
            zoom={props.zoom}
            setzoom={props.setzoom}
            test={props.test}
          />
        );
      case 2:
        return (
          <FreeHand
            imageURL={imageURL}
            index={index}
            zoom={props.zoom}
            setzoom={props.setzoom}
            test={props.test}
          />
        );
      case 3:
        return (
          <Rectangle
            imageURL={imageURL}
            index={index}
            zoom={props.zoom}
            setzoom={props.setzoom}
            test={props.test}
          />
        );
      case 4:
        return (
          <DragTool
            imageURL={imageURL}
            index={index}
            zoom={props.zoom}
            setzoom={props.setzoom}
            test={props.test}
          />
        );
      case 5:
        return (
          <ModerationTool
            imageURL={imageURL}
            index={index}
            zoom={props.zoom}
            setzoom={props.setzoom}
            test={props.test}
          />
        );
      case 10:
        return (
          <Oval
            imageURL={imageURL}
            index={index}
            zoom={props.zoom}
            setzoom={props.setzoom}
            test={props.test}
          />
        );
      case 9:
        return (
          <Circle
            imageURL={imageURL}
            index={index}
            zoom={props.zoom}
            setzoom={props.setzoom}
            test={props.test}
          />
        );
      default:
        return (
          <PointerMode
            imageURL={imageURL}
            index={index}
            zoom={props.zoom}
            setzoom={props.setzoom}
            test={props.test}
          />
        );
    }
  };

  async function loadRegions(id) {
    /**
     * Asynchronously loads and processes regions for a given image ID.
     *
     * @async
     * @function
     * @param {string} id - The unique identifier of the image for which regions are to be loaded.
     * @returns {Promise<Object>} A promise that resolves to an object representing the loaded regions.
     * @throws {Error} If there is an issue with the network request or the response format.
     *
     * @example
     * // Example usage:
     * const imageId = "12345";
     * try {
     *   const loadedRegions = await loadRegions(imageId);
     * } catch (error) {
     *   console.error("Error loading regions:", error.message);
     * }
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

  function handleClick(num, image) {
    /**
     * Handles the click event for a specific image in the grid, updating relevant state variables.
     *
     * @function
     * @param {number} num - The index of the clicked image.
     * @param {string} image - The URL or identifier of the clicked image.
     * @returns {void}
     *
     * @example
     * // Example usage:
     * const imageIndex = 2;
     * const imageUrl = "https://example.com/image.jpg";
     * handleClick(imageIndex, imageUrl);
     * // State variables like currimageid, gridview, gridimages, and Regions are updated accordingly.
     */
    setcurrimageid(num);
    let newregionsdict = loadRegions(num);
    setSelectedCell({ row: 1, col: 1 });
    setgridview([1, 1]);
    setgridimages([{ image: image, index: num }]);
    setRegions(newregionsdict[num] ? newregionsdict[num] : []);
    setprevRegions(prevregionsdict[num] ? prevregionsdict[num] : []);

    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    setSize({
      width: newWidth,
      height: newHeight,
    });
  }

  return (
    <React.Fragment>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {imagelist.map((item, index) => {
          return gridview[0] == 1 && gridview[1] == 1 ? (
            <div
              key={index}
              style={{
                width: `${100 / gridview[1]}%`,
                height: `${100 / gridview[0]}%`,
                boxSizing: "border-box",
                padding: "4px",
                display: "flex",
                flexDirection: "row",
              }}
            >
              {setCanvasMode(tool.id, item.image, item.index)}
            </div>
          ) : (
            <button
              onClick={() => {
                handleClick(item.index, item.image);
              }}
              key={index}
              style={{
                width: `${100 / gridview[1]}%`,
                height: `${100 / gridview[0]}%`,
                boxSizing: "border-box",
                padding: "4px",
                display: "flex",
                flexDirection: "row",
              }}
            >
              {setCanvasMode(tool.id, item.image, item.index)}
            </button>
          );
        })}
      </div>
    </React.Fragment>
  );
};
