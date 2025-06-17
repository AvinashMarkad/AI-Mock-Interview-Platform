"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

// Initial messages with static timestamp string
const initialMessages = [
  {
    id: 1,
    sender: "bot",
    content: (
      <div>
        <p>
          Hello! I&apos;m your Information Security Assistant. How can I help
          you today?
        </p>
        <p>Here are some topics I can help with:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Password security</li>
          <li>Phishing attacks</li>
          <li>Malware protection</li>
          <li>Data encryption</li>
          <li>Network security</li>
        </ul>
      </div>
    ),
    timestamp: "2023-01-01T00:00:00Z", // Static timestamp string
  },
];

export default function Home() {
  const [messages, setMessages] = useState(() =>
    initialMessages.map((msg) => ({
      ...msg,
      timestamp: new Date(msg.timestamp), // Convert to Date object client-side
    }))
  );
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  //   Knowledge base for information security topics
  const knowledgeBase = {
    "password best practices": (
      <div>
        <strong>Password Best Practices:</strong>
        <ul className="list-disc pl-5 space-y-1">
          <li>Use long passwords (at least 12 characters)</li>
          <li>
            Include a mix of uppercase, lowercase, numbers, and special
            characters
          </li>
          <li>Avoid common words or personal information</li>
          <li>Don&apost reuse passwords across different accounts</li>
          <li>Consider using a password manager</li>
          <li>Change passwords immediately if a breach is suspected</li>
        </ul>
      </div>
    ),
    "how to spot phishing": (
      <div>
        <strong>How to Spot Phishing Attempts:</strong>
        <ul className="list-disc pl-5 space-y-1">
          <li>Check the sender&aposs email address carefully</li>
          <li>Look for poor grammar and spelling mistakes</li>
          <li>Be wary of urgent or threatening language</li>
          <li>Hover over links to see the actual URL before clicking</li>
          <li>Watch for requests for personal or financial information</li>
          <li>Be suspicious of unexpected attachments</li>
          <li>
            When in doubt, contact the organization directly through official
            channels
          </li>
        </ul>
      </div>
    ),
    "what is 2fa": (
      <div>
        <strong>Two-Factor Authentication (2FA):</strong>
        <p>
          2FA adds an extra layer of security beyond just a password. It
          requires:
        </p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Something you know (your password)</li>
          <li>Something you have (like your phone or a security key)</li>
        </ol>
        <p>Common 2FA methods include:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Text message codes (SMS)</li>
          <li>
            Authenticator apps (Google Authenticator, Microsoft Authenticator,
            Authy)
          </li>
          <li>Biometric verification (fingerprint, facial recognition)</li>
          <li>Physical security keys</li>
        </ul>
        <p>
          2FA significantly reduces the risk of unauthorized access even if your
          password is compromised.
        </p>
      </div>
    ),
    "vpn benefits": (
      <div>
        <strong>Benefits of Using a VPN:</strong>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Encrypts your internet traffic</strong> - protects data from
            eavesdroppers
          </li>
          <li>
            <strong>Hides your IP address</strong> - enhances privacy and
            anonymity
          </li>
          <li>
            <strong>Secures public Wi-Fi connections</strong> - essential when
            using coffee shops, airports, etc.
          </li>
          <li>
            <strong>Bypasses geographic restrictions</strong> - access content
            that might be restricted in your region
          </li>
          <li>
            <strong>Prevents bandwidth throttling</strong> - some ISPs throttle
            certain types of traffic
          </li>
          <li>
            <strong>Protects against some forms of tracking</strong> - makes it
            harder for advertisers to track you
          </li>
        </ul>
        <p>
          Note: Not all VPNs are equal. Choose a reputable provider with a
          no-logs policy.
        </p>
      </div>
    ),
    "malware protection": (
      <div>
        <strong>Malware Protection Tips:</strong>
        <ul className="list-disc pl-5 space-y-1">
          <li>Keep your operating system and software updated</li>
          <li>Use reputable antivirus/anti-malware software</li>
          <li>Be cautious with email attachments and downloads</li>
          <li>Avoid pirated software which often contains malware</li>
          <li>Regularly back up your important data</li>
          <li>Enable firewalls on your devices and network</li>
          <li>Be wary of removable media from untrusted sources</li>
          <li>
            Use standard user accounts rather than administrator accounts for
            daily use
          </li>
        </ul>
      </div>
    ),
    "data encryption": (
      <div>
        <strong>Data Encryption Information:</strong>
        <p>
          Encryption converts data into a coded form that can only be read with
          the correct key.
        </p>
        <p>
          <strong>Types of encryption:</strong>
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>At-rest encryption:</strong> Protects stored data (e.g.,
            full disk encryption)
          </li>
          <li>
            <strong>In-transit encryption:</strong> Protects data being
            transmitted (e.g., HTTPS, TLS)
          </li>
        </ul>
        <p>
          <strong>Common encryption tools:</strong>
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>BitLocker (Windows)</li>
          <li>FileVault (Mac)</li>
          <li>VeraCrypt (cross-platform)</li>
          <li>PGP/GPG for email and files</li>
        </ul>
        <p>
          Remember: Encryption is only as strong as your password/key management
          practices.
        </p>
      </div>
    ),
    default: (
      <div>
        I&aposm not sure I understand your question about information security.
        Could you try rephrasing it or ask about something more specific? Here
        are some topics I can help with:
        <ul className="list-disc pl-5 space-y-1">
          <li>Password security and management</li>
          <li>Recognizing and avoiding phishing scams</li>
          <li>Malware prevention and removal</li>
          <li>Secure browsing practices</li>
          <li>Data protection and encryption</li>
          <li>Network security fundamentals</li>
        </ul>
      </div>
    ),
  };

  const getBotResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();

    if (
      lowerMessage.includes("password") ||
      lowerMessage.includes("passphrase")
    ) {
      return knowledgeBase["password best practices"];
    } else if (
      lowerMessage.includes("phish") ||
      lowerMessage.includes("scam")
    ) {
      return knowledgeBase["how to spot phishing"];
    } else if (
      lowerMessage.includes("2fa") ||
      lowerMessage.includes("two-factor") ||
      lowerMessage.includes("multi-factor")
    ) {
      return knowledgeBase["what is 2fa"];
    } else if (
      lowerMessage.includes("vpn") ||
      lowerMessage.includes("virtual private network")
    ) {
      return knowledgeBase["vpn benefits"];
    } else if (
      lowerMessage.includes("malware") ||
      lowerMessage.includes("virus") ||
      lowerMessage.includes("ransomware")
    ) {
      return knowledgeBase["malware protection"];
    } else if (
      lowerMessage.includes("encrypt") ||
      lowerMessage.includes("cipher")
    ) {
      return knowledgeBase["data encryption"];
    } else {
      return knowledgeBase["default"];
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(), // Use timestamp for unique ID
      sender: "user",
      content: <span>{inputValue}</span>,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Show typing indicator
    setIsTyping(true);

    // Simulate bot response after fixed delay (no Math.random)
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        sender: "bot",
        content: getBotResponse(inputValue),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-4 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f510.svg" />
              <AvatarFallback>IS</AvatarFallback>
            </Avatar>
            InfoSec Assistant
          </h1>
          <p className="text-sm text-muted-foreground">
            Your information security chatbot
          </p>
        </div>
        <div className="flex justify-end">
          <Link href="/sign-in">
            <Button>Logout</Button>
          </Link>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6 max-w-4xl">
        <Card className="h-full flex flex-col">
          <CardHeader className="border-b">
            <h2 className="text-lg font-semibold">Chat</h2>
          </CardHeader>
          <CardContent className="flex-grow p-4 overflow-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <div>{message.content}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter className="border-t p-4">
            <form onSubmit={handleSubmit} className="w-full space-y-2">
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about information security..."
                  className="flex-grow"
                />
                <Button type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Password best practices",
                  "How to spot phishing?",
                  "What is 2FA?",
                  "VPN benefits",
                ].map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </form>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
