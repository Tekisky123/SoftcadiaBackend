import JobModel from '../models/jobModel.js';
import JobApplyModel from '../models/jobapplyModel.js'


export const addnewjobapplyservice = async (_id, applicantDetails) => {
  try {
    const jobDetails =await JobModel.findById(_id);
    const jobApplyInstance = new JobApplyModel({
      jobdetail: jobDetails,
      applicantdetail: applicantDetails,
    });

    const savedJobApply = await jobApplyInstance.save();
    console.log("job seervice",savedJobApply);
    return "success";
  } catch (error) {
    console.error("Error in addNewJobApply service:", error);
    throw new Error("Error adding new job application");
  }
};

export const jobapplylistservice = async() => {

    try {
        
        let applylist = await JobApplyModel.find();
        return applylist
    } catch (error) {
        console.log(error)
    }

}