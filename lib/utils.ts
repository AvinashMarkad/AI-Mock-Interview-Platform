import { interviewCovers } from "@/constants";
import { clsx, type ClassValue } from "clsx";
// import { url } from "inspector";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTechLogos = async (techArray: string[]) => {
  const techIconsBaseURL = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

  // Helper function to normalize tech names
  const normalizeTechName = (tech: string) => {
    return tech.toLowerCase().replace(/\s+/g, "-");
  };

  // Helper function to check if icon exists
  const checkIconExists = async (url: string) => {
    try {
      const response = await fetch(url, { method: "HEAD" });
      return response.ok;
    } catch {
      return false;
    }
  };

  const logoPromises = techArray.map(async (tech) => {
    const normalized = normalizeTechName(tech);
    const url = `${techIconsBaseURL}/${normalized}/${normalized}-original.svg`;
    const iconExists = await checkIconExists(url);

    return {
      tech,
      url: iconExists ? url : "/tech.svg",
    };
  });

  return Promise.all(logoPromises);
};

export const getRandomInterviewCover = () => {
  const randomIndex = Math.floor(Math.random() * interviewCovers.length);
  return `/covers${interviewCovers[randomIndex]}`;
};
