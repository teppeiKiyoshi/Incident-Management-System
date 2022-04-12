import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import PersonalInfo from './Personal-Info/PersonalInfo';
import ReportTypes from './ReportTypes/ReportTypes';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'rgba(137, 61, 255, 0.9)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 43,
    padding: '0 30px',
    '&:hover': {
      backgroundColor: 'rgb(137, 61, 255)',
    },
  },
  subText: {
    color: '#aa7af0',
    fontWeight: '500',
  },
  icon: {
    fill: '#aa7af0',
  },
});

const steps = [
  {
    label: 'Select Report Type',
    description: <ReportTypes />,
  },
  {
    label: 'Complete Personal Details',
    description: <PersonalInfo />,
  },
  {
    label: 'Fill out the Report',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
  {
    label: 'Review and Submit',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

export default function ReportProcess() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: '100%', margin: '40px 80px' }}>
      <Stepper activeStep={activeStep} orientation='vertical'>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              StepIconProps={{
                classes: {
                  active: classes.icon,
                },
              }}
              optional={
                index === 3 ? (
                  <Typography variant='caption' component='span'>
                    Last step
                  </Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography component='span'>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    className={classes.root}
                    variant='contained'
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    className={classes.subText}
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>
            All steps completed! - You&apos;re report has been filed.
          </Typography>
          <Button
            className={classes.root}
            onClick={handleReset}
            sx={{ mt: 1, mr: 1 }}
          >
            DONE
          </Button>
        </Paper>
      )}
    </Box>
  );
}
