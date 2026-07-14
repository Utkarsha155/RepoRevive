import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(

    {

        members: [

            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            }

        ],

        project: {

            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true

        },

        lastMessage: {

            type: String,
            default: ""

        },

        lastMessageAt: {

            type: Date,
            default: Date.now

        }

    },

    {

        timestamps: true

    }

);

conversationSchema.index({

    members: 1,

    project: 1

});

export default mongoose.model(
    "Conversation",
    conversationSchema
);