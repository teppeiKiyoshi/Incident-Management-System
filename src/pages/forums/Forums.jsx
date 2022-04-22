import React from 'react';
import './forums.scss';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import ForumsTable from '../../components/forums/ForumsTable';
import SearchForums from '../../components/searchbar/forums-search/SearchForums';
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
        <div className='search-wrapper'>
          <SearchForums />
          <div className="filter-forum">
            <select name="report" id="report" className='filter-dropdown'>
              <option value="">-Select to Filter your Search-</option>
              <option value="Completed" className='filter-option'>Completed</option>
              <option value="Assigned" className='filter-option'>Assigned</option>
              <option value="Processing" className='filter-option'>Processing</option>
              <option value="Unassigned" className='filter-option'>Unassigned</option>
              <option value="Remaining Balance" className='filter-option'>Remaining Balance</option>
              <option value="Subject with INC" className='filter-option'>Subject with INC</option>
              <option value="Failed Subject" className='filter-option'>Failed Subject</option>
              <option value="Add Subject" className='filter-option'>Add Subject</option>
              <option value="Change Subject" className='filter-option'>Change Subject</option>
              <option value="prev-sem" className='filter-option'>Unavailable Subj - Prev Sem</option>
              <option value="curr-sem" className='filter-option'>Unavailble Subj - Curr Sem</option>
              <option value="Other" className='filter-option'>Other</option>
            </select>
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
