# 🚀 RepoRevive

> **Every repository deserves a second chance.**

<p align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss)
![JWT](https://img.shields.io/badge/JWT-Authentication-black?style=for-the-badge&logo=jsonwebtokens)
![Razorpay](https://img.shields.io/badge/Razorpay-Payment-0C65E9?style=for-the-badge)

</p>

---

## 💡 What is RepoRevive?

**RepoRevive** is an AI-powered marketplace where developers can **buy, sell, collaborate, and revive abandoned software projects** through secure ownership transfers, AI analysis, integrated messaging, and verified digital certificates.

Instead of letting unfinished repositories disappear into GitHub archives, RepoRevive gives them a new beginning.

---

# 📖 Why RepoRevive Exists

Every developer has experienced this.

A side project that started with excitement.

An idea that looked promising.

A repository that slowly grew into thousands of lines of code.

Then...

Life happened.

- 📚 College assignments
- 💼 Placements
- 🚀 New jobs
- 👥 Team members leaving
- 💰 Funding issues
- ⏳ Lack of time
- 😴 Burnout

The commits stopped.

The repository became inactive.

Months of hard work quietly disappeared into GitHub.

Not because the idea failed.

Not because the project had no potential.

But because the developer could no longer continue.

---

Meanwhile...

Somewhere else,

another developer begins building **the exact same product**.

The same authentication system.

The same dashboard.

The same backend.

The same database.

The same APIs.

The same features.

Weeks...

sometimes months...

are spent rebuilding something that already exists.

Thousands of abandoned repositories still contain valuable code, innovative ideas, and real business potential.

Yet there is no platform dedicated to giving those projects a second life.

---

# ✨ That's where RepoRevive comes in.

RepoRevive transforms abandoned repositories into opportunities.

Instead of leaving unfinished projects behind, developers can now:

- 💰 Sell projects they can no longer maintain
- 🤝 Find collaborators to continue development
- 🔄 Transfer ownership securely
- 💬 Communicate directly with buyers and sellers
- 🤖 Analyze repositories using AI
- 📄 Receive digitally verified ownership certificates
- 💳 Complete secure online payments

Every abandoned repository becomes an opportunity instead of a forgotten idea.

---

# 🌍 Vision

> **Ideas shouldn't disappear because developers get busy.**

RepoRevive aims to become the world's largest marketplace for unfinished software projects, where great ideas continue evolving instead of being abandoned.

We believe software deserves the same opportunity as startups.

A startup can be acquired.

A company can change ownership.

A software repository should be able to do the same.

---

# ✨ Key Features

## 🤖 AI Project Health Analyzer

Understand the overall quality of a repository before making a decision.

The AI analyzes repositories and provides insights about:

- Project maintainability
- Documentation quality
- Repository health
- Development status
- Scalability
- Missing components
- Suggested improvements

---

## 🛒 Software Project Marketplace

Discover software projects from developers around the world.

Browse projects based on:

- Category
- Technology
- Price
- Difficulty
- Project Type
- Ownership Availability
- Collaboration Availability

---

## 👨‍💻 Developer Profiles

Every developer has a professional profile showcasing:

- Profile information
- Bio
- Skills
- Portfolio
- GitHub
- LinkedIn
- Completed ownership transfers
- Certificates earned

Helping buyers build trust before making decisions.

---

## 🤝 Ownership Requests

Interested in purchasing a project?

Simply send an ownership request containing:

- Offer Price
- Personalized Message

Project owners can then:

- Accept
- Reject
- Continue discussions

---

## 👥 Collaboration Requests

Not every project needs to be sold.

RepoRevive also supports collaboration.

Developers can request to join existing projects and continue development together without changing ownership.

---

## 💬 Built-in Messaging

Once both parties are connected, they can communicate directly inside RepoRevive.

No external platforms required.

Everything happens in one place.

---

## 💳 Secure Payment System

Ownership transfers are completed securely using Razorpay.

Features include:

- Secure checkout
- Payment verification
- Demo payment support
- Ownership confirmation

---

## 📜 Digital Ownership Certificates

After successful payment, RepoRevive automatically generates a digital certificate verifying ownership transfer.

Every certificate contains:

- Certificate ID
- Buyer details
- Seller details
- Project details
- Payment information
- Issue date
- Digital verification

Certificates can also be downloaded as PDF.

---

## 🔒 Secure Authentication

RepoRevive provides a secure authentication system powered by:

- JWT Authentication
- Password Encryption
- Protected Routes
- Authorization Middleware
- Role-based Access

---

# 🛠️ Tech Stack

## 🎨 Frontend

- Next.js 15+
- React.js
- TypeScript
- Tailwind CSS
- Lucide React Icons
- React Icons
- Axios

---

## ⚙️ Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt
- Validator

---

## 💳 Payment Gateway

- Razorpay

Features:

- Order Creation
- Payment Verification
- Demo Payment Mode
- Secure Ownership Transfer

---

## 🤖 AI Integration

RepoRevive leverages Artificial Intelligence for repository analysis by providing:

- Repository Health Analysis
- Risk Detection
- Codebase Evaluation
- Maintainability Insights
- Improvement Suggestions

---

# 📂 Project Structure

```
RepoRevive
│
├── frontend
│   ├── app
│   ├── components
│   ├── context
│   ├── services
│   ├── utils
│   ├── hooks
│   ├── public
│   └── styles
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   └── server.js
│
├── README.md
└── package.json
```

---

# 🏗️ System Architecture

```
                   ┌─────────────────────┐
                   │      Frontend       │
                   │  Next.js + React    │
                   └──────────┬──────────┘
                              │
                              │ REST APIs
                              │
                   ┌──────────▼──────────┐
                   │      Express API    │
                   │ Authentication      │
                   │ Marketplace         │
                   │ Requests            │
                   │ Messaging           │
                   │ Payments            │
                   │ Certificates        │
                   └──────────┬──────────┘
                              │
          ┌───────────────────┼────────────────────┐
          │                   │                    │
          ▼                   ▼                    ▼
     MongoDB             Razorpay             AI Services
    User Data            Payments          Repository Analysis
```

---

# 🔄 Complete Workflow

```
Developer uploads project
            │
            ▼
Project published
            │
            ▼
AI analyzes repository
            │
            ▼
Visible in Marketplace
            │
            ▼
Buyer explores project
            │
            ▼
Ownership / Collaboration Request
            │
            ▼
Owner accepts request
            │
            ▼
Payment Initiated
            │
            ▼
Payment Verified
            │
            ▼
Ownership Transferred
            │
            ▼
Certificate Generated
            │
            ▼
Project gets a new life 🚀
```

---

# 📱 Major Modules

## 🔐 Authentication

- User Registration
- Login
- JWT Authentication
- Password Encryption
- Protected Routes
- Profile Management
- Change Password
- Delete Account

---

## 📦 Marketplace

- Browse Projects
- Search Projects
- Filter Projects
- View Project Details
- Repository Information
- Technology Stack
- README Viewer

---

## 📤 Project Management

Developers can:

- Upload Projects
- Edit Projects
- Delete Projects
- Update Repository Details
- Manage Availability
- Set Pricing
- Publish Marketplace Listings

---

## 📨 Request Management

Supports two different request types.

### Ownership Request

Used when a developer wants to purchase a repository.

Includes:

- Offer Price
- Message
- Approval Flow

---

### Collaboration Request

Used when someone wants to contribute without purchasing ownership.

Includes:

- Collaboration Proposal
- Discussion
- Approval Process

---

## 💬 Messaging

Every accepted request automatically enables a private conversation.

Features include:

- One-to-One Chat
- Project-based Conversations
- Message History
- Real-time Friendly Interface

---

## 💰 Payment Module

Handles complete ownership transactions.

Features:

- Razorpay Checkout
- Demo Payment
- Verification
- Payment Records
- Transaction Tracking

---

## 📜 Certificate Module

Automatically generates ownership certificates after successful payment.

Each certificate contains:

- Buyer
- Seller
- Project
- Payment Details
- Issue Date
- Certificate ID
- Digital Verification

Certificates can be:

- Viewed
- Downloaded
- Shared
- Printed

---

# 🛡️ Security Features

✔ Password Hashing using Bcrypt

✔ JWT Authentication

✔ Protected APIs

✔ Secure Payment Verification

✔ Input Validation

✔ Role-based Authorization

✔ Secure Ownership Transfer

✔ Protected Dashboard

✔ Server-side Validation

✔ Authentication Middleware

---

# 🎯 Who Can Use RepoRevive?

### 👨‍🎓 Students

Sell unfinished college projects.

---

### 🚀 Startup Founders

Acquire MVPs instead of building from scratch.

---

### 👨‍💻 Freelancers

Purchase existing codebases to reduce development time.

---

### 🏢 Companies

Find repositories with business potential.

---

### 🤝 Open Source Contributors

Join promising projects through collaboration instead of ownership.

---

# 🚀 Getting Started

Follow these steps to set up RepoRevive on your local machine.

---

## Prerequisites

Make sure you have the following installed:

- Node.js (v18 or later)
- npm or yarn
- MongoDB
- Git

---

# 📥 Clone the Repository

```bash
git clone https://github.com/your-username/RepoRevive.git
```

```bash
cd RepoRevive
```

---

# 📦 Install Dependencies

### Frontend

```bash
cd frontend
npm install
```

### Backend

```bash
cd backend
npm install
```

---

# 🔑 Environment Variables

## Backend (.env)

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

RAZORPAY_KEY_ID=your_razorpay_key

RAZORPAY_KEY_SECRET=your_razorpay_secret
```

---

## Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api

NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key
```

---

# ▶ Running the Project

### Backend

```bash
npm run dev
```

Backend will start on

```
http://localhost:5000
```

---

### Frontend

```bash
npm run dev
```

Frontend will start on

```
http://localhost:3000
```

---

# 📸 Application Preview

> Replace these screenshots with your own after deployment.

## 🏠 Landing Page

<img src="screenshots/landing.png" width="100%">

---

## 🛒 Marketplace

<img src="screenshots/marketplace.png" width="100%">

---

## 📄 Project Details

<img src="screenshots/project-details.png" width="100%">

---

## 👨‍💻 Developer Profile

<img src="screenshots/developer-profile.png" width="100%">

---

## 💬 Chat System

<img src="screenshots/chat.png" width="100%">

---

## 💳 Secure Payment

<img src="screenshots/payment.png" width="100%">

---

## 📜 Ownership Certificate

<img src="screenshots/certificate.png" width="100%">

---

# 🌟 Future Enhancements

RepoRevive is just getting started.

Some exciting features planned for future releases include:

- GitHub OAuth Login
- Direct Repository Import from GitHub
- AI-based Repository Valuation
- Escrow Payment System
- Real-Time Chat using Socket.IO
- Notifications
- Email Integration
- Developer Ratings & Reviews
- Repository Watchlist
- AI Project Recommendation Engine
- Repository Analytics Dashboard
- Multi-owner Repository Support
- Dark/Light Theme
- Admin Dashboard
- Project Version History
- Open Source Sponsorship

---

# 🤝 Contributing

Contributions are always welcome!

If you'd like to improve RepoRevive:

1. Fork the repository

2. Create a new branch

```bash
git checkout -b feature/YourFeature
```

3. Commit your changes

```bash
git commit -m "Added Amazing Feature"
```

4. Push the branch

```bash
git push origin feature/YourFeature
```

5. Open a Pull Request

---

# 🐛 Found a Bug?

If you discover a bug or have a feature request, feel free to open an issue.

We appreciate every contribution that helps make RepoRevive better.

---

# 📜 License

This project is licensed under the MIT License.

You are free to use, modify and distribute this project under the terms of the license.

---

# 👩‍💻 Developed By

## Utkarsha Fole

**B.Tech Computer Science & Engineering**

UIT RGPV, Bhopal

### Connect with me

- 💼 LinkedIn
- 💻 GitHub
- 🌐 Portfolio

---

# 💙 A Small Request

If you found this project helpful,

please consider giving it a ⭐ on GitHub.

It motivates developers to build more impactful open-source projects.

---

# 🌱 One Repository Ends.

## Another Journey Begins.

Software projects shouldn't disappear because life gets busy.

Great ideas deserve another chance.

Developers deserve another opportunity.

Innovation deserves continuity.

**RepoRevive exists to ensure that no valuable repository is ever truly abandoned.**

Instead of watching unfinished projects fade away,

we believe in giving them new owners,

new collaborators,

new possibilities,

and a new future.

---

<p align="center">

### ⭐ If you like RepoRevive, don't forget to star the repository!

**Made with ❤️ by Utkarsha Fole**

</p>
