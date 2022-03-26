import './feature.scss';

//MUI ICONS
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
//react circular progressbar
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Featured = () => {
  return (
    <div className='featured-main'>
      <div className='ft-top'>
        <h1 className='top-title'>Total Revenue</h1>
        <MoreVertIcon fontSize='small' />
      </div>
      <div className='ft-bottom'>
        <div className='featured-chart'>
          <CircularProgressbar value={70} text='70%' strokeWidth={4} />
        </div>
        <p className='cpb-title'>Total Queries Answered Today</p>
        <p className='cpb-amount'>$420</p>
        <p className='cpb-desc'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum,
          labore?
        </p>
        <div className='summary'>
          <div className='summary-item'>
            <div className='item-title'>Target</div>
            <div className='item-result negative'>
              <KeyboardArrowDownIcon fontSize='small' />
              <div className='result-amount'>20 Queries</div>
            </div>
          </div>
          <div className='summary-item'>
            <div className='item-title'>Last Week</div>
            <div className='item-result positive'>
              <KeyboardArrowUpIcon fontSize='small' />
              <div className='result-amount'>300 Queries</div>
            </div>
          </div>
          <div className='summary-item'>
            <div className='item-title'>Last Month</div>
            <div className='item-result positive'>
              <KeyboardArrowUpIcon fontSize='small' />
              <div className='result-amount'>420 Queries</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
