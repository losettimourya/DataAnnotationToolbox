import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import { grey } from "@mui/material/colors";
import classnames from "classnames";

const useStyles = makeStyles((theme) => ({
  /**
   * React component representing a container with expandable content in a sidebar.
   * It displays a header with an optional icon, title, and subtitle.
   * The content can be expanded or collapsed by clicking the expand button.
   *
   * @component
   * @param {Object} props - Component properties.
   * @param {React.ReactNode} props.icon - Icon to display in the header.
   * @param {string} props.title - Title for the container.
   * @param {string} props.subTitle - Subtitle for the container.
   * @param {React.ReactNode} props.children - Content to be displayed in the expanded area.
   * @param {boolean} props.noScroll - If true, disables scrolling in the expanded content.
   * @param {boolean} props.expandedByDefault - If true, the content is expanded by default.
   * @returns {JSX.Element} - React element representing the SidebarBoxContainer.
   */
  container: {
    margin: "4px",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "16px",
    paddingLeft: "8px",
    paddingRight: "16px",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    flexGrow: 1,
    paddingLeft: "32px",
    color: grey[800],
    "& span": {
      color: grey[600],
      fontSize: 12,
    },
  },
  expandButton: {
    padding: 0,
    width: 30,
    height: 30,
    "& .icon": {
      marginTop: -6,
      width: 20,
      height: 20,
      transition: "500ms transform",
      "&.expanded": {
        transform: "rotate(180deg)",
      },
    },
  },
  expandedContent: {
    maxHeight: 300,
    overflowY: "auto",
    "&.noScroll": {
      overflowY: "visible",
      overflow: "visible",
    },
  },
}));

export const SidebarBoxContainer = ({
  icon,
  title,
  subTitle,
  children,
  noScroll = false,
  expandedByDefault = false,
}) => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(expandedByDefault);
  /**
   * Toggles the expanded state of the container.
   *
   * @function
   * @returns {void}
   */
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Paper className={classes.container}>
      <div className={classes.header}>
        <IconButton
          className={classes.expandButton}
          onClick={toggleExpanded}
          aria-label="Expand"
        >
          <ExpandMoreIcon className={`icon ${expanded ? "expanded" : ""}`} />
        </IconButton>
        {icon}
        <div className={classes.title}>
          {title}
          {subTitle && <span>{subTitle}</span>}
        </div>
      </div>
      <Collapse in={expanded}>
        <div
          className={classnames(
            classes.expandedContent,
            noScroll && "noScroll"
          )}
        >
          {children}
        </div>
      </Collapse>
    </Paper>
  );
};

export default SidebarBoxContainer;
