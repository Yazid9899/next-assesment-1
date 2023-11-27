// components/Layout.tsx
import React, { ReactNode } from "react";
import SideBar from "./SideBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen top-0">
      <SideBar />
      <main className="md:ml-64 overflow-x-hidden">{children}</main>
    </div>
  );
};

export default Layout;
