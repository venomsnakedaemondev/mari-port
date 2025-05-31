import React from "react";
import { motion } from "framer-motion";
import { FaChartLine, FaCalculator, FaRegLightbulb } from "react-icons/fa";

const services = [
  {
    icon: <FaChartLine className="text-pink-400 text-4xl mb-4" />,
    title: "Análisis Financiero",
    description:
      "Evaluación detallada de la situación financiera de tu empresa para tomar decisiones estratégicas informadas.",
  },
  {
    icon: <FaCalculator className="text-pink-400 text-4xl mb-4" />,
    title: "Contabilidad",
    description:
      "Gestión contable precisa y transparente, asegurando el cumplimiento normativo y la optimización de recursos.",
  },
  {
    icon: <FaRegLightbulb className="text-pink-400 text-4xl mb-4" />,
    title: "Diagnóstico Empresarial",
    description:
      "Identificación de oportunidades de mejora y optimización de procesos para potenciar el crecimiento de tu negocio.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const Services = () => {
  return (
    <section
      className="flex flex-col items-center justify-center min-h-[60vh] py-10"
      aria-label="Servicios"
      id="services"
    >
      <motion.h2
        className="text-3xl sm:text-4xl font-bold text-pink-400 mb-8 pacifico"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      >
        Servicios
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {services.map((service, idx) => (
          <motion.div
            key={service.title}
            className="bg-gray-900/80 rounded-3xl shadow-xl p-8 flex flex-col items-center text-center border border-pink-500/10 hover:shadow-pink-500/20 transition-shadow duration-300"
            variants={cardVariants}
          >
            {service.icon}
            <h3 className="text-xl font-semibold mb-2 text-pink-300">
              {service.title}
            </h3>
            <p className="text-gray-200 text-base">{service.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Services;
