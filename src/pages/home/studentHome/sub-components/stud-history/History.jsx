import './history.scss';
//MUI table dependecies
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

//list table for dashboard
const ListTable = () => {
  //temporary data
  const rows = [
    {
      id: 1143155,
      evaluator: 'Dwain Dave Dave Dwain',
      img: 'https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg',
      date: '15 April 2022',
      reportType: 'Others',
      status: 'Processing',
    },
    {
      id: 2235235,
      evaluator: 'Franzu Dominiku III',
      img: 'https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg',
      date: '1 April 2022',
      reportType: 'Remaining Balance',
      status: 'Processing',
    },
    {
      id: 2342353,
      evaluator: 'Masahiro Arigato',
      img: 'https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg',
      date: '31 March 2022',
      reportType: 'Failed Subjects',
      status: 'Pending',
    },
    {
      id: 2357741,
      evaluator: 'Leonora Cherry Recinto',
      img: 'https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg',
      date: '10 March 2022',
      reportType: 'Subjects with INC',
      status: 'Approved',
    },
    {
      id: 2342355,
      evaluator: 'Maria Catherina Magsusi',
      img: 'https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg',
      date: '1 March 2022',
      reportType: 'Incomplete Grades',
      status: 'Approved',
    },
  ];
  return (
    <TableContainer component={Paper} className='table'>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell className='tableCell'>Report ID</TableCell>
            <TableCell className='tableCell'>Evaluator</TableCell>
            <TableCell className='tableCell'>Date</TableCell>
            <TableCell className='tableCell'>Report Type</TableCell>
            <TableCell className='tableCell'>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className='tableCell'>{row.id}</TableCell>
              <TableCell className='tableCell'>
                <div className='cellWrapper'>
                  <img src={row.img} alt='' className='image' />
                  {row.evaluator}
                </div>
              </TableCell>
              <TableCell className='tableCell'>{row.date}</TableCell>
              <TableCell className='tableCell'>{row.reportType}</TableCell>
              <TableCell className='tableCell'>
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListTable;
