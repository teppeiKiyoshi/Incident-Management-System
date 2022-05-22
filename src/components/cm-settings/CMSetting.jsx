import React, { useEffect, useState } from "react";
import "./cms.scss";
import { TextField, TextArea } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import axios from "axios";

// react-toastify IMPORTS
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CMSetting = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [faqsState, setFaqsState] = useState();
  const [loadingCms, setLoadingCms] = useState(false);
  const [logoState, setLogoState] = useState();

  const faqChange = (e) => {
    const index = faqsState.findIndex((x) => x._id === e.target.id);

    let find = faqsState.find((x) => x._id === e.target.id);
    find[`${e.target.name}`] = e.target.value;

    const faqs = [...faqsState];
    faqs[index] = find;

    setFaqsState(faqs);
  };

  const getFaqs = async () => {
    const response = await axios.post(
      "http://localhost:5000/api/v1/stats/get-faqs"
    );

    setFaqsState(response.data);
  };

  const updateCms = async () => {
    setLoadingCms(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/stats/update-faqs",
        faqsState
      );

      if (logoState) {
        const response = await axios.post(
          "http://localhost:5000/api/v1/stats/upload-logo",
          { logoState }
        );
      }

      setLoadingCms(false);
      toast.success("Updated!");
    } catch (err) {
      console.log(err);
      toast.error("An error occured");
      setLoadingCms(false);
    }
  };

  const addFaq = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/stats/add-faq"
      );

      if (response.data.status) {
        getFaqs();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeFaq = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/stats/remove-faq",
        { id: e.target.value }
      );

      if (response.data.status) {
        getFaqs();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onLogoChange = (e) => {
    const file = e.target.files[0];

    getBase64(file).then((data) => {
      setLogoState(data);
    });
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  useEffect(() => {
    try {
      getFaqs();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="cmSettings-wrapper">
      <div className="cmSettings-content__wrapper">
        <div className="header-wrapper">
          <h3 className="setting-title">Content Management</h3>
          {isOpen ? (
            <MdKeyboardArrowUp
              className="arrow-btn"
              onClick={() => setIsOpen(!isOpen)}
            />
          ) : (
            <MdKeyboardArrowDown
              className="arrow-btn"
              onClick={() => setIsOpen(!isOpen)}
            />
          )}
        </div>
        {isOpen && (
          <div className="cmSettings-content__left">
            <div className="cmSettings-left__details">
              <div className="cmSettings-left__details-item">
                <div className="cmSettings-left__details-item-wrapper">
                  <p className="details-item__title">System Logo</p>
                </div>
                <div className="cmSettings-left__input-item-wrapper logo">
                  <label htmlFor="img-upload" className="changeLogo-btn">
                    <input
                      type="file"
                      id="img-upload"
                      name="img-upload"
                      accept="image/png, image/gif, image/jpeg"
                      onChange={onLogoChange}
                      style={{ display: "none" }}
                    />
                    Upload Image
                  </label>
                </div>
              </div>
              <div className="cmSettings_add-btn">
                <button className="add-btn" onClick={addFaq}>
                  + Add New
                </button>
              </div>
              {/* copy from here to duplicate entire row for FAQs item fields */}

              {faqsState &&
                faqsState.map((faq) => {
                  return (
                    <div
                      className="cmSettings-left__details-item"
                      key={faq._id}
                    >
                      <div className="cmSettings-left__details-item-wrapper">
                        <p className="details-item__title">FAQs Item/s</p>
                      </div>
                      <div className="cmSettings-left__input-item-wrapper">
                        <TextField
                          variant="outlined"
                          label="Question"
                          sx={{ width: "280px" }}
                          id={faq._id}
                          name="question"
                          onChange={faqChange}
                          value={faq.question}
                        />
                        <TextField
                          variant="outlined"
                          label="Answer"
                          sx={{ width: "280px" }}
                          id={faq._id}
                          name="answer"
                          onChange={faqChange}
                          value={faq.answer}
                        />
                        <button
                          className="remove-btn"
                          value={faq._id}
                          onClick={removeFaq}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              {/* copy to here to duplicate entire row for FAQs item fields */}
              <div className="cmSettings-left__details-item last-child">
                <div className="cmSettings-left__details-item-wrapper">
                  <p className="details-item__title">Sync Changes</p>
                </div>
                <div className="cmSettings-left__input-item-wrapper logo">
                  {loadingCms ? (
                    <CircularProgress color="secondary" />
                  ) : (
                    <button className="cms-btn" onClick={updateCms}>
                      Update
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* REACT-TOASTIFY CONTAINER */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnFocusLoss
        closeOnClick
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default CMSetting;
