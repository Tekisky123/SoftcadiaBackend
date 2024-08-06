import TrainingModel from '../models/trainingModel.js';
import TrainingApplyModel from '../models/trainingapplyModel.js'


export const addnewtrainingapplyservice = async(_id,applicantdetail ) => {
    // console.log(trainingdetail, "training")
    console.log(applicantdetail , "apply")
 try{
        const trainingDetails =await TrainingModel.findById(_id);
        console.log(trainingDetails, 'status');
    const trainingApplyInstance = await new TrainingApplyModel({
        trainingdetail: trainingDetails,
        applicantdetail: applicantdetail,
      });
      console.log("service training apply")
      const savedTrainingApply = await trainingApplyInstance.save();
    //   console.log("job seervice",savedTrainingApply);
      return "success";
 }
 catch (error) {
    console.log(error);
    throw new Error("Error in addnewtrainingapplyservice");
}

}


export const trainingapplylistservice = async() => {
    try {

        let applylist =await TrainingApplyModel.find();

        return applylist
    
    } catch (error) {
        console.log(error)
    }

}