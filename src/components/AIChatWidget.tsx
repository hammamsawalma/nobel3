"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MessageSquare, X, Send, Shield, Lock, Clock, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Message {
    role: "user" | "assistant";
    content: string;
}

const QUICK_ACTIONS = [
    "Our Services",
    "Investment Philosophy",
    "Schedule Consultation"
];

export default function AIChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // UI States
    const [isHovered, setIsHovered] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);
    const [smartPrompt, setSmartPrompt] = useState("");
    const [hasInteracted, setHasInteracted] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initial Time-based Greeting
    useEffect(() => {
        const hour = new Date().getHours();
        const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
        setMessages([
            { role: "assistant", content: `${greeting}. I am the Noble Concierge. How may I assist you with your wealth management inquiries today?` }
        ]);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Smart Welcome Sequence (Stage 1)
    useEffect(() => {
        if (sessionStorage.getItem("noble_concierge_welcome") === "true") return;

        const timer = setTimeout(() => {
            if (!isOpen && !hasInteracted && !smartPrompt) {
                setShowWelcome(true);
            }
        }, 5000); // 5 seconds

        // Auto-dismiss after 15 seconds if ignored
        const dismissTimer = setTimeout(() => {
            if (showWelcome) dismissWelcome();
        }, 20000);

        return () => {
            clearTimeout(timer);
            clearTimeout(dismissTimer);
        };
    }, [isOpen, hasInteracted, smartPrompt, showWelcome]);

    // Exit-Intent Detection (Stage 3)
    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 20 && !isOpen && !hasInteracted && !sessionStorage.getItem("noble_exit_intent")) {
                setShowWelcome(false); // Hide welcome if showing
                setSmartPrompt("Before you go — would you like to schedule a private consultation?");
                sessionStorage.setItem("noble_exit_intent", "true");

                setTimeout(() => setSmartPrompt(""), 8000);
            }
        };

        const handleScroll = () => {
            // Scroll Awareness: Contextual prompt if scrolled > 60% without interacting
            const scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            if (scrollPercentage > 0.6 && !isOpen && !hasInteracted && !sessionStorage.getItem("noble_scroll_prompt")) {
                setShowWelcome(false);
                setSmartPrompt("Still browsing? I can help you find exactly what you're looking for.");
                sessionStorage.setItem("noble_scroll_prompt", "true");
                setTimeout(() => setSmartPrompt(""), 8000);
            }
        };

        document.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            document.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isOpen, hasInteracted]);

    // External Trigger Listener (e.g. from MobileNav)
    useEffect(() => {
        const handleOpenChat = () => {
            setIsOpen(true);
            setHasInteracted(true);
            setShowWelcome(false);
            setSmartPrompt("");
        };
        window.addEventListener("open-ai-chat", handleOpenChat);
        return () => window.removeEventListener("open-ai-chat", handleOpenChat);
    }, []);

    const dismissWelcome = () => {
        setShowWelcome(false);
        sessionStorage.setItem("noble_concierge_welcome", "true");
    };

    const acceptWelcome = () => {
        setShowWelcome(false);
        setSmartPrompt("");
        sessionStorage.setItem("noble_concierge_welcome", "true");
        setIsOpen(true);
        setHasInteracted(true);
    };

    const handleSendAction = (text: string) => {
        setInput(text);
        // We use a timeout to let state update, then submit
        setTimeout(() => {
            const form = document.getElementById("chat-form") as HTMLFormElement;
            if (form) form.requestSubmit();
        }, 50);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        setHasInteracted(true);
        setShowWelcome(false);
        setSmartPrompt("");

        const userMsg = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
        setIsLoading(true);

        // Haptic feedback simulation if supported
        if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(50);
        }

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
                { role: "assistant", content: "My apologies, but our systems are currently unavailable. Please direct inquiries to our contact channels or schedule a consultation." }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    // Live Status Checker
    const hour = new Date().getHours();
    // Assuming AEST 9 AM to 5 PM is roughly 23:00 to 07:00 UTC depending on DST. 
    // We'll just use simple local time for this demo:
    const isLiveHours = hour >= 9 && hour < 17;

    return (
        <>
            <div className="chat-widget-container" style={{ position: "fixed", bottom: "clamp(1.5rem, 4vw, 2.5rem)", right: "clamp(1rem, 3vw, 2.5rem)", zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>

                {/* Floating Bubbles Area */}
                <div style={{ position: "relative", width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-end", marginBottom: "1rem" }}>
                    <AnimatePresence>
                        {/* Smart Welcome Bubble */}
                        {showWelcome && !isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                style={{
                                    background: "rgba(15, 27, 45, 0.85)",
                                    backdropFilter: "blur(16px)",
                                    border: "1px solid rgba(201,168,76,0.3)",
                                    borderRadius: "16px",
                                    padding: "1rem",
                                    width: "280px",
                                    boxShadow: "0 10px 40px rgba(0,0,0,0.5), 0 0 20px rgba(201,168,76,0.1)",
                                    color: "var(--color-noble-ivory)",
                                    marginBottom: "1rem",
                                    position: "relative"
                                }}
                            >
                                <button onClick={dismissWelcome} style={{ position: "absolute", top: "8px", right: "8px", background: "none", border: "none", color: "var(--color-noble-slate)", cursor: "pointer", padding: "4px" }}>
                                    <X size={14} />
                                </button>
                                <p style={{ fontSize: "0.85rem", lineHeight: 1.5, fontFamily: "var(--font-body)", marginBottom: "1rem", color: "var(--color-noble-silver)", paddingRight: "1rem" }}>
                                    Good day. If you need assistance exploring our services, I&apos;m here.
                                </p>
                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                    <button
                                        onClick={() => { acceptWelcome(); setTimeout(() => handleSendAction("I want to explore your services."), 300); }}
                                        style={{ flex: 1, padding: "0.5rem", fontSize: "0.75rem", background: "var(--color-noble-gold)", color: "var(--color-noble-black)", border: "none", borderRadius: "6px", fontWeight: 600, cursor: "pointer" }}
                                    >
                                        Explore Services
                                    </button>
                                    <button
                                        onClick={dismissWelcome}
                                        style={{ flex: 1, padding: "0.5rem", fontSize: "0.75rem", background: "transparent", color: "var(--color-noble-gold)", border: "1px solid rgba(201,168,76,0.5)", borderRadius: "6px", fontWeight: 600, cursor: "pointer" }}
                                    >
                                        Maybe Later
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Contextual Smart Prompt */}
                        {smartPrompt && !isOpen && !showWelcome && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                onClick={acceptWelcome}
                                style={{
                                    background: "rgba(15, 27, 45, 0.85)",
                                    backdropFilter: "blur(16px)",
                                    border: "1px solid rgba(201,168,76,0.3)",
                                    borderRadius: "16px",
                                    padding: "0.85rem 1rem",
                                    maxWidth: "280px",
                                    boxShadow: "0 10px 40px rgba(0,0,0,0.5), 0 0 20px rgba(201,168,76,0.1)",
                                    color: "var(--color-noble-ivory)",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.75rem"
                                }}
                            >
                                <p style={{ fontSize: "0.85rem", lineHeight: 1.4, fontFamily: "var(--font-body)", color: "var(--color-noble-silver)", margin: 0 }}>
                                    {smartPrompt}
                                </p>
                                <div style={{ minWidth: "24px", height: "24px", borderRadius: "50%", background: "rgba(201,168,76,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-noble-gold)" }}>
                                    <ArrowUpRight size={14} />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Breathing Trigger Button */}
                <div className="chat-widget-trigger" style={{ position: "relative" }}>
                    {/* Breathing Rings (CSS animations added in global or inline) */}
                    {!isOpen && (
                        <>
                            <motion.div
                                animate={{ scale: [1, 1.4, 1], opacity: [0, 0.4, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--color-noble-gold)", pointerEvents: "none" }}
                            />
                            <motion.div
                                animate={{ scale: [1, 1.8, 1], opacity: [0, 0.15, 0] }}
                                transition={{ repeat: Infinity, duration: 4, delay: 0.5, ease: "easeInOut" }}
                                style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--color-noble-gold)", pointerEvents: "none" }}
                            />
                        </>
                    )}

                    <motion.button
                        onClick={() => { setIsOpen(!isOpen); setHasInteracted(true); setShowWelcome(false); setSmartPrompt(""); }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        animate={isOpen ? { scale: 0.9, opacity: 0, pointerEvents: "none" } : { scale: 1, opacity: 1, pointerEvents: "auto" }}
                        style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, var(--color-noble-gold), var(--color-noble-gold-muted))",
                            color: "var(--color-noble-navy)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: isHovered
                                ? "0 15px 35px rgba(201,168,76,0.4), 0 0 20px rgba(201,168,76,0.3)"
                                : "0 10px 25px rgba(201,168,76,0.2), 0 0 0px rgba(201,168,76,0)",
                            cursor: "pointer",
                            border: "none",
                            transition: "box-shadow 0.3s ease",
                            position: "relative",
                            zIndex: 10
                        }}
                    >
                        {/* Status Dot */}
                        <div style={{ position: "absolute", top: "4px", right: "4px", width: "10px", height: "10px", borderRadius: "50%", background: isLiveHours ? "var(--color-noble-success)" : "var(--color-noble-gold)", border: "2px solid var(--color-noble-navy)" }} />

                        {/* Morphing Icon */}
                        <div style={{ position: "relative", width: "24px", height: "24px" }}>
                            <AnimatePresence mode="wait">
                                {isHovered ? (
                                    <motion.div key="msg" initial={{ opacity: 0, scale: 0.5, rotate: -45 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 0.5, rotate: 45 }} transition={{ duration: 0.2 }}>
                                        <MessageSquare size={24} strokeWidth={2.5} />
                                    </motion.div>
                                ) : (
                                    <motion.div key="shield" initial={{ opacity: 0, scale: 0.5, rotate: 45 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 0.5, rotate: -45 }} transition={{ duration: 0.2 }}>
                                        <Shield size={24} strokeWidth={2.5} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.button>
                </div>

                {/* Chat Window */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="chat-widget-window"
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 30, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            style={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                width: "380px",
                                height: "600px",
                                maxHeight: "calc(100vh - 40px)",
                                background: "var(--color-noble-navy)",
                                border: "1px solid rgba(201,168,76,0.2)",
                                borderRadius: "20px",
                                overflow: "hidden",
                                display: "flex",
                                flexDirection: "column",
                                boxShadow: "0 25px 50px rgba(0,0,0,0.5), 0 0 40px rgba(201,168,76,0.05)",
                                zIndex: 20
                            }}
                        >
                            {/* Header */}
                            <div style={{
                                padding: "1.25rem 1rem",
                                background: "var(--color-noble-charcoal)",
                                borderBottom: "1px solid rgba(201,168,76,0.1)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                position: "relative"
                            }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                                    <div style={{ position: "relative" }}>
                                        <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "linear-gradient(135deg, var(--color-noble-gold), var(--color-noble-gold-dark))", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 10px rgba(201,168,76,0.3)", position: "relative", overflow: "hidden" }}>
                                            <Image
                                                src="/images/logo/logo-monogram.png"
                                                alt="Noble Rock"
                                                width={28}
                                                height={28}
                                                style={{ objectFit: "contain" }}
                                            />
                                        </div>
                                        <div style={{ position: "absolute", bottom: "-2px", right: "-2px", width: "12px", height: "12px", borderRadius: "50%", background: isLiveHours ? "var(--color-noble-success)" : "var(--color-noble-gold-muted)", border: "2px solid var(--color-noble-charcoal)" }} />
                                    </div>
                                    <div>
                                        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--color-noble-ivory)", fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                            Noble Concierge
                                        </div>
                                        <div style={{ fontSize: "0.7rem", color: isLiveHours ? "var(--color-noble-success)" : "var(--color-noble-gold-muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, marginTop: "0.15rem", display: "flex", alignItems: "center", gap: "4px" }}>
                                            {isLiveHours ? "Live — Advisors Available" : "AI Concierge — Returns 9AM"}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    title="Close Window"
                                    style={{ background: "rgba(255,255,255,0.05)", border: "none", color: "var(--color-noble-slate)", cursor: "pointer", width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "var(--color-noble-ivory)"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "var(--color-noble-slate)"; }}
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Messages Area */}
                            <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem 1rem", display: "flex", flexDirection: "column", gap: "1rem", background: "linear-gradient(to bottom, rgba(15,27,45,1), rgba(10,10,15,0.9))" }}>
                                {messages.map((m, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                        key={i}
                                        style={{ display: "flex", flexDirection: "column", alignItems: m.role === "user" ? "flex-end" : "flex-start" }}
                                    >
                                        <div style={{
                                            maxWidth: "85%",
                                            padding: "0.85rem 1.15rem",
                                            borderRadius: "14px",
                                            borderBottomRightRadius: m.role === "user" ? "4px" : "14px",
                                            borderBottomLeftRadius: m.role === "assistant" ? "4px" : "14px",
                                            background: m.role === "user" ? "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))" : "var(--color-noble-charcoal)",
                                            border: m.role === "user" ? "1px solid rgba(201,168,76,0.25)" : "1px solid rgba(255,255,255,0.08)",
                                            color: "var(--color-noble-ivory)",
                                            fontSize: "0.9rem",
                                            lineHeight: 1.6,
                                            fontFamily: "var(--font-body)",
                                            boxShadow: m.role === "user" ? "0 4px 15px rgba(0,0,0,0.2)" : "0 4px 15px rgba(0,0,0,0.3)"
                                        }}>
                                            {m.content}

                                            {/* Typing Indicator for the streaming message */}
                                            {m.role === "assistant" && isLoading && i === messages.length - 1 && !m.content && (
                                                <div style={{ display: 'flex', gap: '4px', alignItems: 'center', height: '24px', padding: '0 4px' }}>
                                                    <motion.div animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0 }} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-noble-gold)' }} />
                                                    <motion.div animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.2 }} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-noble-gold)' }} />
                                                    <motion.div animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.4 }} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-noble-gold)' }} />
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Quick Action Chips - Shows only after initial greeting */}
                                {messages.length === 1 && !isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                                        style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}
                                    >
                                        {QUICK_ACTIONS.map((action, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleSendAction(action)}
                                                style={{
                                                    padding: "0.5rem 1rem",
                                                    background: "rgba(201,168,76,0.05)",
                                                    border: "1px solid rgba(201,168,76,0.2)",
                                                    borderRadius: "100px",
                                                    color: "var(--color-noble-gold-light)",
                                                    fontSize: "0.75rem",
                                                    fontFamily: "var(--font-body)",
                                                    cursor: "pointer",
                                                    transition: "all 0.2s",
                                                    display: "flex",
                                                    alignItems: "center"
                                                }}
                                                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(201,168,76,0.15)"; e.currentTarget.style.borderColor = "var(--color-noble-gold)"; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(201,168,76,0.05)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)"; }}
                                            >
                                                {action}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>

                            {/* Trust Signals & Encryption Badge */}
                            <div style={{ padding: "0.5rem 1rem", background: "var(--color-noble-black)", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", borderTop: "1px solid rgba(255,255,255,0.03)" }}>
                                <Lock size={10} color="var(--color-noble-slate)" />
                                <span style={{ fontSize: "0.6rem", color: "var(--color-noble-slate)", letterSpacing: "0.05em", textTransform: "uppercase" }}>End-to-End Encrypted · ASIC Regulated</span>
                            </div>

                            {/* Input Area */}
                            <form id="chat-form" onSubmit={handleSubmit} style={{ padding: "1rem", background: "var(--color-noble-black)", display: "flex", gap: "0.75rem", position: "relative" }}>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Inquire here..."
                                    style={{
                                        flex: 1,
                                        background: "var(--color-noble-charcoal)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        borderRadius: "100px",
                                        padding: "0.75rem 1.25rem",
                                        color: "var(--color-noble-ivory)",
                                        outline: "none",
                                        fontFamily: "var(--font-body)",
                                        fontSize: "0.9rem",
                                        transition: "border-color 0.3s, box-shadow 0.3s",
                                    }}
                                    disabled={isLoading}
                                    onFocus={(e) => { e.target.style.borderColor = "var(--color-noble-gold)"; e.target.style.boxShadow = "0 0 10px rgba(201,168,76,0.1)"; }}
                                    onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    style={{
                                        width: "44px",
                                        height: "44px",
                                        background: input.trim() ? "var(--color-noble-gold)" : "var(--color-noble-charcoal)",
                                        border: input.trim() ? "none" : "1px solid rgba(255,255,255,0.1)",
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: input.trim() ? "var(--color-noble-navy)" : "var(--color-noble-slate)",
                                        cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
                                        transition: "all 0.3s",
                                        boxShadow: input.trim() ? "0 4px 15px rgba(201,168,76,0.3)" : "none"
                                    }}
                                >
                                    <Send size={18} style={{ transform: "translateX(1px)" }} />
                                </button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style jsx global>{`
                @media (max-width: 480px) {
                    .chat-widget-container {
                        bottom: 90px !important; /* Above mobile nav */
                        right: 1rem !important;
                    }
                    .chat-widget-window {
                        position: fixed !important;
                        top: 1rem !important;
                        left: 1rem !important;
                        right: 1rem !important;
                        bottom: 90px !important;
                        width: auto !important;
                        height: auto !important;
                        max-height: none !important;
                        border-radius: 16px !important;
                    }
                }
            `}</style>
        </>
    );
}

