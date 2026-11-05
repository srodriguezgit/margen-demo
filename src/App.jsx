
import { useEffect, useRef, useState } from "react";
import "./App.css";

/* =========================================
   MARGEN — CONTENIDO
========================================= */

const perfiles = [
  {
    numero: "01",
    titulo: "Profesionales independientes",
    descripcion:
      "Inscripciones, facturación, monotributo y seguimiento de las obligaciones de tu actividad.",
    etiqueta: "EJERCICIO PROFESIONAL",
  },
  {
    numero: "02",
    titulo: "Emprendedores y comercios",
    descripcion:
      "Organización administrativa, impuestos y asesoramiento para acompañar el crecimiento de tu negocio.",
    etiqueta: "NEGOCIOS EN MOVIMIENTO",
  },
  {
    numero: "03",
    titulo: "Empresas y PyMEs",
    descripcion:
      "Contabilidad, liquidación de sueldos, impuestos y asistencia en la gestión de sociedades.",
    etiqueta: "GESTIÓN EMPRESARIAL",
  },
];

const servicios = [
  {
    id: "impuestos",
    numero: "01",
    titulo: "Asesoramiento impositivo",
    etiqueta: "GESTIÓN TRIBUTARIA",
    descripcion:
      "Identificamos las obligaciones fiscales de tu actividad y te acompañamos en su cumplimiento. Información clara para que sepas qué presentar, cuándo y por qué.",
    puntos: [
      "Monotributo y régimen general",
      "IVA e Impuesto a las Ganancias",
      "Ingresos Brutos",
      "Declaraciones y vencimientos",
    ],
  },
  {
    id: "contabilidad",
    numero: "02",
    titulo: "Contabilidad para empresas",
    etiqueta: "GESTIÓN CONTABLE",
    descripcion:
      "Organizamos y analizamos la información contable de tu empresa. Un trabajo orientado al cumplimiento y a contar con información útil para tomar decisiones.",
    puntos: [
      "Registraciones y conciliaciones",
      "Estados contables",
      "Asesoramiento societario",
      "Informes para la gestión",
    ],
  },
  {
    id: "laboral",
    numero: "03",
    titulo: "Gestión laboral",
    etiqueta: "ADMINISTRACIÓN DE PERSONAL",
    descripcion:
      "Acompañamos la administración laboral de tu negocio con procesos claros y seguimiento de las obligaciones vinculadas con tus empleados.",
    puntos: [
      "Liquidación de haberes",
      "Altas y bajas de empleados",
      "Cargas sociales",
      "Documentación laboral",
    ],
  },
  {
    id: "emprendedores",
    numero: "04",
    titulo: "Emprendedores y profesionales",
    etiqueta: "PRIMEROS PASOS",
    descripcion:
      "Si estás comenzando una actividad, te ayudamos a comprender tus obligaciones y organizar tus primeros pasos administrativos y fiscales.",
    puntos: [
      "Inscripciones fiscales",
      "Orientación sobre regímenes",
      "Facturación electrónica",
      "Organización inicial de la actividad",
    ],
  },
];

const necesidades = [
  {
    texto: "Voy a empezar a facturar",
    servicio: "emprendedores",
  },
  {
    texto: "Necesito ordenar mis impuestos",
    servicio: "impuestos",
  },
  {
    texto: "Tengo empleados",
    servicio: "laboral",
  },
  {
    texto: "Administro una empresa",
    servicio: "contabilidad",
  },
];

const pasos = [
  {
    numero: "01",
    titulo: "Entendemos tu situación",
    descripcion:
      "Conversamos sobre tu actividad, el régimen en el que operás y las necesidades que querés resolver.",
    detalle: "PRIMER CONTACTO",
  },
  {
    numero: "02",
    titulo: "Organizamos el trabajo",
    descripcion:
      "Definimos los servicios necesarios, la documentación a reunir y una modalidad de comunicación.",
    detalle: "DIAGNÓSTICO Y ALCANCE",
  },
  {
    numero: "03",
    titulo: "Hacemos seguimiento",
    descripcion:
      "Trabajamos sobre las obligaciones de cada período y mantenemos ordenada la información relevante.",
    detalle: "GESTIÓN CONTINUA",
  },
];

const vistasDocumento = [
  {
    nombre: "Documentación",
    numero: "01",
    titulo: "Todo empieza con información ordenada.",
    descripcion:
      "Un control claro de los documentos necesarios para trabajar sobre cada período.",
    items: [
      "Comprobantes de ventas",
      "Comprobantes de compras",
      "Movimientos y documentación",
      "Información del período",
    ],
  },
  {
    nombre: "Obligaciones",
    numero: "02",
    titulo: "Cada obligación, en su momento.",
    descripcion:
      "Identificación y seguimiento de los trámites y presentaciones que correspondan.",
    items: [
      "Revisión de obligaciones aplicables",
      "Preparación de información",
      "Control de vencimientos",
      "Verificación de presentaciones",
    ],
  },
  {
    nombre: "Seguimiento",
    numero: "03",
    titulo: "Información para avanzar.",
    descripcion:
      "Una visión más clara del trabajo realizado y los próximos pasos.",
    items: [
      "Resumen de tareas",
      "Documentación pendiente",
      "Próximas obligaciones",
      "Consultas y seguimiento",
    ],
  },
];

const formularioInicial = {
  nombre: "",
  email: "",
  perfil: "",
  servicio: "Asesoramiento impositivo",
  mensaje: "",
};

/* =========================================
   COMPONENTE PRINCIPAL
========================================= */

export default function App() {
  const heroRef = useRef(null);

  const progresoRef = useRef(null);
  const [mostrarWhatsapp, setMostrarWhatsapp] = useState(false);

  const [servicioActivo, setServicioActivo] = useState("impuestos");
  const [vistaDocumento, setVistaDocumento] = useState(0);
  const [formulario, setFormulario] = useState(formularioInicial);
  const [enviando, setEnviando] = useState(false);
  const [estadoEnvio, setEstadoEnvio] = useState(null);

  const servicioSeleccionado = servicios.find(
    (servicio) => servicio.id === servicioActivo
  );

  const documentoActual = vistasDocumento[vistaDocumento];

  const endpointFormulario = import.meta.env.VITE_FORM_ENDPOINT;

  const whatsapp = (
    import.meta.env.VITE_CONTACT_WHATSAPP || ""
  ).replace(/\D/g, "");

  const emailContacto = (
  import.meta.env.VITE_CONTACT_EMAIL || ""
).trim();

const instagramContacto = (
  import.meta.env.VITE_CONTACT_INSTAGRAM || ""
).trim();

  useEffect(() => {
  let frameId = null;

  function actualizarScroll() {
    frameId = null;

    // Progreso de la línea
    const linea = progresoRef.current;

    if (linea) {
      const rect = linea.getBoundingClientRect();

      const inicio = window.innerHeight * 0.85;
      const fin = window.innerHeight * 0.25;

      const progreso = Math.max(
        0,
        Math.min(1, (inicio - rect.top) / (inicio - fin))
      );

      linea.style.setProperty("--progreso", progreso.toString());
    }

    // Mostrar WhatsApp después del hero
    const finalHero =
      heroRef.current?.getBoundingClientRect().bottom ?? 0;

    const contacto = document
      .getElementById("contacto")
      ?.getBoundingClientRect();

    const llegoAContacto =
      contacto && contacto.top < window.innerHeight * 0.8;

    setMostrarWhatsapp(
      finalHero < window.innerHeight * 0.15 &&
      !llegoAContacto
    );
  }

  function solicitarActualizacion() {
    if (frameId === null) {
      frameId = window.requestAnimationFrame(actualizarScroll);
    }
  }

  actualizarScroll();

  window.addEventListener("scroll", solicitarActualizacion, {
    passive: true,
  });

  window.addEventListener("resize", solicitarActualizacion);

  return () => {
    window.removeEventListener("scroll", solicitarActualizacion);
    window.removeEventListener("resize", solicitarActualizacion);

    if (frameId !== null) {
      window.cancelAnimationFrame(frameId);
    }
  };
}, []);

  /* Movimiento del hero */

  function handlePointerMove(event) {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    heroRef.current?.style.setProperty("--move-x", `${x * 22}px`);
    heroRef.current?.style.setProperty("--move-y", `${y * 22}px`);
  }

  function resetPointer() {
    heroRef.current?.style.setProperty("--move-x", "0px");
    heroRef.current?.style.setProperty("--move-y", "0px");
  }

  /* Interacción con servicios */

  function seleccionarServicio(id) {
    setServicioActivo(id);
  }

  function consultarServicio() {
    setFormulario((actual) => ({
      ...actual,
      servicio: servicioSeleccionado.titulo,
    }));

    const reducirMovimiento = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    document.getElementById("contacto")?.scrollIntoView({
      behavior: reducirMovimiento ? "auto" : "smooth",
    });
  }

  /* Formulario */

  function actualizarCampo(event) {
    const { name, value } = event.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value,
    }));

    setEstadoEnvio(null);
  }

  async function enviarFormulario(event) {
    event.preventDefault();

    if (!endpointFormulario) {
      setEstadoEnvio({
        tipo: "info",
        mensaje:
          "El formulario está en modo demostración. Todavía no se configuró el envío.",
      });
      return;
    }

    setEnviando(true);
    setEstadoEnvio(null);

    try {
      const response = await fetch(endpointFormulario, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...formulario,
          _subject: "Nueva consulta desde Margen",
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar formulario");
      }

      setEstadoEnvio({
        tipo: "success",
        mensaje:
          "Tu consulta fue enviada correctamente. Gracias por escribirnos.",
      });

      setFormulario(formularioInicial);
    } catch {
      setEstadoEnvio({
        tipo: "error",
        mensaje:
          "No pudimos enviar tu consulta. Intentá nuevamente.",
      });
    } finally {
      setEnviando(false);
    }
  }

  const mensajeWhatsapp = encodeURIComponent(
    `Hola, quisiera consultar por ${formulario.servicio}.`
  );

  return (
    <div className="site">
      {/* HEADER */}

      <header className="header">
        <a
          href="#inicio"
          className="brand"
          aria-label="Margen, inicio"
        >
          <span className="brand-name">
            margen<span className="brand-dot">.</span>
          </span>
          <span className="brand-subtitle">ESTUDIO CONTABLE</span>
        </a>

        <nav className="nav" aria-label="Navegación principal">
          <a href="#inicio">Inicio</a>
          <a href="#enfoque">Enfoque</a>
          <a href="#servicios">Servicios</a>
          <a href="#estudio">Estudio</a>
        </nav>

        <a className="header-cta" href="#contacto">
          Hablemos
        </a>
      </header>

      <main>
        {/* 01 — HERO */}

        <section
          className="hero"
          id="inicio"
          ref={heroRef}
          aria-labelledby="hero-title"
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointer}
        >
          <div className="hero-orbits" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <div className="orbit-point" />
          </div>

          <span
            className="hero-side hero-side-left"
            aria-hidden="true"
          >
            CONTABILIDAD / ASESORAMIENTO
          </span>

          <span
            className="hero-side hero-side-right"
            aria-hidden="true"
          >
            CLARIDAD PARA DECIDIR
          </span>

          <div className="hero-content">
            <p className="eyebrow hero-eyebrow">
              MARGEN / ESTUDIO CONTABLE E IMPOSITIVO
            </p>

            <h1 className="hero-title" id="hero-title">
              Contabilidad clara.
              <br />
              <em>Decisiones con perspectiva.</em>
            </h1>

            <p className="hero-description">
              Asesoramiento impositivo, liquidación de sueldos y
              gestión contable para profesionales, emprendedores
              y PyMEs.
            </p>

            <div className="hero-acciones">
              <a href="#contacto" className="button-primary">
                Hacer una consulta
              </a>

              <a href="#servicios" className="hero-link">
                Explorar servicios
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="hero-bottom">
            <span>MONOTRIBUTO / IMPUESTOS</span>

            <a href="#enfoque" className="scroll-indicator">
              EXPLORAR
              <span className="scroll-line" aria-hidden="true" />
            </a>

            <span>SOCIEDADES / SUELDOS</span>
          </div>
        </section>

        {/* 02 — PERFILES DE CLIENTES */}

        <section className="enfoque" id="enfoque">
          <div className="section-heading">
            <div className="section-label reveal">
              <span className="label-line" />
              <span>01 / A QUIÉNES ACOMPAÑAMOS</span>
            </div>

            <div className="section-intro reveal">
              <h2>
                Cada actividad tiene
                <br />
                <em>sus propias necesidades.</em>
              </h2>

              <p>
                No requiere lo mismo quien comienza a facturar
                que una empresa con empleados. Por eso el
                asesoramiento se adapta a cada actividad
                y a sus obligaciones.
              </p>
            </div>
          </div>

          <div className="principios perfiles-grid">
            {perfiles.map((perfil) => (
              <article className="principio perfil reveal" key={perfil.numero}>
                <span className="principio-numero">
                  {perfil.numero} / 03
                </span>

                <div className="perfil-contenido">
                  <span className="perfil-etiqueta">
                    {perfil.etiqueta}
                  </span>

                  <h3>{perfil.titulo}</h3>
                  <p>{perfil.descripcion}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="enfoque-bottom">
            <span>MARGEN / ASESORAMIENTO CONTABLE</span>
            <span>CADA ACTIVIDAD, UNA NECESIDAD DISTINTA</span>
          </div>
        </section>

        {/* 03 — SERVICIOS */}

        <section className="servicios" id="servicios">
          <div className="servicios-top reveal">
            <div className="section-kicker">
              <span className="kicker-line" />
              02 / SERVICIOS
            </div>

            <div className="servicios-intro">
              <h2>
                Servicios contables,
                <br />
                <span>sin vueltas.</span>
              </h2>

              <p>
                Desde las primeras inscripciones hasta
                la administración de una empresa.
                Conocé las áreas en las que podemos acompañarte.
              </p>
            </div>
          </div>

          {/* Selector de necesidades */}

          <div className="necesidades reveal">
            <div className="necesidades-intro">
              <span>ENCONTRÁ TU SERVICIO</span>
              <h3>¿Qué necesitás resolver?</h3>
            </div>

            <div
              className="necesidades-opciones"
              role="group"
              aria-label="Seleccionar una necesidad"
            >
              {necesidades.map((necesidad) => (
                <button
                  type="button"
                  key={necesidad.servicio}
                  className={`necesidad-btn ${
                    servicioActivo === necesidad.servicio
                      ? "seleccionada"
                      : ""
                  }`}
                  aria-pressed={
                    servicioActivo === necesidad.servicio
                  }
                  onClick={() =>
                    seleccionarServicio(necesidad.servicio)
                  }
                >
                  {necesidad.texto}
                  <span aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
          </div>

          <div className="servicios-layout">
            <div className="servicios-lista reveal">
              {servicios.map((servicio) => (
                <button
                  type="button"
                  key={servicio.id}
                  className={`servicio-item ${
                    servicioActivo === servicio.id ? "activo" : ""
                  }`}
                  aria-pressed={servicioActivo === servicio.id}
                  onClick={() =>
                    seleccionarServicio(servicio.id)
                  }
                >
                  <span className="servicio-numero">
                    {servicio.numero}
                  </span>

                  <span className="servicio-nombre">
                    {servicio.titulo}
                  </span>

                  <span
                    className="servicio-simbolo"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
              ))}
            </div>

            <article
              className="servicio-detalle reveal"
              aria-label="Detalle del servicio seleccionado"
            >
              <div className="detalle-superior">
                <span>{servicioSeleccionado.etiqueta}</span>
                <span>{servicioSeleccionado.numero} / 04</span>
              </div>

              <div
                key={servicioActivo}
                className="detalle-contenido detalle-animado"
                aria-live="polite"
                aria-atomic="true"
              >
                <h3>{servicioSeleccionado.titulo}</h3>
                <p>{servicioSeleccionado.descripcion}</p>

                <ul className="detalle-lista">
                  {servicioSeleccionado.puntos.map((punto) => (
                    <li key={punto}>{punto}</li>
                  ))}
                </ul>
              </div>

              <button
                className="detalle-cta"
                type="button"
                onClick={consultarServicio}
              >
                Consultar por este servicio
                <span aria-hidden="true">↗</span>
              </button>
            </article>
          </div>

          <div className="servicios-cierre">
            <span>OBLIGACIONES CLARAS / INFORMACIÓN ORDENADA</span>
            <span>ASESORAMIENTO SEGÚN TU ACTIVIDAD</span>
          </div>
        </section>

        {/* 04 — METODOLOGÍA */}

        <section className="metodo" id="metodo">
          <div className="metodo-encabezado reveal">
            <div className="section-kicker">
              <span className="kicker-line" />
              03 / CÓMO TRABAJAMOS
            </div>

            <h2>
              Un proceso claro
              <br />
              <em>desde el primer día.</em>
            </h2>

            <p>
              Cada etapa tiene un objetivo: comprender tu situación,
              organizar las tareas necesarias y mantener
              un seguimiento de las obligaciones.
            </p>
          </div>

          <div
            className="metodo-progreso"
            ref={progresoRef}
            aria-hidden="true"
          >
            <span />
          </div>

          <div className="metodo-pasos">
            {pasos.map((paso) => (
              <article
                className="metodo-paso reveal"
                key={paso.numero}
              >
                <div className="paso-superior">
                  <span>{paso.numero} / 03</span>
                  <span>{paso.detalle}</span>
                </div>

                <h3>{paso.titulo}</h3>
                <p>{paso.descripcion}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 05 — EL ESTUDIO */}

        <section className="estudio" id="estudio">
          <div className="estudio-grid">
            <div className="estudio-texto reveal">
              <div className="section-kicker">
                <span className="kicker-line" />
                04 / NUESTRA FORMA DE TRABAJAR
              </div>

              <h2>
                El orden no es
                <br />
                solo contable.
                <br />
                <em>También es tranquilidad.</em>
              </h2>

              <p>
                Una buena gestión empieza con documentos organizados,
                obligaciones identificadas y comunicación constante.
                El objetivo es que entiendas qué se está haciendo
                y qué necesita atención.
              </p>

              <div className="estudio-valores">
                <div>
                  <span>01</span>
                  <strong>Documentación organizada</strong>
                </div>
                <div>
                  <span>02</span>
                  <strong>Seguimiento de obligaciones</strong>
                </div>
                <div>
                  <span>03</span>
                  <strong>Información para decidir</strong>
                </div>
              </div>

              <a href="#contacto" className="estudio-enlace">
                Consultar por asesoramiento
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            {/* Documento visual interactivo */}

            <div className="estudio-grafica estudio-grafica-documento reveal">
              <div className="documento-marco">
                <div className="documento-label-externo">
                  <span>UNA FORMA DE ORGANIZAR LA INFORMACIÓN</span>
                  <span>01 — 03</span>
                </div>

                <div className="documento-hoja">
                  <div className="documento-cabecera">
                    <span className="documento-logo">m.</span>
                    <span className="documento-referencia">
                      ORGANIZACIÓN CONTABLE
                      <br />
                      EJEMPLO ILUSTRATIVO
                    </span>
                  </div>

                  <div
                    className="documento-tabs"
                    role="group"
                    aria-label="Explorar etapas del trabajo contable"
                  >
                    {vistasDocumento.map((vista, index) => (
                      <button
                        type="button"
                        key={vista.numero}
                        className={
                          vistaDocumento === index ? "activa" : ""
                        }
                        aria-pressed={vistaDocumento === index}
                        onClick={() => setVistaDocumento(index)}
                      >
                        {vista.nombre}
                      </button>
                    ))}
                  </div>

                  <div
                    key={vistaDocumento}
                    className="documento-cuerpo"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    <div className="documento-meta">
                      <span>ETAPA {documentoActual.numero} / 03</span>
                      <span>SEGUIMIENTO</span>
                    </div>

                    <h3>{documentoActual.titulo}</h3>
                    <p>{documentoActual.descripcion}</p>

                    <ul className="documento-checklist">
                      {documentoActual.items.map((item, index) => (
                        <li key={item}>
                          <span className="documento-item-numero">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span>{item}</span>
                          <span
                            className="documento-item-marca"
                            aria-hidden="true"
                          >
                            ↗
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="documento-pie">
                    <span>MARGEN / ESTUDIO CONTABLE</span>
                    <span>DOCUMENTO DEMOSTRATIVO</span>
                  </div>
                </div>

                <p className="documento-aclaracion">
                  Ejemplo conceptual. No contiene información
                  de clientes reales.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 06 — CONTACTO */}

        <section className="contacto" id="contacto">
          <div className="contacto-grid">
            <div className="contacto-info reveal">
              <div className="section-kicker">
                <span className="kicker-line" />
                05 / CONTACTO
              </div>

              <h2>
                Empecemos por
                <br />
                <em>tu consulta.</em>
              </h2>

              <p>
                Contanos a qué te dedicás y qué necesitás resolver.
                Es el primer paso para encontrar el asesoramiento
                adecuado para tu actividad.
              </p>

              <div className="contacto-pasos">
                <div>
                  <span>01</span>
                  <p>Completás el formulario con tu consulta.</p>
                </div>
                <div>
                  <span>02</span>
                  <p>El mensaje llega al correo del estudio.</p>
                </div>
                <div>
                  <span>03</span>
                  <p>El equipo puede contactarte para continuar.</p>
                </div>
              </div>

              <div className="contacto-canales">
  <span className="contacto-canales-titulo">
    TAMBIÉN PODÉS CONTACTARNOS POR
  </span>

  <div className="contacto-canales-links">
    {emailContacto && (
      <a href={`mailto:${emailContacto}`}>
        Email
      </a>
    )}

    {whatsapp && (
      <a
        href={`https://wa.me/${whatsapp}?text=${mensajeWhatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp
      </a>
    )}

    {instagramContacto && (
      <a
        href={instagramContacto}
        target="_blank"
        rel="noopener noreferrer"
      >
        Instagram
      </a>
    )}
  </div>
</div>

            </div>

            <div className="formulario-contenedor reveal">
              <div className="formulario-cabecera">
                <span>CONSULTAS Y ASESORAMIENTO</span>
                <span>MARGEN / CONTACTO</span>
              </div>

              <h3>Contanos tu consulta.</h3>

              <form onSubmit={enviarFormulario}>
                <div className="formulario-fila">
                  <div className="campo">
                    <label htmlFor="nombre">Tu nombre *</label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      placeholder="Nombre y apellido"
                      autoComplete="name"
                      value={formulario.nombre}
                      onChange={actualizarCampo}
                      maxLength={100}
                      required
                    />
                  </div>

                  <div className="campo">
                    <label htmlFor="email">Email *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      autoComplete="email"
                      value={formulario.email}
                      onChange={actualizarCampo}
                      maxLength={150}
                      required
                    />
                  </div>
                </div>

                <div className="formulario-fila">
                  <div className="campo">
                    <label htmlFor="perfil">Tu perfil *</label>
                    <select
                      id="perfil"
                      name="perfil"
                      value={formulario.perfil}
                      onChange={actualizarCampo}
                      required
                    >
                      <option value="">Seleccionar</option>
                      <option value="Monotributista">
                        Monotributista
                      </option>
                      <option value="Profesional independiente">
                        Profesional independiente
                      </option>
                      <option value="Emprendedor o comercio">
                        Emprendedor o comercio
                      </option>
                      <option value="Empresa o PyME">
                        Empresa o PyME
                      </option>
                    </select>
                  </div>

                  <div className="campo">
                    <label htmlFor="servicio">
                      Servicio de interés
                    </label>
                    <select
                      id="servicio"
                      name="servicio"
                      value={formulario.servicio}
                      onChange={actualizarCampo}
                    >
                      {servicios.map((servicio) => (
                        <option
                          key={servicio.id}
                          value={servicio.titulo}
                        >
                          {servicio.titulo}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="campo">
                  <label htmlFor="mensaje">Tu consulta *</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows="4"
                    placeholder="Contanos brevemente qué necesitás resolver..."
                    value={formulario.mensaje}
                    onChange={actualizarCampo}
                    maxLength={2000}
                    required
                  />
                </div>

                <button
                  className="formulario-submit"
                  type="submit"
                  disabled={enviando}
                >
                  {enviando ? "Enviando..." : "Enviar consulta"}
                  <span aria-hidden="true">↗</span>
                </button>

                {estadoEnvio && (
                  <p
                    className={`estado-envio ${estadoEnvio.tipo}`}
                    role="status"
                  >
                    {estadoEnvio.mensaje}
                  </p>
                )}

                <p className="formulario-legal">
                  Demo funcional: las consultas se envían al
                  responsable de esta demostración. No compartas
                  claves fiscales ni información sensible.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}

      <footer className="footer footer-v2">
  <div className="footer-main">
    <div className="footer-identidad">
      <a href="#inicio" className="footer-logo">
        margen<span>.</span>
      </a>

      <p>Estudio contable e impositivo</p>

      <span className="footer-descripcion">
        Claridad para organizar.
        <br />
        Perspectiva para avanzar.
      </span>
    </div>

    <nav className="footer-col" aria-label="Navegación del pie">
      <span className="footer-col-titulo">EXPLORAR</span>

      <a href="#inicio">Inicio</a>
      <a href="#enfoque">Nuestro enfoque</a>
      <a href="#servicios">Servicios</a>
      <a href="#estudio">El estudio</a>
      <a href="#contacto">Contacto</a>
    </nav>

    <div className="footer-col">
      <span className="footer-col-titulo">
        CANALES DE LA DEMO
      </span>

      {emailContacto && (
        <a href={`mailto:${emailContacto}`}>
          Email
        </a>
      )}

      {whatsapp && (
        <a
          href={`https://wa.me/${whatsapp}?text=${mensajeWhatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
      )}

      {instagramContacto && (
        <a
          href={instagramContacto}
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      )}

      <a href="#contacto">Formulario de consulta</a>
    </div>
  </div>

  <div className="footer-bottom">
    <span>Demo conceptual · Estudio ficticio</span>
    <span>Diseño y desarrollo por SR. Digital Studio</span>
    <a href="#inicio">Volver arriba ↑</a>
  </div>
</footer>

      {whatsapp && (
  <a
    className={`whatsapp-flotante ${
      mostrarWhatsapp ? "visible" : ""
    }`}
    href={`https://wa.me/${whatsapp}?text=${mensajeWhatsapp}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Hablemos por WhatsApp"
    tabIndex={mostrarWhatsapp ? 0 : -1}
  >
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.4 11.6a8.4 8.4 0 0 1-12.3 7.5L3 20.5l1.3-5.1a8.4 8.4 0 1 1 16.1-3.8Z" />
      <path d="M8.7 8.2c.2-.4.4-.4.6-.4h.5c.2 0 .4.1.5.4l.8 1.6c.1.2.1.4-.1.6l-.6.7c.7 1.1 1.6 1.9 2.8 2.5l.7-.8c.2-.2.4-.3.7-.2l1.7.8c.3.1.4.3.3.6l-.2.8c-.3.8-1 1.1-1.8 1-3.5-.7-6.1-3.2-6.9-6.4-.1-.6 0-1 .3-1.2Z" />
    </svg>

    <span>Hablemos por WhatsApp</span>
  </a>
)}

    </div>
  );
}
