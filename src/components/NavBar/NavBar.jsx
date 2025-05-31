import React from "react";
import { motion } from "framer-motion";
import { FaHome, FaProjectDiagram, FaEnvelope } from "react-icons/fa"; // Import icons
import "./nav.css";
import { MdCurrencyExchange } from "react-icons/md";
import { TbBusinessplan } from "react-icons/tb";

const navLinks = [
  { name: "Inicio", id: "home", icon: <FaHome /> },
  { name: "Servicios", id: "services", icon: <TbBusinessplan /> },
  { name: "Proyectos", id: "projects", icon: <FaProjectDiagram /> },
  { name: "Contacto", id: "contact", icon: <FaEnvelope /> },
];

const NavBar = ({ menuOpen, setMenuOpen }) => {
  const navbarVariants = {
    hidden: { y: -60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  const linkVariants = {
    hover: {
      scale: 1.05,
      color: "#b81478",
    },
    tap: { scale: 0.95 },
  };

  const logoVariants = {
    hover: {
      scale: 1.1,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  const lineVariants = {
    initial: { rotate: 0, y: 0, opacity: 1 },
    open: (i) => ({
      rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
      y: i === 0 ? 6 : i === 2 ? -6 : 0,
      opacity: i === 1 ? 0 : 1,
      transition: { duration: 0.3 },
    }),
  };

  return (
    <motion.nav
      className="navbar"
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.a
            href="#home"
            className="text-2xl font-extrabold text-white tracking-tight font-mono flex items-center"
            variants={logoVariants}
            whileHover="hover"
          >
            <MdCurrencyExchange className="mr-2 text-pink-400" />{" "}
            {/* Add icon to logo */}
            Mari
            <span className="text-pink-400 hover:text-pink-600">.Finanzas</span>
          </motion.a>

          {/* Hamburger menu */}
          <div
            className="w-8 h-6 relative flex items-center justify-center cursor-pointer z-50 md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block absolute h-0.5 w-full bg-white"
                variants={lineVariants}
                initial="initial"
                animate={menuOpen ? "open" : "initial"}
                custom={i}
              />
            ))}
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map(({ name, icon, id }) => (
              <motion.a
                key={name}
                href={`#${id}`}
                className="relative text-gray-300 font-medium transition-colors duration-300 hover:text-pink-400 flex items-center"
                variants={linkVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {icon} {/* Add icon to links */}
                <span className="ml-2">{name}</span>
                {/* Línea inferior animada, solo una línea y sin doble render */}
                <span
                  className="nav-underline pointer-events-none absolute left-0 -bottom-1 h-[2px] bg-pink-400 transition-all duration-300"
                  style={{ width: "0%" }} // Explicitly set initial width for better cross-browser compatibility
                />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
