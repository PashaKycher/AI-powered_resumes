# AI-Powered Resume Builder

An intelligent, full-stack web application that helps users create, enhance, and manage professional resumes with AI-powered features. Built with React, Express.js, MongoDB, and Google Gemini AI.

## 🌟 Features

### AI-Powered Enhancements
- **Professional Summary Enhancement**: AI-powered content generation to create compelling, ATS-friendly professional summaries
- **Job Description Optimization**: Automatically enhance job descriptions with better wording and highlighted achievements
- **Project Description Improvement**: Refine project descriptions with emphasis on responsibilities, achievements, and technologies
- **Resume Parsing**: Intelligent extraction of resume data from uploaded documents using AI

### Resume Building & Management
- **Multiple Resume Templates**: Choose from various professional templates (Classic, Minimal, Modern, Minimal Image)
- **Customizable Design**: Personalize resumes with accent color picker
- **Responsive Preview**: Real-time preview of resume changes
- **PDF Export**: Generate printable PDF versions of resumes

### User Features
- **User Authentication**: Secure login/registration with JWT tokens
- **Personal Dashboard**: Manage all your resumes in one place
- **Public Resume Sharing**: Make resumes publicly viewable
- **Resume Sections**: Support for:
  - Personal Information
  - Professional Summary
  - Work Experience
  - Education
  - Projects
  - Skills

## 🏗️ Project Architecture

### Tech Stack

**Frontend:**
- React 19 with Hooks
- Vite (fast build tool)
- Redux Toolkit (state management)
- Tailwind CSS 4 (styling)
- Axios (API client)
- React Router DOM (navigation)
- Lucide React (icons)
- React Hot Toast (notifications)

**Backend:**
- Node.js with Express 5
- MongoDB (database)
- Mongoose (ODM)
- Google Gemini API (AI enhancement)
- JWT (authentication)
- Bcrypt (password hashing)
- ImageKit (image management)
- Multer (file uploads)

## 📁 Project Structure

```
AI-powered-resumes/
├── client/                          # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── form/               # Resume form sections
│   │   │   │   ├── PersonalInfoForm.jsx
│   │   │   │   ├── EducationForm.jsx
│   │   │   │   ├── ExperienceForm.jsx
│   │   │   │   ├── ProfessionalSummaryForm.jsx
│   │   │   │   ├── ProjectForm.jsx
│   │   │   │   └── SkillsForm.jsx
│   │   │   ├── templates/          # Resume templates
│   │   │   │   ├── ClassicTemplate.jsx
│   │   │   │   ├── ModernTemplate.jsx
│   │   │   │   ├── MinimalTemplate.jsx
│   │   │   │   └── MinimalImageTemplate.jsx
│   │   │   ├── home/              # Landing page sections
│   │   │   ├── ColorPicker.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ResumePreview.jsx
│   │   │   └── TemplateSelector.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Landing page
│   │   │   ├── Dashboard.jsx      # Resume management
│   │   │   ├── ResumeBuilder.jsx  # Main builder
│   │   │   ├── Preview.jsx        # Resume preview
│   │   │   ├── Login.jsx          # Authentication
│   │   │   └── Layout.jsx         # Main layout
│   │   ├── app/
│   │   │   ├── store.js          # Redux store
│   │   │   └── features/
│   │   │       └── authSlice.js   # Auth state
│   │   ├── configs/
│   │   │   └── api.js            # API configuration
│   │   ├── assets/
│   │   └── App.jsx
│   └── vite.config.js
│
└── server/                          # Express backend
    ├── controllers/
    │   ├── aiController.js         # AI enhancement endpoints
    │   ├── userController.js       # User auth endpoints
    │   └── resumeController.js     # Resume CRUD endpoints
    ├── routes/
    │   ├── aiRoutes.js
    │   ├── userRoutes.js
    │   └── resumeRoutes.js
    ├── models/
    │   ├── User.js
    │   └── Resume.js
    ├── middlewares/
    │   └── authMiddleware.js
    ├── configs/
    │   ├── ai.js                  # Gemini API config
    │   ├── db.js                  # MongoDB connection
    │   ├── imageKit.js            # ImageKit config
    │   └── multer.js              # File upload config
    └── server.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Google Gemini API key
- ImageKit account
- npm or yarn package manager

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/PashaKycher/AI-powered_resumes.git
cd AI-powered-resumes
```

#### 2. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create .env file with the following variables:
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
GEMINI_API_KEY=your_gemini_api_key
GEMINI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/
GEMINI_MODEL=gemini-2.5-flash
PORT=3000

# Start the server
npm start          # Production mode
npm run dev        # Development mode with nodemon
```

#### 3. Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Create .env file (if needed)
VITE_API_URL=http://localhost:3000

# Start the development server
npm run dev        # Development server
npm run build      # Production build
npm run preview    # Preview production build
```

## 📚 API Endpoints

### Authentication (`/api/users`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /data` - Get user profile (requires auth token)

### Resume Management (`/api/resumes`)
- `POST /` - Create new resume
- `GET /` - Get all user resumes
- `GET /:id` - Get specific resume
- `PUT /:id` - Update resume
- `DELETE /:id` - Delete resume
- `GET /public/:id` - Get public resume

### AI Features (`/api/ai`)
- `POST /enhance-pro-sum` - Enhance professional summary
- `POST /enhance-job-desc` - Enhance job description
- `POST /enhance-prod-desc` - Enhance project description
- `POST /upload-resume` - Parse and extract resume data from uploaded file

## 🔑 Environment Variables

### Server (.env)
```
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net
JWT_SECRET=your_secret_key_here
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
GEMINI_API_KEY=your_google_gemini_api_key
GEMINI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/
GEMINI_MODEL=gemini-2.5-flash
PORT=3000
```

### Client (.env, optional)
```
VITE_API_URL=http://localhost:3000
```

## 🎨 Available Resume Templates

1. **Classic Template** - Professional and traditional layout
2. **Modern Template** - Contemporary design with modern styling
3. **Minimal Template** - Clean and minimalist approach
4. **Minimal Image Template** - Minimal design with profile image support

## 💡 How to Use

### Creating a Resume
1. Sign up or log in to your account
2. Click "Create Resume" on your dashboard
3. Select a template
4. Fill in your personal information
5. Add education, experience, projects, and skills
6. Use AI enhancement features to improve descriptions
7. Preview and customize your resume
8. Download as PDF or share publicly

### Enhancing Resume Content
1. Click the AI enhancement button next to any description field
2. The AI will rewrite the content to be more professional and ATS-friendly
3. Review and accept the enhanced version
4. Continue editing as needed

### Uploading Existing Resume
1. Upload a resume file (PDF, DOCX, or text)
2. The AI will automatically extract and populate your information
3. Edit and refine the extracted data
4. Save your resume

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for secure password storage
- **Environment Variables**: Sensitive data stored in .env files
- **CORS Protection**: Configured CORS for secure cross-origin requests
- **Private Resume Support**: Resumes are private by default

## 🚢 Deployment

### Client (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Server
The project includes `vercel.json` for serverless deployment support.

## 📊 Database Schema

### User Model
```javascript
{
  email: String,
  password: String (hashed),
  name: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Resume Model
```javascript
{
  userId: ObjectId (ref: User),
  title: String,
  public: Boolean,
  template: String,
  accent_color: String,
  professional_summary: String,
  skills: [String],
  personal_info: {
    image, full_name, profession, email, 
    phone, location, linkedin, website
  },
  experience: [{
    company, position, start_date, end_date,
    description, is_current
  }],
  project: [{
    name, type, description
  }],
  education: [{
    institution, degree, field, 
    graduation_date, gpa
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## 🛠️ Development Commands

### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run lint       # Run ESLint
npm run preview    # Preview production build
```

### Backend
```bash
npm start          # Start server
npm run dev        # Start with nodemon (auto-reload)
```

## 📝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## 📄 License

This project is open source and available under the ISC License.

## 🤝 Support

For questions or issues, please open an issue on the GitHub repository.

## 👨‍💻 Author

**PashaKycher** - [GitHub Profile](https://github.com/PashaKycher)

---

**Last Updated**: November 2025

Made with ❤️ using React, Express, and AI
