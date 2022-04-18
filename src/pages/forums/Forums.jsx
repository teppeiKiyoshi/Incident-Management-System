import React from 'react';
import './forums.scss';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import ForumsTable from '../../components/forums/ForumsTable';
//MUI
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import Button from '@mui/material/Button';

const Forums = () => {
  const navigate = useNavigate();

  const routeChange = () => {
    let path = '/forums/add-post';
    navigate(path);
  };
  return (
    <div className='forums-main'>
      <Sidebar />
      <div className='forums-container'>
        <Navbar />
        <div className='forums-header'>
          <div className='forums-title'>
            <h2 className='main-title'>Forums</h2>
            <Button
              startIcon={<AddCardOutlinedIcon />}
              variant='contained'
              className='addPost-btn'
              onClick={routeChange}
            >
              Create Report
            </Button>
          </div>
        </div>
        <ForumsTable />
        <ForumsTable />
        <ForumsTable />
        <ForumsTable />
        <ForumsTable />
        <ForumsTable />
      </div>
    </div>
  );
};

export default Forums;
