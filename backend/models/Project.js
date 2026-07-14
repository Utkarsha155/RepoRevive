import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({

    // Project Owner
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    // Basic Information
    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    techStack: [{
        type: String
    }],

    githubLink: {
        type: String,
        required: true
    },

    liveLink: {
        type: String,
        default: ""
    },

    image: {
        type: String,
        default: ""
    },

    readme: {
        type: String,
        default: ""
    },

    // Marketplace Type
    projectType: {
        type: String,
        enum: [
            "Ownership Transfer",
            "Collaboration",
            "Maintenance",
            "Hiring",
            "Project Sale"
        ]
    },

    compensationType: {
        type: String,
        enum: [
            "Free",
            "Fixed Price",
            "Negotiable",
            "Revenue Sharing"
        ],
        default: "Free"
    },

    price: {
        type: Number,
        default: 0
    },

    currency: {
        type: String,
        default: "INR"
    },

    negotiable: {
        type: Boolean,
        default: true
    },

    // Project Status
    status: {
        type: String,
        enum: [
            "Open",
            "In Progress",
            "Completed",
            "Archived"
        ],
        default: "Open"
    },

    difficulty: {
        type: String,
        enum: [
            "Beginner",
            "Intermediate",
            "Advanced"
        ],
        default: "Intermediate"
    },

    // What owner wants
    lookingFor: {
        type: String,
        default: ""
    },

    // GitHub Details
    stars: {
        type: Number,
        default: 0
    },

    forks: {
        type: Number,
        default: 0
    },

    issues: {
        type: Number,
        default: 0
    },

    // Marketplace Stats
    views: {
        type: Number,
        default: 0
    },

    likes: {
        type: Number,
        default: 0
    },

    requests: {
        type: Number,
        default: 0
    },

    adopted: {
        type: Boolean,
        default: false
    },

    featured: {
        type: Boolean,
        default: false
    },

    // Tags
    tags: [{
        type: String
    }]

},
    {
        timestamps: true
    });

export default mongoose.model("Project", projectSchema);