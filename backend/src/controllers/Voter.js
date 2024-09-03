const bcrypt = require("bcryptjs");
const connectionDB = require("../config/dbConfig.js"); // Assume this is your MySQL connection configuration
const jwt = require("jsonwebtoken");
const canvas = require('canvas');
const faceapi = require("@vladmandic/face-api");
const { Canvas, Image, ImageData } = canvas;
const fs = require('fs');
const { interactWithSolanaProgram } = require("../../utils/solanaProgram.js");

faceapi.env.monkeyPatch({ Canvas, Image, ImageData });
const MODEL_URL = 'src/models'; // Provide the path to your models

// Load face-api.js models
const loadModels = async () => {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL);
  console.log("Models Loaded Successfully");
};

// Ensure models are loaded before any request
loadModels().catch(console.error);

const setRegisterUser = async (req, res) => {
  const { name, cnic, email, password, phone, gender, membershipNumber, organization, image } = req.body;

  if (!name || !cnic || !email || !password || !phone || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const imageName = `${cnic}.jpg`;
  const imagePath = `uploads/voters/${imageName}`;
  const imageBuffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');

  try {
    // Ensure the directory exists
    fs.writeFileSync(imagePath, imageBuffer);
    console.log('Image saved:', imageName);

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);

    const searchStatement = `SELECT * FROM voters WHERE cnic = ? OR email = ?`;
    const insertStatement = `INSERT INTO voters (name, cnic, email, password, phoneNumber, gender, membershipNumber, organization) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    connectionDB.query(searchStatement, [cnic, email], (err, results) => {
      if (err) {
        console.error("Error in search query:", err);
        return res.status(500).json({ message: "Error Occurred! " + err });
      }
      if (results.length > 0) {
        return res.status(400).json({ message: "User Already Registered!" });
      }

      connectionDB.query(insertStatement, [name, cnic, email, hashedPassword, phone, gender, membershipNumber, organization], (err) => {
        if (err) {
          console.error("Error in insert query:", err);
          return res.status(500).json({ message: "Error Occurred! " + err });
        }
        return res.status(200).json({ message: "User Registered Successfully!" });
      });
    });
  } catch (err) {
    console.error("Error in setRegisterUser:", err);
    return res.status(500).json({ message: "Error Occurred! " + err });
  }
};

const getFaceDescriptor = async (imagePath) => {
  try {
    const img = await canvas.loadImage(imagePath);
    const detection = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();

    if (!detection) {
      throw new Error('No face detected in the image.');
    }

    return detection.descriptor;
  } catch (err) {
    console.error('Error in getFaceDescriptor:', err);
    throw err;
  }
};

const compareFaceDescriptors = async (imagePath, imgBuffer) => {
  try {
    const descriptor1 = await getFaceDescriptor(imagePath);

    const img = await canvas.loadImage(imgBuffer);
    const detection2 = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();

    if (!detection2) {
      return { success: false, message: 'No face detected in the provided image.' };
    }

    const descriptor2 = detection2.descriptor;
    const labeledDescriptor1 = new faceapi.LabeledFaceDescriptors('image1', [descriptor1]);

    const faceMatcher = new faceapi.FaceMatcher([labeledDescriptor1], 0.6);
    const bestMatch = faceMatcher.findBestMatch(descriptor2);

    return { success: true, label: bestMatch.label };

  } catch (err) {
    return { success: false, message: 'Error occurred during face comparison.' };
  }
};

const setUserLogin = async (req, res) => {
  const { cnic, password, image } = req.body;

  if (!cnic || !password || !image) {
    return res.status(400).json({ message: "CNIC, Password, and Image are required" });
  }

  if (cnic === "4210137949601" && password === "12345678") {

    const registeredImagePath = `uploads/admin/${cnic}.jpg`;
    const imageBuffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    const faceAuth = await compareFaceDescriptors(registeredImagePath, imageBuffer);

    if (faceAuth.success === false) {
      return res.status(200).json({ message: faceAuth.message });
    }
    console.log(faceAuth.label)
    const user = { cnic };
    const accessToken = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "15m" });
    const refreshToken = jwt.sign(user, process.env.REFRESH_KEY);
    return res.status(200).json({ message: "Login Successfull!", role: "admin", user: { name: "Khalil Ahmed Sharif", cnic: cnic }, profilePic: image, accessToken, refreshToken, faceAuthenticate: true });

  } else {
    try {
      const searchStatement = `SELECT * FROM voters WHERE cnic = ?`;
      connectionDB.query(searchStatement, [cnic], async (err, results) => {
        if (err) {
          console.error("Error in search query:", err);
          return res.status(500).json({ message: "Error Occurred! " + err });
        }
        if (results.length === 0) {
          return res.status(404).json({ message: "User with provided CNIC does not exist!" });
        }

        const passwordMatch = await bcrypt.compare(password, results[0].password);

        if (!passwordMatch) {
          return res.status(401).json({ message: "Incorrect Password!" });
        } else {
          const registeredImagePath = `uploads/voters/${cnic}.jpg`;
          const imageBuffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
          const faceAuth = await compareFaceDescriptors(registeredImagePath, imageBuffer);

          if (faceAuth.label === 'unknown') {
            return res.status(401).json({ message: "Face Authentication Failed" });
          } else {
            console.log(faceAuth.label)
            const user = { cnic };
            const accessToken = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "15m" });
            const refreshToken = jwt.sign(user, process.env.REFRESH_KEY);
            return res.status(200).json({ message: "Login Successfull!", role: "voter", user: results[0], profilePic: image, accessToken, refreshToken, faceAuthenticate: true });
          }
        }
      });
    } catch (err) {
      console.error("Error in setUserLogin:", err);
      return res.status(500).json({ message: "Error Occurred! " + err });
    }
  }
};

const getAllVoters = (req, res) => {
  const searchStatement = `SELECT * FROM voters`;
  try {
    connectionDB.query(searchStatement, (err, results) => {
      if (err) {
        console.error("Error in search query:", err);
        return res.status(500).json({ message: "Error Occurred! " + err });
      }
      return res.status(200).send(results);
    });
  } catch (err) {
    console.error("Error in getAllVoters:", err);
    return res.status(500).json({ message: "Error Occurred! " + err });
  }
};

const voteCast = async (req, res) => {
  const { id } = req.params; // Voter's CNIC
  const { position, candidateCnic } = req.body;

  const searchStatement = `SELECT * FROM voters WHERE cnic = ?`;
  var updateVoterStatement;
  var positionField;
  var choiceField;

  switch (position) {
    case 'President':
      positionField = 'is_president_voted';
      choiceField = 'president_choice';
      break;
    case 'Vice President':
      positionField = 'is_vp_voted';
      choiceField = 'vp_choice';
      break;
    case 'Sr. Vice President':
      positionField = 'is_sr_vp_voted';
      choiceField = 'sr_vp_choice';
      break;
    case 'General Secretary':
      positionField = 'is_gen_sec_voted';
      choiceField = 'gen_sec_choice';
      break;
    default:
      return res.status(400).json({ message: "Invalid Position" });
  }

  updateVoterStatement = `UPDATE voters SET ${positionField} = true, ${choiceField} = ? WHERE cnic = ?`;

  try {
    connectionDB.query(searchStatement, [id], async (err, results) => {
     
      if (err) {
        console.error("Error in search query:", err);
        return res.status(500).json({ message: "Error Occurred! " + err });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "User does not exist" });
      }

      else if (results[0][positionField]==='1' ||results[0][positionField]==='true') {
        return res.status(400).json({ message: "Already Voted!" });
      }

      connectionDB.query(updateVoterStatement, [candidateCnic, id], async (err, response) => {
        if (err) {
          console.error("Error in update query:", err);
          return res.status(500).json({ message: "Error Occurred! " + err });
        }

        // const response = await interactWithSolanaProgram(id, candidateCnic, position);
        if (!response) {
          console.log(response)
          return res.status(500).json({ message: "Error Occurred while interacting with Solana Program!" });
        }
        else if(response){
          console.log(response)

        }
        
        return res.status(200).json({ message: `Voted Successfully for ${position}!` });
      });
    });
  } catch (err) {
    console.error("Error in voteCast:", err);
    return res.status(500).json({ message: "Error Occurred! " + err });
  }
};

const voteCheck = async (req, res) => {
  const id = req.params.id
  console.log(id)
  const searchStatement = "SELECT is_president_voted, is_vp_voted, is_sr_vp_voted, is_gen_sec_voted FROM voters WHERE cnic=?";
  try {
    connectionDB.query(searchStatement, [id], (err, results) => {
      if (err) {
        console.error("Error in search query:", err);
        return res.status(500).json({ message: "Error Occurred! " + err });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "No voter found with the provided CNIC." });
      }
      else {
        console.log(results[0])
        return res.status(200).send(results[0]);
      }

    });
  } catch (err) {
    console.error("Error in getAllVoters:", err);
    return res.status(500).json({ message: "Error Occurred! " + err });
  }
}


module.exports = {
  setRegisterUser,
  setUserLogin,
  getAllVoters,
  voteCast,
  voteCheck
};
