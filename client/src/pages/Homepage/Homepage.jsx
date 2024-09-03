import React, {useState, useEffect} from 'react'
import {Navigation} from "../../components/Homepage/navigation";
import {Header} from "../../components/Homepage/header";
import {Features} from "../../components/Homepage/features";
import  {About} from "../../components/Homepage/about";
// import {Services} from "../../components/Homepage/services";
// import { Gallery } from "./components/gallery";
import Pricing from "../../components/Homepage/pricing.jsx";
// import  {Testimonials} from "../../components/Homepage/testimonials";
import  {Team} from "../../components/Homepage/Team";
import {Contact} from "../../components/Homepage/contact";
// import ContactPage from '../../components/Homepage/ContactPage';

import JsonData from "../../Data/data.json";

const Homepage = () => {

    const [landingPageData, setLandingPageData] = useState({});
    useEffect(() => {
      setLandingPageData(JsonData);
    }, []);

  return (
    <div>
       <Navigation />
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      <Pricing data={landingPageData.Pricing} />
      {/* <Gallery data={landingPageData.Gallery} /> */}
      {/* <Testimonials data={landingPageData.Testimonials} /> */}
      <Team data={landingPageData.Team} />
      <Contact data={landingPageData.Contact} />
      {/* <ContactPage/> */}
    </div>
  )
}

export default Homepage