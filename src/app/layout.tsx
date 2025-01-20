import "./globals.css";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Image from "next/image";

import { Fira_Sans } from "next/font/google";
import React from "react";

const firaSans = Fira_Sans({
  subsets: ["latin"], // Specify subsets if needed
  weight: ["400", "500", "700"], // Choose the weights you need
  style: ["normal", "italic"], // Optional: Include styles
  variable: "--font-fira-sans", // Optional: Create a CSS variable
  display: "swap", // Optional: Set font-display property
});

export const metadata = {
  title: "XRay Denoiser",
  description: "XRay Denoiser using OpenCV and Python",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <html lang="en" className={firaSans.className}>
      <body>
        <header>
          <nav className="flex items-center justify-between px-8 py-4 bg-[#6C91C2] shadow-md sticky top-0 w-full z-50 text-[#373F47]">
            {/* Branding Section */}
            <h1 className="font-extrabold text-4xl ">Anisotropic Diffusion</h1>

            {/* Navigation Items */}
            <div className="flex-1 flex justify-center">
              <NavigationMenu className="flex space-x-8 text-2xl font-bold">
                <NavigationMenuList className="flex space-x-8">
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/homepage">
                      Home
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink href="/scan">Scan</NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink href="/resource">
                      Resources
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* User Actions (Sign-In/Sign-Out/Profile) */}
            <div className="flex items-center space-x-6">
              {!(await isAuthenticated()) ? (
                <>
                  <LoginLink>
                    <Button variant="default">Sign in</Button>
                  </LoginLink>
                  <RegisterLink>
                    <Button variant="outline">Sign up</Button>
                  </RegisterLink>
                </>
              ) : (
                <>
                  {/* Profile Section */}
                  <div className="flex items-center space-x-4">
                    {user?.picture ? (
                      <Image
                        className="w-10 h-10 rounded-full"
                        src={user.picture}
                        alt="User profile avatar"
                        width={40}
                        height={40}
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full text-lg font-semibold">
                        {user?.given_name?.[0]}
                        {user?.family_name?.[0]}
                      </div>
                    )}
                    <div className="text-sm text-gray-700">
                      {user?.given_name} {user?.family_name}
                    </div>
                  </div>
                  <LogoutLink>
                    <Button variant="default">Log out</Button>
                  </LogoutLink>
                </>
              )}
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="min-h-screen flex flex-col bg-[#AAABBC]">
          {children}
        </main>

        {/* Footer */}
        <footer className="p-8 bg-[#C3C9E9]">
          <div className="text-center">
            <strong className="text-xl font-semibold">Image Denoiser</strong>
            <small className="block text-gray-500">
              © 2025 ImageDenoiser, Inc. All rights reserved.
            </small>
          </div>
        </footer>
      </body>
    </html>
  );
}
