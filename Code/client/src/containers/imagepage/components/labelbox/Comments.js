import React, { useContext, useState, useEffect } from "react";
import creds from "../../../../creds";
import { ToastContext } from "../../../../App";
import { TOAST_VARIANTS } from "../../../../packages/toasts/constants";
import axios from "axios";
import useStore from "../../library/store";
import CommentContainer from "./CommentContainer.js";
import Button from '@mui/material/Button';

export default function Comment() {
  const url = creds.mysqlUrl;
  const { addToast } = useContext(ToastContext);
  const [showComment, setShowComment] = useState(true);
  const handleOnClose = () => setShowComment(!showComment);
  const server = useStore((state) => state.server);
  const [content, setcontent] = useState("");
  const [datasetData, setDatasetData] = useState([]);
  const authorId = JSON.parse(localStorage.getItem("dfs-user"))["user"][
    "user_email"
  ];
  const [currimageid, setcurrimageid] = useStore((state) => [
    state.currimageid,
    state.setcurrimageid,
  ]);
  const [commentdata, setCommentdata] = useState([]);
  const handleClick = () => {
    setShowComment(!showComment);
  };
  const submit = () => {
    axios
      .post(
        url + "add_comment",
        {
          image_id: currimageid,
          content: content,
          commented_by: authorId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          addToast({
            message: res.data.error,
            variant: TOAST_VARIANTS.ERROR,
          });
        } else {
          addToast({
            message: "Added successfully",
            variant: TOAST_VARIANTS.SUCCESS,
          });
          setCommentdata([...commentdata, res.data]);
        }
      })
      .catch((err) => {
        addToast({
          message: "Server Error " + JSON.stringify(err),
          variant: TOAST_VARIANTS.ERROR,
        });
        console.log(err);
      });
  };

  useEffect(() => {
    setShowComment(true);
  }, [currimageid]);

  useEffect(() => {
    axios
      .get(url + "get_comment/" + currimageid)
      .then((res) => {
        if (res.data.error) {
          addToast({
            message: res.data.error,
            variant: TOAST_VARIANTS.ERROR,
          });
        } else {
          setCommentdata(res.data);
          addToast({
            message: "Synced successfully",
            variant: TOAST_VARIANTS.SUCCESS,
          });
        }
      })
      .catch((err) => {
        addToast({
          message: "Server Error " + JSON.stringify(err),
          variant: TOAST_VARIANTS.ERROR,
        });
        console.log(err);
      });
  }, [showComment, currimageid]);

  return (
    <div>
        {
            showComment ? <Button variant="contained" color="primary" onClick={handleClick}>
            {"Add Comment"}
          </Button> : null
        }
      {!showComment ? (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-slate-100 p-2 rounded h-50 w-50">
            <h1 className="font-semibold text-center text-xl text-gray-700">
              Comments
            </h1>
            <div className="flex flex-col">
              <input
                type="text"
                className="border border-gray-700 p-2 rounded mb-3"
                placeholder="Type Here ..."
                onChange={(e) => setcontent(e.target.value)}
              />
              <div className="text-center">
                <button
                  className=" rounded-full btn btn-outline-warning mb-2 "
                  onClick={() => submit()}
                >
                  Add
                </button>
              </div>
            </div>
            <div className="text-center">
              <button
                className="rounded-full btn btn-outline-danger"
                onClick={handleOnClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : (
        <CommentContainer commentdata={commentdata} />
      )}
    </div>
  );
}