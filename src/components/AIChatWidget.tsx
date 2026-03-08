"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function AIChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Good day. I am the Noble Rock Concierge. How may I assist you with your wealth management inquiries today?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [...messages, { role: "user", content: userMsg }] }),
            });

            if (!response.ok) {
                throw new Error("API request failed");
            }

            setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

            const reader = response.body?.getReader();
            const decoder = new TextDecoder("utf-8");

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    const chunk = decoder.decode(value, { stream: true });
                    setMessages((prev) => {
                        const newArray = [...prev];
                        const lastMessage = newArray[newArray.length - 1];
                        lastMessage.content += chunk;
                        return newArray;
                    });
                }
            }
        } catch (error) {
            console.error(error);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "My apologies, but our systems are currently unavailable. Please direct inquiries to our standard contact channels." }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 50 }}>
                {/* Chat Button */}
                <button
                    onClick={() => setIsOpen(true)}
                    style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, var(--color-noble-gold), var(--color-noble-gold-muted))",
                        color: "var(--color-noble-navy)",
                        display: isOpen ? "none" : "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 10px 25px rgba(201,168,76,0.2)",
                        cursor: "pointer",
                        border: "none",
                        transition: "transform 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                    <MessageSquare size={24} strokeWidth={2} />
                </button>

                {/* Chat Window */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                width: "350px",
                                height: "500px",
                                maxHeight: "80vh",
                                background: "var(--color-noble-navy)",
                                border: "1px solid rgba(201,168,76,0.2)",
                                borderRadius: "12px",
                                overflow: "hidden",
                                display: "flex",
                                flexDirection: "column",
                                boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                            }}
                        >
                            {/* Header */}
                            <div style={{
                                padding: "1rem",
                                background: "var(--color-noble-charcoal)",
                                borderBottom: "1px solid rgba(255,255,255,0.05)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--color-noble-gold)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-noble-navy)" }}>
                                        <Bot size={18} />
                                    </div>
                                    <div>
                                        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--color-noble-ivory)", fontSize: "1rem" }}>Noble Rock AI</div>
                                        <div style={{ fontSize: "0.65rem", color: "var(--color-noble-gold-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Concierge Service</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    style={{ background: "transparent", border: "none", color: "var(--color-noble-slate)", cursor: "pointer", padding: "0.25rem" }}
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Messages Area */}
                            <div style={{ flex: 1, overflowY: "auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                {messages.map((m, i) => (
                                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.role === "user" ? "flex-end" : "flex-start" }}>
                                        <div style={{
                                            maxWidth: "85%",
                                            padding: "0.75rem 1rem",
                                            borderRadius: "8px",
                                            background: m.role === "user" ? "rgba(201,168,76,0.15)" : "var(--color-noble-charcoal)",
                                            border: m.role === "user" ? "1px solid rgba(201,168,76,0.3)" : "1px solid rgba(255,255,255,0.05)",
                                            color: "var(--color-noble-ivory)",
                                            fontSize: "0.85rem",
                                            lineHeight: 1.5,
                                            fontFamily: "var(--font-body)",
                                        }}>
                                            {m.content || (m.role === "assistant" && isLoading && i === messages.length - 1 ? <span style={{ opacity: 0.5 }}>Typing...</span> : "")}
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <form onSubmit={handleSubmit} style={{ padding: "1rem", background: "var(--color-noble-black)", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: "0.5rem" }}>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Inquire here..."
                                    style={{
                                        flex: 1,
                                        background: "var(--color-noble-charcoal)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        borderRadius: "4px",
                                        padding: "0.5rem 0.75rem",
                                        color: "var(--color-noble-ivory)",
                                        outline: "none",
                                        fontFamily: "var(--font-body)",
                                        fontSize: "0.85rem"
                                    }}
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    style={{
                                        width: "36px",
                                        height: "36px",
                                        background: input.trim() ? "var(--color-noble-gold)" : "var(--color-noble-slate)",
                                        border: "none",
                                        borderRadius: "4px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "var(--color-noble-navy)",
                                        cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
                                    }}
                                >
                                    <Send size={16} />
                                </button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style jsx global>{`
        @media (max-width: 480px) {
          .chat-window {
            width: calc(100vw - 2rem) !important;
            right: 1rem !important;
            bottom: 5rem !important;
          }
        }
      `}</style>
        </>
    );
}
