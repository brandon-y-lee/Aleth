import React, { useState } from "react";
import PageOne from "components/Certificate/PageOne";
import PageTwo from "components/Certificate/PageTwo";
import PageThree from "components/Certificate/PageThree";
import PageFour from "components/Certificate/PageFour";
import MultiStepProgressBar from "components/MultiStepProgressBar/MultiStepProgressBar";
import "./Certificate.css";

function Certificate() {
  const [page, setPage] = useState("pageone");
  const [recipient, setRecipient] = useState("");
  const [material, setMaterial] = useState("");
  const [files, setFiles] = useState([]);

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
          pageone: <PageOne onButtonClick={nextPage} setRecipient={setRecipient} />,
          pagetwo: <PageTwo onButtonClick={nextPage} setMaterial={setMaterial} />,
          pagethree: <PageThree onButtonClick={nextPage} setFiles={setFiles} />,
          pagefour: <PageFour recipient={recipient} material={material} files={files} />,
        }[page]
      }
    </div>
  );
}

export default Certificate;