import React, { useState, useEffect} from 'react';
import {useParams } from 'react-router-dom';
import { getLessonData, submitLessonData } from '../../../Utils/requests';
import LessonCard from './LessonCard';
import './Lessons.less';


function LessonForm() {
    const { orgId } = useParams();
    const [lessonData,setLessonData] = useState([])
    const [submit, didSubmit] = useState(0)
    const [lesson, setLesson] = useState({
        title: '',
        standards: '',
        description: '',
        classroomMaterials: '',
        studentMaterials: '',
        arduinoMaterials: '',}
        );

      useEffect(() => {
        const getLData = async () => {
          try {
            let lData = await getLessonData();
            lData = lData.data;
            setLessonData(lData);
          } catch (error) {
            console.error('Error fetching lesson data:', error);
          }
        };
    
        getLData();
      }, [submit]);

      console.log(lessonData)

      
      const handleChange = (e) => {
        const { name, value } = e.target;
        
          setLesson(prevLesson => ({
            ...prevLesson,
            [name]: value
          }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        
        const { title, standards, description, classroomMaterials, studentMaterials, arduinoMaterials } = lesson;
        
        try {
          await submitLessonData(
            title,
            standards,
            description,
            classroomMaterials,
            studentMaterials,
            arduinoMaterials,
            orgId
          );
          console.log('Lesson submitted successfully');
          updateLessonData();
        } catch (error) {
          console.error('Error submitting lesson:', error);
        }
      
        setLesson({
          title: '',
          standards: '',
          description: '',
          classroomMaterials: '',
          studentMaterials: '',
          arduinoMaterials: '',
        })
      };
      
      const updateLessonData = async () => {
        try {
          let lData = await getLessonData();
          lData = lData.data;
          setLessonData(lData);
        } catch (error) {
          console.error('Error fetching updated lesson data:', error);
        }
      }

      console.log(lessonData)
      


      
  return (
    <>
      <h1 id="main-header" >Lesson Plans</h1>
      <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', // Adjust the 250px value to match the width of the LessonCard components
          gridGap: '150px',
          marginRight: '100px',
          marginLeft: '70px',
          padding: '0'
        }}>
            {
                lessonData && lessonData.length > 0 ? (
                  lessonData.map((lesson) => (
                    <LessonCard key={lesson.id} activities={lesson} />
                  ))
                ) : (
                  <div>
                    No lesson plans available.
                  </div>
                )
              }
        </div>
      <h1 id="main-header">Create a Lesson Plan</h1>

      
      <div id="cardholder">
        <form onSubmit={handleSubmit} className="lesson-form">
          <label>
            Title of Lesson:
            <input
              type="text"
              name="title"
              value={lesson.title}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Standards of Lesson:
            <input
              type="text"
              name="standards"
              value={lesson.standards}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Description:
            <textarea
              name="description"
              value={lesson.description}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Classroom Materials:
            <input
              type="text"
              name="classroomMaterials"
              value={lesson.classroomMaterials}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Student Materials:
            <input
              type="text"
              name="studentMaterials"
              value={lesson.studentMaterials}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Arduino Materials:
            <input
              type="text"
              name="arduinoMaterials"
              value={lesson.arduinoMaterials}
              onChange={handleChange}
              required
            />
          </label>

            

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </>
  );
}

export default LessonForm;
