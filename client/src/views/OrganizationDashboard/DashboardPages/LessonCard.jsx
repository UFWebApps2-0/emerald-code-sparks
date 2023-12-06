import React from 'react';
import './LessonCard.less';

export default function LessonCard(props) {
  const { activities } = props;

  console.log(activities);

  return (
    <div id='card-btn-container' className='flex space-between'>
        <div id='view-activity-card' style = {{border: '3px solid black'}} key={activities.id}>
          <div id='activity-title'>Activity Level {activities.number}</div>
          <div id='view-activity-heading' style={{ display: 'flex' }}>
            
            
          </div>
          <div id='view-activity-info' style={{
                backgroundColor: "white", 
                borderRadius: '8px', 
                border: '2px solid black', 
                padding: '10px', 
                boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s ease-in-out',
                ':hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.5)',
                }
              }}>     
       <p>
              <strong>STANDARDS: </strong>
              {activities.standards}
            </p>
            <p>
              <strong>Description: </strong>
              {activities.description}
            </p>
            <p>
              <strong>Classroom Materials: </strong>
              {activities.classroomMaterials}
            </p>
            <p>
              <strong>Student Materials: </strong>
              {activities.studentMaterials}
            </p>
            <p>
              <strong>Arduino Components: </strong>
              {activities.arduinoMaterials}
            </p>
            
          </div>
        </div>
    </div>
  );
}