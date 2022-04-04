import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const modalTitle = {
  fontSize: '1.5rem',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  color: '#893dff',
};

const modalSubheading = {
  fontSize: '1rem',
  fontWeight: 600,
  color: '#999',
  marginBottom: 1,
  marginLeft: 1,
};

const submit_btn = {
  padding: '5px 25px',
  margin: '15px 20px 10px 0',
  background: '#aa7af0',

  '&:hover': {
    background: '#893dff',
  },
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = () => console.log('submit');

  return (
    <div>
      <Button onClick={handleOpen} className='btn-comment'>
        Comment
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography variant='h5' sx={modalTitle}>
            Post a comment
          </Typography>
          <Typography variant='h6' sx={modalSubheading}>
            What's on your mind?
          </Typography>
          <TextField
            label='Add Comment'
            required
            fullWidth
            multiline
            rows={10}
          />
          <Button
            size='small'
            variant='contained'
            component='label'
            sx={submit_btn}
            startIcon = {<AttachFileOutlinedIcon />}
          >
            Attach a File
            <input type='file' hidden />
          </Button>
          <Button
            onClick={handleSubmit}
            size='small'
            variant='contained'
            sx={submit_btn}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
