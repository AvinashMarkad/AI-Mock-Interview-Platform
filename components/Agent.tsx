"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface AgentProps {
  userName: string;
}

export default function Agent({ userName }: AgentProps) {
  const [callStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const isSpeaking = true;

  const message = ["whats your name?", "My name is Avinash, nice to meet you!"];

  const lastMessage = message[message.length - 1];

  const getButtonClass = () => {
    switch (callStatus) {
      case CallStatus.ACTIVE:
        return "bg-red-500 hover:bg-red-600 text-white";
      case CallStatus.INACTIVE:
        return "bg-green-500 hover:bg-green-600 text-white";
      case CallStatus.FINISHED:
        return "bg-gray-300 text-gray-600";
      case CallStatus.CONNECTING:
        return "bg-yellow-500 hover:bg-yellow-600 text-white";
      default:
        return "bg-blue-500 hover:bg-blue-600 text-white";
    }
  };

  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="vapi"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3> AI Interviewer</h3>
        </div>
        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="user avatar"
              width={240}
              height={240}
              className="rounded-full object-cover"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {message.length > 0 && (
        <div className="transcript-border mt-4">
          <div className="transcript">
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fade-in opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}
      <div className="w-full flex justify-center mt-4">
        {callStatus !== CallStatus.ACTIVE ? (
          <button
            className={`px-6 py-3 rounded-full font-medium transition-colors ${getButtonClass()}`}
          >
            <span>
              {callStatus === CallStatus.INACTIVE ||
              callStatus === CallStatus.FINISHED
                ? "Call"
                : "..."}
            </span>
          </button>
        ) : (
          <button className="px-6 py-3 rounded-full font-medium bg-red-500 hover:bg-red-600 text-white transition-colors">
            End
          </button>
        )}
      </div>
    </>
  );
}
