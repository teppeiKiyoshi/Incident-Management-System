import React, { useState } from 'react';
import './evalGrid.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import EvaluatorCard from '../../components/evaluator-cards/EvaluatorCard';
import { AiOutlineClose } from 'react-icons/ai';
//MUI dependencies
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';

const EvaluatorGrid = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  return (
    <div className='evalgrid-main'>
      <Sidebar />
      <div className='evalgrid-wrapper'>
        <Navbar />
        <div className='evalgrid-header'>
          <div className='evalgrid-title'>
            <h2 className='title'>List of Evaluators</h2>
            <Button
              startIcon={<AddIcon />}
              variant='contained'
              className='evalreg-btn'
              onClick={toggleModal}
            >
              Register
            </Button>
          </div>
        </div>
        <div className='evalgrid-functions'>
          {modal && (
            <div className='modal'>
              <div onClick={toggleModal} className='overlay'></div>
              <div className='modal-content'>
                <h2 className='content-title'>Register an Evaluator</h2>
                <TextField
                  required
                  variant='outlined'
                  label='Last Name'
                  sx={{ width: '220px', m: 2 }}
                />
                <TextField
                  required
                  variant='outlined'
                  label='First Name'
                  sx={{ width: '220px', m: 2 }}
                />
                <TextField
                  variant='outlined'
                  label='M.I.'
                  sx={{ width: '60px', m: 2 }}
                />
                <TextField
                  required
                  variant='outlined'
                  label='Email'
                  sx={{ m: 2, width: '350px' }}
                />
                <TextField
                  required
                  variant='outlined'
                  label='Contact Number'
                  sx={{ m: 2, width: '180px' }}
                />
                <TextField
                  required
                  variant='outlined'
                  label='Password'
                  sx={{ m: 2, width: '265px' }}
                />
                <TextField
                  required
                  variant='outlined'
                  label='Confirm Password'
                  sx={{ m: 2, width: '265px' }}
                />
                <div className='btn-container'>
                  <button className='btn_cancel'>Cancel</button>
                  <button className='btn_submit'>Register</button>
                </div>
                <button className='close-modal' onClick={toggleModal}>
                  <AiOutlineClose />
                </button>
              </div>
            </div>
          )}
          <div className='filter-wrapper'>
            <div className='filter-eval'>
              <select name='report' id='report' className='filter-dropdown'>
                <option value=''>-Select to Filter your Search-</option>
                <option value='Completed' className='filter-option'>
                  Active Evaluators
                </option>
                <option value='Assigned' className='filter-option'>
                  Inactive Evaluators
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className='card-container'>
          <EvaluatorCard />
          <EvaluatorCard />
          <EvaluatorCard />
          <EvaluatorCard />
          <EvaluatorCard />
          <EvaluatorCard />
        </div>
      </div>
    </div>
  );
};

export default EvaluatorGrid;
