"use client";

import { useState, useContext } from "react";
import SmallSpinner from "./loading/SmallSpinner";
import Checkmark from "./icons/Check";
import { dbCSService } from "@/services/dbCSService";
import { UserAuthContext } from "./UserAuthContext";
import { alertService } from "@/services/alertService";

const AIModal = ({
  tableRows = 0,
  aiModalOpen,
  setAiModalOpen,
  currentDbInteracting,
}) => {
  const [loadingState, setLoadingState] = useState(false);
  const [btnSelection, setBtnSelection] = useState(null);
  const [resultView, setResultView] = useState(false);
  const [aiAnswer, setAiAnswer] = useState(false);
  const [textareaState, setTextareaState] = useState("");
  const [btnErrMsg, setBtnErrMsg] = useState(null);
  const { baseUrl } = useContext(UserAuthContext);

  function modalClose() {
    setAiModalOpen(false);
    setResultView(false);
  }

  async function executeAISummarizingTool() {
    if (btnSelection === null) {
      setBtnErrMsg("Please make a data view selection!");
      return;
    }
    if (tableRows >= 150 && btnSelection === "all") {
      setBtnErrMsg("Too many rows in your table, please select other option.");
      return;
    }
    setBtnErrMsg(null);
    console.log("DATA: ", textareaState, btnSelection, currentDbInteracting, baseUrl);
    setLoadingState(true);
    // setTimeout(async () => {
      await dbCSService
        .getAiResponse(
          baseUrl,
          textareaState,
          btnSelection,
          currentDbInteracting.id
        )
        .then((result) => {
          setLoadingState(false);
          setResultView(true);
          setAiAnswer(result.replace(/\n/g, '<br>'));
          console.log(result)
        })
        .catch((error) => {
          console.log(error);
          setBtnErrMsg("Error in communicating with AI agent. Please try again later.");
          setLoadingState(false);
        });
    // }, 2000);
  }

  return (
    <>
      <div
        className={`modal fade ${aiModalOpen ? "show d-block" : "d-hidden"}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="ModalLabel"
        aria-hidden={aiModalOpen}
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">AI Summarizing Tool</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={modalClose}
                style={{ background: "rgba(0,0,0,0)", border: "none" }}
              >
                <svg
                  width="25px"
                  height="25px"
                  fill="none"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2px"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              {!resultView ? (
                <>
                  <p>
                    This tool is intended to help give you a overlook summary of
                    your data. You simply select from our options how many rows
                    from your table you would like us to review and we will take
                    care of the rest.
                  </p>
                  <p>
                    This tool works in the context of the table you are
                    currently accessing. Please choose an option below:
                  </p>
                  <div className="d-flex w-100 justify-content-around">
                    <button
                      className="btn btn-secondary m-1"
                      onClick={() => {
                        setBtnSelection("all");
                      }}
                      disabled={btnSelection === "all"}
                    >
                      All data in table!
                      {btnSelection === "all" ? <Checkmark /> : ""}
                    </button>
                    <button
                      className="btn btn-secondary m-1"
                      onClick={() => {
                        setBtnSelection("random-25");
                      }}
                      disabled={btnSelection === "random-25"}
                    >
                      First 25 randomly retrieved columns!
                      {btnSelection === "random-25" ? <Checkmark /> : ""}
                    </button>
                  </div>
                  <p>
                    Note if you have hundreds to thousands of rows in your
                    table, this summary tool will respond with an error. It
                    currently works best with tables with fewer then 150 rows.
                  </p>
                  <p>
                    You can also specify any particular requests to go along
                    with your data.
                  </p>
                  <textarea
                    value={textareaState}
                    onChange={(e) => {
                      setTextareaState(e.target.value);
                    }}
                    className="w-100 input-form"
                    style={{ minHeight: "150px" }}
                    placeholder="Example: This table represents my current inventory of products for my business. What items should I reorder soon?"
                  ></textarea>
                  <p className="text-center text-danger">{btnErrMsg}</p>
                </>
              ) : (
                <p dangerouslySetInnerHTML={{__html: aiAnswer}}></p>
              )}
            </div>
            <div className="modal-footer">
              {!resultView ? (
                <>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      executeAISummarizingTool();
                    }}
                  >
                    {loadingState ? <SmallSpinner /> : "Summarize"}
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      modalClose();
                    }}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setResultView(false);
                      setBtnSelection(null);
                      setTextareaState("");
                    }}
                  >
                    Restart
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIModal;
