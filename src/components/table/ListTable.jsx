import './list-table.scss';
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
      studentID: '2022202222',
      img: 'https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg',
      customer: 'John Smith',
      date: '31 March 2022',
      method: 'Remaining Balance',
      evaluator: 'Eman Martin',
      status: 'Processing',
    },
    {
      id: 2235235,
      studentID: '2018202210',
      img: 'https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg',
      customer: 'Michael Doe',
      date: '23 March 2022',
      method: 'Failed Subjects',
      evaluator: 'Aetheflaed Mercia',
      status: 'Pending',
    },
    {
      id: 2342353,
      studentID: '2018900821',
      img: 'https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg',
      customer: 'John Smith',
      date: '21 March 2022',
      method: 'Adding Subject',
      evaluator: 'Uhtred Ragnarson',
      status: 'Pending',
    },
    {
      id: 2357741,
      studentID: '2019372221',
      img: 'https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg',
      customer: 'Jane Smith',
      date: '12 March 2022',
      method: 'Incomplete Subjects',
      evaluator: 'Cypher Morroco',
      status: 'Approved',
    },
    {
      id: 2342355,
      studentID: '2018900821',
      img: 'https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg',
      customer: 'Harold Carol',
      date: '1 March 2022',
      method: 'Others',
      evaluator: 'Procopio Domingo',
      status: 'Pending',
    },
  ];

  return (
    <TableContainer component={Paper} className='table-main'>
      <Table sx={{ minWidth: 650 }} aria-label='simple table' stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell className='table-cell'>Tracking ID</TableCell>
            <TableCell className='table-cell'>Student ID</TableCell>
            <TableCell className='table-cell'>Student</TableCell>
            <TableCell className='table-cell'>Date</TableCell>
            <TableCell className='table-cell'>Incident Type</TableCell>
            <TableCell className='table-cell'>Evaluator</TableCell>
            <TableCell className='table-cell'>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className='table-cell'>{row.id}</TableCell>
              <TableCell className='table-cell'>{row.studentID}</TableCell>
              <TableCell className='table-cell'>{row.customer}</TableCell>
              <TableCell className='table-cell'>{row.date}</TableCell>
              <TableCell className='table-cell'>{row.method}</TableCell>
              <TableCell className='table-cell'>{row.evaluator}</TableCell>
              <TableCell className='table-cell'><span className={`status ${row.status}`}>{row.status}</span></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListTable;
