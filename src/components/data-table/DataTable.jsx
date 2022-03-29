import {React, useState} from 'react';
import './data-table.scss';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, userRows } from '../../data-table-db';
import { Link } from 'react-router-dom';
//fake data for this file is at src/data-table-db 

const DataTable = () => {
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [{
    field: 'Action',
    headerame: 'Action',
    width: '200',
    renderCell: (params) => {
      return (
        <div className="action-cell">
          <Link to='/users/test' style={{textDecoration: 'none'}}>
          <Tooltip  title="View User's Profile" arrow>
            <IconButton >
                <RemoveRedEyeIcon style={{textTransform: 'capitalize'}} className='list-btn'/>
              </IconButton>
          </Tooltip>
          </Link>
          <Tooltip  title="Delete User" arrow>
            <IconButton onClick={() => handleDelete(params.row.id)}>
                <DeleteIcon  style={{textTransform: 'capitalize'}} className='list-btn'/>
              </IconButton>
          </Tooltip>
        </div>
      )
    }
  }]
  return (
    <div className='data-table'>
      <DataGrid
        className='data-grid'
        rows={userRows}
        columns={userColumns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
};

export default DataTable;
