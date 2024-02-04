import React, { Component, createContext, useContext, useState } from "react";
import useStore from "../../library/store";

import "./style.css";
import PolyBool from "polybooljs";

let toolbox_items = [
  {
    id: 0,
    label: "Arrow",
    type: "arrow",
    isHovering: false,
    iconimage: "./icons/cursor.svg",
  },
  {
    id: 1,
    label: "Polygon",
    type: "polygon",
    isHovering: false,
    iconimage: "./icons/polygon.svg",
  },
  {
    id: 2,
    label: "Custom",
    type: "custom",
    isHovering: false,
    iconimage: "./icons/custom.svg",
  },
  {
    id: 3,
    label: "Rectangle",
    type: "rectangle",
    isHovering: false,
    iconimage: "./icons/rectangle.svg",
  },
  {
    id: 4,
    label: "Drag",
    type: "dragMode",
    isHovering: false,
    iconimage: "./icons/drag.svg",
  },
  {
    id: 10,
    label: "Oval",
    type: "oval",
    isHovering: false,
    iconimage: "./icons/oval.svg",
  },
  {
    id: 9,
    label: "Circle",
    type: "circle",
    isHovering: false,
    iconimage: "./icons/circle.svg",
  },
  {
    id: 5,
    label: "Moderation",
    type: "moderation",
    isHovering: false,
    iconimage: "./icons/multi-select.svg",
  },
];
let moderation_items = [
  {
    id: 6,
    label: "Delete",
    type: "delete",
    isHovering: false,
    iconimage: "./icons/delete.svg",
  },
  {
    id: 7,
    label: "Intersection",
    type: "intersection",
    isHovering: false,
    iconimage: "./icons/intersection.png",
  },
  {
    id: 8,
    label: "Union",
    type: "union",
    isHovering: false,
    iconimage: "./icons/union.png",
  },
];
function ToolBox(props) {
  let user_toolbox_items = toolbox_items; 
  let user_moderation_items = moderation_items;
  if (!props.isAdmin) {
    user_toolbox_items.splice(7, 1);
    user_moderation_items.splice(1, 2);
  }
  const tool = useStore((state) => state.tool);
  const setTool = useStore((state) => state.setTool);
  const regions = useStore((state) => state.regions);
  const setRegions = useStore((state) => state.setRegions);
  const selectedRegions = useStore((s) => s.selectedRegions);
  const setSelectedRegions = useStore((s) => s.setSelectedRegions);
  const tools = useStore((state) => state.tools);
  const setTools = useStore((state) => state.setTools);
  const [moderationItems, setModerationItems] = useState(user_moderation_items);
  const [isHovering, setIsHovering] = useState(false);
  const currimageid = useStore((state) => state.currimageid);
  const regionsdict = useStore((s) => s.regionsdict);
  const setregionsdict = useStore((s) => s.setregionsdict);

  function processSelections(name) {
    /**
     * Process selections based on the specified operation (e.g., "Delete", "Union", "Intersection").
     * If the operation is "Delete" and there are selected regions, removes those regions from the state.
     * If the operation is "Union" or "Intersection" and there are selected regions,
     * performs the corresponding Boolean operation on the selected regions and updates the state.
     *
     * @function
     * @param {string} name - The operation to be performed ("Delete", "Union", "Intersection").
     * @returns {void}
     */
    if (name == "Delete") {
      if (selectedRegions.size != 0) {
        let copy_regions = [...regions];
        for (let region_id of selectedRegions) {
          let index_of_selected_region = copy_regions.findIndex(
            (region) => region.id === region_id
          );
          if (index_of_selected_region > -1) {
            copy_regions.splice(index_of_selected_region, 1);
          }
        }
        let regionsdict_copy = { ...regionsdict };
        regionsdict_copy[currimageid] = copy_regions;
        setregionsdict(regionsdict_copy);
        setRegions(copy_regions);
      }
    } else {
      if (selectedRegions.size > 0) {
        let copy_regions = [...regions];
        let selected_regions = [];
        for (let region_id of selectedRegions) {
          let indx = copy_regions.findIndex(
            (region) => region.id === region_id
          );
          if (indx > -1) {
            selected_regions.push(copy_regions[indx]);
            copy_regions.splice(indx, 1);
          }
        }
        let isEditable = selected_regions[0].isEditable;
        var new_region = {
          regions: [selected_regions[0].points.map((obj) => [obj.x, obj.y])],
          inverted: false,
        };
        for (let i = 1; i < selected_regions.length; i++) {
          let curr_region = {
            regions: [selected_regions[i].points.map((obj) => [obj.x, obj.y])],
            inverted: false,
          };
          if (name === "Union") {
            new_region = PolyBool.union(new_region, curr_region);
          } else {
            new_region = PolyBool.intersect(new_region, curr_region);
          }
          isEditable = isEditable && selected_regions[i].isEditable;
        }
        if (new_region.regions.length > 0) {
          let new_region_json = new_region.regions[0].map(([x, y]) => ({
            x,
            y,
          }));
          const konva_region = {
            id: selected_regions[0].id,
            isComplete: true,
            isEditable: isEditable,
            color: selected_regions[0].color,
            points: new_region_json,
            label: null,
          };
          copy_regions.push(konva_region);
        }
        let regionsdict_copy = { ...regionsdict };
        regionsdict_copy[currimageid] = copy_regions;
        setregionsdict(regionsdict_copy);
        setRegions(copy_regions);
        setSelectedRegions(selectedRegions.clear());
      }
    }
  }

  const handleMouseOver = (e) => {
    /**
     * Handles the mouse over event for a tool element.
     * Updates the state to indicate that the corresponding tool is currently being hovered over.
     *
     * @function
     * @param {object} e - The mouse over event object.
     * @returns {void}
     */
    if (e.target.id) {
      let copy_tools = [...tools];
      let tool_indx = copy_tools.findIndex((x) => x.id == e.target.id);
      copy_tools[tool_indx].isHovering = true;
      setTools(copy_tools);
    }
  };

  const handleMouseOut = (e) => {
    /**
     * Handles the mouse out event for a tool element.
     * Updates the state to indicate that the corresponding tool is no longer being hovered over.
     *
     * @function
     * @param {object} e - The mouse out event object.
     * @returns {void}
     */
    if (e.target.id) {
      let copy_tools = [...tools];
      let tool_indx = copy_tools.findIndex((x) => x.id == e.target.id);
      copy_tools[tool_indx].isHovering = false;
      setTools(copy_tools);
    }
  };

  return (
    <React.Fragment>
      <div className="toolbar drag" id="drag-tool">
        {tools.map((option) => (
          <div
            id={option.id}
            key={option.id}
            className={`tool ${option.type + " "} ${
              option.id === tool.id ? "active " : " "
            } `}
            data-tool-tip={option.label}
            onClick={() => setTool(option)}
          ></div>
        ))}
        <hr></hr>
        <div>
          {moderationItems.map((option) => (
            <div
              id={option.id}
              key={option.id}
              className={`tool ${option.type + " "} `}
              data-tool-tip={option.label}
              onClick={() => processSelections(option.label)}
            ></div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default ToolBox;
