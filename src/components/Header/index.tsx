"use client";

import Link from "next/link";
import Image from "next/image";

// Styles
import styles from "./styles.module.css";

// Hooks
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

import { authClient } from "@/lib/auth/client";

export default function Header() {
  const { data: session, isPending, error, refetch } = authClient.useSession();
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  const variants = {
    open: {
      height: "max-content",
      padding: "25px 0",
    },
    closed: {
      height: "0px",
      padding: "0",
      transition: { delay: 0.3 },
    },
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
            src="/icons/facebook-logo.svg"
            alt="Logo"
            width={32}
            height={32}
            className={styles.icon}
          />
        </Link>

        <div className={styles.button_container}>
          <span className={styles.route}>{pathname}</span>

          <div className={styles.divisor}></div>

          <div className={styles.button} onClick={() => setIsActive(!isActive)}>
            <AnimatePresence>
              {isActive ? (
                <motion.img
                  className={styles.icon}
                  key="close"
                  src="/icons/x.svg"
                  alt="Close"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                />
              ) : (
                <motion.img
                  className={styles.icon}
                  key="hamburger"
                  src="/icons/list.svg"
                  alt="Hamburger"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      <motion.div
        className={styles.collapsible}
        variants={variants}
        initial="closed"
        animate={isActive ? "open" : "closed"}
      >
        <AnimatePresence>
          {isActive && (
            <motion.div
              className={styles.menu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
              exit={{ opacity: 0 }}
            >
              <div className={styles.horizontal_divisor}></div>

              <Link href="/sign-in">
                <span>Sign In</span>
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
