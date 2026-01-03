"use client";

import Link from "next/link";
import Image from "next/image";

// Styles
import styles from "./styles.module.scss";

// Hooks
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

import { authClient } from "@/lib/auth/client";

export default function Header() {
  const { data: session } = authClient.useSession();
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  const getRouteLabel = (path: string): string => {
    if (path === "/") {
      return "Inicio";
    }

    const segments = path.split("/").filter(Boolean);
    const firstSegment = segments[0] || "Inicio";

    return firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1);
  };

  const navigationLinks = [
    { label: "Inicio", to: "/" },
    { label: "Acerca de", to: "/about" },
    { label: "Contacto", to: "/contacto" },
    { label: "Cartelera", to: "/cartelera" },
  ];

  const footerLinks = [
    { label: "Cookies", to: "/" },
    { label: "Terminos", to: "/" },
    { label: "Privacidad", to: "/" },
  ];

  const socialsLinks = [
    { icon: "/icons/facebook-logo.svg", to: "/" },
    { icon: "/icons/instagram-logo.svg", to: "/" },
    { icon: "/icons/x-logo.svg", to: "/" },
  ];

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link href="/">
          <Image
            src="/images/renzi-logo.png"
            alt="Logo"
            width={48}
            height={48}
            className={styles.logo}
          />
        </Link>

        <div className={styles.button_container}>
          <span className={styles.route}>{getRouteLabel(pathname)}</span>

          <div className={styles.vertical_divisor}></div>

          <motion.img
            className={styles.button}
            onClick={() => setIsActive(!isActive)}
            key={isActive ? "close" : "hamburger"}
            src={isActive ? "/icons/x.svg" : "/icons/list.svg"}
            alt="Hamburger"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.65,
              transition: { ease: "easeInOut", duration: 0.3 },
            }}
            whileHover={{ opacity: 1 }}
          />
        </div>
      </nav>

      <motion.div
        className={styles.collapsible}
        initial={{ height: "0px" }}
        animate={isActive ? { height: "max-content" } : { height: "0px" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <AnimatePresence mode="wait">
          {isActive && (
            <motion.div
              className={styles.menu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
              exit={{ opacity: 0, transition: { delay: 0 } }}
            >
              <div className={styles.horizontal_divisor}></div>

              <Link
                className={styles.auth_link}
                href={session ? "/auth/signout" : "/auth/signin"}
              >
                <span>{session ? "Cerrar sesión" : "Iniciar sesión"}</span>
              </Link>

              <div className={styles.horizontal_divisor}></div>

              <nav className={styles.navigation}>
                {navigationLinks.map((link, index) => (
                  <Link
                    key={index}
                    className={styles.navigation_link}
                    href={link.to}
                  >
                    <span className={styles.navigation_index}>
                      0{index + 1}.
                    </span>
                    <span className={styles.navigation_label}>
                      {link.label}
                    </span>
                  </Link>
                ))}
              </nav>

              <div className={styles.horizontal_divisor}></div>

              <nav className={styles.footer_nav}>
                {footerLinks.map((link, index) => (
                  <Link
                    key={index}
                    className={styles.footer_link}
                    href={link.to}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className={styles.horizontal_divisor}></div>

              <nav className={styles.socials_nav}>
                {socialsLinks.map((link, index) => (
                  <Link key={index} href={link.to}>
                    <Image
                      src={link.icon}
                      alt={link.icon}
                      className={styles.socials_icon}
                      width={32}
                      height={32}
                    />
                  </Link>
                ))}
              </nav>

              <div className={styles.horizontal_divisor}></div>

              <div className={styles.copyright}>
                <p>© 2025. Cine Teatro Renzi.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
