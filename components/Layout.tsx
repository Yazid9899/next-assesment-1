// components/Layout.tsx
import React, { ReactNode } from "react";
import SideBar from "./SideBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <SideBar />
      <main className="w-[calc(100%-256px)] ml-64">{children}</main>
    </div>
  );
};

export default Layout;
