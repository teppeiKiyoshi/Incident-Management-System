import React from 'react';
import './evalGrid.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import EvaluatorCard from '../../components/evaluator-cards/EvaluatorCard';
import SortEvaluator from '../../components/dropdown/SortEvaluator';
//MUI dependencies
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const EvaluatorGrid = () => {
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
            >
              Register
            </Button>
          </div>
        </div>
        <div className='evalgrid-functions'>
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
