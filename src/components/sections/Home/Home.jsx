import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import avatar from "./image.png";
import cvFile from "./cv.pdf";
import textos from "./textos.json";
import RequestPageIcon from "@mui/icons-material/RequestPage";

const Spinner = () => (
  <span
    className="inline-block w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"
    role="status"
    aria-label="Cargando"
  />
);

const Home = () => {
  const [typedText, setTypedText] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const fullText = textos.fullName;
  const imageRef = useRef(null);
  const textRef = useRef(null);

  // Palabras a resaltar
  const highlightedWords = [
    "Especialista",
    "contabilidad",
    "enfoco",
    "optimizar procesos",
    "decisiones estratégicas informadas",
    "analítica",
    "adaptable",
  ];

  // Efecto de escritura
  useEffect(() => {
    let i = 0;
    let timeoutId;

    const typeEffect = () => {
      if (i <= fullText.length) {
        setTypedText(fullText.substring(0, i));
        i++;
        timeoutId = setTimeout(typeEffect, 70 + Math.random() * 30);
      } else {
        setTimeout(() => setShowButton(true), 200);
      }
    };

    typeEffect();

    return () => clearTimeout(timeoutId);
  }, [fullText]);

  // Observador de intersección para animaciones
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) observer.observe(imageRef.current);
    if (textRef.current) observer.observe(textRef.current);

    return () => {
      if (imageRef.current) observer.unobserve(imageRef.current);
      if (textRef.current) observer.unobserve(textRef.current);
    };
  }, []);

  // Detección de móvil
  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.matchMedia("(max-width: 640px)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Efecto para partículas del fondo
  useEffect(() => {
    const createParticles = () => {
      const container = document.querySelector(".particles");
      if (!container) return;

      container.innerHTML = "";
      const particleCount = Math.floor(window.innerWidth / 10);

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");

        // Posición y tamaño aleatorio
        const size = Math.random() * 8 + 2;
        const posX = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 10;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;

        // Color aleatorio entre tonos rosados/morados
        const colors = [
          "rgba(236, 72, 153, 0.4)",
          "rgba(219, 39, 119, 0.4)",
          "rgba(192, 38, 211, 0.4)",
          "rgba(168, 85, 247, 0.4)",
        ];
        particle.style.background =
          colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(particle);
      }
    };

    createParticles();
    window.addEventListener("resize", createParticles);

    return () => window.removeEventListener("resize", createParticles);
  }, []);

  const handleDownloadCV = (e) => {
    if (isLoading) {
      e.preventDefault();
      return;
    }
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <section
      className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 text-white bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 rounded-4xl shadow-2xl pt-24 pb-8 overflow-hidden relative"
      id="home"
    >
      {/* Fondo animado */}
      <div className="animated-background">
        <div className="particles"></div>
        <svg
          className="sales-graph"
          viewBox="0 0 500 300"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ejes */}
          <line
            x1="50"
            y1="250"
            x2="450"
            y2="250"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
          />
          <line
            x1="50"
            y1="250"
            x2="50"
            y2="50"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
          />

          {/* Línea de ventas animada e infinita */}
          <path
            className="graph-line animated-graph-line"
            d="M50,200 C150,100 200,150 250,120 S350,180 450,80"
            stroke="url(#salesGradient)"
            strokeWidth="4"
            fill="none"
            filter="url(#glow)"
          />

          {/* Puntos en el gráfico animados */}
          {[
            { cx: 50, cy: 200, delay: 0.5 },
            { cx: 150, cy: 100, delay: 1 },
            { cx: 250, cy: 120, delay: 2 },
            { cx: 350, cy: 180, delay: 3 },
            { cx: 450, cy: 80, delay: 4 },
          ].map((point, idx) => (
            <circle
              key={idx}
              className="graph-circle animated-graph-circle"
              cx={point.cx}
              cy={point.cy}
              r="7"
              fill="#ef4444"
              style={{ animationDelay: `${point.delay}s` }}
              filter="url(#glow)"
            />
          ))}

          {/* Gradiente para la línea (animado e infinito, variando tonos de rojo) */}
          <defs>
            <linearGradient
              id="salesGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#ef4444">
                <animate
                  attributeName="stop-color"
                  values="#ef4444;#f87171;#f43f5e;#ef4444"
                  dur="5s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#f43f5e">
                <animate
                  attributeName="stop-color"
                  values="#f43f5e;#ef4444;#f87171;#f43f5e"
                  dur="5s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Etiquetas */}
          <text x="30" y="130" fill="rgba(255,255,255,0.7)" fontSize="12">
            Ventas
          </text>
          <text x="460" y="265" fill="rgba(255,255,255,0.7)" fontSize="12">
            Tiempo
          </text>
          <text
            x="200"
            y="40"
            fill="rgba(255,255,255,0.9)"
            fontSize="14"
            fontWeight="bold"
          >
            Crecimiento Anual
          </text>
        </svg>
      </div>

      {/* Contenido principal */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center h-full relative z-10">
        <div
          ref={textRef}
          className="text-center lg:text-left space-y-6 order-2 lg:order-1"
          aria-live="polite"
        >
          <div className="overflow-hidden">
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-pink-400 drop-shadow-lg pacifico ${
                typedText === fullText ? "animate-breath" : ""
              }`}
              aria-label={fullText}
            >
              <span aria-live="polite">{typedText}</span>
              <span
                className={`inline-block w-1 h-10 sm:h-12 bg-pink-400 ml-2 align-middle ${
                  typedText === fullText ? "opacity-0" : "animate-blink"
                }`}
                aria-hidden="true"
              />
            </h1>
          </div>

          <p className="text-base sm:text-lg md:text-xl text-gray-100 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
            {textos.description.split(" ").map((word, index) => (
              <span
                key={index}
                className={
                  highlightedWords.includes(word.replace(/[.,]/g, ""))
                    ? "highlight"
                    : ""
                }
              >
                {word}{" "}
              </span>
            ))}
          </p>

          {showButton && (
            <div className="animate-slide-up mt-8">
              <a
                href={cvFile}
                download="CV_Maria_Toro_Serres.pdf"
                className={`inline-flex items-center px-6 sm:px-7 py-3 sm:py-3.5 text-base sm:text-lg font-medium rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleDownloadCV}
                aria-label={textos.downloadButton}
                aria-busy={isLoading}
                tabIndex={isLoading ? -1 : 0}
              >
                {isLoading ? (
                  <span className="inline-flex items-center">
                    <Spinner />
                    <span>Cargando...</span>
                    <span className="sr-only">Descarga en progreso</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center">
                    {textos.downloadButton}
                    <RequestPageIcon
                      className="ml-2 text-black group-hover:text-white transition-colors duration-300"
                      aria-hidden="true"
                      titleAccess="Icono de descarga de CV"
                    />
                  </span>
                )}
              </a>
            </div>
          )}
        </div>

        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div
            className={`relative w-48 h-48 xs:w-56 xs:h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden shadow-2xl group isolate glow-effect ${
              isMobile ? "animate-mobile-photo" : "animate-desktop-photo"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 via-purple-600/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500 z-10" />
            <img
              ref={imageRef}
              src={avatar}
              alt={textos.altText}
              className={`w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-in-out ${
                isMobile ? "" : "float-animation"
              }`}
              loading="eager"
              width="384"
              height="384"
            />
            <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-red-500/40 transition-all duration-500 z-0 group-hover:shadow-[0_0_0_4px_rgba(239,68,68,0.3)]" />
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_30px_10px_rgba(0,0,0,0.2)]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
