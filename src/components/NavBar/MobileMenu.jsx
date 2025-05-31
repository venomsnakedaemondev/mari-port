// MobileMenu.js
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaProjectDiagram, FaEnvelope } from "react-icons/fa"; // Import icons
import { TbBusinessplan } from "react-icons/tb"; // Import TbBusinessplan for consistency
import "./nav.css";
const menuVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  visible: {
    opacity: 1,
    height: "100vh",
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

const linkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 + 0.2 },
  }),
};

const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  const links = [
    { name: "Home", id: "home", icon: <FaHome /> },
    { name: "Servicios", id: "services", icon: <TbBusinessplan /> },
    { name: "Proyectos", id: "projects", icon: <FaProjectDiagram /> },
    { name: "Contacto", id: "contact", icon: <FaEnvelope /> },
  ];

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          className="fixed top-0 left-0 w-full z-40 bg-black/80 flex flex-col items-center justify-center text-center px-6"
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Close Button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-5 right-6 text-white text-4xl hover:text-pink-400 transition-colors duration-300"
            aria-label="Close Menu"
          >
            &times;
          </button>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-10">
            {links.map(({ name, icon, id }, i) => (
              <motion.a
                key={name}
                href={`#${id}`}
                className="text-white text-3xl font-medium hover:text-pink-400 transition duration-300 relative flex items-center"
                onClick={() => setMenuOpen(false)}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                {icon} {/* Add icon to links */}
                <span className="ml-2">{name}</span>
                <motion.span
                  className="absolute left-0 -bottom-1 h-[2px] bg-pink-400"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
