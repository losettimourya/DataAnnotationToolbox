import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineUpload } from "react-icons/ai";
import { Link } from "react-router-dom";
import creds from "../../creds";
import { ToastContext } from "../../App";
import { TOAST_VARIANTS } from "../../packages/toasts/constants";
import { config } from "../../containers/imagepage/config";
const url = creds.mysqlUrl;

export default function MyModels({
  copiedTimeoutId,
  copiedIndex,
  showCopied,
  setCopiedIndex,
  setShowCopied,
  setCopiedTimeoutId,
}) {
  const [loading, setLoading] = useState(false);
  const [datasetData, setDatasetData] = useState([]);
  const [datasetDataa, setDatasetDataa] = useState([]);
  const authorId = JSON.parse(localStorage.getItem("dfs-user"))["user"][
    "user_email"
  ];
  const { addToast } = useContext(ToastContext);

  useEffect(() => {
    axios
      .get(url + "get_dataset/" + authorId)
      .then((res) => {
        if (res.data.error) {
          addToast({
            message: res.data.error,
            variant: TOAST_VARIANTS.ERROR,
          });
        } else {
          setDatasetDataa(res.data);
        }
      })
      .catch((err) => {
        addToast({
          message: "Server Error " + JSON.stringify(err),
          variant: TOAST_VARIANTS.ERROR,
        });
        console.log(err);
      });
  }, []);
  function formatDate(dateTimeString) {
    const date = new Date(dateTimeString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return addOrdinalSuffix(formattedDate);
  }
  
  function formatTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit'};
    const formattedTime = date.toLocaleTimeString('en-US', options);
    return formattedTime;
  }
  
  function addOrdinalSuffix(dateString) {
    const day = new Date(dateString).getDate();
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const relevantDigits = (day < 30) ? day % 20 : day % 30;
    const suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
    return dateString.replace(/\d+/, (day + suffix));
  }
  
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr" }}>
        <h1>My Projects</h1>
        <Link to="/add-dataset" style={{ justifySelf: "flex-end" }}>
          <button className="btn btn-primary mr-3">
            <AiOutlineUpload size={30} />
          </button>
        </Link>
      </div>
      <br />
      <div
        style={{
          overflowX: "auto",
          overflowY: "auto",
          maxHeight: "80vh",
          paddingBottom: "2px",
        }}
      >
        {datasetDataa.length > 0 ? (
          <table className="min-w-full leading-normal table-bordered">
            <thead>
              <tr>
                <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
                <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody>
              {datasetDataa.map((data) => (
                <tr>
                  <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm max-w-1/5">
                    <span className="text-gray-900 whitespace-no-wrap">
                      {data.dataset_name}
                    </span>
                  </td>
                  <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm max-w-1/5">
                    <span className="text-gray-900 whitespace-no-wrap">
                      {data.dataset_desc}
                    </span>
                  </td>
                  <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm flex">
                    <Link to={"/imagepage/" + data.dataset_id}>
                      <button
                        className="btn btn-outline-info"
                        style={{ marginRight: "20px" }}
                      >
                        View
                      </button>
                    </Link>
                    <Link to={"/"}>
                      <button
                        className="btn btn-outline-primary"
                        style={{ marginRight: "20px" }}
                      >
                        Download
                      </button>
                    </Link>
                    <Link to={"/add-image/" + data.dataset_id}>
                      <button
                        className="btn btn-outline-danger"
                        style={{ marginRight: "20px" }}
                      >
                        Add
                      </button>
                    </Link>
                    <Link to={"/view-my-dataset/" + data.dataset_id}>
                      <button className="btn btn-outline-warning">Info</button>
                    </Link>
                  </td>
                  <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm max-w-1/5">
                    <span className="text-gray-900 whitespace-no-wrap">
                      {formatDate(data.dataset_created_at)}
                      <br />
                      {formatTime(data.dataset_created_at)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Projects you add will appear here</p>
        )}
      </div>
    </>
  );
}
