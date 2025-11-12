import Resume from "../models/Resume.js";

// controller for enhancing a resume's professional summary
// POST: /api/ai/enhance-pro-sum
export const enhanceProSum = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: "Missing required fields", succses: false, error: true });
        }

        const response = await ai.chat.completions.create({
            model: process.env.GEMINI_MODEL,
            messages: [
                {
                    role: "system",
                    content: "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. And only return text no options or anything else."
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        });

        const enhancedProSum = response.choices[0].message.content

        res.status(200).json({ message: "Resume enhanced successfully", succses: true, error: false, enhancedProSum });
    } catch (error) {
        res.status(500).json({ message: "Error enhancing resume", error, succses: false, error: true });
    }
}

// controller for enhancing a resume's job description
// POST: /api/ai/enhance-job-desc
export const enhanceJobDesc = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: "Missing required fields", succses: false, error: true });
        }

        const response = await ai.chat.completions.create({
            model: process.env.GEMINI_MODEL,
            messages: [
                {
                    role: "system",
                    content: "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be 1-2 sentences also highlighting key responsibilities and achievements. Make it compelling and ATS-friendly. And only return text no options or anything else."
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        });

        const enhancedJobDesc = response.choices[0].message.content

        res.status(200).json({ message: "Resume enhanced successfully", succses: true, error: false, enhancedJobDesc });
    } catch (error) {
        res.status(500).json({ message: "Error enhancing resume", error, succses: false, error: true });
    }
}

// controller for enhancing a resume's project description
// POST: /api/ai/enhance-prod-desc
export const enhanceProdDesc = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: "Missing required fields", succses: false, error: true });
        }

        const response = await ai.chat.completions.create({
            model: process.env.GEMINI_MODEL,
            messages: [
                {
                    role: "system",
                    content: "You are an expert in resume writing. Your task is to enhance the project description of a resume. The project description should be 1-2 sentences also highlighting key responsibilities and achievements, and any relevant technologies used. Make it compelling and ATS-friendly. And only return text no options or anything else."
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        });

        const enhancedProdDesc = response.choices[0].message.content

        res.status(200).json({ message: "Resume enhanced successfully", succses: true, error: false, enhancedProdDesc });
    } catch (error) {
        res.status(500).json({ message: "Error enhancing resume", error, succses: false, error: true });
    }
}

// uploading a resume to the database
// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
    try {
        const userId = req.userId
        const { resumeText, title } = req.body;

        if (!resumeText) {
            return res.status(400).json({ message: "Missing required fields", succses: false, error: true });
        }

        const systemPrompt = "You are an expert AI Agent to extract data from resume."
        const userPrompt = `extract data from this resume: ${resumeText}.
        Provide data in the following JSON format with no additional text before and after:
        {
            professional_summary: { type: String, default: "" },
            skills: [{ type: String }],
            personal_info: {
                image: { type: String },
                full_name: { type: String },
                profession: { type: String },
                email: { type: String },
                phone: { type: String },
                location: { type: String },
                linkedin: { type: String },
                website: { type: String }
            },
            experience: [{
                company: { type: String },
                position: { type: String },
                start_date: { type: String },
                end_date: { type: String },
                description: { type: String },
                is_current: { type: Boolean }
            }],
            project: [{
                name: { type: String },
                type: { type: String },
                description: { type: String }
            }],
            education: [{
                institution: { type: String },
                degree: { type: String },
                field: { type: String },
                graduation_date: { type: String },
                gpa: { type: String }
            }]
        }`

        const response = await ai.chat.completions.create({
            model: process.env.GEMINI_MODEL,
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: userPrompt,
                },
            ],
            response_format: { type: "json_object" },
        });

        const extractedData = response.choices[0].message.content
        const passedData = JSON.parse(extractedData)

        const resume = await Resume.create({ userId: userId, title: title, ...passedData });

        res.status(200).json({ message: "Resume enhanced successfully", succses: true, error: false, resumeId: resume._id });
    } catch (error) {
        res.status(500).json({ message: "Error uploading resume", error, succses: false, error: true });
    }
}