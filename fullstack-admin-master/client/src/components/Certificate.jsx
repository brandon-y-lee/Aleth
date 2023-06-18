import React, { useState } from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";
import PageThree from "./PageThree";
import PageFour from "./PageFour";
import "./Certificate.css";

const Certificate = () => {
  const [page, setPage] = useState("pageone");

  const onPageNumberClick = (pageNumber) => {
    switch (pageNumber) {
      case "1":
        setPage("pageone");
        break;
      case "2":
        setPage("pagetwo");
        break;
      case "3":
        setPage("pagethree");
        break;
      case "4":
        setPage("pagefour");
        break;
      default:
        setPage("pageone");
    }
  };

  let stepPercentage = 0;
  if (page === "pageone") {
    stepPercentage = 16;
  } else if (page === "pagetwo") {
    stepPercentage = 49.5;
  } else if (page === "pagethree") {
    stepPercentage = 82.5;
  } else if (page === "pagefour") {
    stepPercentage = 100;
  } else {
    stepPercentage = 0;
  }

  return (
    <div>
      <ProgressBar percent={stepPercentage}>
        <Step>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
              onClick={() => onPageNumberClick("1")}
            >
              {index + 1}
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
              onClick={() => onPageNumberClick("2")}
            >
              {index + 1}
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
              onClick={() => onPageNumberClick("3")}
            >
              {index + 1}
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
              onClick={() => onPageNumberClick("4")}
            >
              {index + 1}
            </div>
          )}
        </Step>
      </ProgressBar>
      {page === "pageone" && <PageOne onButtonClick={onPageNumberClick} />}
      {page === "pagetwo" && <PageTwo onButtonClick={onPageNumberClick} />}
      {page === "pagethree" && <PageThree onButtonClick={onPageNumberClick} />}
      {page === "pagefour" && <PageFour />}
    </div>
  );
};

export default Certificate;
