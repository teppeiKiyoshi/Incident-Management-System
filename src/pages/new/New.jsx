import React from 'react';
import './new.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

const New = ({inputs, title}) => {
  const [file, setFile] = React.useState("");
  return (
    <div className='newPage-main'>
      <Sidebar />
      <div className='newPage-container'>
        <Navbar />
        <div className='newPage-top'>
          <h1 className='top-title'>{title}</h1>
        </div>
        <div className='newPage-bottom'>
          <div className='bottom-left'>
            <img
              src={file ? URL.createObjectURL(file) : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'}
              alt='left icon'
              className='icon-image'
            />
          </div>
          <div className='bottom-right'>
            <form className='form-container'>
            <div className='form-input'>
                <label htmlFor='file'> Image: <DriveFolderUploadIcon className='file-icon'/></label>
                <input type='file' name='' id='file' onChange={e => setFile(e.target.files[0])} style={{display: 'none'}}/>
              </div>

              {inputs.map((input) => (
                <div className="form-input" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} />
                </div>
              ))}

              <button className='btn-register'>Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
