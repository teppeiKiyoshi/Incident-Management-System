import * as React from 'react';
import './report-type.scss'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
//ICONS
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'; //remaining balance
import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined'; //failed subj
import RuleOutlinedIcon from '@mui/icons-material/RuleOutlined'; //inc
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
//adding - changing subj
import NotStartedOutlinedIcon from '@mui/icons-material/NotStartedOutlined';
//Subjects from lower year level not yet taken
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';
//unavailable
import ReadMoreOutlinedIcon from '@mui/icons-material/ReadMoreOutlined';
//other

const reportItems = [
  {
    id: 1,
    title: 'Remaining Balance',
    icon: <AccountBalanceWalletOutlinedIcon className='item-icon'/>,
  },
  {
    id: 2,
    title: 'Failed Subject',
    icon: <AssignmentLateOutlinedIcon className='item-icon'/>,
  },
  {
    id: 3,
    title: 'Adding/Changing Subjects',
    icon: <PublishedWithChangesOutlinedIcon className='item-icon'/>,
  },
  {
    id: 4,
    title: 'Subjects with INC',
    icon: <RuleOutlinedIcon className='item-icon'/>,
  },
  {
    id: 5,
    title: 'Subjects from lower year level not yet taken',
    icon: <NotStartedOutlinedIcon className='item-icon'/>,
  },
  {
    id: 6,
    title: 'Unavailable Subjects',
    icon: <EventBusyOutlinedIcon className='item-icon'/>,
  },
  {
    id: 7,
    title: 'Others',
    icon: <ReadMoreOutlinedIcon className='item-icon'/>,
  },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const handleSelectItem = () => {
  console.log('clicked');
}

const ReportTypes = () => {
  return (
    <>
      <Box sx={{ width: '90%', m:'40px 50px'}}>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xl: 4, lg: 4, md: 4}}
          sx={{ justifyContent: 'center', alignItems: 'center' }}
        >
          {reportItems.map((item) => (
            <Grid item md={3} >
              <Item key={item.id} onClick={ handleSelectItem } >
                {item.icon}
                <div>
                  <Typography variant='caption' component='span'>
                    {item.title}
                  </Typography>
                </div>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* <div className="report-type__main">
        <div className="report-type__wrapper">
        {reportItems.map((item) => (
        <div className="report-type__items">
          {item.icon}
          <p className="report-type__text">
              {item.title}
          </p>
        </div>
        ))}
        </div>
      </div> */}
    </>
  );
};

export default ReportTypes;
