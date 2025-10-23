export type TSection = "home" | "work" | "freelancing" | "other";

export interface IProjectCard {
  image: string;
  title: string;
  techs: string[];
  description: string;
  link: string;
}

export interface IAppContextProps {
  section: TSection;
  setSection: React.Dispatch<React.SetStateAction<TSection>>;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  renderStyled: (child: React.ReactNode, styles: any) => React.ReactNode;
}
