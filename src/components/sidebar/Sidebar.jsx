import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Sidebar = () => {
  return (
    <div className='sidebar-main'>
      <div className="sidebar-top">
        <span className="sidebar-logo">
          Incident Project
        </span>
      </div>
      <hr/>
      <div className="sidebar-center">
        <ul>
          <li>
            <DashboardIcon className='sidebar-icons'/>
            <span>Dashboard</span>
          </li>
          <li>
            <PeopleIcon className='sidebar-icons'/>
            <span>Users</span>
          </li>
          <li>
            <PersonAddIcon className='sidebar-icons'/>
            <span>Add Evaluators</span>
          </li>
          <li>
            <QuestionAnswerIcon className='sidebar-icons'/>
            <span>Forums</span>
          </li>
          <li>
            <PsychologyIcon className='sidebar-icons'/>
            <span>Logs</span>
          </li>
          <li>
            <SettingsIcon className='sidebar-icons'/>
            <span>Settings</span>
          </li>
          <li>
            <ExitToAppIcon className='sidebar-icons'/>
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="sidebar-bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  )
}

export default Sidebar