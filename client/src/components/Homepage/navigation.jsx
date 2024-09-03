import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { Button } from "@mui/material";
export const Navigation = (props) => {
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <div className="row">
            <div className="col-xs-6">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
              >
                <span className="icon-bar" style={{ display: 'inline-block', marginRight: '2px' }}></span>
                <span className="icon-bar" style={{ display: 'inline-block', marginRight: '2px' }}></span>
                <span className="icon-bar" style={{ display: 'inline-block' }}></span>
              </button>
            </div>
            <div className="col-xs-6">
              <a className="navbar-brand page-scroll" href="#page-top">
                EVote Zero Ballot Trust
              </a>
            </div>
          </div>
        </div>
        <div
          className="nav-right"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav-right" style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            <li>
              <a href="#features" className="page-scroll">
                Features
              </a>
            </li>
            <li>
              <a href="#about" className="page-scroll">
                About
              </a>
            </li>
            {/* <li>
              <a href="#services" className="page-scroll">
                Services
              </a>  
            </li>
             */}
             <li>
              <a href="#pricing" className="page-scroll">
                Pricing
              </a>
            </li>
            {/* <li>
              <a href="#testimonials" className="page-scroll">
                Testimonials
              </a>
            </li> */}
            <li>
              <a href="#team" className="page-scroll">
                Team
              </a>
            </li>
            <li>
              <a href="#contact" className="page-scroll">
                Contact
              </a>
            </li>
            <li>
              <Button variant='contained' color="success">
              <Link to="/candidate-registration" className="page-scroll">
                Candidate Registration
              </Link>
              </Button>
              
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
