import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function VideoDisplay() {
  const { title, videoId } = useParams();
  const decodedTitle = decodeURIComponent(title);

  useEffect(() => {
    // Load the YouTube video
    loadYouTubePlayer(videoId);
  }, [videoId]);

  const loadYouTubePlayer = (videoId) => {
    if (window.YT) {
      // Create the player
      createYouTubePlayer(videoId);
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = function () {
        createYouTubePlayer(videoId);
      };
    }
  };

  const createYouTubePlayer = (videoId) => {
    new YT.Player("youtube-player", {
      videoId: videoId,
      playerVars: {
        autoplay: 0, // Set autoplay to 0 to start the video paused
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange, // Add an event listener for state changes
      },
    });
  };

  let popupShown = false;

  const onPlayerReady = (event) => {
    // Video player is ready
    event.target.setVolume(100); // Set the volume to 100 (max volume)
  };

  const onPlayerStateChange = (event) => {
    if (event.data === YT.PlayerState.PLAYING && !popupShown) {
      setTimeout(() => {
        // Open a new window with your message
        const popupWindow = window.open("", "_blank");
        popupWindow.document.write("<h1>My eyes hurt</h1>");
        popupShown = true; // Prevent the pop-up from showing again
      }, 10000); // Show the pop-up at 10 seconds
    }
  };

  return (
    <div>
      <h2>{decodedTitle}</h2>
      <div id="youtube-player"></div>
    </div>
  );
}
