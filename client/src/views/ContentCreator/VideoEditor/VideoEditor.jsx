import React from "react";
import NavBar from "../../../components/NavBar/NavBar";
import { Link } from "react-router-dom";
import QuestionForm from "./QuestionForm";
import "./VideoEditor.less";

export default function VideoEditor(props) {
  const videoID = "ohuD_7RfAS8";
  const videoUrl = "https://www.youtube.com/watch?v=ohuD_7RfAS8"; // Example video URL
  const videoTitle = "yeah"; // Example video title

  return (
    <div id="video-editor-container" className="container nav-padding">
      <NavBar />
      <div id="content-container">
        <div>
          <h2>Add lessons to your videos:</h2>
          <QuestionForm />
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Link to={`/videodisplay/${encodeURIComponent(videoTitle)}/${encodeURIComponent(videoID)}`}>
                  {videoTitle}
                </Link>
              </td>
              <td>{videoUrl}</td>
            </tr>
            {/* Add more rows here */}
          </tbody>
        </table>
      </div>
    </div>
  );
}