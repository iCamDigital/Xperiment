import Logo from "@/app/components/_components/logo";

export default {
  logo: <Logo />,
  footer: {
    component: (
      <div className="border-t-[1px]">
        <div className="flex justify-evenly gap-4 p-2">
          <div>
            <div className="flex flex-col p-2 cursor-pointer text-lg">
              All rights reserved. @{new Date().getFullYear()} by Framecast AI
              Inc.
            </div>
          </div>
        </div>
      </div>
    ),
  },
  editLink: {
    component: null,
  },
  feedback: {
    content: null,
  },
  sidebar: {
    titleComponent({ title, type }) {
      if (type === "separator") {
        return <span className="cursor-default">{title}</span>;
      }
      return <>{title}</>;
    },
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  darkMode: false,
  nextThemes: {
    defaultTheme: "light",
  },
  useNextSeoProps() {
    return {
      titleTemplate: "Framecast AI",
    };
  },
};
