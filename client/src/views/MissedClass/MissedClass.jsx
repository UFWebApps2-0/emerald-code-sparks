import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { getMissedContent } from '../../Utils/requests';
import { useNavigate } from 'react-router-dom';
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
    const [learningStandard, setLessonModule] = useState({});
    return (
      <div className="missed-materials-container">
        {resources.map((resource, index) => (
          <div key={index} className="resource-item">
            {resource.url ? (
              <>
                <h2>Videos to watch</h2>
                <div>
                <a href={resource.url} target="_blank" rel="noopener noreferrer" className="resource-title" style={{ fontWeight: 'bold' }}>{resource.Title}</a>

                <p>
                  <span className="info-label">Teacher Notes:</span> {resource.teacher_notes}
                </p>
                <p>
                  <span className="info-label">Last updated:</span> {formatDate(resource.updated_at)}
                </p>
                  {resource.url.includes("youtube.com/watch?v=") && (
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      <img 
                      src={`https://img.youtube.com/vi/${resource.url.split("v=")[1].split("&")[0]}/0.jpg`} 
                      alt={`Thumbnail for ${resource.Title}`}
                      />
                    </a>
                )}
                <hr />
                </div>
              </>
            ) : (
              // This is for activities
              <>
              <h2>Missed Activities</h2>
              <p> <span className="info-label"> Topic:</span> {resource.StandardS}</p>
              <p> <span className="info-label"> Activity Description:</span> {resource.description}</p>
              <p> <span className="info-label"> Last updated:</span> {formatDate(resource.updated_at)}</p>
              <hr />
              </>
            )}
          </div>
        ))}
      </div>
    );
  };


  const Announcements = ({ announcements }) => {
    if (!Array.isArray(announcements)) {
        return <div>No announcements available.</div>;
    }

    return (
      <div className="announcements-container">
        <h2>Announcements</h2>
        {announcements.map((announcement, index) => (
          <div key={index} className="announcement-item"> 
            <p> <span className="info-label"> PLEASE READ: </span> </p>
            <p>Title: {announcement.Title}</p>
            <p>Content: {announcement.Content}</p>
            <p> <span className="info-label"> Urgency:  </span>
              <span 
                style={{
                display: 'inline-block',
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                backgroundColor: announcement.urgency,
                marginLeft: '5px',
              }}
              />
          </p>
            <p> <span className="info-label">Last updated: </span> {formatDate(announcement.updated_at)}</p>
            <hr />
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