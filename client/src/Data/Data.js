// Sidebar imports
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
} from "@iconscout/react-unicons";
import { useSelector, useDispatch } from "react-redux";
import { getAllAcceptedCandidates } from "../features/candidate/candidateSlice";
// import { getAllVoters } from "../../features/voter/voterSlice";

// Recent Card Imports
import img1 from "../imgs/img1.png";
import img2 from "../imgs/img2.png";
import img3 from "../imgs/img3.png";


// Sidebar Data
export const adminSidebarData = [
  {
    icon: UilEstate,
    heading: "Dashboard",
    path: "/dashboard"
  },
 { 
  icon: UilClipboardAlt,
  heading: "Voters",
  path: "./voters",
},

  {
    icon: UilUsersAlt,
    heading: "Candidates",
    path: "/candidates",
  },
  {
    icon: UilChart,
    heading: 'Analytics',
    path: "/analytics",
  },
  {
    icon: UilChart,
    heading: 'Request',
    path: "/request",
  },
  {
    icon: UilPackage,
    heading: 'Results',
    path: "/result",
  },
];


export const voterSidebarData = [
  {
    icon: UilEstate,
    heading: "Dashboard",
    path: "/dashboard"
  },
 { 
  icon: UilClipboardAlt,
  heading: "Cast Vote",
  path: "./castVote",
},

  // {
  //   icon: UilUsersAlt,
  //   heading: "Candidates",
  //   path: "/showCandidates",
  // },

];

// Import any necessary icons here if they're used

// Analytics Cards Data
export const cardsData = [
  {
    title: "Total Candidates",
    color: {
      backGround: "linear-gradient(135deg, #F9F5FF 0%, #AEC6CF 100%)",
      boxShadow: "0px 10px 20px 0px #F9F5FF",
    },
    barValue: 70,
    value: "1000",
    png: UilUsersAlt,
    series: [
      {
        name: "No. of Candidates",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: "Total Votes",
    color: {
      backGround: "linear-gradient(135deg, #F9F5FF 0%, #AEC6CF 100%)",
      boxShadow: "0px 10px 20px 0px #F9F5FF",
    },
    barValue: 80,
    value: "10000",
    png: UilEstate,
    series: [
      {
        name: "Total Votes",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: "No. of Seats",
    color: {
      backGround: "linear-gradient(135deg, #F9F5FF 0%, #AEC6CF 100%)",
      boxShadow: "0px 10px 20px 0px #F9F5FF",
    },
    barValue: 60,
    value: "20",
    png: UilClipboardAlt,
    series: [
      {
        name: "No. of Seats",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];


// Recent Update Card Data
export const UpdatesData = [
  {
    img: img1,
    name: "Andrew Thomas",
    noti: "has ordered Apple smart watch 2500mh battery.",
    time: "25 seconds ago",
  },
  {
    img: img2,
    name: "James Bond",
    noti: "has received Samsung gadget for charging battery.",
    time: "30 minutes ago",
  },
  {
    img: img3,
    name: "Iron Man",
    noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
    time: "2 hours ago",
  },
];