import { ThemeProvider as Theme } from "next-themes";
import  { ReactNode } from "react";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Theme attribute="class" enableSystem>
      {children}
    </Theme>
  );
};

export default ThemeProvider;
