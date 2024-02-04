import React, { Component, createContext, useContext, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import useStore from "../../library/store";
import "./style.css";
function AddLabelDialog(props) {
  /**
   * React component for adding a label in a dialog.
   *
   * @param {Object} props - Component properties.
   * @param {string} props.dataset - The name of the dataset.
   * @returns {JSX.Element} - React element representing the AddLabelDialog.
   */
  const labels = useStore((state) => state.labels);
  const server = useStore((state) => state.server);
  const setLabels = useStore((state) => state.setLabels);
  const regionsdict = useStore((s) => s.regionsdict);
  const setregionsdict = useStore((s) => s.setregionsdict);
  const regions = useStore((state) => state.regions);
  const setRegions = useStore((state) => state.setRegions);
  const selectedRegions = useStore((s) => s.selectedRegions);
  const setSelectedRegions = useStore((s) => s.setSelectedRegions);
  const currimageid = useStore((state) => state.currimageid);
  /**
   * Handles the form submission to add a new label.
   *
   * @async
   * @function
   * @param {Object} e - The form submission event.
   * @returns {Promise<void>} - A Promise that resolves after the label is added.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    let url =
      server + "/posts/add_label/" + window.location.pathname.split("/")[2];
    let newlabels = [...labels];
    let label = { name: e.target.label.value, color: e.target.color.value };
    let regionid = null;
    selectedRegions.forEach((region_id) => {
      regionid = region_id;
    });
    let newregionsdict = { ...regionsdict };
    let newregions = newregionsdict[currimageid];
    newregions.forEach((region) => {
      if (region.id === regionid) {
        region.label = { ...region.label };
        region.label.name = label.name;
        region.label.color = label.color;
        region.color = label.color;
      }
    });
    newregionsdict[currimageid] = newregions;
    setregionsdict(newregionsdict);
    let labelNames = labels.map((label) => label.name);
    let labelColors = labels.map((label) => label.color);
    if (labelNames.includes(label.name)) {
      setLabels(newlabels);
      alert("Label name already exists");
    } else if (labelColors.includes(label.color)) {
      setLabels(newlabels);
      alert("Label color already exists");
    } else {
      newlabels.push(label);
      setLabels(newlabels);
      try {
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("userId"),
          },
          body: JSON.stringify({
            dataset_name: props.dataset,
            labels: [label],
          }),
        });
        return await response.json();
      } catch (error) {
        console.log("Error in HandleSubmit - AddLabelDialog.js", error);
        return ["bad luck!"];
      }
    }
  };
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <label
          style={{ fontSize: "1rem", color: "black", marginBottom: "2px" }}
        >
          Add Label
        </label>
        <Row style={{ display: "flex", gap: "3px" }}>
          <Col xs={3}>
            <input
              type="color"
              name="color"
              className="colorSelector"
              title="Select Color"
              style={{ width: "30px", height: "30px", border: "none" }}
            />
          </Col>
          <Col xs={4}>
            <input
              type="text"
              id="label"
              name="label"
              style={{
                width: "125%",
                padding: "10px",
                height: "30px",
                border: "1px solid #ccc",
                marginRight: "10px",
                marginLeft: "auto",
              }}
            />
          </Col>
          <Col xs={3}>
            <input
              type="submit"
              value="Submit"
              style={{
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                padding: "2px",
                cursor: "pointer",
                height: "30px",
                justifyContent: "center",
                alignContent: "center",
              }}
            />
          </Col>
        </Row>
      </form>
    </React.Fragment>
  );
}

export default AddLabelDialog;
