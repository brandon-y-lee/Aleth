import PageOne from "components/Certificate/PageOne";
import PageTwo from "components/Certificate/PageTwo";
import PageThree from "components/Certificate/PageThree";
import PageFour from "components/Certificate/PageFour";
import "./Certificate.css";
import React, { useState } from "react";
import MultiStepProgressBar from "components/MultiStepProgressBar/MultiStepProgressBar";

function Certificate() {
  const [page, setPage] = useState("pageone");

  const nextPage = (page) => {
    setPage(page);
  };

  const nextPageNumber = (pageNumber) => {
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
        setPage("1");
    }
  };

  return (
    <div className="App">
      <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
      {
        {
          pageone: <PageOne onButtonClick={nextPage} />,
          pagetwo: <PageTwo onButtonClick={nextPage} />,
          pagethree: <PageThree onButtonClick={nextPage} />,
          pagefour: <PageFour />,
        }[page]
      }
    </div>
  );
}

export default Certificate;