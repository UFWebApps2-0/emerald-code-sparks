import React, { useEffect, useState } from 'react';
import { Button, Tag } from 'antd';
import './ActivityLevelReport.less';

import {
  getGrades,
  getUnit,
  getGrade,
  getClassroom,
} from '../../../Utils/requests';
import Form from 'antd/lib/form/Form';

export const Filter = ({ setSearchParam, paramObj }) => {
    const [grades, setGrades] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [units, setUnits] = useState([]);
    const [classrooms, setClassrooms] = useState([]);
    const [students, setStudents] = useState([]);
  
    const [selectedGrade, setselectedGrade] = useState('');
    const [selectedLessons, setSelectedLessons] = useState('');
    const [selectedUnit, setselectedUnit] = useState('');
    const [selectedClassroom, setselectedClassroom] = useState('');
    const [selectedStudent, setselectedStudent] = useState('');
  
    useEffect(() => {
      const fetchData = async () => {
        const gradesRes = await getGrades();
        if (gradesRes.error) {
            console.error('Fail to retrieve grades');
        }
        setGrades(gradesRes.data);
      };
      fetchData();
    }, []);
  
    const onGradeChange = async (e) => {
      setselectedUnit('');
      setSelectedLessons('');
      setselectedClassroom('');
      setselectedStudent('');
      setClassrooms([]);
      setLessons([]);
      setStudents([]);
  
      const grade = e.target.value;
      
      if (grade) {
        setselectedGrade(grade);
        const gradeRes = await getGrade(grade);
        setUnits(gradeRes.data.units);
        setClassrooms(gradeRes.data.classrooms);
      } else {
        setselectedGrade('');
        setUnits([]);
      }
    };
  
    const onUnitChange = async (e) => {
      setSelectedLessons('');
      const unit = e.target.value;
      if (unit) {
        setselectedUnit(unit);
        const unitRes = await getUnit(unit);
        setLessons(unitRes.data.lesson_modules);
      } else {
        setselectedUnit('');
        setLessons([]);
      }
    };
  
    const onClassroomChange = async (e) => {
      setselectedStudent('');
      const classroom = e.target.value;
      if (classroom) {
        setselectedClassroom(classroom);
        const classroomRes = await getClassroom(classroom);
        setStudents(classroomRes.data.students);
      } else {
        setselectedClassroom('');
        setStudents([]);
      }
    };
  
    const handleSubmit = async () => {
      let obj = {};
      if (selectedGrade !== '') obj.grade = selectedGrade;
      if (selectedUnit !== '') obj.unit = selectedUnit;
      if (selectedLessons !== '') obj.lesson_module = selectedLessons;
      if (selectedClassroom !== '') obj.classroom = selectedClassroom;
      if (selectedStudent !== '') obj.student = selectedStudent;
      setSearchParam(obj);
    };
  
    return (
      <>
        <Form onFinish={handleSubmit}>
          <select
            className='select'
            placeholder='Select a grade'
            onChange={onGradeChange}
          >
            <option key='empty' value=''>
              Select a grade
            </option>
            {grades.map((grade) => (
              <option key={grade.id} value={grade.id}>
                {grade.name}
              </option>
            ))}
          </select>
          <select
            className='select'
            placeholder='Select a unit'
            disabled={units.length === 0 || selectedClassroom !== ''}
            onChange={onUnitChange}
          >
            <option key='empty' value=''>
              Select a unit
            </option>
            {units.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))}
          </select>
          <select
            className='select'
            placeholder='Select a lesson'
            disabled={lessons.length === 0}
            onChange={(e) => {
              setSelectedLessons(e.target.value);
            }}
          >
            <option key='empty' value=''>
              Select a lesson
            </option>
            {lessons.map((lesson) => (
              <option key={lesson.id} value={lesson.id}>
                {lesson.name}
              </option>
            ))}
          </select>
          <h3 className='filter-text'>Or</h3>
          <select
            className='select'
            placeholder='Select a classroom'
            disabled={classrooms.length === 0 || selectedUnit !== ''}
            onChange={onClassroomChange}
          >
            <option key='empty' value=''>
              Select a classroom
            </option>
            {classrooms.map((classroom) => (
              <option key={classroom.id} value={classroom.id}>
                {classroom.name}
              </option>
            ))}
          </select>
          <select
            className='select'
            placeholder='Select a student'
            disabled={students.length === 0}
            onChange={(e) => {
              setselectedStudent(e.target.value);
            }}
          >
            <option key='empty' value=''>
              Select a student
            </option>
            {students.map((stuent) => (
              <option key={stuent.id} value={stuent.id}>
                {stuent.name}
              </option>
            ))}
          </select>
          <br />
          <Button
            type='secondary'
            className='activity-level-submit'
            htmlType='submit'
            size='large'
          >
            Submit
          </Button>
        </Form>
        <div>
          <h3 className='filter-text' style={{ display: 'inline' }}>
            Current Filter:{' '}
          </h3>
          {Object.keys(paramObj).map((key) =>
            key === '_start' ? null : key === '_sort' ? null : key ===
              'pageSize' ? null : (
              <Tag>
                {key === 'lesson_module' ? `lesson(id)` : `${key}(id)`}:{' '}
                {paramObj[key]}
              </Tag>
            )
          )}
        </div>
      </>
    );
  };