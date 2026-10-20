"use client"

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "./ThemeProvider";

const user = {};

const Navbar = () => {

  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="navbar">
      <nav>
        <Link href="/">
          <Image
            src="/assets/icons/logo.svg"
            alt="logo.svg"
            width={32}
            height={32}
          />
          <h1>SnapCast</h1>
        </Link>

        <figure className="navbar-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
            title={theme === "dark" ? "Passer au mode clair" : "Passer au mode sombre"}
          >
            {theme === "dark" ? (
              <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />
              </svg>
            )}
            <span>{theme === "dark" ? "Mode clair" : "Mode sombre"}</span>
          </button>

          {user && (
            <button onClick={()=> router.push("/profile/123434")}>
              <Image
                src="/assets/images/dummy.jpg"
                alt="dummy-profile"
                width={36}
                height={36}
                className=" rounded-full aspect-square"
              />
            </button>

            <button className="cursor-pointer">
              <Image 
                src="/assets/icons/logout.svg" 
                alt="logout"
                width={24}
                height={24}
                className="rotate-180"/>
            </button>
          )}
        </figure>
      </nav>
    </header>
  );
};

export default Navbar;
