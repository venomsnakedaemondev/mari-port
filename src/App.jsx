import {
  useState,
  useEffect,
  useCallback,
  useRef,
  lazy,
  Suspense,
} from "react";
import { LoadingScreen } from "./components/LoadingScreen/LoadingScreen";
import "./index.css";
import NavBar from "./components/NavBar/NavBar";
import MobileMenu from "./components/NavBar/MobileMenu";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import ErrorBoundary from "./components/ErrorBoundary";

const Home = lazy(() => import("./components/sections/Home/Home.jsx"));
const ServicesSection = lazy(() =>
  import("./components/sections/services/Services.jsx")
);
const ProjectsSection = lazy(() =>
  import("./components/sections/Projects/Projects")
);
const ContactSection = lazy(() =>
  import("./components/sections/Contact/Contact")
);

const sections = [
  {
    id: "home",
    component: Home,
    bg: "bg-gradient-to-b from-black to-gray-900",
    padding: "pt-24 pb-12",
  },
  {
    id: "services",
    component: ServicesSection,
    bg: "bg-gradient-to-b from-gray-900 to-black",
    padding: "py-20",
  },
  {
    id: "projects",
    component: ProjectsSection,
    bg: "bg-gradient-to-b from-black to-gray-900",
    padding: "py-20",
  },
  {
    id: "contact",
    component: ContactSection,
    bg: "bg-gradient-to-b from-gray-900 to-black",
    padding: "py-20",
  },
];

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const resizeTimer = useRef(null);
  const scrollY = useRef(0);

  // Progreso de scroll
  const { scrollYProgress } = useScroll();
  const scrollX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (menuOpen) {
      scrollY.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY.current}px`;
      document.body.style.width = "100%";
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY.current);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
      clearTimeout(resizeTimer.current);
      resizeTimer.current = setTimeout(() => {
        document.documentElement.style.scrollBehavior = "smooth";
      }, 200);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer.current);
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        await Promise.all([
          // LoadingScreen manages its own perceived duration.
          // Ensure fonts are ready before considering assets "loaded" for pre-rendering.
          document.fonts.ready,
        ]);
        // Preload other sections after essential assets are ready
        requestIdleCallback(() => {
          import("./components/sections/About/About"); // Example, ensure this is used or remove
          import("./components/sections/Projects/Projects");
          import("./components/sections/Contact/Contact");
        });
        // setIsLoaded(true) is now primarily handled by LoadingScreen's onComplete
      } catch (error) {
        console.error("Error during loading:", error);
        setIsLoaded(true);
      }
    };

    loadAssets();
    // No need for setIsLoaded in the dependency array if it's not set here.
    // If loadAssets were to set isLoaded, it should be included.
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen bg-black text-gray-100 antialiased">
        {/* Barra de progreso de scroll */}
        <motion.div
          className="fixed top-0 left-0 h-1 bg-pink-500 z-50"
          style={{ scaleX: scrollX, transformOrigin: "left" }}
        />

        <AnimatePresence mode="wait">
          {!isLoaded && (
            <motion.div
              key="loading" // LoadingScreen handles its own initial/animate opacity
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            >
              <LoadingScreen onComplete={() => setIsLoaded(true)} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="min-h-screen"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: isLoaded ? 0 : 0.5, // Adjust delay as needed after LoadingScreen finishes
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <NavBar menuOpen={menuOpen} setMenuOpen={toggleMenu} />
          <MobileMenu menuOpen={menuOpen} setMenuOpen={toggleMenu} />

          <main>
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center bg-black">
                  <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              }
            >
              <ErrorBoundary>
                {sections.map(({ id, component: Component, bg, padding }) => (
                  <motion.section
                    key={id}
                    id={id}
                    // App.jsx now controls all padding and min-height for sections
                    className={`min-h-screen flex flex-col items-center justify-center ${bg} ${padding} px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 transition-colors duration-500`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Component />
                  </motion.section>
                ))}
              </ErrorBoundary>
            </Suspense>
          </main>
        </motion.div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
