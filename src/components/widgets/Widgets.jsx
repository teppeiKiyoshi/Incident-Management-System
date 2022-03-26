import './widgets.scss'
//MUI icons
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AllInboxIcon from '@mui/icons-material/AllInbox';

const Widgets = ({ type }) => {
  let data;
  //temporary data
  const amount = 100;
  const diff = 20;

  switch (type) {
    case 'user':
      data = {
        title: 'Users',
        link: 'See All Users',
        counter: '129',
        icon: <PersonOutlineIcon  
        className='widget-icon' 
        style= {{
          color: 'goldenrod', 
          backgroundColor:'rgba(218,165,32,0.2)'
        }}/>,
      };
      break;
      case 'completed':
      data = {
        title: 'Completed',
        link: 'View Completed Incidents',
        counter: '12399',
        icon: <CreditScoreIcon  className='widget-icon'
        style= {{
          color: 'green', 
          backgroundColor:'rgba(0,128,0,0.2)'
        }}/>,
      };
      break;
      case 'pending':
      data = {
        title: 'Pending',
        link: 'View Pending Incidents',
        counter: '19',
        icon: <PendingActionsIcon  className='widget-icon' 
        style= {{
          color: 'crimson', 
          backgroundColor:'rgba(255,0,0,0.2)'
        }}/>,
      };
      break;
      case 'total':
      data = {
        title: 'Total',
        link: 'View All Incidents',
        counter: '2913',
        icon: <AllInboxIcon  className='widget-icon' 
        style= {{
          color: 'purple', 
          backgroundColor:'rgba(128,0,128,0.2)'
        }}/>,
      };
      break;
      default:
        break;
  }

  return (
    <div className='widget-main'>
      <div className="left">
      <span className="title">{data.title}</span>
      <span className="counter">{data.counter}</span>
      <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon/>
          20%
        </div>
        {data.icon}
      </div>
    </div>
  )
}

export default Widgets