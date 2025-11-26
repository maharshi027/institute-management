
import { uploadToCloudinary , deleteFromCloudinary} from "../utils/cloudinary.js";
import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { Student } from "../models/student.model.js";
import { upload } from "../middleware/multer.middleware.js";
const router = Router();

// ------------------------- add new student -----------------

router.post("/add-student", verifyJWT, upload.single("avatar"), async (req, res) => {
    const { studentName, phone, dob, address, studentId } = req.body;
    const avatar = req.file?.path;
    // const { studentId } = req.params;
    if (!avatar) {
      return res.status(400).json({ msg: "avatar is required" });
    }

    try {
      const uploaded = await uploadToCloudinary(avatar);

      const newStudent = new Student({
        studentName,
        phone,
        dob,
        address,
        studentId,
        avatarUrl: uploaded.url,
        avatarId: uploaded.imageId,
        userId: req.user.userId
      });

      const studentSaved = await newStudent.save();

      return res.status(201).json({
        msg: "new student added successfully",
        student : studentSaved,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Server error",
        error: error.message,
      });
    }
  }
);

// ------------------------ Get all the students ----------------------------------

router.get("/all-students", verifyJWT, async (req, res) => {
  const userId = req.user.userId;

  try {
    const getAllStudents = await Student.find({userId})
    .select("_id userId studentName phone dob address studentId avatarUrl avatarId")
    
    return res.status(200).json({
        students: getAllStudents
      });
  } catch (err) {
    res.status(500).json({
      error: err
    })
  }

});

// ----------------------- get the student who are in this student ----------------------------

router.get("/all-students/:studentId", verifyJWT, async (req, res) => {
  const userId = req.user.userId;
  
  try {
    const allstudentsOnstudent = await Student.find({ userId, studentId: req.params.studentId })
    .select("_id userId studentName phone dob address studentId avatarUrl avatarId")
    
    return res.status(200).json({
        students: allstudentsOnstudent
      });
  } catch (err) {
    res.status(500).json({
      error: err
    })
  }

});

// ++++++++++++++++++++++++++++++++++++ delete student +++++++++++++++++++++++++++++++++++++

router.delete("/:id", verifyJWT, async (req, res) => {
  const userId = req.user.userId;
  const stdId = req.params.id

  try {
    const std = await Student.findOne({ _id: stdId, userId });

    if (!std) {
      return res.status(404).json({ msg: "Student not found" });
    }

    // delete image from cloudinary
    if (std.imageId) {
       await deleteFromCloudinary(std.imageId);
    }

    await Student.findByIdAndDelete(stdId);

    return res.status(200).json({
      msg: "Student deleted successfully",
    });

  } catch (err) {
    return res.status(500).json({
      msg: "Server error",
      error: err.message,
    });
  }
});

// =============================== Update the student details ================================

router.put("/:id",verifyJWT, upload.single("avatar"), async (req, res) => {
    const userId = req.user.userId;

    try {
      const student = await Student.findById(req.params.id);

      if (!student) {
        return res.status(404).json({ error: "student not found" });
      }

      if (student.userId.toString() !== userId) {
        return res
          .status(403)
          .json({ error: "You are not allowed to update this details of the student" });
      }

      // ---------- Image update -------------
      let avatarUrl = student.avatarUrl;
      let avatarId = student.avatarId;

      if (req.file) {

        // console.log("New image updating...");

        if (student.avatarId) {
          await deleteFromCloudinary(student.avatarId);
        }

        const uploaded = await uploadToCloudinary(req.file.path);
        avatarUrl = uploaded.url;
        avatarId = uploaded.imageId;
      }

      // ---------- Update the details of the studentj -------------

      const updatedData = {
        studentName : req.body.studentName || student.studentName,
        phone : req.body.phone || student.phone,
        dob : req.body.dob || student.dob,
        address : req.body.address,
        batchId : req.body.batchId,
        avatarUrl : avatarUrl,
        avatarId : avatarId
      }

      const updatedstudent = await Student.findByIdAndUpdate(req.params.id, updatedData,
       {
         new : true
       }
      )

      return res.status(200).json({
        msg: "student details updated successfully",
        student: updatedstudent,
      });
    } catch (err) {
      return res.status(500).json({
        msg: "Server error",
        error: err.message,
      });
    }
  }
);

// *************************** Latest 5 studdent ************************************

router.get('/latest-student', verifyJWT, async(req, res) => {
  const userId = req.user.userId;

  try {
    const student = await Student.find({userId})
    const result = student.sort({$natural: -1}).limit(5)
  
    res.status(200).json( {students : result })
  } catch (err) {
    res.status(500).json({
      error : err
    })
  }

})

export default router;
