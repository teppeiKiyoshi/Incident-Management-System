import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import axios from "axios";

export default function ControlledAccordions() {
  const [expanded, setExpanded] = useState(false);
  const [faqs, setFaqs] = useState();
  let iterator = 0;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    getFaqs();
  }, []);

  const getFaqs = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/stats/get-faqs"
      );

      setFaqs(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {faqs &&
        faqs.map((faq) => {
          iterator++;
          return (
            <Accordion
              expanded={expanded === `panel${iterator.toString()}`}
              onChange={handleChange(`panel${iterator.toString()}`)}
              className="accordion-main"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}

      {/* <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        className="accordion-main"
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            How can I file an incident report?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Proceed to the Forums tab to file an incident report about your
            concern.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        className="accordion-main"
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            What will I do to my INC grade?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            File a report, input required information, select the incident type,
            and the subject with INC (will ask for the subject INC).
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        className="accordion-main"
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            How to add or change a subject?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            File a report, input required information, select the incident type
            (Adding/Changing). It will ask for the subject/s you wish to add or
            change.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
        className="accordion-main"
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            How can I fix my remaining Balance?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            File a report, input required information, select the incident type
            (Remaining Balance), Elaborate your concern and follow given
            instructions.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
        className="accordion-main"
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5bh-content"
          id="panel5bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Can I file multiple reports at a time?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            No, a student can only file one active incident report at a time.
            Once the report has been resolved and closed, you can be able to
            file another report of your concern.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
        className="accordion-main"
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6bh-content"
          id="panel6bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Can I choose multiple incident types per report?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            No, you can only choose one incident type per report you file.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
        className="accordion-main"
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel7bh-content"
          id="panel7bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            How will I know if there is an update in my report?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            A notification will be sent to you if there are updates/resolution
            regarding your latest incident report filed.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel8"}
        onChange={handleChange("panel8")}
        className="accordion-main"
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel8bh-content"
          id="panel8bh-header"
        >
          <Typography sx={{ width: "50%", flexShrink: 0 }}>
            What if I have a follow-up question on my active incident report?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can send a follow-up question within your active incident report
            with no limits but shall consider only the scope of the latest filed
            report.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel9"}
        onChange={handleChange("panel9")}
        className="accordion-main"
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel9bh-content"
          id="panel9bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            How to change the password of my account?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Go to settings and choose Change Password button. Also, on the
            navigation bar, you can click on the account icon to access your
            account settings. There are quick links provided as well over the
            account icon dropdown menu.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel10"}
        onChange={handleChange("panel10")}
        className="accordion-main"
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel10bh-content"
          id="panel10bh-header"
        >
          <Typography sx={{ width: "50%", flexShrink: 0 }}>
            I forgot the password of my Filingo account, what should I do?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Click the forgot password, an email will be sent to you with the
            procedure of resetting your password. Important Note: Do not share
            any details to other users regarding your account for security
            reasons.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
}
