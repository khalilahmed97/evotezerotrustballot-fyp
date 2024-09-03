const connectionDB = require("../config/dbConfig.js");
const fs = require('fs');
const path = require('path');
const util = require('util');

const addCandidate = (req, res) => {
    const {
        cnic,
        name,
        email,
        gender,
        membershipNumber,
        organization,
        position,
        pic,
        cnicPic
    } = req.body;

    if (!name || !cnic || !email || !gender || !membershipNumber || !organization || !position || !pic || !cnicPic) {
        return res.status(200).send("All fields are required");
    }

    const cnicImageName = `${cnic}.jpg`;

    const cnicBackImagePath = path.join('uploads', 'candidates', 'cnic_front', cnicImageName);
    const cnicBackImageBuffer = Buffer.from(cnicPic.front.replace(/^data:image\/\w+;base64,/, ''), 'base64');

    const cnicFrontImagePath = path.join('uploads', 'candidates', 'cnic_back', cnicImageName);
    const cnicFrontImageBuffer = Buffer.from(cnicPic.back.replace(/^data:image\/\w+;base64,/, ''), 'base64');

    const imageName = `${cnic}.jpg`;
    const imagePath = path.join('uploads', 'candidates', 'image', imageName);
    const imageBuffer = Buffer.from(pic.replace(/^data:image\/\w+;base64,/, ''), 'base64');

    const searchStatement = `SELECT * FROM candidates WHERE cnic = ? OR email_address = ?`;
    const insertStatement = `INSERT INTO candidates (name, cnic, email_address, organization, membership_number, gender, position_applied) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    connectionDB.query(searchStatement, [cnic, email], (err, results) => {
        if (err) {
            return res.status(500).send("Error Occurred in Database Connection!");
        }
        if (results.length > 0) {
            return res.status(200).send("Error! Candidate is Already Registered!");
        }

        // Create directories if they do not exist
        fs.mkdir(path.join('uploads', 'candidates', 'image'), { recursive: true }, (err) => {
            if (err) {
                return res.status(500).send("Error creating directory! " + err);
            }

            fs.writeFile(imagePath, imageBuffer, (err) => {
                if (err) {
                    return res.status(500).send('Error saving user image');
                }

                fs.mkdir(path.join('uploads', 'candidates', 'cnic_back'), { recursive: true }, (err) => {
                    if (err) {
                        return res.status(500).send("Error creating directory! " + err);
                    }

                    fs.writeFile(cnicBackImagePath, cnicBackImageBuffer, (err) => {
                        if (err) {
                            return res.status(500).send('Error saving cnic image');
                        }
                    });
                });

                fs.mkdir(path.join('uploads', 'candidates', 'cnic_front'), { recursive: true }, (err) => {
                    if (err) {
                        return res.status(500).send("Error creating directory! " + err);
                    }

                    fs.writeFile(cnicFrontImagePath, cnicFrontImageBuffer, (err) => {
                        if (err) {
                            return res.status(500).send('Error saving cnic image');
                        }

                        // Now insert the candidate into the database
                        connectionDB.query(insertStatement, [name, cnic, email, organization, membershipNumber, gender, position], (err, results) => {
                            if (err) {
                                return res.status(500).send("ERROR OCCURRED in DB! " + err);
                            }
                            return res.status(200).send("Candidate Form Submitted Successfully!");
                        });
                    });
                });
            });
        });
    });
};

const getAllCandidates = (req, res) => {
    const searchStatement = "SELECT * FROM candidates";
    try {
        connectionDB.query(searchStatement, (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Error Occurred! " + err });
            }
            if (results.length > 0) {
                return res.status(200).send(results);
            }
        });
    } catch (err) {
        return res.status(500).json({ message: "ERROR OCCURRED! " + err });
    }
};

const getAllAcceptedCandidates = (req, res) => {
    const searchStatement = "SELECT * FROM accepted_candidates";

    try {
        connectionDB.query(searchStatement, (err, results) => {
            if (err) {
                return res.status(500).json({ message: "ERROR OCCURRED! " + err });
            }

            if (results.length > 0) {
                // Add image path to each candidate
                const candidates = results.map(candidate => {
                    const imagePath = path.join('uploads', 'candidates', 'image', `${candidate.cnic}.jpg`);
                    let imageData = null;

                    try {
                        if (fs.existsSync(imagePath)) {
                            imageData = fs.readFileSync(imagePath, { encoding: 'base64' });
                        }
                    } catch (err) {
                        console.error('Error reading image file:', err);
                    }

                    return {
                        ...candidate,
                        imageData: imageData ? `data:image/jpeg;base64,${imageData}` : null
                    };
                });

                return res.status(200).send(candidates);
            } else {
                return res.status(200).send([]);
            }
        });
    } catch (err) {
        return res.status(500).json({ message: "ERROR OCCURRED! " + err });
    }
};

const getSpecificCandidate = async (req, res) => {
    const id = req.params.id;
    const searchStatement = `SELECT * FROM candidates WHERE cnic = ?`;
    const readFile = util.promisify(fs.readFile);

    try {
        connectionDB.query(searchStatement, [id], async (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).json({ message: "Error Occurred! " + err });
            }
            if (results.length > 0) {
                const candidate = results[0];

                const imagePath = path.join(__dirname, '../../uploads/candidates/image', `${id}.jpg`); // Modify the path as needed
                const cnicFrontImagePath = path.join(__dirname, '../../uploads/candidates/cnic_front', `${id}.jpg`); // Modify the path as needed
                const cnicBackImagePath = path.join(__dirname, '../../uploads/candidates/cnic_back', `${id}.jpg`); // Modify the path as needed

                try {
                    const [imageData, cnicFrontImageData, cnicBackImageData] = await Promise.all([
                        readFile(imagePath),
                        readFile(cnicFrontImagePath),
                        readFile(cnicBackImagePath)
                    ]);

                    candidate.image = imageData.toString('base64');
                    candidate.cnic_front = cnicFrontImageData.toString('base64');
                    candidate.cnic_back = cnicBackImageData.toString('base64');

                    return res.status(200).json(candidate);
                } catch (err) {
                    console.error('Error reading images:', err);
                    return res.status(500).json({ message: "Error Reading Images! " + err });
                }

            } else {
                console.warn('Candidate not found for ID:', id);
                return res.status(404).json({ message: "Candidate Not Found!" });
            }
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        return res.status(500).json({ message: "ERROR OCCURRED! " + err });
    }
};

const disapproveCandidate = async (req, res) => {
    const { id } = req.params;
    const queryStatement = "UPDATE candidates SET status = 'Disapprove' WHERE cnic = ?";
    const deleteStatement = "DELETE FROM accepted_candidates WHERE cnic = ?";

    try {
        connectionDB.query(queryStatement, [id], (err, result) => {
            if (err) {
                return res.status(500).send("Error Occurred! " + err);
            }
            if (result.affectedRows > 0) {

                connectionDB.query(deleteStatement, [id], (err, result) => {
                    if (err) {
                        return res.status(500).send("Error Occurred! " + err);
                    }
                    if (result.affectedRows > 0) {
                        return res.status(200).send("Candidate Disapproved and Deleted From Approved List");
                    } else {
                        return res.status(200).send("Candidate Disapproved");
                    }
                });

            } else {
                return res.status(404).send("Candidate not found");
            }
        });
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

const approveAndAddToAcceptedList = async (req, res) => {
    const { id } = req.params;
    const updateQuery = "UPDATE candidates SET status='Approve' WHERE cnic=?";
    const selectQuery = "SELECT * FROM candidates WHERE cnic = ?";
    const selectQueryForAccepted = "SELECT * FROM accepted_candidates WHERE cnic = ?";
    const insertQuery = "INSERT INTO accepted_candidates (name, cnic, email_address, organization, membership_number, gender, position_applied) VALUES (?, ?, ?, ?, ?, ?, ?)";

    try {
        connectionDB.query(updateQuery, [id], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "ERROR OCCURRED! " + err });
            }

            connectionDB.query(selectQuery, [id], (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "ERROR OCCURRED! " + err });
                }

                if (result.length > 0) {
                    const candidate = result[0];

                    connectionDB.query(selectQueryForAccepted, [id], (err, result) => {
                        if (err) {
                            return res.status(500).json({ message: "ERROR OCCURRED! " + err });
                        }
                        if (result.length > 0) {
                            return res.status(200).json({ message: "Candidate is Already Approved" });
                        }

                        const {
                            name,
                            cnic,
                            email_address,
                            organization,
                            membership_number,
                            gender,
                            position_applied
                        } = candidate;

                        connectionDB.query(insertQuery, [name, cnic, email_address, organization, membership_number, gender, position_applied], (err, result) => {
                            if (err) {
                                return res.status(500).json({ message: "ERROR OCCURRED! " + err });
                            }
                            return res.status(200).json({ message: "Candidate Approved Successfully" });
                        });
                    });

                } else {
                    return res.status(404).json({ message: "Candidate Not Found!" });
                }
            });

        });
    } catch (err) {
        return res.status(500).json({ message: "ERROR OCCURRED! " + err });
    }
};


const getCandidates = async (req, res) => {

    const queryStatement = "SELECT * FROM accepted_candidates WHERE position_applied=?"
    const { id } = req.params;

    try {
        connectionDB.query(queryStatement, [id], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error Occurred! " + err });
            }
            if (result.length > 0) {
                return res.status(200).send(result);
            }
            else if (result.length === 0) {
                return res.status(200).send([]);
            }
            else {
                return res.status(404).send({ message: "Candidate not found" });
            }
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
module.exports = {
    addCandidate,
    getAllCandidates,
    getAllAcceptedCandidates,
    getSpecificCandidate,
    disapproveCandidate,
    getCandidates,
    approveAndAddToAcceptedList
};
