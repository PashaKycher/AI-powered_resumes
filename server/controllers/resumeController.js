import imageKit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import User from "../models/User.js";
import fs from "fs";

// create a new Resume
// POST: /api/resumes/create
export const createResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { title } = req.body

        const newResume = new Resume({ userId: userId, title: title });
        await newResume.save();

        res.status(200).json({ message: "Resume created successfully", resume: newResume, succses: true, error: false });
    } catch (error) {
        res.status(500).json({ message: "Error creating resume", error, succses: false, error: true });
    }
};

// delete a Resume
// DELETE: /api/resumes/delete
export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId
        const { resumeId } = req.params;

        await Resume.findOneAndDelete({ userId: userId, _id: resumeId })

        res.status(200).json({ message: "Resume deleted successfully", succses: true, error: false });
    } catch (error) {
        res.status(500).json({ message: "Error deleting resume", error, succses: false, error: true });
    }
};

// get resume by id
// GET: /api/resumes/get
export const getResumeById = async (req, res) => {
    try {
        const userId = req.userId
        const { resumeId } = req.params;

        const resume = await Resume.findOne({ userId: userId, _id: resumeId });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found", succses: false, error: true });
        }

        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;

        res.status(200).json({ message: "Resume found successfully", succses: true, error: false, resume });
    } catch (error) {
        res.status(500).json({ message: "Error getting resume", error, succses: false, error: true });
    }
};

// get resume by id public
// GET: /api/resumes/public
export const getResumeByIdPublic = async (req, res) => {
    try {
        const { resumeId } = req.params;

        const resume = await Resume.findOne({ _id: resumeId });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found", succses: false, error: true });
        }

        if (!resume.public) {
            return res.status(404).json({ message: "Resume not found", succses: false, error: true });
        }

        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;

        res.status(200).json({ message: "Resume found successfully", succses: true, error: false, resume });
    } catch (error) {
        res.status(500).json({ message: "Error getting resume", error, succses: false, error: true });
    }
}

// update a Resume
// PUT: /api/resumes/update
export const updateResume = async (req, res) => {
    try {
        const userId = req.userId
        const { resumeId, resumeData, removeBackground } = req.body;
        const image = req.file;

        let resumeDataCopy;
        if (typeof resumeData === 'string') {
            resumeDataCopy = JSON.parse(resumeData);
        } else {
            resumeDataCopy = structuredClone(resumeData);
        }

        if (image) {
            const imageBufferData = fs.createReadStream(image.path);

            const response = await imageKit.files.upload({
                file: imageBufferData,
                fileName: 'resume.png',
                folder: 'Resume-Builder/avatars',
                transformation: {
                    pre: 'w-400,h-400,fo-face,z-0.75'+(removeBackground ? ',e-bgremove' : '')
                }
            });
            resumeDataCopy.personal_info.image = response.url;
        }

        const resume = await Resume.findByIdAndUpdate({ userId: userId, _id: resumeId }, resumeDataCopy, { new: true });

        res.status(200).json({ message: "Resume updated successfully", succses: true, error: false, resume });
    } catch (error) {
        res.status(500).json({ message: "Error updating resume", error, succses: false, error: true });
    }
};