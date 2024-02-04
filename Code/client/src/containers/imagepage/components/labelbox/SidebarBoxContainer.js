import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { grey } from "@mui/material/colors";

const ContainerPaper = styled(Paper)({
  padding: "16px",
  marginBottom: "10px",
});

const TitleBar = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: `1px solid ${grey[200]}`,
  marginBottom: "8px",
  paddingBottom: "8px",
});

const SidebarBoxContainer = ({
  title,
  subTitle,
  icon,
  expandedByDefault,
  children,
}) => {
  return (
    <ContainerPaper elevation={3}>
      <TitleBar>
        <div>
          {icon}
          <Typography variant="h6" color="textPrimary" style={{ marginLeft: "8px" }}>
            {title}
          </Typography>
        </div>
        <div>
          {subTitle && (
            <Typography variant="body2" color="textSecondary">
              {subTitle}
            </Typography>
          )}
          {expandedByDefault && (
            <IconButton size="small" color="default">
              {/* You can put your expand/collapse icon here */}
            </IconButton>
          )}
        </div>
      </TitleBar>
      {children}
    </ContainerPaper>
  );
};

export default SidebarBoxContainer;
