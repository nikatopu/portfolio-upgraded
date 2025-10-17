export type TSection = "home" | "work" | "freelancing" | "other";

export interface IAppContextProps {
  section: TSection;
  setSection: React.Dispatch<React.SetStateAction<TSection>>;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
