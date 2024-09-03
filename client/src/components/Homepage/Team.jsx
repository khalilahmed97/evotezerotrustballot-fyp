import React from "react";

export const Team = (props) => {
  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Meet the Team</h2>
        </div>
        <div id="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="team-container">
                  {/* <div className="thumbnail"> */}
                    
                    {/* <img src={d.img} alt="..." className="team-img" /> */}
                    {/* <div className="caption"> */}
                    <img src={d.img} alt="..." className="team-container" />
                      <h4>{d.name}</h4>
                      <p>{d.job}</p> 
                    {/* </div>
                  </div> */}
                </div>
              ))
            : "loading"}
        </div>


      </div>
    </div>
  );
};
