import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import NavBar from "../../components/NavBar/NavBar";
import "./VideoPage.less";
// use dis: http://localhost:3000/test-video

export default function VideoPage({ thisID, thisTitle }) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    function HandleClick() {
        // Handle logic for navigating back
        navigate(-1);
    }

    function handleAnswerSelection(answer) {
        setSelectedAnswer(answer);
    }

    function checkAnswer(correctAnswer) {
        // Implement logic to check the selected answer against the correct answer
        const correct = selectedAnswer === correctAnswer;
        setIsCorrect(correct);
        setShowFeedback(true);
    }

    const quizQuestion = "What is the main theme of Crab Rave?";
    const answerOptions = ["Celebration", "Sadness", "Adventure", "Romance"];
    const correctAnswer = "Celebration"; // Change this to the correct answer

    return (
        <div className='container nav-padding'>
            <NavBar /><br/>
            <h1 id="VideoPage-h1" style={{margin: "auto", color: "white"} }>{"Crab Rave"}</h1>

            <VideoPlayer url={"https://www.youtube.com/embed/-50NdPawLVY?si=8p9J11fE5zXSIFm2"} title={"Crab Rave"} />

            <div className="quiz-container" style={{ margin: "auto", color: "white" }}>
                <h2>{quizQuestion}</h2>
                <ul>
                    {answerOptions.map((option, index) => (
                        <li key={index}>
                            <label>
                                <input
                                    type="radio"
                                    value={option}
                                    checked={selectedAnswer === option}
                                    onChange={() => handleAnswerSelection(option)}
                                />
                                {option}
                            </label>
                        </li>
                    ))}
                </ul>
                <button className="check-answer-button" onClick={() => checkAnswer(correctAnswer)}>
                    Check Answer
                </button>
                {showFeedback && (
                    <p className={isCorrect ? 'feedback-correct' : 'feedback-incorrect'}>
                        {isCorrect ? 'Correct!' : 'Incorrect. Please try again.'}
                    </p>
                )}
            </div>

            <br />
            <button
                className="VideoPage-button"
                onClick={HandleClick}
                style={{ margin: "auto" }}
            >
                Return to Gallery
            </button>
        </div>
    );
}






/*
import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Link } from "react-router-dom";
import QuestionForm from "../../views/ContentCreator/VideoEditor/QuestionForm";
import "../../views/ContentCreator/VideoEditor/VideoEditor.less";

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
                <Link to={`/videodisplay/${encodeURIComponent(videoTitle)}/${encodeURIComponent(videoID)}`}> // links to video display page, not set up to database
                {videoTitle}
                </Link>
              </td>
              <td>
                <QuestionForm />
              </td>
            </tr>
            {}
          </tbody>
        </table>
      </div>
    </div>
  );
}*/
