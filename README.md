# 🏡 Luxe Haven (TheAIR)

A full-stack, responsive web application inspired by Airbnb. Luxe Haven offers dynamic listings, seamless user authentication, categorized search filters, review integrations, and cloud-based image storage.

---

## 🌟 Key Features

- **🏠 Listings Management**: Full CRUD operations (Create, Read, Update, Delete) for property listings.
- **🏷️ Categorized Filters**: Fast and responsive filtering of listings across multiple categories (Rooms, Iconic Cities, Mountains, Yachts, Private Planes, Beaches, Pools, Camping, Houses, Winter, Farm Houses).
- **💬 Review & Rating System**: Add ratings (1-5 stars) and comments on listings to share user feedback.
- **🔐 User Authentication**: Complete sign-up, login, and logout flow using `passport-local` and session-based authentication.
- **☁️ Cloud Image Storage**: Image uploads are handled via `multer` and securely stored on Cloudinary.
- **🎨 Modern Responsive UI**: Engineered with Bootstrap 5, custom styles, custom star ratings, and Google Fonts (`Montserrat`, `Plus Jakarta Sans`).

---

## 🛠️ Tech Stack

### Frontend
- **HTML5 & CSS3** (custom responsive styles)
- **EJS (Embedded JavaScript)** templates (using `ejs-mate` layout engine)
- **Bootstrap 5** (UI framework)
- **FontAwesome 6** (icon packs)

### Backend
- **Node.js** & **Express.js** (backend runtime & server framework)
- **MongoDB** & **Mongoose** (database & ODM)
- **Passport.js** (authentication middleware)
- **Multer** & **Cloudinary** (file uploads)
- **Express-Session** & **Connect-Mongo** (persistent session management)

---

## 📁 Project Structure

```
├── backend/
│   ├── class/               # Helper classes
│   ├── controllers/         # MVC controllers (listings, reviews, users)
│   ├── init/                # Database seeding files (index.js, data.js)
│   ├── Models/              # Mongoose schemas (listing.js, review.js, user.js)
│   ├── Route/               # Express routing (listing.js, review.js, user.js)
│   ├── utils/               # Error handling wrappers (wrapAsync.js, ExpressError.js)
│   ├── app.js               # Main Express server entry point
│   ├── cloudConfig.js       # Cloudinary integration config
│   ├── middleware.js        # Auth and validation middlewares
│   └── package.json         # Backend node dependencies
│
├── frontend/
│   ├── Public/              # Client-side assets (CSS, Scripts, images)
│   │   ├── Css/             # Style sheets (Style.css, rating.css)
│   │   └── js/              # Client side scripts
│   └── views/               # EJS template pages
│       ├── Layouts/         # ejs-mate boilerplate layout
│       ├── includes/        # Partial EJS views (navbar, footer, flash alerts)
│       ├── listings/        # Listing CRUD templates (index, show, new, edit)
│       └── users/           # Login & Signup templates
│
└── package.json             # Root monorepo scripts helper
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or a MongoDB Atlas cloud URI)

### 1. Clone the Repository
```bash
git clone https://github.com/ziuskumar/Luxe_Haven.git
cd Luxe_Haven
```

### 2. Configure Environment Variables
Create a `.env` file in the `backend/` directory and populate it with the following configuration:

```env
# MongoDB Database URLs
MONGO_URL=mongodb://127.0.0.1:27017/THEAIR
ATLAS_URI=your_mongodb_atlas_connection_string

# Session Secret Key
SECRET=your_session_secret_here

# Cloudinary Credentials (for image uploads)
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Map Services (if applicable)
MAP_TOKEN=your_map_access_token
```

### 3. Install Dependencies
Run the installation command in the root folder:
```bash
# Install backend dependencies
cd backend && npm install

# Go back to root
cd ..
```

### 4. Seed the Database
To populate the database with default listing data and set up categories, run:
```bash
cd backend
node init/index.js
```
*(Ensure MongoDB is running before seeding)*

### 5. Launch the Server
You can run the application directly from the root using scripts or inside the `backend` folder:

From root directory:
```bash
# To run the development server
npm run dev
```

From backend directory:
```bash
cd backend
npm run dev
```
By default, the server runs on http://localhost:3000.

---

## 🔒 Security & Validations
- Server-side validations are enforced using **Joi** schemas (`schema.js`).
- Forms feature client-side Bootstrap custom validations.
- Express-Session cookies are configured with security controls (`httpOnly`).

---

## 📜 License
This project is created for educational/demo purposes. Feel free to use it as reference.

---
Created with ❤️ by [ziuskumar](https://github.com/ziuskumar).