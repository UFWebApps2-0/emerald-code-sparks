import './StudyBrowser.less';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ActivityLevelReport.less';

const StudyBrowser = () => {
  const navigate = useNavigate();
  // const columns = [
  //   {
  //     title: 'Study ID',
  //     key: 'reportid',
  //     width: '2%',
  //     align: 'left',
  //     render: (_, key) => <div>{key.students[0].name}</div>,
  //   }, {
  //     title: 'Classroom',
  //     key: 'classroom',
  //     dataIndex: ['classroom', 'name'],
  //     width: '6%',
  //     align: 'left',
  //     onFilter: (value, key) => key.classroom?.name.indexOf(value) === 0,
  //   }, {
  //     title: 'Grade',
  //     dataIndex: ['grade', 'name'],
  //     key: 'grade',
  //     width: '2%',
  //     align: 'left',
  //     onFilter: (value, key) => key.grade?.name.indexOf(value) === 0,
  //   }, {
  //     title: 'Unit',
  //     dataIndex: ['unit', 'name'],
  //     key: 'unit',
  //     width: '4%',
  //     align: 'left',
  //     onFilter: (value, key) => key.unit?.name.indexOf(value) === 0,
  //   }, {
  //     title: 'Lesson',
  //     dataIndex: ['lesson_module', 'name'],
  //     key: 'lesson_module',
  //     width: '3%',
  //     align: 'left',
  //     onFilter: (value, key) =>
  //       key.lesson_module?.name.indexOf(value) === 0,
  //   }, {
  //     title: 'Session Started',
  //     dataIndex: 'created_at',
  //     key: 'sessionStart',
  //     width: '4%',
  //     align: 'left',
  //     sorter: true,
  //   }, {
  //     title: 'Partners',
  //     key: 'hasPartners',
  //     width: '2%',
  //     align: 'left',
  //     render: (_, key) => (<div>{key.students.slice(1).map((student) => student.name).join(', ')}</div>),
  //   }, {
  //     title: 'View Report',
  //     dataIndex: 'enrolled',
  //     key: 'enrolled',
  //     width: '2%',
  //     align: 'right',
  //     render: (_, session) => (<Link to={`/activityLevel/${session.id}`}>View Report</Link>),
  //   },
  // ];

  return (
    <>
      <div className='menu-bar'>
        <div id='activity-level-report-header'>Report Browser</div>
        <button className='activity-level-return' onClick={() => navigate('/report')}> Return to Dashboard </button>
      </div>
      <main id='activity-report-content-wrapper'>
        {/* <Table
          columns={columns} //Defined above, might need to improve typings
          dataSource= //Where the data comes from
          rowKey='id'
          pagination={{
            current: paramObj['_start'] / paramObj['pageSize'] + 1,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSize: paramObj['pageSize'] || 10,
            total: //total number of entries, study count
          }}
        /> */}
      </main>
      </>
  );
};

export default StudyBrowser;