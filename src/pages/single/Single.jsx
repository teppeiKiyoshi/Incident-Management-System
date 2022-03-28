import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import ListTable from '../../components/table/ListTable';

const Single = () => {
  return (
    <div className='singlePage-main'>
      <Sidebar />
      <div className='singlePage-container'>
        <Navbar />
        <div className='single-top'>
          <div className='single-left'>
            <div className='edit-btn'>Edit</div>
            <h1 className='left-title'>Student Information</h1>
            <div className='item'>
              <img
                src='https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
                alt='user'
                className='item-image'
              />

              <div className='user-details'>
                <h2 className='item-title'>Jane Doe</h2>
                <div className='detail-item'>
                  <span className='item-key'>Email: </span>
                  <span className='item-value'>janedoe@gmail.com</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Phone: </span>
                  <span className='item-value'>+63 908 923 1234</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Student ID: </span>
                  <span className='item-value'>2020789432</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>College: </span>
                  <span className='item-value'>CICT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='single-bottom'>
          <h1 className='left-title'>User Student Logs</h1>
          <ListTable/>
        </div>
      </div>
    </div>
  );
};

export default Single;
