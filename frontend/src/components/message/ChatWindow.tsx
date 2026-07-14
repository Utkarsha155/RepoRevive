"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, SendHorizonal } from "lucide-react";
import { useMessage } from "@/context/MessageContext";
import Link from "next/link";

export default function ChatWindow({
    conversation,
    onBack
}: {
    conversation: any;
    onBack?: () => void;
}) {

    const {
        getMessages,
        sendMessage
    } = useMessage();

    const [messages, setMessages] = useState<any[]>([]);
    const [text, setText] = useState("");

    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        if (conversation) {

            loadMessages();

        }

    }, [conversation]);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages]);

    const loadMessages = async () => {

        try {

            const res = await getMessages(conversation._id);

            setMessages(res.messages);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleSend = async () => {

        if (!text.trim()) return;

        try {

            const res = await sendMessage({
                conversationId: conversation._id,
                receiverId: conversation.otherUser._id,
                text: text
            });

            setMessages((prev) => [

                ...prev,

                res.message

            ]);

            setText("");

        }

        catch (error) {

            console.log(error);

        }

    };

    if (!conversation) {

        return (

            <div className="flex flex-1 items-center justify-center text-gray-400">

                Select a conversation

            </div>

        );

    }

    return (

        <div className="flex h-full flex-1 flex-col">

            {/* Header */}

            <div className="flex items-center gap-3 border-b border-white/10 bg-[#111118] p-4">
                <button
                    onClick={onBack}
                    className="rounded-lg p-2 text-white hover:bg-white/5 lg:hidden"
                >
                    <ArrowLeft size={20} />
                </button>

                <div className="min-w-0">

                    <Link
                        href={`/dashboard/developer/${conversation.otherUser?._id}`}
                        className="text-xl font-semibold text-white hover:text-violet-400"
                    >

                        {conversation.otherUser?.name}

                    </Link>

                    <p className="truncate text-sm text-violet-400">

                        {conversation.project?.title}

                    </p>

                </div>

            </div>

            {/* Messages */}

            <div className="flex-1 space-y-3 overflow-y-auto bg-[#0c0c12] p-4 sm:p-5">
                {messages.map((msg) => (

                    <div
                        key={msg._id}
                        className={`flex ${msg.sender._id === conversation.otherUser._id
                            ? "justify-start"
                            : "justify-end"
                            }`}
                    >

                        <div
                            className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-6 ${msg.sender._id === conversation.otherUser._id
                                ? "bg-[#1d1d28] text-white"
                                : "bg-violet-600 text-white"
                                }`}
                        >

                            {msg.text}

                        </div>

                    </div>

                ))}

                <div ref={bottomRef} />

            </div>

            {/* Input */}

            <div className="border-t border-white/10 bg-[#111118] p-3 sm:p-4">
                <div className="flex items-center gap-2">
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => {

                            if (e.key === "Enter") {

                                handleSend();

                            }

                        }}
                        placeholder="Type a message..."
                        className="flex-1 rounded-xl border border-white/10 bg-[#1a1a25] px-4 py-3 text-sm text-white outline-none focus:border-violet-500" />

                    <button
                        onClick={handleSend}
                        className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-white transition hover:bg-violet-500"
                    >

                        <SendHorizonal size={20} />

                    </button>

                </div>

            </div>

        </div>

    );

}