import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const CommentContainer = {
  display: "grid",
  gap: "8px", 
  padding: "16px",
  width: "150px", 
  textAlign: "left",
  cursor: "pointer",
  alignItems: "center",
  fontSize: 16,
};

const Comment = ({ commentdata }) => {
  return (
    <div className="text-center mb-100" style={{ height: "300px", overflowY: "auto" }}>
      {commentdata.map((data, index) => (
        <Paper key={index} sx={CommentContainer}>
          <textarea readOnly value={data.comment_content} style={{ width: '150%' }} />
        </Paper>
      ))}
    </div>
  );
};

const formatTime = (timeString) => {
  const date = new Date(timeString);
  return `${date.getHours()}:${date.getMinutes()}`;
};

export default Comment;
