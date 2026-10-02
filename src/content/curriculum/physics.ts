/**
 * Physics curriculum: 18 topics from mathematical foundations to modern physics.
 *
 * Topic/subtopic ids are the contract used by content files in
 * src/content/physics/<topicId>.ts — keep them stable.
 */

import { l10n, type L10n } from "@/lib/types";
import type { TopicDef } from "./math";

export const physicsCurriculum: TopicDef[] = [
  {
    id: "physics-foundations",
    name: l10n("Herramientas matemáticas para la física", "Mathematical Foundations for Physics"),
    short: l10n(
      "Unidades, notación científica, cifras significativas y lectura de gráficas.",
      "Units, scientific notation, significant figures and reading graphs.",
    ),
    icon: "ruler",
    subtopics: [
      { id: "units", name: l10n("Unidades del SI", "SI units") },
      { id: "scientific-notation", name: l10n("Notación científica", "Scientific notation") },
      { id: "significant-figures", name: l10n("Cifras significativas", "Significant figures") },
      { id: "unit-conversion", name: l10n("Conversión de unidades", "Unit conversion") },
      { id: "proportional-reasoning", name: l10n("Razonamiento proporcional", "Proportional reasoning") },
      { id: "algebraic-rearrangement", name: l10n("Despeje de fórmulas", "Algebraic rearrangement") },
      { id: "graphs", name: l10n("Lectura de gráficas", "Reading graphs") },
      { id: "slopes", name: l10n("Pendientes y áreas", "Slopes and areas") },
      { id: "basic-trigonometry", name: l10n("Trigonometría básica", "Basic trigonometry") },
    ],
    prerequisites: [],
  },
  {
    id: "measurement-vectors",
    name: l10n("Medida y vectores", "Measurement & Vectors"),
    short: l10n(
      "Escalares y vectores, componentes y suma vectorial.",
      "Scalars and vectors, components and vector addition.",
    ),
    icon: "move-diagonal",
    subtopics: [
      { id: "scalar-vector", name: l10n("Escalares y vectores", "Scalar vs vector quantities") },
      { id: "components", name: l10n("Componentes", "Components") },
      { id: "addition", name: l10n("Suma de vectores", "Vector addition") },
      { id: "magnitude-direction", name: l10n("Módulo y dirección", "Magnitude & direction") },
      { id: "unit-vectors", name: l10n("Vectores unitarios", "Unit vectors") },
    ],
    prerequisites: ["physics-foundations"],
  },
  {
    id: "kinematics",
    name: l10n("Cinemática", "Kinematics"),
    short: l10n(
      "Movimiento, velocidad, aceleración, caída libre y proyectiles.",
      "Motion, velocity, acceleration, free fall and projectiles.",
    ),
    icon: "gauge",
    subtopics: [
      { id: "position-displacement", name: l10n("Posición y desplazamiento", "Position & displacement") },
      { id: "velocity", name: l10n("Velocidad", "Velocity") },
      { id: "acceleration", name: l10n("Aceleración", "Acceleration") },
      { id: "constant-velocity", name: l10n("Movimiento uniforme", "Constant velocity") },
      { id: "constant-acceleration", name: l10n("MUA", "Constant acceleration") },
      { id: "free-fall", name: l10n("Caída libre", "Free fall") },
      { id: "motion-graphs", name: l10n("Gráficas de movimiento", "Motion graphs") },
      { id: "projectile-motion", name: l10n("Movimiento de proyectiles", "Projectile motion") },
    ],
    prerequisites: ["physics-foundations", "measurement-vectors"],
  },
  {
    id: "newtonian-mechanics",
    name: l10n("Mecánica newtoniana", "Newtonian Mechanics"),
    short: l10n(
      "Fuerzas, diagramas de cuerpo libre, rozamiento y planos inclinados.",
      "Forces, free-body diagrams, friction and inclines.",
    ),
    icon: "weight",
    subtopics: [
      { id: "forces", name: l10n("Fuerzas", "Forces") },
      { id: "free-body-diagrams", name: l10n("Diagramas de cuerpo libre", "Free-body diagrams") },
      { id: "newtons-laws", name: l10n("Leyes de Newton", "Newton's laws") },
      { id: "friction", name: l10n("Rozamiento", "Friction") },
      { id: "tension", name: l10n("Tensión", "Tension") },
      { id: "inclined-planes", name: l10n("Planos inclinados", "Inclined planes") },
      { id: "connected-systems", name: l10n("Sistemas conectados", "Connected systems") },
    ],
    prerequisites: ["kinematics"],
  },
  {
    id: "circular-gravitation",
    name: l10n("Movimiento circular y gravitación", "Circular Motion & Gravitation"),
    short: l10n(
      "Aceleración centrípeta, fuerza centrípeta y ley de gravitación.",
      "Centripetal acceleration, centripetal force and gravitation.",
    ),
    icon: "orbit",
    subtopics: [
      { id: "centripetal-acceleration", name: l10n("Aceleración centrípeta", "Centripetal acceleration") },
      { id: "centripetal-force", name: l10n("Fuerza centrípeta", "Centripetal force") },
      { id: "circular-motion", name: l10n("Movimiento circular", "Circular motion") },
      { id: "gravitational-force", name: l10n("Fuerza gravitatoria", "Gravitational force") },
      { id: "orbital-motion", name: l10n("Movimiento orbital", "Orbital motion") },
    ],
    prerequisites: ["newtonian-mechanics"],
  },
  {
    id: "work-energy",
    name: l10n("Trabajo, energía y potencia", "Work, Energy & Power"),
    short: l10n(
      "Trabajo, teorema de energía cinética y conservación.",
      "Work, the work-energy theorem and conservation.",
    ),
    icon: "zap",
    subtopics: [
      { id: "work", name: l10n("Trabajo", "Work") },
      { id: "kinetic-energy", name: l10n("Energía cinética", "Kinetic energy") },
      { id: "gravitational-pe", name: l10n("Energía potencial gravitatoria", "Gravitational PE") },
      { id: "elastic-pe", name: l10n("Energía potencial elástica", "Elastic PE") },
      { id: "conservation", name: l10n("Conservación de la energía", "Conservation of energy") },
      { id: "power", name: l10n("Potencia", "Power") },
    ],
    prerequisites: ["newtonian-mechanics"],
  },
  {
    id: "momentum",
    name: l10n("Cantidad de movimiento", "Momentum"),
    short: l10n(
      "Impulso, conservación y choques.",
      "Impulse, conservation and collisions.",
    ),
    icon: "arrow-left-right",
    subtopics: [
      { id: "linear-momentum", name: l10n("Cantidad de movimiento", "Linear momentum") },
      { id: "impulse", name: l10n("Impulso", "Impulse") },
      { id: "conservation", name: l10n("Conservación", "Conservation of momentum") },
      { id: "collisions", name: l10n("Choques", "Collisions") },
      { id: "explosions", name: l10n("Explosiones", "Explosions") },
    ],
    prerequisites: ["newtonian-mechanics"],
  },
  {
    id: "rotational-motion",
    name: l10n("Movimiento rotacional", "Rotational Motion"),
    short: l10n(
      "Velocidad angular, par, inercia y momento angular.",
      "Angular velocity, torque, inertia and angular momentum.",
    ),
    icon: "refresh-cw",
    subtopics: [
      { id: "angular-displacement", name: l10n("Desplazamiento angular", "Angular displacement") },
      { id: "angular-velocity", name: l10n("Velocidad y aceleración angular", "Angular velocity") },
      { id: "torque", name: l10n("Par de fuerza", "Torque") },
      { id: "moment-of-inertia", name: l10n("Momento de inercia", "Moment of inertia") },
      { id: "rotational-energy", name: l10n("Energía rotacional", "Rotational energy") },
      { id: "angular-momentum", name: l10n("Momento angular", "Angular momentum") },
    ],
    prerequisites: ["newtonian-mechanics", "work-energy"],
  },
  {
    id: "fluids",
    name: l10n("Fluidos", "Fluids"),
    short: l10n(
      "Densidad, presión, flotabilidad y continuidad.",
      "Density, pressure, buoyancy and continuity.",
    ),
    icon: "droplets",
    subtopics: [
      { id: "density", name: l10n("Densidad", "Density") },
      { id: "pressure", name: l10n("Presión", "Pressure") },
      { id: "hydrostatic", name: l10n("Presión hidrostática", "Hydrostatic pressure") },
      { id: "buoyancy", name: l10n("Principio de Arquímedes", "Buoyancy") },
      { id: "continuity", name: l10n("Ecuación de continuidad", "Continuity") },
      { id: "bernoulli", name: l10n("Bernoulli", "Bernoulli") },
    ],
    prerequisites: ["physics-foundations"],
  },
  {
    id: "oscillations-waves",
    name: l10n("Oscilaciones y ondas", "Oscillations & Waves"),
    short: l10n(
      "MAS, frecuencia, longitud de onda y ondas estacionarias.",
      "SHM, frequency, wavelength and standing waves.",
    ),
    icon: "audio-waveform",
    subtopics: [
      { id: "shm", name: l10n("Movimiento armónico simple", "Simple harmonic motion") },
      { id: "frequency-period", name: l10n("Frecuencia y periodo", "Frequency & period") },
      { id: "wavelength", name: l10n("Longitud de onda", "Wavelength") },
      { id: "wave-speed", name: l10n("Velocidad de onda", "Wave speed") },
      { id: "superposition", name: l10n("Superposición", "Superposition") },
      { id: "standing-waves", name: l10n("Ondas estacionarias", "Standing waves") },
    ],
    prerequisites: ["newtonian-mechanics", "circular-gravitation"],
  },
  {
    id: "thermal-physics",
    name: l10n("Física térmica", "Thermal Physics"),
    short: l10n(
      "Temperatura, calor, dilatación y gases ideales.",
      "Temperature, heat, expansion and ideal gases.",
    ),
    icon: "thermometer",
    subtopics: [
      { id: "temperature", name: l10n("Temperatura", "Temperature") },
      { id: "heat", name: l10n("Calor", "Heat") },
      { id: "thermal-expansion", name: l10n("Dilatación térmica", "Thermal expansion") },
      { id: "calorimetry", name: l10n("Calorimetría", "Calorimetry") },
      { id: "ideal-gases", name: l10n("Gases ideales", "Ideal gases") },
      { id: "processes", name: l10n("Procesos termodinámicos", "Thermodynamic processes") },
      { id: "first-law", name: l10n("Primera ley", "First law") },
    ],
    prerequisites: ["physics-foundations"],
  },
  {
    id: "electrostatics",
    name: l10n("Electrostática", "Electrostatics"),
    short: l10n(
      "Carga, ley de Coulomb, campo y potencial eléctrico.",
      "Charge, Coulomb's law, electric field and potential.",
    ),
    icon: "sparkles",
    subtopics: [
      { id: "charge", name: l10n("Carga eléctrica", "Electric charge") },
      { id: "coulomb", name: l10n("Ley de Coulomb", "Coulomb's law") },
      { id: "electric-field", name: l10n("Campo eléctrico", "Electric field") },
      { id: "potential", name: l10n("Potencial eléctrico", "Electric potential") },
      { id: "potential-energy", name: l10n("Energía potencial eléctrica", "Potential energy") },
    ],
    prerequisites: ["physics-foundations"],
  },
  {
    id: "circuits",
    name: l10n("Circuitos eléctricos", "Electric Circuits"),
    short: l10n(
      "Ley de Ohm, serie y paralelo, Kirchhoff y potencia.",
      "Ohm's law, series and parallel, Kirchhoff and power.",
    ),
    icon: "circuit-board",
    subtopics: [
      { id: "current", name: l10n("Corriente", "Current") },
      { id: "voltage-resistance", name: l10n("Tensión y resistencia", "Voltage & resistance") },
      { id: "ohms-law", name: l10n("Ley de Ohm", "Ohm's law") },
      { id: "series", name: l10n("Circuitos en serie", "Series circuits") },
      { id: "parallel", name: l10n("Circuitos en paralelo", "Parallel circuits") },
      { id: "kirchhoff", name: l10n("Leyes de Kirchhoff", "Kirchhoff's laws") },
      { id: "electrical-power", name: l10n("Potencia eléctrica", "Electrical power") },
    ],
    prerequisites: ["electrostatics"],
  },
  {
    id: "magnetism",
    name: l10n("Magnetismo", "Magnetism"),
    short: l10n(
      "Campos magnéticos, fuerza sobre cargas e inducción.",
      "Magnetic fields, force on charges and induction.",
    ),
    icon: "magnet",
    subtopics: [
      { id: "magnetic-fields", name: l10n("Campos magnéticos", "Magnetic fields") },
      { id: "magnetic-force", name: l10n("Fuerza magnética", "Magnetic force") },
      { id: "charged-particles", name: l10n("Partículas cargadas", "Charged particles") },
      { id: "wires", name: l10n("Hilos con corriente", "Current-carrying wires") },
      { id: "induction-basics", name: l10n("Inducción básica", "Basic induction") },
    ],
    prerequisites: ["electrostatics"],
  },
  {
    id: "induction",
    name: l10n("Inducción electromagnética", "Electromagnetic Induction"),
    short: l10n(
      "Flujo magnético, ley de Faraday y ley de Lenz.",
      "Magnetic flux, Faraday's law and Lenz's law.",
    ),
    icon: "radio",
    subtopics: [
      { id: "magnetic-flux", name: l10n("Flujo magnético", "Magnetic flux") },
      { id: "faraday", name: l10n("Ley de Faraday", "Faraday's law") },
      { id: "lenz", name: l10n("Ley de Lenz", "Lenz's law") },
      { id: "applications", name: l10n("Aplicaciones", "Applications") },
    ],
    prerequisites: ["magnetism"],
  },
  {
    id: "optics",
    name: l10n("Óptica", "Optics"),
    short: l10n(
      "Reflexión, refracción, lentes y espejos.",
      "Reflection, refraction, lenses and mirrors.",
    ),
    icon: "eye",
    subtopics: [
      { id: "reflection", name: l10n("Reflexión", "Reflection") },
      { id: "refraction", name: l10n("Refracción", "Refraction") },
      { id: "snell", name: l10n("Ley de Snell", "Snell's law") },
      { id: "lenses", name: l10n("Lentes", "Lenses") },
      { id: "mirrors", name: l10n("Espejos", "Mirrors") },
      { id: "image-formation", name: l10n("Formación de imágenes", "Image formation") },
    ],
    prerequisites: ["physics-foundations"],
  },
  {
    id: "modern-physics",
    name: l10n("Física moderna introductoria", "Introductory Modern Physics"),
    short: l10n(
      "Fotones, efecto fotoeléctrico y nociones de relatividad.",
      "Photons, the photoelectric effect and basic relativity.",
    ),
    icon: "atom",
    subtopics: [
      { id: "photons", name: l10n("Fotones", "Photons") },
      { id: "photoelectric", name: l10n("Efecto fotoeléctrico", "Photoelectric effect") },
      { id: "atomic-models", name: l10n("Modelos atómicos", "Atomic models") },
      { id: "relativity", name: l10n("Relatividad básica", "Basic relativity") },
      { id: "nuclear", name: l10n("Nociones nucleares", "Nuclear basics") },
    ],
    prerequisites: ["physics-foundations", "circuits"],
  },
  {
    id: "physics-mixed",
    name: l10n("Práctica mixta de física", "Mixed Physics Practice"),
    short: l10n(
      "Problemas de examen que combinan varias áreas.",
      "Exam-style problems combining several areas.",
    ),
    icon: "shuffle",
    subtopics: [
      { id: "multi-step", name: l10n("Varios pasos", "Multi-step") },
      { id: "mixed-concepts", name: l10n("Conceptos mezclados", "Mixed concepts") },
      { id: "exam-style", name: l10n("Estilo examen", "Exam-style problems") },
    ],
    prerequisites: ["kinematics", "newtonian-mechanics", "work-energy"],
  },
];

export const physicsTopicIds = physicsCurriculum.map((t) => t.id);
