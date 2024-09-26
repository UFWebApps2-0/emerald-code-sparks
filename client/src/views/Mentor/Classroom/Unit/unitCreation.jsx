import React, { useEffect, useState } from 'react';
import './unitCreation.less';
import { message } from "antd"
import {getClassroom, createUnit} from '../../../../Utils/requests';
import MentorSubHeader from '../../../../components/MentorSubHeader/MentorSubHeader';

export default function unitCreation({ classroomId }) {
    const [classroom, setClassroom] = useState({});
    const [newUnitName, setNewUnitName] = useState("");
    const [standardID, setStandardID] = useState("");
    const [standardDescription, setstandardDescription] = useState("");
    const [number, setNumber] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
          const res = await getClassroom(classroomId);
          if (res.data) {
            const classroom = res.data;
            setClassroom(classroom);
            console.log(classroom)
          } else {
            message.error(res.err);
          }

        };
        fetchData();
      }, [classroomId]);

      const updateName = (e) => {
        setNewUnitName(e.target.value)
      }
      const updateStan = (e) =>{
        setStandardID(e.target.value)
      }
      const updateStanDsc = (e) =>{
        setstandardDescription(e.target.value)
      }
      const updateNumber = (e) =>{
        const input = e.target.value;

        if (/^-?\d*$/.test(input)) {
          setNumber(input);
        }
    
      }

      const handleSubmit = async (e) =>{
        e.preventDefault();
        if(unitValue != ""){
          const res = await createUnit(number, newUnitName, standardsID, standardsDescrip, classroom.grade.name) 
          if(res.data){
            message.success(`Unit "${newUnitName}" was successfuly created`);
  
            // clear Form
            clearForm();
          }
          else{
            message.error("Unable to Save");
          }
        }
        else{
          message.error("Unit not selected");
        }
      };
    return(
    <div className='all'>
        <MentorSubHeader
        title={'Create Unit'}
      />
      <div id='c_lesson'>
        <h3>Create Unit for <strong>{classroom.name}</strong></h3>
        <hr />
      <form onSubmit={handleSubmit}>
        <div className='fst'>
            <h4> Unit Name: </h4>
            <input className='textbox' type="text" onChange={updateName} value={newUnitName} required/>
        </div>
        <div className='fst'>
            <h4> Standards ID: </h4>
            <input className='textbox' type="text" onChange={updateStan} value={standardID} required/>
        </div>
        <div className='fst'>
            <h4> Standards Description: </h4>
            <input className='textbox' type="text" onChange={updateStanDsc} value={standardDescription} required/>
        </div>
        <div className='fst'>
            <h4>Unit Number: </h4>
            <input className='textbox' type="number" onChange={updateNumber} value={number} required/>
        </div>
        <input className='submitbtn' type="submit" value={"Create Unit"} />
        </form>
      </div>
    </div>);
}
