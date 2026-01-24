export type TProject = {
  image: string;
  title: string;
  description: string;
  tags: string[];
  onClick: () => void;
};

export type TWorkExperience = {
  position: string;
  company: string;
  companySite?: string;
  description: string;
  period: string;
  current: boolean;
};

export interface IAppContextProps {
  experienceInYears: number;
}
