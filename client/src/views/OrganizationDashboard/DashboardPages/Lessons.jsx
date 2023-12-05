import React, { useState} from 'react';
import {useParams } from 'react-router-dom';
import { submitLessonData } from '../../../Utils/requests';
import './Lessons.less';


function LessonForm() {
    const { orgId } = useParams();
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
      };

  return (
    <div className="lesson-form-container">
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
