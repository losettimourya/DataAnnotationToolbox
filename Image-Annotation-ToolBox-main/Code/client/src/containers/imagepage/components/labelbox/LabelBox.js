import React, { Component, createContext, useContext, useState } from "react";
import useStore from "../../library/store";
import AddLabelDialog from "./AddLabelDialog";
import SetUserId from "./SetUserId";
import { useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import "./style.css";
import { getRequest } from "../../library/requests";
import LabelBoxContainer from "./LabelBoxContainer";
import HistoryIcon from "@mui/icons-material/History";
import { FaTag } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { FaTh, FaComment, FaShapes } from "react-icons/fa";
import { Container } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import RegionSelectorBox from "./RegionSelectorBox";
import CommentBox from "./Comments.js"
let clabels = [
  { name: "Cancer cell", color: "Red" },
  { name: "Normal cell", color: "Blue" },
];
let selected = null;
const LabelBox = ({ open2 }) => {
  const dataset = useStore((state) => state.dataset);
  const labels = useStore((state) => state.labels);
  const history = useStore((state) => state.history);
  const fillinside = useStore((state) => state.fillinside);
  const setFillinside = useStore((state) => state.setFillinside);
  const pointcolor = useStore((state) => state.pointcolor);
  const setPointcolor = useStore((state) => state.setPointcolor);
  const pointwidth = useStore((state) => state.pointwidth);
  const setPointwidth = useStore((state) => state.setPointwidth);
  const linewidth = useStore((state) => state.linewidth);
  const setLinewidth = useStore((state) => state.setLinewidth);
  const regionopacity = useStore((state) => state.regionopacity);
  const setRegionopacity = useStore((state) => state.setRegionopacity);
  const setLabels = useStore((state) => state.setLabels);
  const setRegions = useStore((state) => state.setRegions);
  const historySelected = useStore((state) => state.historySelected);
  const setHistorySelected = useStore((state) => state.setHistorySelected);
  const gridsize = useStore((state) => state.gridsize);
  const setgridsize = useStore((state) => state.setgridsize);
  const gridview = useStore((state) => state.gridview);
  const setgridview = useStore((state) => state.setgridview);
  const width = useStore((state) => state.width);
  const height = useStore((state) => state.height);
  const setSize = useStore((state) => state.setSize);
  const color = useStore((state) => state.color);
  const setColor = useStore((state) => state.setColor);
  const server = useStore((state) => state.server);
  const selectedregion = useStore((state) => state.selectedregion);
  const setselectedregion = useStore((state) => state.setselectedregion);
  const [Comment, setComment] = useState("");
  const selectedRegions = useStore((s) => s.selectedRegions);
  const gridimages = useStore((state) => state.gridimages);
  const setgridimages = useStore((state) => state.setgridimages);
  const [isFocused, setIsFocused] = useState(false);
  const currimageid = useStore((state) => state.currimageid);
  const regionsdict = useStore((s) => s.regionsdict);
  const setregionsdict = useStore((s) => s.setregionsdict);
  const selectedCell = useStore((state) => state.selectedCell);
  const setSelectedCell = useStore((state) => state.setSelectedCell);
  const adminMode = useStore((state) => state.adminMode);

  const Tile = (props) => {
    /**
     * React component representing a tile in the grid layout.
     * The Tile component receives properties (props) and returns a React element.
     * It handles mouse events to update the grid view and size accordingly.
     *
     * @function
     * @param {Object} props - Component properties.
     * @returns {JSX.Element} - React element representing the tile.
     */
    const { color, id, row, col } = props;
    const tileStyle = {
      width: "20px",
      height: "20px",
      border: "1px solid #ccc",
      backgroundColor: color === "grey" ? "grey" : "transparent",
      color: color === "grey" ? "grey" : "#000",
    };

    return (
      <div
        id={id}
        className="tile"
        style={tileStyle}
        onMouseEnter={() => {
          setSelectedCell({ row, col });
          const colsize = col;
          const rowsize = row;
        }}
        onClick={() => {
          setSelectedCell({ row, col });
          const colsize = col;
          const rowsize = row;
          setgridview([rowsize, colsize]);
          setgridimages(
            gridimages.slice(gridimages.length - rowsize * colsize)
          );
          const newWidth = window.innerWidth / colsize;
          const newHeight = window.innerHeight / rowsize;
          setSize({
            width: newWidth,
            height: newHeight,
          });
        }}
      >
        {id}
      </div>
    );
  };

  const createBoard = (n, m) => {
    /**
     * Creates a board for grid layout based on the given dimensions.
     * The resulting board is an array of React elements representing the grid.
     * The function takes the number of rows (n) and columns (m) as parameters.
     *
     * @function
     * @param {number} n - Number of rows.
     * @param {number} m - Number of columns.
     * @returns {JSX.Element[]} - Array of React elements representing the board.
     */
    let board = [];
    for (let row = 1; row <= n; row++) {
      let boardRow = [];
      for (let col = 1; col <= m; col++) {
        const color =
          row <= selectedCell.row && col <= selectedCell.col ? "grey" : "";
        boardRow.push(
          <Tile key={`${row}-${col}`} color={color} row={row} col={col} />
        );
      }
      board.push(
        <div key={row} className="row">
          {boardRow}
        </div>
      );
    }
    return board;
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
  };

  const handleLoad = async (event) => {
    /**
     * Handles the loading of annotations for the current image.
     * Fetches data from the server and updates the state accordingly.
     * This function is an asynchronous operation and returns a Promise.
     *
     * @async
     * @function
     * @returns {Promise<void>}
     */
    let url =
      server +
      "/posts/get_images_labels" +
      "/" +
      window.location.pathname.split("/")[2];
    const response = await getRequest(url);
    let response_string = JSON.stringify(response);

    const dataArray = JSON.parse(response_string);
    let labels_array = [];

    for (let i = 0; i < dataArray.length; i++) {
      const item = dataArray[i];
      const labelName = item.dataset_label_name;
      const labelColor = item.dataset_label_color;
      labels_array.push({ id: i, name: labelName, color: labelColor });
    }
    setLabels(labels_array);
  };
  let selected_region = null;

  useEffect(() => {
    handleLoad();
  }, []);
  if (selectedRegions.size > 0) {
    let current_regions_dict = { ...regionsdict };
    let current_selected_regions = current_regions_dict[currimageid];
    if (current_selected_regions) {
      current_selected_regions.map((region) => {
        if (region.id == selectedRegions.values().next().value) {
          selected_region = region;
        }
      });
    }
  } else {
    selected_region = null;
  }

  const handleComment = async (event) => {
    /**
     * Handles the addition of comments for selected annotations.
     * Updates the state with the new comment for the selected annotation.
     * This function is asynchronous and returns a Promise.
     *
     * @async
     * @function
     * @param {Event} event - The form submission event.
     * @returns {Promise<void>}
     */
    event.preventDefault();
    let selected_region_id = selectedregion.id;
    let newregionsdict = { ...regionsdict };
    let newregions = newregionsdict[currimageid];
    newregions.forEach((region) => {
      if (region.id === selected_region_id) {
        region.comment = Comment;
        setselectedregion(region);
      }
    });
    newregionsdict[currimageid] = newregions;
    setregionsdict(newregionsdict);
  };

  return (
    <div
      className={` ${
        open2 ? "w-1/5" : "w-0 "
      } p-0 pr-2  pt-8 relative duration-300 overflow-hidden fixed`}
    >
      <div
        className={`flex flex-col duration-300 ${
          !open2 ? "scale-0" : ""
        }  m-0 h-full w-full`}
      >
        <LabelBoxContainer
          icon={<FaTag size={24} color="#007bff" />}
          title="Labels"
          subTitle=""
          noScroll={false}
          expandedByDefault={false}
        >
          <div className="flex flex-col rounded-lg border border-gray-700 h-1/3 m-2 bg-gray-200 p-1 overflow-hidden mb-1">
            <legend className="text-lg font-bold text-gray-800 ">Labels</legend>
            <div className=" overflow-auto">
              {labels.length
                ? labels.map((option) => (
                    <div
                      key={option.color}
                      className={`flex items-center p-2 rounded cursor-pointer active:bg-gray-300  hover:${
                        option.color === selected
                          ? "bg-gray-300"
                          : "bg-blue-200 "
                      } 
                     ${option.color === selected ? "bg-gray-300" : " "} `}
                      onClick={() => {
                        setColor(option.color);
                        let regionid = null;
                        regionid = selectedregion.id;
                        let newregionsdict = { ...regionsdict };
                        let newregions = newregionsdict[currimageid];
                        if (newregions) {
                          newregions.forEach((region) => {
                            if (region.id === regionid) {
                              region.label = {};
                              region.label.name = option.name;
                              region.label.color = option.color;
                              region.color = option.color;
                            }
                          });
                          newregionsdict[currimageid] = newregions;
                          setregionsdict(newregionsdict);
                          setselectedregion({
                            ...selectedregion,
                            label: { name: option.name, color: option.color },
                            color: option.color,
                          });
                        }
                        selected = option.color;
                      }}
                    >
                      <span
                        className="w-6 h-6"
                        style={{
                          backgroundColor: option.color,
                          color: option.color,
                        }}
                      >
                        &emsp;{" "}
                      </span>{" "}
                      &nbsp; {option.name}
                    </div>
                  ))
                : null}
            </div>
          </div>
          <AddLabelDialog dataset={dataset} />
        </LabelBoxContainer>
        <LabelBoxContainer
          icon={<HistoryIcon />}
          title="History"
          subTitle=""
          noScroll={false}
          expandedByDefault={false}
        >
          <div className="flex flex-col h-1/3  bg-gray-200 m-2 p-2 rounded-lg border border-gray-900 mb-1">
            <legend className="text-lg font-bold text-gray-800">History</legend>
            <div className="p-2 rounded-lg bg-gray-300 flex-1 flex-col overflow-auto">
              {history.length
                ? history.map((option, index) => (
                    <div
                      key={index}
                      className={`${
                        index === historySelected ? "bg-white" : ""
                      } `}
                      onClick={() => {
                        let regionsdict_copy = { ...regionsdict };
                        regionsdict_copy[currimageid] = history[index];
                        setregionsdict(regionsdict_copy);
                        setRegions(history[index]);
                        setHistorySelected(index);
                      }}
                    >
                      <span>&emsp; </span> &nbsp; {"Version : " + (index + 1)}
                    </div>
                  ))
                : null}
            </div>
          </div>
        </LabelBoxContainer>
        <LabelBoxContainer
          icon={<FaPencilAlt size={24} color="#007bff" />}
          title="Region Configuration"
          subTitle=""
          noScroll={false}
          expandedByDefault={false}
        >
          <div style={{ marginTop: "16px" }}>
            <FormControl>
              <InputLabel
                id="demo-simple-select-autowidth-label"
                style={{
                  fontSize: "18px",
                  fontFamily: "Arial, sans-serif",
                  marginBottom: "8px",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                Opacity
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={regionopacity}
                onChange={(e) => setRegionopacity(e.target.value)}
                style={{ width: "100px" }}
              >
                <MenuItem value="0.1">0.1</MenuItem>
                <MenuItem value="0.2">0.2</MenuItem>
                <MenuItem value="0.3">0.3</MenuItem>
                <MenuItem value="0.4">0.4</MenuItem>
                <MenuItem value="0.5">0.5</MenuItem>
                <MenuItem value="0.6">0.6</MenuItem>
                <MenuItem value="0.7">0.7</MenuItem>
                <MenuItem value="0.8">0.8</MenuItem>
                <MenuItem value="0.9">0.9</MenuItem>
                <MenuItem value="1">1</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{ marginTop: "16px" }}>
            <FormControl>
              <InputLabel
                id="demo-simple-select-autowidth-label"
                style={{
                  fontSize: "18px",
                  fontFamily: "Arial, sans-serif",
                  marginBottom: "8px",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                Fill Inside
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={fillinside}
                onChange={(e) => setFillinside(e.target.value)}
                style={{ width: "100px" }}
              >
                <MenuItem value={1}>Yes</MenuItem>
                <MenuItem value={0}>No</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{ marginTop: "16px" }}>
            <FormControl>
              <InputLabel
                id="demo-simple-select-autowidth-label"
                style={{
                  fontSize: "18px",
                  fontFamily: "Arial, sans-serif",
                  marginBottom: "8px",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                Point width
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={pointwidth}
                onChange={(e) => setPointwidth(e.target.value)}
                style={{ width: "100px" }}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl style={{ marginTop: "16px" }}>
              <InputLabel
                id="demo-simple-select-autowidth-label"
                style={{
                  fontSize: "18px",
                  fontFamily: "Arial, sans-serif",
                  marginBottom: "8px",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                Line width
              </InputLabel>
              <Select
                className="ml-2 border border-gray-300 rounded py-1"
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={linewidth}
                onChange={(e) => setLinewidth(e.target.value)}
                style={{ width: "100px" }}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
              </Select>
            </FormControl>
          </div>
        </LabelBoxContainer>
        <LabelBoxContainer
          icon={<FaInfoCircle size={24} color="#007bff" />}
          title="Region Details"
          subTitle=""
          noScroll={false}
          expandedByDefault={false}
        >
          {adminMode ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <Paper
                elevation={3}
                style={{
                  padding: "16px",
                  maxWidth: "300px",
                  maxHeight: "75px",
                  wordWrap: "break-word",
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  marginBottom="16px"
                >
                  <Typography
                    variant="h6"
                    color="textPrimary"
                    style={{ marginRight: "10px" }}
                  >
                    {selectedregion && selectedregion.user_id ? selectedregion.user_id.split('@')[0] : null} 
                  </Typography>
                </Box>
              </Paper>
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <Paper
              elevation={3}
              style={{
                padding: "16px",
                maxWidth: "300px",
                maxHeight: "75px",
                wordWrap: "break-word",
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                marginBottom="16px"
              >
                <Typography
                  variant="h6"
                  color="textPrimary"
                  style={{ marginRight: "10px" }}
                >
                  {selectedregion.label && selectedregion.label.name
                    ? selectedregion.label.name
                    : "No Label"}
                </Typography>
                <Box
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: selectedregion.color || "#000",
                    border: "1px solid #ccc",
                    marginTop: "5px",
                  }}
                />
              </Box>
            </Paper>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <Paper
              elevation={3}
              style={{
                padding: "16px",
                maxWidth: "300px",
                maxHeight: "75px",
                wordWrap: "break-word",
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                marginBottom="16px"
              >
                <Typography
                  variant="h8"
                  color="textPrimary"
                  style={{ marginRight: "10px" }}
                >
                  {selectedregion && selectedregion.comment
                    ? selectedregion.comment
                    : "No Comment for the given Region"}
                </Typography>
              </Box>
            </Paper>
          </div>
          <Paper
            elevation={3}
            style={{
              padding: "16px",
              maxWidth: "300px",
              background: "#000000",
            }}
          >
            <form
              onSubmit={handleComment}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <TextField
                variant="outlined"
                value={Comment}
                onChange={(e) => setComment(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={{
                  width: "100%",
                  outlineColor: isFocused ? "#2196f3" : "#008000",
                }}
                inputProps={{
                  style: {
                    color: isFocused ? "white" : "#008000",
                  },
                }}
                label="Comment"
                color="primary"
                focused
                required
              />
              <Button
                type="submit"
                variant="contained"
                style={{ width: "100%", backgroundColor: "#2196f3" }} 
              >
                Add Comment
              </Button>
            </form>
          </Paper>
        </LabelBoxContainer>
        <LabelBoxContainer
          icon={<FaTh size={24} color="#007bff" />}
          title="Grid Layout"
          subTitle=""
          noScroll={false}
          expandedByDefault={false}
        >
          <Container style={containerStyle}>{createBoard(3, 3)}</Container>
        </LabelBoxContainer>
        <LabelBoxContainer
          icon={<FaShapes size={24} color="#007bff" />}
          title="Region Selector"
          subTitle=""
          noScroll={false}
          expandedByDefault={false}
        >
          <RegionSelectorBox regions={regionsdict[currimageid]} />
        </LabelBoxContainer>
        <LabelBoxContainer
          icon={<FaComment size={24} color="#007bff" />}
          title="Image Comments"
          subTitle=""
          noScroll={false}
          expandedByDefault={false}
        >
          <CommentBox image_id={currimageid} />
        </LabelBoxContainer>
      </div>
    </div>
  );
};

export default LabelBox;
