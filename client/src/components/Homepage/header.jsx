import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
export const Header = (props) => {
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="intro-text">
                <h1>
                  {props.data ? props.data.title : "Loading"}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : "Loading"}</p>
                <Link to="/login"> 
                <Button variant="contained" sx={{padding:"15px 20px", borderRadius:"10px", backgroundColor:"#003B6D"}}>
                  Login
                </Button></Link>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};