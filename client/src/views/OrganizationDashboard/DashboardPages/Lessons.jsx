import React, { useState, useEffect} from 'react';
import {useParams } from 'react-router-dom';
import { getLessonData, submitLessonData } from '../../../Utils/requests';
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
        questions: [
          { question: '', answer: '' },
          { question: '', answer: '' },
          { question: '', answer: '' }
        ]
      });

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
        if (name.startsWith('question') || name.startsWith('answer')) {
          const index = parseInt(name.split('-')[1], 10);
          const field = name.split('-')[0];
          setLesson(prevLesson => ({
            ...prevLesson,
            questions: prevLesson.questions.map((item, i) => {
              if (i === index) {
                return { ...item, [field]: value };
              }
              return item;
            })
          }));
        } else {
          setLesson(prevLesson => ({
            ...prevLesson,
            [name]: value
          }));
        }
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        
        const { title, standards, description, classroomMaterials, studentMaterials, questions } = lesson;
        const question1 = questions[0].question
        const question2 = questions[1].question
        const question3 = questions[2].question

        const answer1 = questions[0].answer
        const answer2 = questions[1].answer
        const answer3 = questions[2].answer

        didSubmit(submit + 1)

      
        try {
          await submitLessonData(
            title,
            standards,
            description,
            classroomMaterials,
            studentMaterials,
            question1,
            question2,
            question3,
            answer1,
            answer2,
            answer3,
            orgId
          );
          
          console.log('Lesson submitted successfully');
        } catch (error) {
          console.error('Error submitting lesson:', error);
        }

        setLesson({
            title: '',
            standards: '',
            description: '',
            classroomMaterials: '',
            studentMaterials: '',
            questions: [
              { question: '', answer: '' },
              { question: '', answer: '' },
              { question: '', answer: '' }
            ]
          })
      };

      
  return (
    <div className="lesson-form-container">
      <h1 id="main-header">Create a Lesson Plan</h1>
      <div>
        {lessonData.map((lesson, index) => {
            if (orgId.toString() === lesson.identification) {
            return (
                <div key={index}>
                <h1>{lesson.title}</h1>
                <p><strong>Standards:</strong> {lesson.standards}</p>
                <p><strong>Description:</strong> {lesson.description}</p>
                <p><strong>Classroom Materials:</strong> {lesson.classroom}</p>
                <p><strong>Student Materials:</strong> {lesson.student}</p>
                <p><strong>Question 1:</strong> {lesson.question1}</p>
                <p><strong>Question 2:</strong> {lesson.question2}</p>
                <p><strong>Question 3:</strong> {lesson.question3}</p>
                <p><strong>Answer 1:</strong> {lesson.answer1}</p>
                <p><strong>Answer 2:</strong> {lesson.answer2}</p>
                <p><strong>Answer 3:</strong> {lesson.answer3}</p>
                <p><strong>Created At:</strong> {lesson.created_at}</p>
                <p><strong>Published At:</strong> {lesson.published_at}</p>
                </div>
            );
            }
            return null; 
        })}
        </div>
      <div id="cardholder">
        <form onSubmit={handleSubmit} className="lesson-form">
          <label>
            Title of Lesson:
            <input
              type="text"
              name="title"
              value={lesson.title}
              onChange={handleChange}
            />
          </label>

          <label>
            Standards of Lesson:
            <input
              type="text"
              name="standards"
              value={lesson.standards}
              onChange={handleChange}
            />
          </label>

          <label>
            Description (paragraph format):
            <textarea
              name="description"
              value={lesson.description}
              onChange={handleChange}
            />
          </label>

          <label>
            Classroom Materials:
            <input
              type="text"
              name="classroomMaterials"
              value={lesson.classroomMaterials}
              onChange={handleChange}
            />
          </label>

          <label>
            Student Materials:
            <input
              type="text"
              name="studentMaterials"
              value={lesson.studentMaterials}
              onChange={handleChange}
            />
          </label>

            {lesson.questions.map((item, index) => (
            <div key={index} className="question-answer-pair">
                <label>
                Question {index + 1}:
                <input
                    type="text"
                    name={`question-${index}`}
                    value={item.question}
                    onChange={handleChange}
                />
                </label>
                <label>
                Answer {index + 1}:
                <input
                    type="text"
                    name={`answer-${index}`}
                    value={item.answer}
                    onChange={handleChange}
                />
                </label>
            </div>
            ))}

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default LessonForm;
