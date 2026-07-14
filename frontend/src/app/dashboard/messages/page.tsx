"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { useMessage } from "@/context/MessageContext";
import ConversationCard from "@/components/message/ConversationCard";
import ChatWindow from "@/components/message/ChatWindow";

export default function MessagesPage() {

    const { getConversations } = useMessage();

    const [conversations, setConversations] = useState<any[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadConversations();

    }, []);

    const loadConversations = async () => {

        try {

            const res = await getConversations();

            setConversations(res.conversations);

            if (res.conversations.length > 0) {

                setSelectedConversation(res.conversations[0]);

            }

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="flex h-[80vh] items-center justify-center text-white">

                Loading...

            </div>

        );

    }

    return (

        <div className="space-y-8">

            <div>
                <h1 className="flex items-center gap-2 text-2xl font-bold text-white sm:text-3xl">
                    <MessageCircle size={28} className="text-violet-500" />
                    Messages

                </h1>

                <p className="mt-2 text-gray-400">

                    Chat with buyers and sellers.

                </p>

            </div>

            <div className="h-[75vh] overflow-hidden rounded-2xl border border-white/10 bg-[#111118] lg:grid lg:grid-cols-[320px_1fr]">
                {/* Left Sidebar */}

                <div
                    className={`overflow-y-auto border-r border-white/10 ${selectedConversation ? "hidden lg:block" : "block"
                        }`}
                >
                    {conversations.length === 0 ? (

                        <div className="flex h-full items-center justify-center text-gray-400">

                            No conversations yet.

                        </div>

                    ) : (

                        conversations.map((conversation) => (

                            <ConversationCard
                                key={conversation._id}
                                conversation={conversation}
                                selected={
                                    selectedConversation?._id === conversation._id
                                }
                                onClick={() =>
                                    setSelectedConversation(conversation)
                                }
                            />

                        ))

                    )}

                </div>

                {/* Chat */}

                <div
                    className={`${selectedConversation ? "flex" : "hidden"
                        } h-full flex-1 lg:flex`}
                >
                    <ChatWindow
                        conversation={selectedConversation}
                        onBack={() => setSelectedConversation(null)}
                    />
                </div>

            </div>

        </div>

    );

}