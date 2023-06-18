import React, { useState } from "react";

const PageTwo = ({ onButtonClick }) => {
  const [material, setMaterial] = useState("");
  const [workspaceURL, setWorkspaceURL] = useState("");

  const handleMaterialChange = (event) => {
    setWorkspaceName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (material.trim() === "") {
      alert("Please enter a valid material.");
      return;
    }
    onButtonClick("pagethree");
  };

  return (
    <main
      className="pt5 black-80 center"
      style={{ maxWidth: "40%", maxHeight: "30%", margin: "auto" }}
    >
      <form className="measure" onSubmit={handleSubmit}>
        <p style={{ color: "#C0C0C0" }}>
          Step 2 of 4
        </p>
        <h2>Let's define your material</h2>
        <p style={{ color: "#C0C0C0" }}>
          Please select material you are working with and how much of it
          you want to sell.
        </p>
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <div className="mt3">
            <label
              className="left db lh-copy f6 mb1"
              htmlFor="material"
              style={{ textAlign: "left" }}
            >
              Material
            </label>
            <input
              className="f6 br2 ph3 pv2 mb2 dib black w-100"
              type="text"
              name="material"
              id="material"
              size="30"
              placeholder="Ex: 100% organic cotton"
              style={{
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "#EAEEF5",
              }}
              value={material}
              onChange={handleMaterialChange}
            />
          </div>
        </fieldset>
        <div>
          <input
            className="f6 grow br2 ph3 pv2 mb2 dib white"
            style={{ borderStyle: "none", width: "100%", backgroundColor: '#664DE5' }}
            type="submit"
            value="Proceed"
          />
        </div>
      </form>
    </main>
  );
}

export default PageTwo;
