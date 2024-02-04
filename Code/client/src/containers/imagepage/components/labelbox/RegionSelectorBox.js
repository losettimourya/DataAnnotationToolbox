import React from "react";
import { styled, Box } from "@mui/system";
import { IconButton, Paper, Typography } from "@mui/material";
import { FaTrash, FaMousePointer } from "react-icons/fa";
import { BsFillTrashFill } from "react-icons/bs";
import { AiOutlinePicture } from "react-icons/ai";
import SidebarBoxContainer from "./SidebarBoxContainer";
import useStore from "../../library/store";

const headerSepStyle = {
  borderTop: "1px solid #e0e0e0",
  marginTop: 2,
  marginBottom: 2,
};

const HeaderSep = () => <div style={headerSepStyle}></div>;
const Row = ({ region, onDeleteRegion, onSelectRegion }) => {
  const regions = useStore((state) => state.regions);
  const regionsdict = useStore((s) => s.regionsdict);
  const setregionsdict = useStore((s) => s.setregionsdict);
  const setRegions = useStore((state) => state.setRegions);
  const selectedregion = useStore((state) => state.selectedregion);
  const setselectedregion = useStore((state) => state.setselectedregion);
  const selectedRegions = useStore((s) => s.selectedRegions);
  const setSelectedRegions = useStore((s) => s.setSelectedRegions);
  const currimageid = useStore((s) => s.currimageid);
  const setTool = useStore((state) => state.setTool);
  const tools = useStore((state) => state.tools);
  const setTools = useStore((state) => state.setTools);
  function onDeleteRegion(regionId) {
    let copy_regions = [...regions];
    let index_of_selected_region = regionId;
    copy_regions.splice(index_of_selected_region, 1);
    let regionsdict_copy = { ...regionsdict };
    regionsdict_copy[currimageid] = copy_regions;
    setregionsdict(regionsdict_copy);
    setRegions(copy_regions);
  }
  function onSelectRegion(region) {
    let sel = selectedRegions;
    sel.clear();
    sel.add(region.id);
    setSelectedRegions(sel);
    setTool(tools[0]);
    setselectedregion(region);
  }
  return (
    <Paper
      elevation={3}
      style={{ padding: "4px", marginBottom: "10px", maxWidth: "300px", maxHeight: "55px"}}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" style={{maxHeight:"50px"}}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "16px",
              height: "16px",
              backgroundColor: region.color || "#000",
              border: "1px solid #ccc",
              marginTop: "2px",
              marginRight: "10px",
            }}
          />
          <Typography
            variant="body2"
            color="textPrimary"
            style={{ marginRight: "8px", fontSize: "20px"}}
          >
            {region.label && region.label.name ? region.label.name : "No Label"}
          </Typography>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaTrash
            size={16}
            className="icon2"
            onClick={() => onDeleteRegion(region.id)}
            style={{ marginRight: "8px" }}
          />
          <FaMousePointer
            size={16}
            className="icon2"
            onClick={() => onSelectRegion(region)}
          />
        </div>
      </Box>
    </Paper>
  );
};

const RegionSelectorBox = ({ regions }) => {
  return (
    <SidebarBoxContainer
      title="Regions"
      subTitle=""
      icon={<AiOutlinePicture style={{ color: "#616161" }} />}
      expandedByDefault
    >
      <div>
        {regions &&
          regions.map((region, index) => (
            <Row key={region.id} region={region} index={index} />
          ))}
      </div>
    </SidebarBoxContainer>
  );
};

export default RegionSelectorBox;
