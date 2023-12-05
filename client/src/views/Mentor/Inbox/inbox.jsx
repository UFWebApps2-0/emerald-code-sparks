import React, { useEffect, useState } from 'react';
import { getMentor, getLessonModuleActivities, getClassrooms, getUnits, removeLesson, createLessonModule, createActivity, updateActivityDetails} from '../../../Utils/requests';
import { Modal, Button, message, Popconfirm, Tabs, Tag } from 'antd';
import '../Dashboard/Dashboard.less'
import NavBar from '../../../components/NavBar/NavBar';
import { useGlobalState } from '../../../Utils/userState';
import { useNavigate } from 'react-router-dom';
import './Inbox.less';

const classroomMap = new Map();
const unitMap = new Map();

export default function Inbox() {
    const [printed, setprinted] = useState(false);
    const [visible, setVisible] = useState(false);
    const [set, setSet] = useState(false);
    const[activePanel, setActivePanel] = useState("panel-1");
    const [activities, setActivites] = useState([]);
    const [selectedLesson, setSelectedLesson] = useState({});
    const [chosenClass, setChosenClass] = useState("");
    const [chosenUnit, setChosenUnit] = useState("");
    const [standard, setStandard] = useState("");


    const SCIENCE = 1;
    const MAKING = 2;
    const COMPUTATION = 3;

    const color = [
        'magenta',
        'purple',
        'green',
        'cyan',
        'red',
        'geekblue',
        'volcano',
        'blue',
        'orange',
        'gold',
        'lime',
      ];
      useEffect(() => {
        let classroomIds = [];
        getMentor().then(async (res) => {
          if (res.data) {
            res.data.classrooms.forEach((classroom) => {
              classroomIds.push(classroom.id);
            });
            await getClassrooms(classroomIds).then((classrooms) => {
              classrooms.forEach((classroom) => {
                classroomMap.set(classroom.id, classroom);
              });
            });
          } else {
            message.error(res.err);
            navigate('/teacherlogin');
          }
        })
      }, []);
    
    const navigate = useNavigate();
    
    const handleBack = () => {
        navigate('/dashboard');
      };

      useEffect(() => {
        const dataBox = document.getElementById('inboxData');
        getMentor().then((res) => {
          if (res.data.inbox.length == 0){
            dataBox.innerHTML="<h1 className='empty-inbox'>You Have No shared Lessons at this time!</h1>"
          }
          if (res.data && !printed) {
            dataBox.innerHTML = "";
            res.data.inbox.forEach((lesson) => {
                const box = document.createElement('div');
                box.className = 'item';
                box.onclick = () => expand(lesson);
                const text1 = document.createElement('h2');
                text1.innerText = `${lesson.name}`;
                const text2 = document.createElement('p');
                text2.innerHTML = `<strong>Expectations:</strong> ${lesson.expectations}`;
                box.append(text1);
                box.append(text2);
                dataBox.append(box);
            });
            setprinted(true);
          } 
          else if(!printed){
            message.error(res.err);
            navigate('/teacherlogin');
          }
        });
      }, [printed]);

// display possible Units to save to
      function updateUnits(chosen){
        const selector = document.getElementById('unitOptions');

        if(chosen > 0){
            unitMap.clear();
            const grade = classroomMap.get(chosen).grade.id;
            selector.innerHTML="";
            selector.removeAttribute("disabled");
                let first = true;
                  const fetchUnits = async () => {
                    try {
                      const res = await getUnits(grade);
                      if (res.data) {
                        for(const x in res.data){
                            var unit = res.data[x];
                            unitMap.set(unit.id, unit)
                            let optionElement = document.createElement('option');
                            optionElement.value = unit.id;
                            optionElement.text = unit.name;
                            selector.appendChild(optionElement);
                            if(first){
                              setChosenUnit(unit.id);
                              first=false;
                            }
                        }
                      } else {
                        message.error(res.err);
                      }
                    } catch (error) {
                      console.error("Error fetching units:", error);
                    }
                  };fetchUnits();   
        }
        else{
            selector.innerHTML=`<option value="0"> Please select Class</option>`;
            selector.setAttribute("disabled", "disabled");
        }
    }
    
    // set classes
    useEffect(() => {
        const setClassOptions = async () => {
            const selector = document.getElementById('classOptions');
            selector.innerHTML=`<option value="0"></option>`;
            
            classroomMap.forEach((value, key) => {
                let optionElement = document.createElement('option');
                optionElement.value = key;
                optionElement.text = value.name;
                selector.appendChild(optionElement);
            });
        };
    
        if (!set && activePanel === 'panel-2') {
            setSet(true);
            setClassOptions();
        }
    }, [activePanel]);

    const expand = async (lesson) =>{
        setVisible(true);
        setSelectedLesson(lesson)

        const res = await getLessonModuleActivities(lesson.id)
        if(res.data){
            setActivites(res.data);
        }
        else{
            message.error("unable to retrieve Lesson Module")
        }
    }
    const handleCancel = () => {
        setVisible(false);
        setActivites([]);
        setActivePanel('panel-1');
      };
    const handleSave = async () => {
        if(chosenClass == "" || standard==""){
          message.error("Not all options selected/filled in");
        }
        else{
          let unit = unitMap.get(chosenUnit);
          setStandard(selectedLesson.standards)

          const activities = await getLessonModuleActivities(selectedLesson.id);
          if(!activities){
            message.error("Error retriving activities");
            return
          }
          
          let activityList = activities.data;
          const lesson = await createLessonModule(selectedLesson.expectations, selectedLesson.name , selectedLesson.number+1, unit.id, standard, selectedLesson.link);
          if(!lesson){
            message.error(res.error)
            return;
          }

          for(let x in activityList){
            const res = await createActivity(activityList[x].number, lesson.data);
            const activity  = res.data;
            if(!res){
              message.error("request failed");
              return;
            }

            let comComponent = [];
            let scieCompoent = [];
            let makeComponent = [];

            const learnComp = activityList[x].learning_components;

            for(let y in learnComp){
              if(learnComp[y].learning_component_type == 1){
                comComponent.push(learnComp[y].type);
              }
              else if(learnComp[y].learning_component_type == 2){
                scieCompoent.push(learnComp[y].type);
              }
              else if(learnComp[y].learning_component_type == 3){
                makeComponent.push(learnComp[y].type);
              }
              console.log(comComponent);
              console.log(scieCompoent);
              console.log(makeComponent);

            }
            const finale = await updateActivityDetails(activity.id, activityList[x].description, activityList[x].StandardS, activityList[x].images, activityList[x].link, scieCompoent, makeComponent, comComponent)
          }

          discard();
          message.success("Lesson Saved")
        }
      };

    function saveTo(){
        setActivePanel('panel-2');
        // get classrooms and Units
    }
    function back(){
        setActivePanel('panel-1');
    }

    // remove from inbox
    const discard = async ()=>{
      const user = JSON.parse(sessionStorage.getItem('user'));
      const res = await removeLesson(user.id, selectedLesson);
      const box = document.getElementsByName(`${selectedLesson.name}`)
      if(res){
        setprinted(false);
      }
      else{
        message.error(res.error);
      }
        handleCancel();
    }

    const updateStandard = (e) =>{
      setStandard(e.target.value)
    }

    const chooseClassroom  = (e) =>{
        e.preventDefault();
        const chosen = parseInt(e.target.value)
        setChosenClass(chosen);
        updateUnits(chosen);
    }

    const chooseUnit  = (e) =>{
        e.preventDefault();
        const chosen = parseInt(e.target.value)
        setChosenUnit(chosen);
    }
    

  return (
    <div className='container nav-padding'>
        <NavBar isMentor={true}/>
        <div>
            <button id='home-back-btn1' onClick={handleBack}>
                <i className='fa fa-arrow-left' aria-hidden='true' />
            </button>
            <h1 className='title'>Recently Shared with You</h1>
            <div id='inboxData'>
            </div>
            <Modal
                title= {activePanel === 'panel-1'
                ? `Viewing: ${selectedLesson.name}`
                : `Saving: ${selectedLesson.name}`}
                visible={visible}
                onCancel={handleCancel}
                width='60vw'
                footer={[          
                <Button
                    key='ok'
                    type='secondary'
                    disabled={false}
                    onClick={activePanel === 'panel-1' ? discard : back}
                >
                {activePanel === 'panel-1'
                    ? 'Discard Lesson'
                    : 'Back'}
                </Button>,
                <Button
                     key='ok'
                      type='primary'
                      onClick={activePanel === 'panel-1' ? saveTo : handleSave}
                    >
                  {activePanel === 'panel-1'
                    ? 'Save to'
                    : 'Save'}
                </Button>,
                ]}
            >
            <div
                 className={activePanel !== 'panel-1' ? 'panel-1 show' : 'panel-1 hide'}
                >
                <div className='saving-box'>
                    <div id='input'>
                        <h3>Classroom:</h3>
                        <select name="" id="classOptions" onChange={chooseClassroom} required>
                            <option value="0"></option>
                        </select>
                    </div>
                    <div id='input'>
                        <h3>Unit:</h3>
                        <select name="" id="unitOptions" disabled='disabled' onChange={chooseUnit} value={chosenUnit}>
                            <option value="0">Please select class</option>
                        </select>
                    </div>
                    <div id='input'>
                      <h3>Set Standard:</h3>
                      <input type="text" onChange={updateStandard} />
                    </div>
                </div>
            </div>
            <div
            className={activePanel === 'panel-1' ? 'panel-1 show' : 'panel-1 hide'}
            >
            {activities ? (
                <div id='card-inbox-container' className='flex space-between'>
                  {activities.map((activity) => (
                    <div id="view-inbox-activity-card" key={activity.id}>
                      <div id='activity-title'>
                       Activity Level {activity.number}
                       </div>
                      <div id='view-activity-info'>
                        <p>
                          <strong>STANDARDS: </strong>
                          {activity.StandardS}
                        </p>
                        <p>
                          <strong>Description: </strong>
                          {activity.description}
                        </p>
                        <p>
                          <strong>Classroom Materials: </strong>
                          {activity.learning_components
                            .filter(
                              (component) =>
                                component.learning_component_type === SCIENCE
                            )
                            .map((element, index) => {
                              return (
                                <Tag
                                  key={index}
                                  color={color[(index + 1) % 11]}
                                >
                                  {element.type}
                                </Tag>
                              );
                            })}
                        </p>
                        <p>
                          <strong>Student Materials: </strong>
                          {activity.learning_components
                            .filter(
                              (component) =>
                                component.learning_component_type === MAKING
                            )
                            .map((element, index) => {
                              return (
                                <Tag
                                  key={index}
                                  color={color[(index + 4) % 11]}
                                >
                                  {element.type}
                                </Tag>
                              );
                            })}
                        </p>
                        <p>
                          <strong>Arduino Components: </strong>
                          {activity.learning_components
                            .filter(
                              (component) =>
                                component.learning_component_type ===
                                COMPUTATION
                            )
                            .map((element, index) => {
                              return (
                                <Tag
                                  key={index}
                                  color={color[(index + 7) % 11]}
                                >
                                  {element.type}
                                </Tag>
                              );
                            })}
                        </p>
                        {activity.link ? (
                          <p>
                            <strong>Link to Additional Information: </strong>
                            <a href={activity.link} target='_blank' rel='noreferrer'>
                              {activity.link}
                            </a>
                          </p>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
        </Modal>
        </div>
    </div>
  );
}
