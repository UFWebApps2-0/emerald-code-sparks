import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { getMissedContent } from '../../Utils/requests';
import './MissedClass.less'
import { Link } from 'react-router-dom'

  const formatDate = (dateString) => {
    try{
      const options = { year: 'numeric', month: 'long', day: 'numeric'};
      const date = new Date(dateString);
      if (isNaN(date.getTime())){
        throw new Error('Invalid date');
      }
      return date.toLocaleDateString(undefined, options);
    }
    catch (error){
      console.error('Error formatting date: ', error);
      return 'Unknown date';
    }
  }

  const MissedMaterials = ({ resources }) => {
    return (
      <div className="missed-materials-container">
        <h2>Missed Materials</h2>
        {resources.map((resource, index) => (
          <div key={index} className="resource-item">
            {resource.url ? (
              // This is for videos
              <a href={resource.url} target="_blank" rel="noopener noreferrer">{resource.Title}</a>
            ) : (
              // This is for activities
              <p>{resource.description}</p>
            )}
            <p>Last updated: {formatDate(resource.updated_at)}</p>
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
            <p>{announcement.Content}</p>
            <p>Last updated: {formatDate(announcement.updated_at)}</p>
          </div>
        ))}
      </div>
    );
  };


  const MissedClassDetails = () => {
    const [missedDetails, setMissedDetails] = useState({activities: [], videos: [], announcements: []});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await getMissedContent();
          console.log(response);
          if (response && response.data && response.data.length > 0){
            const firstItem = response.data[0];
            setMissedDetails({
              activities: firstItem.activities || [],
              videos: firstItem.videos || [],
              announcements: firstItem.announcements || [],
            });
          }
          // console.log(missedDetails.activities)
          // console.log(missedDetails.videos)
          setIsLoading(false);
        } 
        catch (error) {
          console.error(error);
          setError(error);
          setIsLoading(false);
        }
      };
      fetchData();
    }, []);

    if (error) return <div>Error: {error.message}</div>

    return(
        <div id='missed-class-container'>
            <NavBar />
            <div id='header'>
                <div>What happened when you were gone</div>
            </div>
            <div id="class-content">
              <div id="missed-materials-column" className="column">
                <MissedMaterials resources={[...missedDetails.activities, ...missedDetails.videos]} />
              </div>
              <div id="announcements-column" className="column">
                <Announcements announcements={missedDetails.announcements} />
              </div>
          </div>
        </div>
    );
  };

export default MissedClassDetails;