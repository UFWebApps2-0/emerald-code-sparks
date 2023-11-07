import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import './MissedClass.less'
import { Link } from 'react-router-dom'

const [announcements, setAnnouncements] = React.useState([]);

const LectureMaterials = ({ resources }) => {
    return (
      <div className="lecture-materials-container">
        <h2>Lecture Materials</h2>
        {resources.map((resource, index) => (
          <div key={index} className="resource-item">
            <a href={resource.url} target="_blank" rel="noopener noreferrer">{resource.title}</a>
            <p>Last updated: {resource.lastUpdated}</p>
          </div>
        ))}
      </div>
    );
  };


  const Announcements = ({ announcements }) => {
    if (!Array.isArray(announcements)) {
        // Handle the case where announcements is not an array
        return <div>No announcements available.</div>;
    }
    
    return (
      <div className="announcements-container">
        <h2>Announcements</h2>
        {announcements.map((announcement, index) => (
          <div key={index} className="announcement-item">
            <p>{announcement.content}</p>
            <p>Last updated: {announcement.lastUpdated}</p>
          </div>
        ))}
      </div>
    );
  };


const MissedClassDetails = () => {
    const missedDetails = {
        date: 'YYYY-MM-DD', 
        topic: 'The topic covered in the missed',
        resources: [
        {
            title: 'Lecture Video',
            url: 'http://example.com/lecture',
            lastUpdated: '2023-08-21',
        }, 
        {
            title: 'Reading Material',
            url: 'http://example.com/reading',
            lastUpdated: '2023-04-21',
        },
        {
            title: 'Homework Assignment',
            url: 'http://example.com/homework',
            lastUpdated: '2023-12-21',
        }
        ],
        announcements: [
            {
                content: 'Midterm grades have been posted.',
                lastUpdated: '2023-08-09',
            },
            {
                content: `Next week's class will be held in a different room.`,
                lastUpdated: '2023-05-01',
            }
        ]
    };

    return(
        <div id='missed-class-container'>
            <NavBar />
            <div id='header'>
                <div>What happened when you were gone</div>
            </div>
            <div id="lecture-materials-column" className="column">
                <LectureMaterials resources={missedDetails.resources} />
            </div>
            <div id="divider"></div>
            <div id="announcements-column" className="column">
                <Announcements announcements={missedDetails.announcements || []} />
            </div>
        </div>
    );
};

export default MissedClassDetails;