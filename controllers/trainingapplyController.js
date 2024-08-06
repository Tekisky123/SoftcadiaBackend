import { addnewtrainingapplyservice, trainingapplylistservice } from "../services/trainingapplyService.js";
import AWS from 'aws-sdk';

import dotenv from 'dotenv'
dotenv.config();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SEC_KEY,
    region: process.env.AWS_REGION
});

const uploadfile = async (file) => {
    console.log("File received:", file);

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `resumes/${Date.now()}_${file.originalname}`, // Replace spaces in file name
        Body: file.buffer,
    };
    console.log("Upload params:", params);

    try {
        const data = await s3.upload(params).promise();
        console.log("Upload success:", data);
        return data;
    } catch (error) {
        console.error("Error uploading file:", error.message);
        throw new Error(`Error uploading file: ${error.message}`);
    }
};


export const addnewtrainingapply = async (req, res) => {
    try {
      console.log(req.body.applicantdetail, "sana k liye");
     // const trainingdetail = JSON.parse(req.body.trainingdetail || "{}"); // Fix the field name to match what you're sending from the frontend
  
      console.log("=====>", req.body);
      const {
        fname,
        lname,
        email,
        mobile,
        _id
      } = req.body;
      const applicantDetails = {fname,lname,email,mobile};
  
      const savedTrainingApply = await addnewtrainingapplyservice(_id,applicantDetails);
  
      if (savedTrainingApply === "success") {
        res.status(200).send("Successfully applied");
      } else {
        res.status(400).send("Failed to apply");
      }
    } catch (error) {
      console.error(error, "Error at addnewtrainingapply controller");
      res.status(500).json({ message:error.message });
    }
  }; // admin
// admin
export const trainingapplylist = async(req , res) => {
    try {
        let trainingapply = await trainingapplylistservice(req.body.applicantdetail , req.body.jobdetail)
        res.send(trainingapply)
    } catch (error) {
        console.log(error , "error at list-trainingapply  controlller")
    }


}



