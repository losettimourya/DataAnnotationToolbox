import React, { useState } from "react";
import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import useStore from "../../containers/imagepage/library/store";
const ToggledButton = () => {
  const adminMode = useStore((state) => state.adminMode);
  const usertype = adminMode ? "MOD" : "USER";
  const [value, setValue] = useState(usertype);
  const setAdminMode = useStore((state) => state.setAdminMode);
  const currimageid = useStore((state) => state.currimageid);
  const setregionsdict = useStore((state) => state.setregionsdict);
  const server = useStore((s) => s.server);
  const regionsdict = useStore((state) => state.regionsdict);
  const currUser = useStore((state) => state.currUser);
  const regions = useStore((state) => state.regions);
  const showHideAnnotations = useStore((s) => s.showHideAnnotations);
  const setRegions = useStore((state) => state.setRegions);
  const handleChange = (event) => {
    const newvalue = value == "MOD" ? "USER" : "MOD";
    setValue(newvalue);
    setAdminMode(!adminMode);
    loadRegions(currimageid,newvalue);
  };
  let user = adminMode ? "mod" : "user";
  async function loadRegions(id,newvalue) {
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
    if (newvalue=="USER") {
      url = server + "/posts/get_user"+ "_annotation/" + id;
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
          comment: point.user_annotation_region_comment, // You can set a default value for label or fetch it from points
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
  return (
    <div>
      {/* <Typography variant="h6" gutterBottom style={{ color: "#fff" , marginRight:"5px"}}>
        {value === "MOD" ? "MOD" : "USER"}
      </Typography> */}
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={handleChange}
        aria-label="toggled button"
        style={{ paddingRight: "50px" }}
      >
        <ToggleButton
          value={value}
          style={{ backgroundColor: "#2196F3", color: "#fff" }}
        >
          {value}
        </ToggleButton>
        {/* <ToggleButton
          value="USER"
          style={{ backgroundColor: "#FF4081", color: "#fff" }}
        >
          USER
        </ToggleButton> */}
      </ToggleButtonGroup>
    </div>
  );
};

export default ToggledButton;
