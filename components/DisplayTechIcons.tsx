import React from "react";

export const someUtility = () => {};

export interface TechIconProps {
  techStack: React.ReactNode;
}

const DisplayTechIcons = ({ techStack }: TechIconProps) => {
  return <div className="flex flex-row">{techStack}</div>;
};

export default DisplayTechIcons;
