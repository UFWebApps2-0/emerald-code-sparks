import { Modal, Button, message, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import LessonModuleSelect from './LessonModuleSelect';
import AddActivity from './AddActivity';
import {
  getLessonModule,
  setSelection,
  getLessonModuleActivities,
  deleteLessonModule,
  createActivity,
  getTeachers,
  shareLesson,
} from '../../../../../Utils/requests';
import { useSearchParams } from 'react-router-dom';

const teacherLayout = new Map();

export default function LessonModuleModal({
  setActiveLessonModule,
  activeLessonModule,
  gradeId,
  classroomId,
  viewing,
  setActivities,
}) {
  const [visible, setVisible] = useState(false);
  const [activePanel, setActivePanel] = useState('panel-1');
  const [visible2, setVisible2] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selected, setSelected] = useState({});
  // eslint-disable-next-line
  const [_, setSearchParams] = useSearchParams();

  const selector = document.getElementsByName('teacherSelector');
  const [addActivityModalVisible, setAddActivityModalVisible] = useState(false);
  const showAddActivityModal = () => {
    setAddActivityModalVisible(true);
  };

  const handleAddActivityCancel = () => {
    setAddActivityModalVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (viewing) {
        const res = await getLessonModule(viewing);
        if (res.data) {
          setSelected(res.data);
          const activitiesRes = await getLessonModuleActivities(res.data.id);
          if (activitiesRes) setSelectedActivities(activitiesRes.data);
          else {
            message.error(activitiesRes.err);
          }
          setVisible(true);
          setActivePanel('panel-2');
        } else {
          message.error(res.err);
        }
      }
    };
    fetchData();
  }, [viewing]);

  const fetchTeachers = async () => {
    const exclude = JSON.parse(sessionStorage.getItem('user'));
    const res = await getTeachers();
    var enter=true;
    if(res){
      for(const x in res.data){
        if(res.data[x].user.email !== exclude.email && res.data[x].user.username !== exclude.username && !updated){
          var teacher = res.data[x];
          if(enter){
            await setSelectedTeacher(teacher);
            enter = false;
          }
          teacherLayout.set(`${teacher.last_name}`, teacher);
          let optionElement = document.createElement('option');
          optionElement.value = teacher.last_name;
          optionElement.text = `${teacher.last_name}, ${teacher.first_name}`;
          selector[0].appendChild(optionElement);
        }
      }
      setUpdated(true);
    }
  };


  const showModal = () => {
    setActivePanel('panel-1');
    setVisible(true);
  };

  const showShare = () => {
    fetchTeachers();
    setActivePanel('panel-3');
    setVisible2(true);
  };


  const handleCancel = () => {
    setSearchParams({ tab: 'home' });
    setVisible(false);
    setVisible2(false);
  };

  const handleOk = async () => {
    const res = await setSelection(classroomId, selected.id);
    if (res.err) {
      message.error(res.err);
    } else {
      setActiveLessonModule(selected);
      setActivities(selectedActivities);
      message.success('Successfully updated active learning standard.');
      setSearchParams({ tab: 'home' });
      setVisible(false);
    }
  };

  const handleReview = () => {
    setSearchParams({ tab: 'home', viewing: selected.id });
    setActivePanel('panel-2');
  };


  const sendLesson = async () => {
    const res = await shareLesson(selectedTeacher.id, activeLessonModule)
    if(res.error){

    }
    else{
      message.success(`Lesson shared`)
      setSearchParams({ tab: 'home' });
      setVisible2(false);
    }
  };

  const updateSelected = async (e) => {
    const target = teacherLayout.get(e.target.value);
    setSelectedTeacher(target);
  };

  const deleteLesson = async () =>{
    const res  = await deleteLessonModule(selected.id)
    if(res.data){
      message.success(`'${selected.name}' has been deleted`)
    }
    else{
      message.error(`Could not delete '${selected.name}'`)
    }
  };
  

  const addActivity = async () =>{
    const res = await createActivity
  }

  return (
    <div id='lesson-module-modal'>
      <button id='share-btn' onClick={showShare}><i className="fa fa-solid fa-share"></i></button>
      <Modal
        title={
          activePanel === 'panel-3'
            ? 'Share Lesson'
            : selected
        }
        visible={visible2}
        onCancel={handleCancel}
        footer={[
          <Button key='ok' type='primary' onClick={sendLesson}>
            Send
          </Button>,
        ]}
      >
        <div>
          <p>Select Teacher to share lesson</p>
          <select name='teacherSelector' id='avilableTeachers' onChange={updateSelected}>
          </select>
        </div>
      </Modal>

      <button id='change-lesson-btn' onClick={showModal}>
        <p id='test'>Change</p>
      </button>
      <Modal
        title={
          activePanel === 'panel-1'
            ? 'Select a Learning Standard:'
            : selected.name
        }
        visible={visible}
        onCancel={handleCancel}
        width='60vw'
        footer={[
          <Button
            key='ok'
            type='primary'
            disabled={selected.id === undefined}
            onClick={activePanel === 'panel-1' ? handleReview : handleOk}
          >
            {activePanel === 'panel-1'
              ? 'Review'
              : 'Set as Active Learning Standard'}
          </Button>,
        ]}
      >
        <LessonModuleSelect
          activePanel={activePanel}
          setActivePanel={setActivePanel}
          selected={selected}
          setSelected={setSelected}
          gradeId={gradeId}
          activities={selectedActivities}
          setActivities={setSelectedActivities}
        />
      </Modal>
      {/* add avtivty button has not been implemented yet */}
      <button id='add-activity' onClick={showAddActivityModal}>+ Activity</button>
      <AddActivity
  visible={addActivityModalVisible}
  onCancel={handleAddActivityCancel}
  //setUpdatedActivities={setUpdatedActivities} // Pass any necessary props
 />
      <Popconfirm
          title='This action is NOT reversible'
          onConfirm={() => { deleteLesson()
              }}
            >
      <button id='delete-lesson'>Delete Lesson</button>
      </Popconfirm>
    </div>
  );
}
