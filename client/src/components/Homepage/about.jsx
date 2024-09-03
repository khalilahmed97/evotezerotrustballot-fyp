import React from "react";


export const About = (props) => {
  return (
    <div id="about">
      <div className="container">
        {/* <div className="row"> */}
          {/* <div className="col-xs-12 col-md-6"> */}
          <div className="img">
            <img src="img/about.jpg" className="img-responsive" alt="" />{" "}
          </div>
            <div className="about-text">
              <h2>About Us</h2>
              <p>{props.data ? props.data.paragraph : "loading..."}</p>
              <h3>Why Choose Us?</h3>
              {/* <div className="list-style"> */}
                <div className="abouth2">
                  <ul>
                    {props.data
                      ? props.data.Why.map((d, i) => (
                        <>
                        <li key={`${d}-${i}`}>{d}</li>
                        </>
                        
                        ))
                      : "loading"}
                  </ul>
                </div>
                {/* <div className="abouth2">
                  <ul>
                    {props.data
                      ? props.data.Why2.map((d, i) => (
                          <li key={`${d}-${i}`}> {d}</li>
                        ))
                      : "loading"}
                  </ul>
                  </div> */}
                </div>
              </div>
            </div>
            // </div>
        // </div>
      // </div>
  );
};
