"use client";

import { FolderGit2 } from "lucide-react";
import Link from "next/link";

export default function ConversationCard({
    conversation,
    selected,
    onClick
}: {
    conversation: any;
    selected: boolean;
    onClick: () => void;
}) {

    const otherUser = conversation.otherUser;

    return (

        <button
            onClick={onClick}
            className={`w-full border-b border-white/5 p-4 text-left transition ${selected
                ? "bg-violet-600/20"
                : "hover:bg-white/5"
                }`}
        >

            <div className="flex items-start gap-3">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-violet-600 text-lg font-bold text-white">

                    {otherUser?.name?.charAt(0).toUpperCase()}

                </div>

                <div className="flex-1">

                    <div className="flex items-center justify-between">

                        <Link
                            href={`/dashboard/developer/${otherUser?._id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="font-semibold text-white hover:text-violet-400"
                        >

                            {otherUser?.name}

                        </Link>

                        <span className="text-xs text-gray-500">
                            {new Date(conversation.lastMessageAt).toLocaleDateString()}
                        </span>

                    </div>

                    <div className="mt-2 flex items-center gap-2 text-xs text-violet-400">
                        <FolderGit2 size={15} />

                        <span className="truncate">
                            {conversation.project?.title}
                        </span>
                    </div>

                    <p className="mt-2 line-clamp-1 text-sm text-gray-400">
                        {
                            conversation.lastMessage || "Start Conversation"
                        }

                    </p>

                </div>

            </div>

        </button>

    );

}