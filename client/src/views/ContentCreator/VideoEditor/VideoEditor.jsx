import React from "react";
import NavBar from "../../../components/NavBar/NavBar";
import { Link } from "react-router-dom";
import QuestionForm from "./QuestionForm";
import "./VideoEditor.less";

export default function VideoEditor(props) {
  const videoID = "ohuD_7RfAS8"
  const videoUrl = "https://www.youtube.com/watch?v=ohuD_7RfAS8"; // Example video URL
  const videoTitle = "yeah"; // Example video title

  return (
    <div id="video-editor-container" className="container nav-padding">
      <NavBar />
      <div id="content-container">
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Name</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{videoUrl}</td>
              <td>
                <Link to={`/videodisplay/${encodeURIComponent(videoTitle)}/${encodeURIComponent(videoID)}`}>
                {videoTitle}
                </Link>
              </td>
              <td>
                <QuestionForm />
              </td>
            </tr>
            {/* Add more rows here */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
