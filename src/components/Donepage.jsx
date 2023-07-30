import React from "react";
import image1 from "../images/Done.gif";

const Donepage = () => {
  return (
    <>
      <div>
        <div className="done-img">
          <img src={image1} alt="loading..." className="done" />
        </div>
        <div className="info">
            <h3>!</h3>
            <p>You have successfully <br /> completed the examination.</p>
            <p>You scored: 2/50</p>
        </div>
        <div className="dones">
            <button type="submit" className="back-btns">Done</button>
        </div>
      </div>
    </>
  );
};

export default Donepage;
