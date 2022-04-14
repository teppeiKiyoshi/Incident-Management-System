import React, { useState } from 'react';
import './evalGrid.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import EvaluatorCard from '../../components/evaluator-cards/EvaluatorCard';
import SortEvaluator from '../../components/dropdown/SortEvaluator';
//MUI dependencies
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';

const EvaluatorGrid = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
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
                <TextField required variant='outlined' label='Last Name'/>
                <TextField required variant='outlined' label='First Name'/>
                <TextField variant='outlined' label='M.I.' sx={{ width: '60px'}}/>
                <TextField required fullWidth variant='outlined' label='Email'/>
                <TextField required fullWidth variant='outlined' label='Password'/>
                <button className="btn_cancel">Cancel</button>
                <button className="btn_submit">Register</button>
                <button className='close-modal' onClick={toggleModal}>
                  X
                </button>
              </div>
            </div>
          )}
          <SortEvaluator />
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
