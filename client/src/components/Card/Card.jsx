import React, { useState } from "react";
import "./Card.css";
import { motion, AnimateSharedLayout } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";

// Parent Card Component
const Card = (props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <AnimateSharedLayout>
      {expanded ? (
        <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
      ) : (
        <CompactCard param={props} setExpanded={() => setExpanded(true)} />
      )}
    </AnimateSharedLayout>
  );
};

// Compact Card Component
function CompactCard({ param, setExpanded }) {
  const Png = param.png;
  return (
    <motion.div
      className="CompactCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
      onClick={setExpanded}
    >
      <div className="radialBar">
        <div className="title">
          <span>{param.title}</span>
        </div>
      </div>
      <div className="detail">
        <Png />
        <span>{param.value}</span>
      </div>
    </motion.div>
  );
}

// Expanded Card Component
function ExpandedCard({ param, setExpanded }) {
  const data = {
    options: {
      chart: {
        type: param.type === "Total Votes" ? "line" : "bar",
        height: "auto",
      },
      fill: {
        colors: ["#0d4077"],
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: param.positions,
        title: {
          text: 'Position',
        },
      },
      yaxis: {
        title: {
          text: param.type,
        },
      },
    },
    series: [
      {
        name: param.type,
        data: param.values,
      },
    ],
  };

  return (
    <motion.div
      className="ExpandedCard"
      style={{
        background: param.color.backGround,
      }}
      layoutId="expandableCard"
    >
      <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
        <UilTimes onClick={setExpanded} />
      </div>
      <span style={{ color: '#333333' }}>{param.title}</span>
      <div className="chartContainer">
        <Chart options={data.options} series={data.series} type={param.type === "Total Votes" ? "line" : "bar"} />
      </div>
      <span></span>
    </motion.div>
  );
}

export default Card;
