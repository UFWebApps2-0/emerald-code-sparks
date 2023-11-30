import React, { useState, useEffect } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import { Link } from "react-router-dom";
import QuestionForm from "./QuestionForm";
import {getAllVideos} from "../../../Utils/requests";
import "./VideoEditor.less";

export default function VideoEditor(props) {
  const [videos, setVideos] = useState([]); // State to store videos

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await getAllVideos();
        setVideos(response.data); // Update state with fetched videos
      } catch (error) {
        console.error("Failed to fetch videos", error);
      }
    };

    fetchVideos();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div id="video-editor-container" className="container nav-padding">
      <NavBar />
      <div id="content-container">
        <h2 style={{ textDecoration: 'underline' }}>Add questions to your videos</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>URL</th>
              <th>Questions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <tr key={video.id}> {/* Replace 'video.id' with the appropriate key */}
                <td>
                  <Link to={`/video/?id=${encodeURIComponent(video.id)}`}>
                    {video.LessonVideoTitle}
                  </Link>
                </td>
                <td>https://www.youtube.com/watch?v={video.VideoLink}</td>
                <td>
                  <QuestionForm id={video.id}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
