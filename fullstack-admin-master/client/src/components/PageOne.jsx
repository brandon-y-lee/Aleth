import { React, useState } from "react";

const PageOne = ({ onButtonClick }) => {
    const [recipient, setRecipient] = useState("");

    const handleInputChange = (event) => {
        setRecipient(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (recipient.trim() === "") {
        alert("Please enter a valid company name or ID.");
        return;
        }
        onButtonClick("pagetwo");
    };

    return (
        <main
            className="pt5 black-80 center"
            style={{ maxWidth: "40%", maxHeight: "30%", margin: "auto" }}
        >
            <form className="measure" onSubmit={handleSubmit}>
                <p style={{ color: "#C0C0C0" }}>
                    Step 1 of 4
                </p>
                <h2>Let's start by finding the recipient of your Certificate</h2>
                <p style={{ color: "#C0C0C0" }}>
                    You can either start typing the name of their company, 
                    or simply and past their company ID into the search field below.
                </p>
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <div className="mt3">
                        <label
                            className="db lh-copy f6 mb1"
                            htmlFor="full-name"
                            style={{ textAlign: "left" }}
                        >
                            Select Your Recipient
                        </label>
                        <input
                            className="f6 br2 ph3 pv2 mb2 dib black w-100"
                            type="text"
                            name="full-name"
                            id="full-name"
                            size="30"
                            placeholder="Contact Name or ID"
                            style={{
                                borderStyle: "solid",
                                borderWidth: "1px",
                                borderColor: "#EAEEF5",
                            }}
                            value={recipient}
                            onChange={handleInputChange}
                        />
                    </div>
                </fieldset>
                <div>
                    <input
                        className="f6 grow br2 ph3 pv2 mb2 dib white"
                        style={{
                            borderStyle: "none",
                            width: "100%",
                            backgroundColor: "#664DE5",
                        }}
                        type="submit"
                        value="Proceed"
                    />
                </div>
            </form>
        </main>
    );
};

export default PageOne;
