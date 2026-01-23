/**
 * Internationalization (i18n) System
 * 
 * Scalable structure for multi-language support
 * Languages: Spanish (es), English (en), Portuguese (pt)
 */

export type Language = 'es' | 'en' | 'pt';

// Language context - will be used with React Context
export interface I18nContext {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

// Translation dictionary type
export interface TranslationDict {
  [key: string]: string | TranslationDict;
}

// ============================================
// SPANISH TRANSLATIONS (Default)
// ============================================
export const ES: TranslationDict = {
  // Navigation
  nav: {
    home: 'Inicio',
    subscription: 'Suscripción',
    bootcamp: 'Bootcamp',
    bootcamps: 'Bootcamps',
    mentorias: 'Mentorías',
    empresas: 'Empresas',
    login: 'Iniciar Sesión',
    logout: 'Cerrar Sesión',
    academy: 'Ir a la Academia',
    admin: 'Panel Admin',
    register: 'Registrarse',
  },
  
  // Hero section (Landing)
  hero: {
    title: 'Dominá Data Engineering',
    subtitle: 'De cero a Data Engineer en semanas, no años',
    description: 'La academia #1 de Data Engineering en LATAM. Proyectos reales, mentorías personalizadas y una comunidad que te impulsa.',
    cta: 'Empezar Gratis',
    ctaSecondary: 'Ver Planes',
    students: 'estudiantes activos',
    rating: 'valoración promedio',
    projects: 'proyectos completados',
  },
  
  // Features
  features: {
    title: '¿Por qué elegirnos?',
    subtitle: 'Todo lo que necesitás para convertirte en Data Engineer',
    practice: {
      title: 'Práctica Ilimitada',
      description: 'SQL y Python con ejercicios reales de entrevistas',
    },
    projects: {
      title: 'Proyectos Reales',
      description: 'Construí tu portfolio con proyectos de la industria',
    },
    community: {
      title: 'Comunidad Activa',
      description: 'Discord 24/7 con mentores y estudiantes',
    },
    mentoring: {
      title: 'Mentorías 1:1',
      description: 'Sesiones personalizadas con expertos',
    },
  },
  
  // Motivational messages
  motivational: {
    start: '¡Arrancá hoy! El mejor momento para empezar fue ayer, el segundo mejor es ahora.',
    progress25: '¡Vas por buen camino! Cada paso cuenta, seguí así.',
    progress50: '¡Estás on fire! Ya pasaste el primer cuarto, no pares.',
    progress75: '¡Más de la mitad! Ya sos de los que terminan lo que empiezan.',
    progress90: '¡Casi llegás! Falta poco para ser un crack certificado.',
    completed: '¡Lo lograste! Sos un Data Engineer de verdad. Ahora a seguir creciendo.',
  },

  // Members area
  members: {
    dashboard: 'Dashboard',
    roadmap: 'Roadmap',
    projects: 'Proyectos',
    datasets: 'Datasets',
    videos: 'Grabaciones',
    practice: 'Práctica',
    store: 'Tienda',
    welcome: 'Bienvenido',
    level: 'Nivel',
    xp: 'XP',
    coins: 'DataCoins',
    streak: 'Racha',
    byIanSaura: 'por Ian Saura',
    days: 'días',
    progress: 'Tu Progreso',
    continueWhere: 'Continuá donde lo dejaste',
    nextStep: 'Próximo paso',
    achievements: 'Logros',
    leaderboard: 'Ranking',
    settings: 'Configuración',
    language: 'Idioma',
    premiumActive: 'Premium Activo',
    premiumSubscriber: 'Suscriptor Premium',
    goToBootcamp: 'Ir al Bootcamp',
    goToMainSite: 'Ir al sitio principal',
    discordCommunity: 'Comunidad Discord',
    support: 'Soporte',
    changePassword: 'Cambiar contraseña',
    closeSession: 'Cerrar sesión',
  },
  
  // Practice
  practice: {
    sql: 'Práctica SQL',
    python: 'Práctica Python',
    difficulty: {
      easy: 'Fácil',
      medium: 'Medio',
      hard: 'Difícil',
      expert: 'Experto',
    },
    category: 'Categoría',
    all: 'Todos',
    run: 'Ejecutar',
    hint: 'Pista',
    solution: 'Ver Solución',
    reset: 'Reiniciar',
    next: 'Siguiente',
    previous: 'Anterior',
    correct: '¡Correcto!',
    incorrect: 'Incorrecto, intentá de nuevo',
    theory: 'Teoría',
    exercise: 'Ejercicio',
    completed: 'Completado',
    time: 'Tiempo',
    interview: 'Modo Entrevista',
    focused: 'Modo Enfocado',
    exercises: 'Ejercicios',
    start: 'Comenzar',
    copy: 'Copiar',
    copied: 'Copiado',
  },
  
  // Daily challenges
  daily: {
    title: 'Misiones Diarias',
    completed: 'Completadas',
    bonus: 'Bonus por completar todas',
    streak: 'Racha de días',
    reset: 'Se reinician en',
  },
  
  // Achievements
  achievements: {
    title: 'Logros',
    unlocked: 'Desbloqueado',
    locked: 'Bloqueado',
    progress: 'Progreso',
  },
  
  // Subscription
  subscription: {
    title: 'Elegí tu Plan',
    subtitle: 'Invertí en tu futuro como Data Engineer',
    monthly: 'Mensual',
    sixMonths: '6 Meses',
    yearly: 'Anual',
    perMonth: '/mes',
    save: 'Ahorrás',
    popular: 'Más Popular',
    features: {
      unlimited: 'Práctica ilimitada SQL + Python',
      projects: 'Proyectos con datasets reales',
      videos: 'Grabaciones de clases',
      community: 'Acceso a comunidad Discord',
      mentoring: 'Mentorías grupales mensuales',
      certificates: 'Certificados verificables',
    },
    trial: {
      title: '$30/mes',
      description: 'Acceso completo sin compromiso',
      cta: 'Suscribirme Ahora',
    },
    guarantee: 'Cancela cuando quieras',
    // Hero section translations
    launchPrice: '¡PRECIO DE LANZAMIENTO! Ahora $30/mes DE POR VIDA',
    heroTitle: 'Convertite en',
    heroTitleHighlight: 'Data Engineer',
    heroDescription: 'Roadmap, videos, ejercicios, proyectos y comunidad. Todo en un solo lugar.',
  },
  
  // Bootcamp
  bootcamp: {
    title: 'Bootcamp de Data Engineering',
    subtitle: 'De cero a profesional en 8 semanas',
    duration: 'Duración',
    weeks: 'semanas',
    format: 'Formato',
    online: 'Online en vivo',
    recorded: 'Grabaciones disponibles',
    includes: 'Incluye',
    syllabus: 'Temario',
    week: 'Semana',
    enroll: 'Inscribirme',
    nextCohort: 'Próxima cohorte',
    spots: 'lugares disponibles',
    whySelected: '¿Por qué deberías ser seleccionado?',
    joinWaitlist: 'Unirme a la Lista de Espera',
    notFound: 'Bootcamp no encontrado',
  },
  
  // Auth
  auth: {
    login: 'Iniciar Sesión',
    register: 'Crear Cuenta',
    email: 'Email',
    password: 'Contraseña',
    currentPassword: 'Contraseña actual',
    newPassword: 'Nueva contraseña',
    confirmPassword: 'Confirmar Contraseña',
    changePassword: 'Cambiar contraseña',
    passwordLength: 'La contraseña debe tener al menos 6 caracteres',
    passwordsDoNotMatch: 'Las contraseñas no coinciden',
    passwordUpdateFailed: 'Error al cambiar contraseña',
    passwordUpdated: '¡Contraseña actualizada!',
    name: 'Nombre',
    forgotPassword: '¿Olvidaste tu contraseña?',
    noAccount: '¿No tenés cuenta?',
    hasAccount: '¿Ya tenés cuenta?',
    orContinueWith: 'O continuá con',
    google: 'Google',
    termsAgree: 'Al registrarte, aceptás nuestros',
    terms: 'Términos y Condiciones',
    and: 'y',
    privacy: 'Política de Privacidad',
    // Auth Page specific
    welcome: '👋 Bienvenido',
    createAccount: '✨ Crear Cuenta',
    premiumSubscription: '🚀 Suscripción Premium',
    joinClub: '🚀 Únete al Club',
    signInContinue: 'Inicia sesión para continuar',
    signInSubscription: 'Inicia sesión para continuar con tu suscripción',
    exclusiveContent: 'Accede a todo el contenido exclusivo',
    joinEngineers: 'Únete a +100 Data Engineers',
    continueSubscription: '🚀 Continuar a Suscripción',
    subscribePrice: '🎉 Suscribirse por $10/mes',
    signIn: 'Iniciar Sesión',
    createAccountBtn: 'Crear Cuenta',
    processing: 'Procesando...',
    emailVerified: '¡Email verificado!',
    verificationError: 'Error de verificación',
    canLoginNow: 'Ya podés iniciar sesión con tu cuenta.',
    verificationProblem: 'Hubo un problema con la verificación.',
    closeBtn: '✕ Cerrar',
    continueGoogle: 'Continuar con Google',
    or: 'o continúa',
    selectGoogle: 'Seleccioná tu cuenta de Google',
    connecting: 'Conectando...',
    emailNotVerified: 'Email no verificado',
    checkInbox: 'Revisá tu bandeja de entrada (y spam) en <strong>{email}</strong> para el link de verificación.',
    emailResent: '✅ ¡Email reenviado!',
    checkInboxSpam: 'Revisá tu bandeja de entrada y spam',
    resending: 'Reenviando...',
    resendVerification: '📨 Reenviar email de verificación',
    contactSupport: '¿Problemas? Contactanos a info@iansaura.com',
    backHome: '← Volver al inicio',
    transformCareer: '🚀 Transforma tu carrera',
    joinProfessionals: 'Únete a +100 profesionales que ya están creciendo',
    exclusiveVideos: 'Videos exclusivos semanales',
    videosDescription: 'Casos reales de la industria explicados paso a paso',
    downloadablePdfs: 'Guías PDF descargables',
    pdfsDescription: 'Templates y recursos listos para usar',
    personalizedRoadmaps: 'Roadmaps personalizados',
    roadmapsDescription: 'Rutas de aprendizaje adaptadas a tu nivel',
    privateCommunity: 'Comunidad privada',
    communityDescription: 'Discord exclusivo con otros Data Engineers',
    interviewPrep: 'Preparación para entrevistas',
    interviewDescription: 'Preguntas reales y simulacros prácticos',
    monthlyMentoring: 'Mentorías grupales mensuales',
    mentoringDescription: 'Sesiones en vivo con Q&A personalizado',
    rating: '5.0 (100+ reseñas)',
    testimonial: '"El contenido de Ian transformó mi carrera. En 4 meses conseguí mi primer trabajo como Data Engineer con 40% más de salario."',
    testimonialAuthor: '— María González, Junior Data Engineer en Mercado Libre',
    satisfaction: '💚 Garantía de satisfacción',
    cancelAnytime: 'Cancela en cualquier momento. Sin contratos, sin permanencia, sin preguntas. Tu satisfacción es nuestra prioridad.',
    // Referral
    referralActive: '¡Código de referido activo!',
    referralBonus: 'Recibirás un descuento especial al suscribirte',
  },
  
  // Common
  common: {
    loading: 'Cargando...',
    error: 'Error',
    save: 'Guardar',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    back: 'Volver',
    continue: 'Continuar',
    start: 'Comenzar',
    finish: 'Finalizar',
    view: 'Ver',
    download: 'Descargar',
    share: 'Compartir',
    search: 'Buscar',
    filter: 'Filtrar',
    sort: 'Ordenar',
    more: 'Ver más',
    less: 'Ver menos',
    all: 'Todos',
    none: 'Ninguno',
    yes: 'Sí',
    no: 'No',
    or: 'o',
    and: 'y',
    free: 'Gratis',
    premium: 'Premium',
    locked: 'Bloqueado',
    unlock: 'Desbloquear',
    month: 'mes',
    subscribeNow: 'Suscribirme Ahora',
    messageSent: '¡Mensaje enviado!',
    willReply: 'Te responderé en menos de 24 horas.',
    sending: 'Enviando...',
    contact: 'Contacto',
    refundPolicy: 'Política de Reembolsos',
    allRightsReserved: 'Todos los derechos reservados.',
    completed: 'Completado',
    // Roadmap related
    jobSearch: 'Búsqueda de trabajo',
    interviews: 'Entrevistas',
    companyPerformance: 'Performance en empresa',
    salaryNegotiation: 'Negociación salarial',
    architectures: 'Arquitecturas',
    effectiveCommunication: 'Comunicación efectiva',
    technicalLeadership: 'Liderazgo técnico',
    codeQuality: 'Calidad de código',
    architecturalDecisions: 'Decisiones arquitectónicas',
    juniorMentoring: 'Mentoría de juniors',
  },
  
  // Errors
  errors: {
    generic: 'Algo salió mal. Intentá de nuevo.',
    network: 'Error de conexión. Verificá tu internet.',
    notFound: 'Página no encontrada',
    unauthorized: 'No tenés acceso a esta sección',
    sessionExpired: 'Tu sesión expiró. Iniciá sesión nuevamente.',
  },
  
  // Success messages
  success: {
    saved: '¡Guardado correctamente!',
    copied: '¡Copiado al portapapeles!',
    purchased: '¡Compra exitosa!',
    completed: '¡Completado!',
  },
  
  // Footer
  footer: {
    rights: 'Todos los derechos reservados',
    terms: 'Términos y Condiciones',
    privacy: 'Política de Privacidad',
    conduct: 'Código de Conducta',
    refunds: 'Política de Reembolsos',
    contact: 'Contacto',
  },

  // Dashboard specific
  // Tools section
  tools: {
    title: 'Herramientas y más',
    api: 'API de Datasets',
    apiDescription: 'Generá datos programáticamente para tus proyectos',
    generateToken: 'Generar Token',
    requestsPerHour: 'solicitudes/hora',
    tokenDuration: 'Duración del token',
    viewDatasets: 'Ver Datasets',
  },

  // Referral program
  referral: {
    title: '🎁 Programa de Referidos',
    subtitle: 'Compartí la plataforma con amigos y ambos obtienen beneficios',
    freeTrial: 'Descuento especial',
    yourBenefits: 'Tus beneficios',
    friendBenefits: 'Beneficios para tu amigo',
    yourDiscount: 'Tu descuento',
    yourDiscounts: 'Tus descuentos',
    friendDiscount: 'Descuento para tu amigo',
    perFriend: 'por cada amigo',
    yourCode: 'Tu código de referido',
    freeUser: {
      title: 'Usuario Free',
      description: 'Invitá amigos y obtené descuentos',
      benefit1: 'Vos recibís un descuento especial',
      benefit2: 'Tu amigo recibe un descuento especial',
      benefit3: '¡Los beneficios se acumulan! Más referidos = más descuentos',
    },
    premiumUser: {
      title: 'Usuario Premium',
      description: 'Ayudá a crecer la comunidad',
      benefit1: 'Tu amigo recibe un descuento especial',
      benefit2: 'Vos obtenés 10% de descuento en el próximo Bootcamp',
    },
    cta: 'Obtener mi Código de Referido',
    note: 'Tu código estará disponible en tu dashboard después de registrarte',
  },

  // Leaderboard section
  leaderboard: {
    title: 'Leaderboard del mes',
    scoring: 'Puntuación: +10 XP por ejercicio completado, +25 XP por proyecto',
    steps: 'pasos',
    projects: 'proyectos',
    you: 'Vos',
    gold: '🥇 Oro',
    silver: '🥈 Plata',
    bronze: '🥉 Bronce',
    hallOfFame: 'Ganadores del mes anterior',
    currentMonth: 'Ranking actual',
    prizes: 'Los premios se otorgan el 1ro de cada mes',
  },

  dashboard: {
    sessionToday: 'Tu sesión de hoy',
    xpPossible: '~10 min • {{xp}} XP posibles',
    tasks: '{{completed}}/{{total}} tareas',
    go: 'Ir',
    startStreak: 'Empezá tu racha',
    tools: 'Herramientas y más',
    leaderboardMonth: 'Leaderboard del mes',
    tip: '💡 Consejo: Completá la sesión todos los días para mantener tu racha',
    time: {
      hour: '1 hora',
      sixHours: '6 horas',
      day: '24 horas',
      threeDays: '3 días',
      week: '7 días'
    },
    ranks: {
      seed: 'Semilla',
      novice: 'Novato',
      apprentice: 'Aprendiz',
      adept: 'Adepto',
      expert: 'Experto',
      master: 'Maestro',
      legend: 'Leyenda'
    },
    stats: {
      xp: 'XP',
      coins: 'DataCoins',
      steps: 'Pasos',
      projects: 'Proyectos'
    },
    sessionComplete: '¡Excelente! Completaste tu sesión de hoy',
    streakSafe: 'Tu racha está segura. Volvé mañana para continuar.',
    weeklyChallenge: 'Reto Semanal',
    until: 'Hasta {{date}}',
    instructions: 'Consigna',
    deliverable: 'Entregable',
    submitDiscord: 'Entregar en Discord',
    jobs: 'Empleos',
    achievements: 'Logros',
    unlocked: '{{count}}/{{total}} desbloqueados',
    certificates: 'Certificados Verificables',
    stepsRemaining: '{{count}} pasos restantes',
    sessionTitle: {
      complete: '¡Sesión completada!',
      active: 'Tu sesión de hoy'
    },
    sessionSubtitle: {
      complete: '+{{xp}} XP ganados',
      active: '~{{time}} min • {{xp}} XP posibles'
    }
  },

  // Onboarding
  onboarding: {
    welcome: '🎉 ¡Bienvenido a Premium! 🚀',
    intro: 'Tenés acceso COMPLETO. Te explico rápido las 6 secciones de la plataforma para que la aproveches al máximo.',
    tour: '💡 Tour de 1 minuto',
    prev: 'Anterior',
    next: 'Siguiente',
    skip: 'Omitir tour',
    start: '¡Empezar!',
    steps: {
      dashboard: { title: 'Tu Centro de Mando', description: 'Acá ves tu progreso diario, racha y próximas tareas.' },
      roadmap: { title: 'Tu Camino', description: 'El mapa paso a paso para convertirte en Data Engineer.' },
      projects: { title: 'Proyectos Reales', description: 'Construí tu portafolio con casos de uso de la industria.' },
      practice: { title: 'Práctica Ilimitada', description: 'Ejercicios de SQL y Python para afinar tus habilidades.' },
      datasets: { title: 'Datos Reales', description: 'Descargá datasets para tus propios proyectos.' },
      videos: { title: 'Clases Grabadas', description: 'Acceso a todas las clases de los bootcamps anteriores.' }
    }
  },

  // Playground (SQL/Python)
  playground: {
    mission: 'Tu Misión',
    selectColumns: 'Seleccioná todas las columnas de la tabla products.',
    run: 'Ejecutar',
    running: 'Ejecutando...',
    hint: 'Pista',
    solution: 'Solución',
    viewSolution: 'Ver Solución',
    hideSolution: 'Ocultar Solución',
    copy: 'Copiar',
    copied: 'Copiado',
    reset: 'Reiniciar',
    nextExercise: 'Siguiente ejercicio',
    correct: '¡Correcto!',
    incorrect: 'Incorrecto, intentá de nuevo',
    theory: 'Teoría',
    exercise: 'Ejercicio',
    originalData: '👆 Estos son los datos originales de la tabla. Usá esta información para escribir tu query.',
    focusedMode: 'Modo Enfocado',
    normalMode: 'Modo Normal',
    executeCode: 'Ejecutar código',
    importLibs: 'Importar bibliotecas',
    syntax: 'Sintaxis:',
    bestPractice: 'Best Practice:',
    realLife: 'En la vida real',
    output: 'Resultado',
    expected: 'Resultado Esperado',
    diff: 'Diferencia',
    startTimer: 'Comenzar Timer',
    yourSqlQuery: 'Tu Query SQL'
  },

  quickWin: {
    title: '🎯 Tu Primer Desafío SQL',
    subtitle: 'Completalo en 2 minutos y ganá +50 XP',
    challenge: 'El Desafío:',
    description: 'Tenés una tabla <code class="bg-slate-700 px-1.5 py-0.5 rounded text-emerald-400">ventas</code> con productos vendidos. <strong class="text-white">Calculá el total de ingresos</strong> (cantidad × precio).',
    hint: 'Pista',
    hintText: 'Usá <code class="bg-slate-700 px-1 rounded">SUM(cantidad * precio)</code> para calcular el total',
    queryLabel: 'Tu consulta SQL:',
    run: 'Ejecutar',
    skip: 'Saltar por ahora',
    success: '¡Excelente!',
    successMsg: 'Acabás de ejecutar tu primera consulta SQL',
    continue: 'Continuar al Dashboard',
    progress: 'En progreso',
    completed: 'Completado',
    streakRisk: '¡Tu racha está en riesgo!',
    completeToday: 'Completá hoy para no perderla',
    streakActive: 'Racha activa',
    record: 'Récord: {{days}} días',
    missionsToday: 'Misiones de hoy',
    missionsBonus: 'Completá 3 para bonus de {{xp}} XP',
    resetsIn: 'Se reinicia en {{hours}}h {{minutes}}m',
    completedMission: '¡Completada!',
    bonusUnlocked: '🎉 ¡Bonus desbloqueado!',
    completeMore: 'Completá {{count}} más para el bonus',
  },
  shopExtended: {
    packages: 'Paquetes de DataCoins',
    packagesDesc: 'Comprá DataCoins para desbloquear avatares, badges y títulos exclusivos. ¡Los coins son permanentes y nunca expiran!',
    mostPopular: 'MÁS POPULAR',
    totalCoins: 'DataCoins totales',
    securePayment: 'Pago seguro con tarjeta o PayPal',
    autoCredit: 'Acreditación automática:',
    autoCreditDesc: 'Después de pagar, tus DataCoins se acreditan automáticamente en tu cuenta en menos de 5 minutos. Recibirás un email de confirmación.',
    support: '¿Problemas con tu compra? Escribinos a',
    howToEarn: 'Cómo ganar DataCoins gratis',
    earn: {
      step: 'Completar un paso',
      project: 'Completar un proyecto',
      video: 'Ver un video',
      streak7: 'Streak de 7 días',
      streak30: 'Streak de 30 días',
      levelUp: 'Subir de nivel'
    },
    services: {
      title: 'Servicios Premium con Ian',
      subtitle: 'Mentoría personalizada directa con Ian Saura',
      desc: '¿Querés feedback profesional directo? Estos servicios te dan acceso exclusivo a revisiones personalizadas, mentorías y más.',
      valuable: 'Lo más valioso de la tienda.',
      howWorks: '¿Cómo funciona el Code Review?',
      step1: 'Canjeás el Code Review con tus DataCoins',
      step2: 'Enviás el link a tu proyecto (GitHub) por Discord a',
      step3: 'Ian revisa tu código y te envía un',
      document: 'documento escrito de 2-3 páginas',
      feedbackDetail: 'con feedback detallado, mejoras y próximos pasos en 48-72hs hábiles',
      feedbackNote: 'El feedback incluye: análisis de código, buenas prácticas, errores comunes, sugerencias de mejora y recomendaciones para tu próximo proyecto.'
    },
    redeemed: '¡Canjeado!',
    redeem: 'Canjear',
    serviceRedeemed: '¡Servicio Canjeado!',
    nextSteps: 'Próximos pasos:',
    gotIt: '¡Entendido!',
    tip: 'Tip:',
    tipText: 'Mencioná tu email de la plataforma cuando me escribas para que pueda identificar tu compra.'
  },

  // Shop
  shop: {
    title: 'Tienda',
    badges: 'Badges',
    titles: 'Títulos',
    backgrounds: 'Fondos',
    rarity: {
      common: 'Común',
      rare: 'Raro',
      epic: 'Épico',
      legendary: 'Legendario'
    },
    status: {
      acquired: 'Adquirido',
      equipped: 'Equipado',
      equip: 'Equipar',
      buy: 'Comprar',
      missing: 'Faltan {{amount}} DataCoins'
    }
  },

  // Datasets
  datasets: {
    title: 'Datasets & APIs',
    subtitle: 'Generá datasets realistas para practicar. Descargá en CSV, JSON o usá la API.',
    available: 'Disponible',
    consumeApi: 'Consumí datos directamente desde tu código:',
    availableTypes: 'Tipos disponibles:',
    parameters: 'Parámetros:',
    selectDataset: 'Seleccioná un dataset:',
    configuration: 'Configuración',
    rows: 'Filas (tabla principal)',
    format: 'Formato descarga',
    generate: 'Generar Dataset',
    generating: 'Generando...',
    success: 'Dataset generado correctamente',
    downloadAll: 'Descargar Todo',
    files: 'archivos',
    schema: 'Esquema de tablas',
    relations: 'Relaciones',
    preview: 'Vista previa de {{table}}',
    tips: {
      title: '💡 Tips para practicar',
      tip1: 'Practica JOINs complejos combinando múltiples tablas',
      tip2: 'Usa Window Functions para análisis avanzados',
      tip3: 'Experimenta con CTEs para queries más legibles',
      tip4: 'Crea dashboards con los datos que generes'
    },
    voting: {
      title: '🗳️ Próximo Dataset',
      subtitle: 'El más votado se agrega el próximo mes',
      placeholder: '¿Qué dataset te gustaría ver?',
      suggest: 'Sugerí un dataset',
      firstSuggest: 'Sé el primero en sugerir',
      leader: '🏆 Líder: {{votes}} votos'
    },
    apiToken: {
      title: 'API Token',
      description: 'Usa tu token para acceder a los datasets desde tu código',
      generate: 'Generar Token',
      copy: 'Copiar Token',
      delete: 'Eliminar Token',
      example: 'Ejemplo de uso'
    },
    types: {
      ecommerce: 'E-commerce',
      fintech: 'Fintech',
      healthcare: 'Healthcare',
      iot: 'IoT Sensores'
    }
  },

  // Videos
  videos: {
    progress: 'Progreso del Bootcamp',
    watchHere: 'Mirá los videos acá mismo.',
    doubts: '¿Tenés dudas sobre los videos?',
    leaveQuestions: 'Dejá tus preguntas en el canal',
    discordChannel: 'de Discord para la próxima sesión en vivo.',
    goToDiscord: 'Ir a Discord',
    comingSoon: 'Próximamente'
  },

  // Certificate
  certificate: {
    title: 'Certificado de Completación',
    awardedTo: 'Otorgado a',
    forCompleting: 'Por completar exitosamente',
    download: 'Descargar certificado',
    share: 'Compartir en LinkedIn'
  },

  // Energy
  energy: {
    title: 'Energía',
    refill: 'Se recarga en',
    full: '¡Energía completa!'
  },

  // Landing page specific
  landing: {
    // Banner
    banner: {
      trial: '¡Suscribite hoy!',
      trialDesc: 'Acceso completo a la Academia Premium.',
      noRisk: 'Cancelá cuando quieras.',
      startFree: 'Suscribirme',
      hello: '¡Hola',
      hasAccess: 'Tenés acceso a',
      academyBootcamp: 'la Academia + Bootcamp',
      academyPremium: 'la Academia Premium',
      bootcamp: 'el Bootcamp',
      academyFree: 'la Academia (Nivel 0 Gratis)',
      academy: 'Academia',
    },
    // Hero
    hero: {
      imIan: 'Soy',
      dataEngineer: 'Data Engineer y Educador.',
      helpProfessionals: 'Ayudo profesionales a',
      increaseSalary: 'aumentar su salario',
      getRemoteJobs: 'y conseguir trabajos remotos como',
      dataEngineers: 'Data Engineers',
      inWeeks: 'en 4-12 semanas.',
      bootcampsIntensive: 'Bootcamps intensivos en español',
      personalizedMentoring: '+ mentorías personalizadas 1:1.',
      beginnerToExpert: 'Desde principiante hasta experto.',
    },
    // Bootcamp Card
    bootcampCard: {
      nextEdition: 'PRÓXIMA EDICIÓN POR CONFIRMAR',
      title: 'Bootcamp Fundamentos de Data Engineering',
      description: '8 semanas intensivas en vivo. Pagá ahora para reservar tu lugar en la próxima edición (dentro de los próximos 6 meses).',
      limitedSpots: 'Una vez confirmada la fecha, el precio sube.',
      feature1: 'Python, SQL, ETL/ELT',
      feature2: 'Clases en vivo + grabaciones',
      feature3: 'Proyecto final para tu portfolio',
      earlyBird: 'Precio pre-inscripción',
      viewDetails: 'Ver detalles',
      reserve: 'Reservar lugar',
    },
    // Subscription Card
    subscriptionCard: {
      recommended: 'RECOMENDADO PARA EMPEZAR',
      title: 'Academia Premium',
      description: 'Todo lo que necesitás para convertirte en Data Engineer. Acceso inmediato 24/7.',
      startToday: 'Empezá hoy.',
      feature1: 'Roadmap interactivo completo',
      feature2: 'Ejercicios SQL + Python',
      feature3: 'Proyectos con datasets reales',
      feature4: 'Comunidad Discord exclusiva',
      perMonth: '/mes',
      trialDays: '$30/mes',
      startTrial: 'Suscribirme Ahora',
      viewPlans: 'Ver todos los planes',
    },
    // Stats
    stats: {
      students: 'Estudiantes formados',
      jobsLanded: 'Trabajos conseguidos',
      countries: 'Países',
      rating: 'Valoración',
    },
    // Why choose us
    whyUs: {
      title: '¿Por qué elegirnos?',
      subtitle: 'Lo que nos diferencia de otros bootcamps y cursos',
      realExperience: 'Experiencia Real',
      realExperienceDesc: 'Trabajo como Data Engineer Senior en empresas de primer nivel. Enseño lo que realmente se usa en la industria.',
      provenMethod: 'Método Probado',
      provenMethodDesc: 'Más de 150+ estudiantes que consiguieron trabajo como Data Engineers gracias a nuestro programa.',
      activeCommunity: 'Comunidad Activa',
      activeCommunityDesc: 'Discord 24/7 con estudiantes de 15+ países. Nunca estás solo en tu aprendizaje.',
      realProjects: 'Proyectos Reales',
      realProjectsDesc: 'Trabajás con datasets reales de empresas. Tu portfolio habla por vos en entrevistas.',
    },
    // Testimonials
    testimonials: {
      title: 'Lo que dicen nuestros estudiantes',
      subtitle: 'Historias reales de éxito',
    },
    // About
    about: {
      title: 'Sobre mí',
      intro: 'Soy Ian Saura, Data Engineer Senior con más de 5 años de experiencia en empresas tech de primer nivel.',
      experience: 'Actualmente trabajo en CookUnity (remoto desde Argentina) diseñando y manteniendo pipelines de datos a escala.',
      teaching: 'Además de mi trabajo como Data Engineer, soy profesor universitario en la UNSAM, donde enseño Ingeniería de Datos y Big Data.',
      mission: 'Mi misión es democratizar el acceso a educación de calidad en Data Engineering para la comunidad hispanohablante.',
    },
    // Contact
    contact: {
      title: '¿Tenés preguntas?',
      subtitle: 'Escribime y te respondo personalmente.',
      name: 'Tu nombre',
      email: 'Tu email',
      message: 'Tu mensaje',
      send: 'Enviar mensaje',
      sending: 'Enviando...',
      success: '¡Mensaje enviado! Te responderé pronto.',
    },
  },

  // Locked content previews
  locked: {
    projects: {
      title: 'Proyectos Prácticos',
      description: 'Proyectos reales que podés agregar a tu portfolio. Desde dashboards hasta pipelines de datos.',
      feature1: '12+ proyectos guiados',
      feature2: 'Datasets reales',
      feature3: 'Código descargable',
      feature4: 'Certificados por proyecto',
    },
    datasets: {
      title: 'Datasets & APIs',
      description: 'Acceso a datasets reales y APIs para practicar con datos del mundo real.',
      feature1: '50+ datasets curados',
      feature2: 'APIs en vivo',
      feature3: 'Generador de datos',
      feature4: 'Documentación completa',
    },
    videos: {
      title: 'Grabaciones de Clases',
      description: 'Todas las grabaciones de clases en vivo, Q&As y workshops.',
      feature1: '100+ horas de video',
      feature2: 'Clases en vivo semanales',
      feature3: 'Q&A con Ian',
      feature4: 'Workshops prácticos',
    },
    store: {
      title: 'Tienda de Recompensas',
      description: 'Canjeá tus DataCoins por avatares, badges, títulos y más.',
      feature1: 'Avatares exclusivos',
      feature2: 'Badges coleccionables',
      feature3: 'Títulos personalizados',
      feature4: 'Items de temporada',
    },
  },

  // Roadmap levels
  levels: {
    0: { name: 'Fundamentos', title: 'Bases de Data Analytics' },
    1: { name: 'Novato', title: 'Conseguir tu Primer Trabajo' },
    2: { name: 'Guerrero', title: 'De Junior a Semi-Senior' },
    3: { name: 'Maestro', title: 'Nivel Senior' },
  },

  // Python playground specific
  pythonPlayground: {
    loadingFirst: 'Esto puede tardar unos segundos la primera vez',
    yourCode: 'Tu código Python:',
    shortcuts: 'Ctrl+Enter ejecutar • Tab indentar',
  },

  // API Token section
  apiTokenSection: {
    datasets: 'Datasets',
    maxRows: 'Max: {{rows}} filas',
    available: 'Datasets Disponibles',
  },

  // Share Progress
  share: {
    step1: '<strong>Descargá la imagen</strong> clickeando "Descargar"',
    step2: '<strong>Copiá el texto</strong> y clickeá "Publicar en LinkedIn"',
    step3: '<strong>Pegá el texto</strong>, subí la imagen y publicá 🚀',
    tip: 'Tip',
    tagIan: 'Etiquetá a',
    forReach: 'en tu post para mayor alcance. ¡Te comparto el post!',
    postLinkedIn: 'Publicar en LinkedIn',
  },

  // Project Detail page
  projectDetail: {
    commonErrors: 'Errores comunes a evitar',
    deliverable: 'Entregable',
    selfEvaluation: 'Autoevaluación',
    learningObjectives: 'Lo que vas a aprender',
    projectCompleted: 'Proyecto Completado',
    interview: {
      title: 'Cómo Contar Este Proyecto en una Entrevista',
      subtitle: 'Storytelling profesional para impresionar',
      hook: 'Tu Hook (10 segundos)',
      situation: 'Situación',
      task: 'Tarea',
      actions: 'Acciones (qué hiciste)',
      results: 'Resultados (cuantificables)',
      learnings: 'Lecciones Aprendidas',
      questions: 'Preguntas que te pueden hacer',
      closing: 'Cierre Memorable',
    },
    steps: 'Pasos',
    outputs: 'Outputs esperados',
    challenge: 'Desafío',
    hint: 'Pista',
    solution: 'Solución Completa',
    tryFirst: 'Intentá resolver el proyecto por tu cuenta antes de ver esto.',
    bestWay: 'Es la mejor forma de aprender y consolidar los conceptos.',
    markComplete: 'Marcar como completado',
    resources: 'Recursos',
  },

  // Landing Page - Testimonials
  testimonials: {
    title: 'Lo que dicen los que ya',
    titleHighlight: 'transformaron su carrera',
    subtitle: '+150 profesionales ya dieron el salto',
    viewLinkedIn: 'Ver en LinkedIn',
    studentsWorkAt: 'Nuestros alumnos trabajan en',
    remoteStartups: 'Startups remotas',
  },

  // Landing Page - Subscription Section
  landingSubscription: {
    badge: 'Suscripción Premium',
    title: 'Todo para tu carrera en',
    titleHighlight: 'Data Engineering',
    subtitle: 'Un solo pago mensual. Acceso ilimitado a todo el contenido.',
    feature1Title: '8 Semanas Videos',
    feature1Desc: 'Bootcamp completo',
    feature2Title: 'Roadmap 3 Niveles',
    feature2Desc: 'Con progreso guardado',
    feature3Title: '6 Datasets',
    feature3Desc: 'Para practicar SQL',
    feature4Title: '5 Proyectos',
    feature4Desc: 'Con autoevaluación',
    feature5Title: 'Discord Premium',
    feature5Desc: 'Comunidad exclusiva',
    feature6Title: 'Q&A Mensual',
    feature6Desc: 'Sesiones en vivo',
    feature7Title: '🆕 Interview Prep',
    feature7Desc: 'System Design + Behavioral',
    feature8Title: '🦖 Saurio AI',
    feature8Desc: 'Entrevistador virtual',
    feature9Title: 'Skill Assessment',
    feature9Desc: 'Evalua tu nivel',
    priceLabel: '✨ Precio accesible para todos',
    price: '$30USD/mes',
    cta: '🔐 Iniciar Sesión y Suscribirme',
    ctaNote: 'Acceso inmediato • Cancela cuando quieras • Pago seguro',
  },

  // Landing Page - FAQ
  faq: {
    title: 'Preguntas Frecuentes',
    subtitle: 'Resolvé tus dudas antes de empezar',
    q1: '¿Necesito saber programar?',
    a1Academy: 'No. El Nivel 0 es para principiantes absolutos. Empezás desde cero, sin conocimientos previos.',
    a1Bootcamp: 'Sí, se recomienda. Deberías tener al menos el Nivel 1 de la Academia completado, o conocimientos básicos de Python y SQL.',
    q2: '¿Cuánto tiempo me va a tomar?',
    a2: 'Depende de tu dedicación. Con 1-2 horas por día:',
    a2Level0: 'Nivel 0: 2-3 semanas',
    a2Level1: 'Nivel 1: 4-6 semanas',
    a2Ready: 'Listo para entrevistas: 2-3 meses',
    q3: '¿Puedo cancelar cuando quiera?',
    a3: 'Sí, 100%. Sin compromisos, sin letra chica. Cancelás desde tu cuenta en un click cuando quieras.',
    q4: '¿Academia o Bootcamp? ¿Cuál elijo?',
    a4Academy: 'Aprendés a tu ritmo, ideal si trabajás o estudiás. Acceso permanente mientras estés suscripto.',
    a4Bootcamp: '8 semanas intensivas en vivo con grupo y deadlines. Ideal si querés estructura y compromiso.',
    a4Tip: '💡 Tip: Muchos hacen el Nivel 0-1 en la Academia y después se suman al Bootcamp.',
    q5: '¿Funciona para mi país?',
    a5: 'Sí. Todo el contenido es online y en español. Tenemos alumnos de Argentina, México, Colombia, Chile, Perú, España y más. Los pagos son en USD y se aceptan tarjetas internacionales.',
    moreQuestions: '¿Más dudas? Escribime directo',
    askDiscord: 'Preguntá en Discord',
  },

  // Landing Page - About
  about: {
    title: 'Sobre mí',
    subtitle: 'Ian Saura - Data Engineer y Educador',
    role: 'Data Engineer & Profesor',
    location: 'Buenos Aires, Argentina',
    bio: 'Soy Data Engineer con enfoque práctico y educativo. Acompaño a personas que quieren ingresar al mundo de los datos, mejorar sus habilidades técnicas y construir una carrera con propósito.',
    bio2: 'Me apasiona enseñar, crear contenido útil y ayudar a resolver problemas reales. Como profesor en la Universidad Nacional de San Martín, combino mi experiencia práctica en la industria con mi vocación por la educación.',
    philosophy: '💡 Mi filosofía: No te enseño teoría abstracta. Te comparto exactamente lo que funciona en el mundo real, con ejemplos prácticos y herramientas que puedes usar desde el primer día.',
    yearsExp: 'Años en Data Engineering',
    transformed: 'Profesionales transformados',
  },

  // Landing Page - Contact
  contact: {
    title: '¿Tienes preguntas?',
    subtitle: 'Escríbeme directamente a info@iansaura.com o usa el formulario',
    namePlaceholder: 'Tu nombre',
    emailPlaceholder: 'tu@email.com',
    messagePlaceholder: 'Tu mensaje...',
    send: 'Enviar mensaje',
  },

  // Landing Page - Final CTA
  finalCta: {
    title: '¿Listo para transformar tu carrera?',
    subtitle: 'Únete a +150 profesionales que ya dieron el salto a Data Engineering',
    cta: '🔐 Empezar Ahora',
    note: '✨ Cancela cuando quieras • Sin compromiso',
  },

  // Landing Page - Footer
  landingFooter: {
    tagline: 'Data Engineer y Educador',
    terms: 'Términos y Condiciones',
    privacy: 'Política de Privacidad',
    conduct: 'Código de Conducta',
  },

  // Subscription Page
  subscriptionPage: {
    redirecting: 'Redirigiendo a tu área de miembros...',
    hero: {
      title: 'Roadmap, videos, exercises, projects and community. Everything in one place.',
      trial: 'Suscribite Ahora',
      trialDesc: 'Acceso completo • Sin compromiso • Cancelá cuando quieras',
      startTrial: 'Suscribirme - $30/mes',
      afterTrial: 'Cancela cuando quieras',
      joinNow: 'Suscribite Ahora',
      joinNowDesc: 'Acceso completo a todo el contenido premium',
      subscribe: 'Suscribirme - $30/mes',
      cancelAnytime: 'Cancela cuando quieras',
      students: 'Estudiantes',
      exercises: 'Ejercicios',
      projects: 'Proyectos',
      weeksVideo: 'Semanas Video',
    },
    plans: {
      choosePlan: 'Elegí tu plan',
      monthly: 'Mensual',
      perMonth: '/mes',
      launchPrice: 'Precio de lanzamiento',
      afterDate: 'Después del 7/12: $30/mes',
      allContent: 'Todo el contenido',
      cancelAnytime: 'Cancela cuando quieras',
      priceLockedForever: 'Precio fijo de por vida',
      chooseMonthly: 'Elegir Mensual',
      mostPopular: '⭐ MÁS POPULAR',
      sixMonths: '6 Meses',
      save30: '💰 Ahorrás $30',
      sixMonthsAccess: '6 meses de acceso',
      bestPricePerMonth: 'Mejor precio por mes',
      noAutoRenewal: 'Sin renovación automática',
      chooseSixMonths: 'Elegir 6 Meses',
      twelveMonths: '12 Meses',
      save120: '🔥 Ahorrás $120',
      oneYearComplete: '1 año completo',
      bestSavings: 'Mejor ahorro total',
      chooseTwelveMonths: 'Elegir 12 Meses',
      securePayment: 'Pago seguro con tarjeta o PayPal • Acceso inmediato',
      afterPayment: '📌 Después de pagar en Gumroad:',
      afterPaymentStep: 'Volvé a iansaura.com → Click en "Entrar con Google"',
      afterPaymentNote: '(Usá el mismo email con el que pagaste)',
    },
    features: {
      title: 'Todo lo que incluye tu suscripción',
      subtitle: 'Una plataforma completa diseñada para llevarte de cero a Data Engineer profesional',
      exercises: '70+ Ejercicios SQL + Python',
      exercisesDesc: '51 ejercicios SQL (Window Functions, CTEs, dbt) + 21 Python (Pandas, ETL, Airflow). Corren 100% en tu browser. Preguntas reales de entrevistas FAANG.',
      dbtAirflow: 'dbt + Airflow',
      dbtAirflowDesc: 'Ejercicios prácticos de dbt (ref, source, incrementales, tests, macros, snapshots) y Airflow (DAGs, operators, XCom, sensors, branching).',
      roadmap: 'Roadmap Interactivo',
      roadmapDesc: '3 niveles completos: conseguir trabajo → Jr/SSR → Senior. Con checkboxes, reflexiones y tu progreso guardado.',
      videos: 'Videos del Bootcamp',
      videosDesc: '8 semanas de contenido grabado. Desde fundamentos hasta producción. Videos embebidos, mirá directo en la plataforma.',
      datasets: 'Generador de Datasets',
      datasetsDesc: '6 tipos de datasets: E-commerce, Logs, Finanzas, RRHH, IoT, Streaming. Descargá en CSV/JSON o usá la API.',
      projects: '+25 Proyectos Guiados',
      projectsDesc: 'Proyectos con consignas claras, pasos detallados, código y autoevaluación. Desde ETL simple hasta System Design.',
      discord: 'Comunidad Discord',
      discordDesc: 'Canal exclusivo de suscriptores. Hacé networking, preguntá dudas, compartí logros.',
      qa: 'Q&A Mensual en Vivo',
      qaDesc: 'Sesiones donde respondo TUS preguntas. Si sos de los primeros, más tiempo para vos.',
      saurio: 'Saurio - Tu Tutor IA 🦖',
      saurioDesc: 'Tu asistente inteligente que te guía con pistas, te explica conceptos y te orienta en la plataforma. ¡Disponible 24/7!',
    },
    syllabus: {
      title: 'Syllabus Completo',
      subtitle: '¿Qué vas a aprender exactamente?',
      description: 'Contenido estructurado y progresivo para llevarte de cero a Data Engineer profesional',
    },
    roadmapLevels: {
      title: 'Roadmap en 3 Niveles',
      subtitle: 'Tu guía paso a paso desde cero hasta Senior',
      level1: 'Conseguir tu Primer Trabajo',
      level2: 'De Entry a Jr/SSR',
      level3: 'Ser Senior',
    },
    datasetsSection: {
      title: 'Datasets reales para practicar',
      subtitle: 'Generá datasets de distintas industrias para practicar SQL, Python y proyectos de Data Engineering.',
    },
    testimonialsSection: {
      title: 'Lo que dicen los suscriptores',
    },
    faqSection: {
      title: 'Preguntas Frecuentes',
    },
    finalCta: {
      title: '¿Listo para convertirte en Data Engineer?',
      subtitle: '150+ profesionales ya lo lograron. Empezá gratis hoy.',
    },
    moreProjects: '+19 proyectos más disponibles en la plataforma',
  },
};

// ============================================
// ENGLISH TRANSLATIONS
// ============================================
export const EN: TranslationDict = {
  // Navigation
  nav: {
    home: 'Home',
    subscription: 'Subscription',
    bootcamp: 'Bootcamp',
    bootcamps: 'Bootcamps',
    mentorias: 'Mentoring',
    empresas: 'For Companies',
    login: 'Log In',
    logout: 'Log Out',
    academy: 'Go to Academy',
    admin: 'Admin Panel',
    register: 'Sign Up',
  },
  
  // Hero section (Landing)
  hero: {
    title: 'Master Data Engineering',
    subtitle: 'From zero to Data Engineer in weeks, not years',
    description: 'The #1 Data Engineering academy in LATAM. Real projects, personalized mentoring, and a community that drives you forward.',
    cta: 'Start Free',
    ctaSecondary: 'View Plans',
    students: 'active students',
    rating: 'average rating',
    projects: 'projects completed',
  },
  
  // Features
  features: {
    title: 'Why Choose Us?',
    subtitle: 'Everything you need to become a Data Engineer',
    practice: {
      title: 'Unlimited Practice',
      description: 'SQL and Python with real interview exercises',
    },
    projects: {
      title: 'Real Projects',
      description: 'Build your portfolio with industry projects',
    },
    community: {
      title: 'Active Community',
      description: '24/7 Discord with mentors and students',
    },
    mentoring: {
      title: '1:1 Mentoring',
      description: 'Personalized sessions with experts',
    },
  },

  // Motivational messages
  motivational: {
    start: 'Start today! The best time to start was yesterday, the second best is now.',
    progress25: 'You\'re on the right track! Every step counts, keep going.',
    progress50: 'You\'re on fire! You\'ve passed the first quarter, don\'t stop.',
    progress75: 'More than halfway! You\'re one of those who finish what they start.',
    progress90: 'Almost there! Just a little more to become a certified pro.',
    completed: 'You did it! You\'re a real Data Engineer. Now keep growing.',
  },
  
  // Members area
  members: {
    dashboard: 'Dashboard',
    roadmap: 'Roadmap',
    projects: 'Projects',
    datasets: 'Datasets',
    videos: 'Recordings',
    practice: 'Practice',
    store: 'Store',
    welcome: 'Welcome',
    level: 'Level',
    xp: 'XP',
    coins: 'DataCoins',
    streak: 'Streak',
    days: 'days',
    progress: 'Your Progress',
    continueWhere: 'Continue where you left off',
    nextStep: 'Next step',
    achievements: 'Achievements',
    leaderboard: 'Leaderboard',
    settings: 'Settings',
    language: 'Language',
    premiumActive: 'Premium Active',
    byIanSaura: 'by Ian Saura',
    premiumSubscriber: 'Premium Subscriber',
    goToBootcamp: 'Go to Bootcamp',
    goToMainSite: 'Go to main site',
    discordCommunity: 'Discord Community',
    support: 'Support',
    changePassword: 'Change password',
    closeSession: 'Log out',
  },
  
  // Practice
  practice: {
    sql: 'SQL Practice',
    python: 'Python Practice',
    difficulty: {
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
      expert: 'Expert',
    },
    category: 'Category',
    all: 'All',
    run: 'Run',
    hint: 'Hint',
    solution: 'View Solution',
    reset: 'Reset',
    next: 'Next',
    previous: 'Previous',
    correct: 'Correct!',
    incorrect: 'Incorrect, try again',
    theory: 'Theory',
    exercise: 'Exercise',
    completed: 'Completed',
    time: 'Time',
    interview: 'Interview Mode',
    focused: 'Focused Mode',
    exercises: 'exercises',
    start: 'Start',
    copy: 'Copy',
    copied: 'Copied',
  },
  
  // Daily challenges
  daily: {
    title: 'Daily Missions',
    completed: 'Completed',
    bonus: 'Bonus for completing all',
    streak: 'Day streak',
    reset: 'Resets in',
  },
  
  // Achievements
  achievements: {
    title: 'Achievements',
    unlocked: 'Unlocked',
    locked: 'Locked',
    progress: 'Progress',
  },
  
  // Subscription
  subscription: {
    title: 'Choose Your Plan',
    subtitle: 'Invest in your future as a Data Engineer',
    monthly: 'Monthly',
    sixMonths: '6 Months',
    yearly: 'Yearly',
    perMonth: '/month',
    save: 'You save',
    popular: 'Most Popular',
    features: {
      unlimited: 'Unlimited SQL + Python practice',
      projects: 'Projects with real datasets',
      videos: 'Class recordings',
      community: 'Access to Discord community',
      mentoring: 'Monthly group mentoring',
      certificates: 'Verifiable certificates',
    },
    trial: {
      title: '$30/month',
      description: 'Full access with no commitment',
      cta: 'Subscribe Now',
    },
    guarantee: 'Cancel anytime',
    // Hero section translations
    launchPrice: 'LAUNCH PRICE! Now $30/month FOR LIFE',
    heroTitle: 'Become a',
    heroTitleHighlight: 'Data Engineer',
    heroDescription: 'Roadmap, videos, exercises, projects and community. Everything in one place.',
  },
  
  // Bootcamp
  bootcamp: {
    title: 'Data Engineering Bootcamp',
    subtitle: 'From zero to professional in 8 weeks',
    duration: 'Duration',
    weeks: 'weeks',
    format: 'Format',
    online: 'Live online',
    recorded: 'Recordings available',
    includes: 'Includes',
    syllabus: 'Syllabus',
    week: 'Week',
    enroll: 'Enroll',
    nextCohort: 'Next cohort',
    spots: 'spots available',
    whySelected: 'Why should you be selected?',
    joinWaitlist: 'Join the Waitlist',
    notFound: 'Bootcamp not found',
  },
  
  // Datasets (English)
  datasets: {
    title: 'Datasets & APIs',
    subtitle: 'Generate realistic datasets to practice. Download as CSV, JSON or use the API.',
    available: 'Available',
    consumeApi: 'Consume data directly from your code:',
    availableTypes: 'Available types:',
    parameters: 'Parameters:',
    selectDataset: 'Select a dataset:',
    configuration: 'Configuration',
    rows: 'Rows (main table)',
    format: 'Download format',
    generate: 'Generate Dataset',
    generating: 'Generating...',
    success: 'Dataset generated successfully',
    downloadAll: 'Download All',
    files: 'files',
    schema: 'Table schema',
    relations: 'Relations',
    preview: 'Preview of {{table}}',
    tips: {
      title: '💡 Practice Tips',
      tip1: 'Practice complex JOINs by combining multiple tables',
      tip2: 'Use Window Functions for advanced analytics',
      tip3: 'Experiment with CTEs for more readable queries',
      tip4: 'Create dashboards with the data you generate'
    },
    voting: {
      title: '🗳️ Next Dataset',
      subtitle: 'The most voted will be added next month',
      placeholder: 'What dataset would you like to see?',
      suggest: 'Suggest a dataset',
      firstSuggest: 'Be the first to suggest',
      leader: '🏆 Leader: {{votes}} votes'
    },
    apiToken: {
      title: 'API Token',
      description: 'Use your token to access datasets from your code',
      generate: 'Generate Token',
      copy: 'Copy Token',
      delete: 'Delete Token',
      example: 'Usage example'
    },
    types: {
      ecommerce: 'E-commerce',
      fintech: 'Fintech',
      healthcare: 'Healthcare',
      iot: 'IoT Sensors'
    }
  },

  // Auth
  auth: {
    login: 'Log In',
    register: 'Create Account',
    email: 'Email',
    password: 'Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    changePassword: 'Change Password',
    passwordLength: 'Password must be at least 6 characters',
    passwordsDoNotMatch: 'Passwords do not match',
    passwordUpdateFailed: 'Error updating password',
    passwordUpdated: 'Password updated!',
    name: 'Name',
    forgotPassword: 'Forgot your password?',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    orContinueWith: 'Or continue with',
    google: 'Google',
    termsAgree: 'By signing up, you agree to our',
    terms: 'Terms and Conditions',
    and: 'and',
    privacy: 'Privacy Policy',
    // Auth Page specific
    welcome: '👋 Welcome',
    createAccount: '✨ Create Account',
    premiumSubscription: '🚀 Premium Subscription',
    joinClub: '🚀 Join the Club',
    signInContinue: 'Sign in to continue',
    signInSubscription: 'Sign in to continue with your subscription',
    exclusiveContent: 'Access all exclusive content',
    joinEngineers: 'Join +100 Data Engineers',
    continueSubscription: '🚀 Continue to Subscription',
    subscribePrice: '🎉 Subscribe for $10/month',
    signIn: 'Sign In',
    createAccountBtn: 'Create Account',
    processing: 'Processing...',
    emailVerified: 'Email verified!',
    verificationError: 'Verification error',
    canLoginNow: 'You can now sign in with your account.',
    verificationProblem: 'There was a problem with the verification.',
    closeBtn: '✕ Close',
    continueGoogle: 'Continue with Google',
    or: 'or continue',
    selectGoogle: 'Select your Google account',
    connecting: 'Connecting...',
    emailNotVerified: 'Email not verified',
    checkInbox: 'Check your inbox (and spam) at {email} for the verification link.',
    emailResent: '✅ Email resent!',
    checkInboxSpam: 'Check your inbox and spam folder',
    resending: 'Resending...',
    resendVerification: '📨 Resend verification email',
    contactSupport: 'Issues? Contact us at info@iansaura.com',
    backHome: '← Back to home',
    transformCareer: '🚀 Transform your career',
    joinProfessionals: 'Join +100 professionals who are already growing',
    exclusiveVideos: 'Exclusive weekly videos',
    videosDescription: 'Real industry cases explained step by step',
    downloadablePdfs: 'Downloadable PDF guides',
    pdfsDescription: 'Templates and resources ready to use',
    personalizedRoadmaps: 'Personalized roadmaps',
    roadmapsDescription: 'Learning paths adapted to your level',
    privateCommunity: 'Private community',
    communityDescription: 'Exclusive Discord with other Data Engineers',
    interviewPrep: 'Interview preparation',
    interviewDescription: 'Real questions and practical simulations',
    monthlyMentoring: 'Monthly group mentoring',
    mentoringDescription: 'Live sessions with personalized Q&A',
    rating: '5.0 (100+ reviews)',
    testimonial: '"Ian\'s content transformed my career. In 4 months I got my first job as a Data Engineer with 40% higher salary."',
    testimonialAuthor: '— Maria Gonzalez, Junior Data Engineer at Mercado Libre',
    satisfaction: '💚 Satisfaction guarantee',
    cancelAnytime: 'Cancel anytime. No contracts, no commitment, no questions. Your satisfaction is our priority.',
    // Referral
    referralActive: 'Referral code active!',
    referralBonus: 'You\'ll get a special discount when you subscribe',
  },
  
  // Common
  common: {
    loading: 'Loading...',
    error: 'Error',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    back: 'Back',
    continue: 'Continue',
    start: 'Start',
    finish: 'Finish',
    view: 'View',
    download: 'Download',
    share: 'Share',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    more: 'See more',
    less: 'See less',
    all: 'All',
    none: 'None',
    yes: 'Yes',
    no: 'No',
    or: 'or',
    and: 'and',
    free: 'Free',
    premium: 'Premium',
    locked: 'Locked',
    unlock: 'Unlock',
    month: 'month',
    subscribeNow: 'Subscribe Now',
    messageSent: 'Message sent!',
    willReply: 'I will reply within 24 hours.',
    sending: 'Sending...',
    contact: 'Contact',
    refundPolicy: 'Refund Policy',
    allRightsReserved: 'All rights reserved.',
    completed: 'Completed',
    // Roadmap related
    jobSearch: 'Job search',
    interviews: 'Interviews',
    companyPerformance: 'Company performance',
    salaryNegotiation: 'Salary negotiation',
    architectures: 'Architectures',
    effectiveCommunication: 'Effective communication',
    technicalLeadership: 'Technical leadership',
    codeQuality: 'Code quality',
    architecturalDecisions: 'Architectural decisions',
    juniorMentoring: 'Junior mentoring',
  },
  
  // Errors
  errors: {
    generic: 'Something went wrong. Please try again.',
    network: 'Connection error. Check your internet.',
    notFound: 'Page not found',
    unauthorized: "You don't have access to this section",
    sessionExpired: 'Your session expired. Please log in again.',
  },
  
  // Success messages
  success: {
    saved: 'Saved successfully!',
    copied: 'Copied to clipboard!',
    purchased: 'Purchase successful!',
    completed: 'Completed!',
  },
  
  // Footer
  footer: {
    rights: 'All rights reserved',
    terms: 'Terms and Conditions',
    privacy: 'Privacy Policy',
    conduct: 'Code of Conduct',
    refunds: 'Refund Policy',
    contact: 'Contact',
  },

  // Dashboard specific
  // Tools section
  tools: {
    title: 'Tools & more',
    api: 'Datasets API',
    apiDescription: 'Generate data programmatically for your projects',
    generateToken: 'Generate Token',
    requestsPerHour: 'requests/hour',
    tokenDuration: 'Token duration',
    viewDatasets: 'View Datasets',
  },

  // Referral program
  referral: {
    title: '🎁 Referral Program',
    subtitle: 'Share the platform with friends and both get exclusive benefits',
    freeTrial: 'Special discount',
    yourBenefits: 'Your benefits',
    friendBenefits: 'Benefits for your friend',
    yourDiscount: 'Your discount',
    yourDiscounts: 'Your discounts',
    friendDiscount: 'Discount for your friend',
    perFriend: 'per friend',
    yourCode: 'Your referral code',
    freeUser: {
      title: 'Free User',
      description: 'Invite friends and get discounts',
      benefit1: 'You get a special discount',
      benefit2: 'Your friend gets a special discount',
      benefit3: 'Benefits stack up! More referrals = more discounts',
    },
    premiumUser: {
      title: 'Premium User',
      description: 'Help grow the community',
      benefit1: 'Your friend gets a special discount',
      benefit2: 'You get 10% off the next Bootcamp',
    },
    cta: 'Get my Referral Code',
    note: 'Your code will be available in your dashboard after signing up',
  },

  // Leaderboard section
  leaderboard: {
    title: 'Monthly Leaderboard',
    scoring: 'Scoring: +10 XP per exercise completed, +25 XP per project',
    steps: 'steps',
    projects: 'projects',
    you: 'You',
    gold: '🥇 Gold',
    silver: '🥈 Silver',
    bronze: '🥉 Bronze',
    hallOfFame: 'Previous Month Winners',
    currentMonth: 'Current Ranking',
    prizes: 'Prizes are awarded on the 1st of each month',
  },

  dashboard: {
    sessionToday: 'Your session today',
    xpPossible: '~10 min • {{xp}} XP possible',
    tasks: '{{completed}}/{{total}} tasks',
    go: 'Go',
    startStreak: 'Start your streak',
    tools: 'Tools & more',
    leaderboardMonth: 'Monthly Leaderboard',
    tip: '💡 Tip: Complete the session every day to maintain your streak',
    time: {
      hour: '1 hour',
      sixHours: '6 hours',
      day: '24 hours',
      threeDays: '3 days',
      week: '7 days'
    },
    ranks: {
      seed: 'Seed',
      novice: 'Novice',
      apprentice: 'Apprentice',
      adept: 'Adept',
      expert: 'Expert',
      master: 'Master',
      legend: 'Legend'
    },
    stats: {
      xp: 'XP',
      coins: 'DataCoins',
      steps: 'Steps',
      projects: 'Projects'
    },
    sessionComplete: 'Excellent! You completed your session today',
    streakSafe: 'Your streak is safe. Come back tomorrow to continue.',
    weeklyChallenge: 'Weekly Challenge',
    until: 'Until {{date}}',
    instructions: 'Instructions',
    deliverable: 'Deliverable',
    submitDiscord: 'Submit on Discord',
    jobs: 'Jobs',
    achievements: 'Achievements',
    unlocked: '{{count}}/{{total}} unlocked',
    certificates: 'Verifiable Certificates',
    stepsRemaining: '{{count}} steps remaining',
    sessionTitle: {
      complete: 'Session completed!',
      active: 'Your session today'
    },
    sessionSubtitle: {
      complete: '+{{xp}} XP earned',
      active: '~{{time}} min • {{xp}} XP possible'
    }
  },

  // Onboarding
  onboarding: {
    welcome: '🎉 Welcome to Premium! 🚀',
    intro: 'You have COMPLETE access. I\'ll quickly explain the 6 sections of the platform so you can make the most of it.',
    tour: '💡 1-minute Tour',
    prev: 'Previous',
    next: 'Next',
    skip: 'Skip tour',
    start: 'Start!',
    steps: {
      dashboard: { title: 'Your Command Center', description: 'Here you see your daily progress, streak, and upcoming tasks.' },
      roadmap: { title: 'Your Path', description: 'The step-by-step map to become a Data Engineer.' },
      projects: { title: 'Real Projects', description: 'Build your portfolio with industry use cases.' },
      practice: { title: 'Unlimited Practice', description: 'SQL and Python exercises to hone your skills.' },
      datasets: { title: 'Real Data', description: 'Download datasets for your own projects.' },
      videos: { title: 'Recorded Classes', description: 'Access to all classes from previous bootcamps.' }
    }
  },

  // Playground (SQL/Python)
  playground: {
    mission: 'Your Mission',
    selectColumns: 'Select all columns from the products table.',
    run: 'Run',
    running: 'Running...',
    hint: 'Hint',
    solution: 'Solution',
    viewSolution: 'View Solution',
    hideSolution: 'Hide Solution',
    copy: 'Copy',
    copied: 'Copied',
    reset: 'Reset',
    nextExercise: 'Next exercise',
    correct: 'Correct!',
    incorrect: 'Incorrect, try again',
    theory: 'Theory',
    exercise: 'Exercise',
    originalData: '👆 This is the original table data. Use this information to write your query.',
    focusedMode: 'Focused Mode',
    normalMode: 'Normal Mode',
    executeCode: 'Execute code',
    importLibs: 'Import libraries',
    syntax: 'Syntax:',
    bestPractice: 'Best Practice:',
    realLife: 'In real life',
    output: 'Output',
    expected: 'Expected Result',
    diff: 'Difference',
    startTimer: 'Start Timer',
    yourSqlQuery: 'Your SQL Query'
  },

  // Quick Win Challenge
  quickWin: {
    title: '🎯 Your First SQL Challenge',
    subtitle: 'Complete it in 2 minutes and earn +50 XP',
    inProgress: 'In progress',
    completed: '✓ Completed',
    challenge: 'The Challenge:',
    task: 'You have a table {{tableName}} with products sold. Calculate the total revenue (quantity × price).',
    table: '📊 Table: {{tableName}}',
    yourQuery: 'Your SQL query:',
    showHint: '💡 Show hint',
    hintContent: 'Use SUM(quantity * price) to calculate the total',
    noResults: 'The query returned no results. Try again.',
    queryError: 'Error in SQL query',
    almost: '🤔 Almost... the result should be a single number with the total revenue',
    excellent: 'Excellent!',
    firstQuery: 'You just executed your first SQL query',
    xpEarned: '+{{xp}} XP',
    dataCoinsEarned: '+{{coins}} DataCoins',
    continueDashboard: 'Continue to Dashboard',
    skip: 'Skip for now',
    celebrationTitle: 'Excellent!',
    celebrationText: 'You just executed your first SQL query',
    streakRisk: '🔥 Streak at risk',
    completeToday: '⚠️ Complete something today!',
    streakActive: '✅ Streak active',
    record: 'Record: {{days}} days',
    startStreak: 'Start your streak',
    missionsToday: 'Daily Missions',
    missionsBonus: 'Complete all 3 for +{{xp}} XP bonus',
    resetsIn: 'Resets in {{time}}',
    completedMission: 'Completed',
    bonusUnlocked: 'Bonus unlocked!',
    completeMore: 'Complete {{count}} more for the bonus',
    feedbackIncludes: 'Feedback includes: code analysis, best practices, common mistakes, improvement suggestions, and recommendations for your next project.',
  },

  // Shop
  shop: {
    title: 'DataCoins Shop',
    subtitle: 'Customize your profile with exclusive items',
    yourBalance: 'Your balance',
    dataCoins: 'DataCoins',
    yourProfile: 'Your current profile',
    avatar: 'Avatar',
    badge: 'Badge',
    titleLabel: 'Title',
    noTitle: 'No title',
    avatars: 'Avatars',
    badges: 'Badges',
    titles: 'Titles',
    services: '🔥 Services',
    buyCoins: 'Buy Coins',
    owned: 'Owned',
    equipped: 'Equipped',
    equip: 'Equip',
    buy: 'Buy',
    missingCoins: 'Missing {{coins}} 💎',
    acquired: 'Acquired!',
    serviceRedeemed: 'Service Redeemed!',
    nextSteps: 'Next steps:',
    gotIt: 'Got it!',
    coinPackages: 'DataCoins Packages',
    coinPackagesDescription: 'Buy DataCoins to unlock exclusive avatars, badges and titles. Coins are permanent and never expire!',
    mostPopular: 'MOST POPULAR',
    totalDataCoins: 'Total DataCoins',
    bonus: 'bonus',
    securePayment: 'Secure payment with card or PayPal',
    automaticAccreditation: 'Automatic accreditation:',
    automaticAccreditationDescription: 'After paying, your DataCoins are automatically credited to your account in less than 5 minutes. You will receive a confirmation email.',
    purchaseProblems: 'Problems with your purchase? Write to us at',
    howToEarnFreeCoins: 'How to earn free DataCoins',
    completeStep: 'Complete a step',
    completeProject: 'Complete a project',
    watchVideo: 'Watch a video',
    streak7Days: '7-day streak',
    streak30Days: '30-day streak',
    levelUp: 'Level up',
    premiumServices: 'Premium Services with Ian',
    premiumServicesDescription: 'Direct personalized mentorship with Ian Saura',
    mostValuable: 'The most valuable in the shop.',
    wantFeedback: 'Want direct professional feedback? These services give you exclusive access to personalized reviews, mentorships, and more.',
    redeemed: 'Redeemed!',
    redeem: 'Redeem',
    howCodeReviewWorks: 'How does Code Review work?',
    redeemCodeReview: 'Redeem Code Review with your DataCoins',
    sendProjectLink: 'Send your project link (GitHub) via Discord to',
    ianReviewsCode: 'Ian reviews your code and sends you a',
    writtenDocument: '2-3 page written document',
    detailedFeedback: 'with detailed feedback, improvements, and next steps in 48-72 business hours',
    tipEmail: 'Mention your platform email when you write to me so I can identify your purchase.',
    rarity: {
      common: 'Common',
      rare: 'Rare',
      epic: 'Epic',
      legendary: 'Legendary',
      mythic: '🔥 MYTHIC',
    },
  },

  // Landing page specific
  landing: {
    // Banner
    banner: {
      trial: 'Subscribe Today!',
      trialDesc: 'Full access to Premium Academy.',
      noRisk: 'Cancel anytime.',
      startFree: 'Subscribe',
      hello: 'Hello',
      hasAccess: 'You have access to',
      academyBootcamp: 'Academy + Bootcamp',
      academyPremium: 'Premium Academy',
      bootcamp: 'Bootcamp',
      academyFree: 'Academy (Free Level 0)',
      academy: 'Academy',
    },
    // Hero
    hero: {
      imIan: "I'm",
      dataEngineer: 'Data Engineer and Educator.',
      helpProfessionals: 'I help professionals',
      increaseSalary: 'increase their salary',
      getRemoteJobs: 'and land remote jobs as',
      dataEngineers: 'Data Engineers',
      inWeeks: 'in 4-12 weeks.',
      bootcampsIntensive: 'Intensive bootcamps in Spanish',
      personalizedMentoring: '+ personalized 1:1 mentoring.',
      beginnerToExpert: 'From beginner to expert.',
    },
    // Bootcamp Card
    bootcampCard: {
      nextEdition: 'NEXT EDITION TBC',
      title: 'Data Engineering Fundamentals Bootcamp',
      description: '8 intensive weeks live. Pay now to reserve your spot for the next edition (within the next 6 months).',
      limitedSpots: 'Once the date is confirmed, the price goes up.',
      feature1: 'Python, SQL, ETL/ELT',
      feature2: 'Live classes + recordings',
      feature3: 'Final project for your portfolio',
      earlyBird: 'Pre-registration price',
      viewDetails: 'View details',
      reserve: 'Reserve spot',
    },
    // Subscription Card
    subscriptionCard: {
      recommended: 'RECOMMENDED TO START',
      title: 'Premium Academy',
      description: 'Everything you need to become a Data Engineer. Instant 24/7 access.',
      startToday: 'Start today.',
      feature1: 'Complete interactive roadmap',
      feature2: 'SQL + Python exercises',
      feature3: 'Projects with real datasets',
      feature4: 'Exclusive Discord community',
      perMonth: '/month',
      trialDays: '$30/month',
      startTrial: 'Subscribe Now',
      viewPlans: 'View all plans',
    },
    // Stats
    stats: {
      students: 'Students trained',
      jobsLanded: 'Jobs landed',
      countries: 'Countries',
      rating: 'Rating',
    },
    // Why choose us
    whyUs: {
      title: 'Why choose us?',
      subtitle: 'What sets us apart from other bootcamps and courses',
      realExperience: 'Real Experience',
      realExperienceDesc: 'I work as a Senior Data Engineer at top companies. I teach what is actually used in the industry.',
      provenMethod: 'Proven Method',
      provenMethodDesc: '150+ students who landed Data Engineer jobs thanks to our program.',
      activeCommunity: 'Active Community',
      activeCommunityDesc: '24/7 Discord with students from 15+ countries. You are never alone in your learning.',
      realProjects: 'Real Projects',
      realProjectsDesc: 'You work with real company datasets. Your portfolio speaks for you in interviews.',
    },
    // Testimonials
    testimonials: {
      title: 'What our students say',
      subtitle: 'Real success stories',
    },
    // About
    about: {
      title: 'About me',
      intro: "I'm Ian Saura, Senior Data Engineer with over 5 years of experience at top tech companies.",
      experience: 'Currently working at CookUnity (remote from Argentina) designing and maintaining data pipelines at scale.',
      teaching: 'Besides my work as Data Engineer, I am a university professor at UNSAM, teaching Data Engineering and Big Data.',
      mission: 'My mission is to democratize access to quality Data Engineering education for the Spanish-speaking community.',
    },
    // Contact
    contact: {
      title: 'Have questions?',
      subtitle: 'Write to me and I will respond personally.',
      name: 'Your name',
      email: 'Your email',
      message: 'Your message',
      send: 'Send message',
      sending: 'Sending...',
      success: 'Message sent! I will reply soon.',
    },
  },

  // Locked content previews
  locked: {
    projects: {
      title: 'Practical Projects',
      description: 'Real projects you can add to your portfolio. From dashboards to data pipelines.',
      feature1: '12+ guided projects',
      feature2: 'Real datasets',
      feature3: 'Downloadable code',
      feature4: 'Project certificates',
    },
    datasets: {
      title: 'Datasets & APIs',
      description: 'Access to real datasets and APIs to practice with real-world data.',
      feature1: '50+ curated datasets',
      feature2: 'Live APIs',
      feature3: 'Data generator',
      feature4: 'Complete documentation',
    },
    videos: {
      title: 'Class Recordings',
      description: 'All live class recordings, Q&As and workshops.',
      feature1: '100+ hours of video',
      feature2: 'Weekly live classes',
      feature3: 'Q&A with Ian',
      feature4: 'Practical workshops',
    },
    store: {
      title: 'Rewards Store',
      description: 'Redeem your DataCoins for exclusive avatars, badges, titles and more.',
      feature1: 'Exclusive avatars',
      feature2: 'Collectible badges',
      feature3: 'Custom titles',
      feature4: 'Seasonal items',
    },
  },

  // Roadmap levels
  levels: {
    0: { name: 'Fundamentals', title: 'Data Analytics Foundations' },
    1: { name: 'Novice', title: 'Land Your First Job' },
    2: { name: 'Warrior', title: 'Junior to Mid-Level' },
    3: { name: 'Master', title: 'Senior Level' },
  },

  // Python playground specific
  pythonPlayground: {
    loadingFirst: 'This may take a few seconds the first time',
    yourCode: 'Your Python code:',
    shortcuts: 'Ctrl+Enter run • Tab indent',
  },

  // API Token section
  apiTokenSection: {
    datasets: 'Datasets',
    maxRows: 'Max: {{rows}} rows',
    available: 'Available Datasets',
  },

  // Share Progress
  share: {
    step1: '<strong>Download the image</strong> by clicking "Download"',
    step2: '<strong>Copy the text</strong> and click "Post on LinkedIn"',
    step3: '<strong>Paste the text</strong>, upload the image and post 🚀',
    tip: 'Tip',
    tagIan: 'Tag',
    forReach: 'in your post for greater reach. I\'ll share your post!',
    postLinkedIn: 'Post on LinkedIn',
  },

  // Project Detail page
  projectDetail: {
    commonErrors: 'Common mistakes to avoid',
    deliverable: 'Deliverable',
    selfEvaluation: 'Self-evaluation',
    learningObjectives: 'What you will learn',
    projectCompleted: 'Project Completed',
    interview: {
      title: 'How to Present This Project in an Interview',
      subtitle: 'Professional storytelling to impress',
      hook: 'Your Hook (10 seconds)',
      situation: 'Situation',
      task: 'Task',
      actions: 'Actions (what you did)',
      results: 'Results (quantifiable)',
      learnings: 'Lessons Learned',
      questions: 'Questions they may ask you',
      closing: 'Memorable Closing',
    },
    steps: 'Steps',
    outputs: 'Expected outputs',
    challenge: 'Challenge',
    hint: 'Hint',
    solution: 'Full Solution',
    tryFirst: 'Try to solve the project on your own before seeing this.',
    bestWay: 'It\'s the best way to learn and consolidate concepts.',
    markComplete: 'Mark as completed',
    resources: 'Resources',
  },

  // Landing Page - Testimonials
  testimonials: {
    title: 'What those who already',
    titleHighlight: 'transformed their career say',
    subtitle: '+150 professionals already made the leap',
    viewLinkedIn: 'View on LinkedIn',
    studentsWorkAt: 'Our students work at',
    remoteStartups: 'Remote Startups',
  },

  // Landing Page - Subscription Section
  landingSubscription: {
    badge: 'Premium Subscription',
    title: 'Everything for your career in',
    titleHighlight: 'Data Engineering',
    subtitle: 'One monthly payment. Unlimited access to all content.',
    feature1Title: '8 Weeks Videos',
    feature1Desc: 'Complete bootcamp',
    feature2Title: '3-Level Roadmap',
    feature2Desc: 'With saved progress',
    feature3Title: '6 Datasets',
    feature3Desc: 'To practice SQL',
    feature4Title: '5 Projects',
    feature4Desc: 'With self-evaluation',
    feature5Title: 'Premium Discord',
    feature5Desc: 'Exclusive community',
    feature6Title: 'Monthly Q&A',
    feature6Desc: 'Live sessions',
    feature7Title: '🆕 Interview Prep',
    feature7Desc: 'System Design + Behavioral',
    feature8Title: '🦖 Saurio AI',
    feature8Desc: 'Virtual interviewer',
    feature9Title: 'Skill Assessment',
    feature9Desc: 'Test your level',
    priceLabel: '✨ Accessible pricing for everyone',
    price: '$30USD/month',
    cta: '🔐 Log In and Subscribe',
    ctaNote: 'Instant access • Cancel anytime • Secure payment',
  },

  // Landing Page - FAQ
  faq: {
    title: 'Frequently Asked Questions',
    subtitle: 'Resolve your doubts before starting',
    q1: 'Do I need to know how to code?',
    a1Academy: 'No. Level 0 is for absolute beginners. Start from zero, no prior knowledge required.',
    a1Bootcamp: 'Yes, recommended. You should have at least Level 1 of the Academy completed, or basic Python and SQL knowledge.',
    q2: 'How long will it take me?',
    a2: 'Depends on your dedication. With 1-2 hours per day:',
    a2Level0: 'Level 0: 2-3 weeks',
    a2Level1: 'Level 1: 4-6 weeks',
    a2Ready: 'Ready for interviews: 2-3 months',
    q3: 'Can I cancel anytime?',
    a3: 'Yes, 100%. No commitments, no fine print. Cancel from your account in one click anytime.',
    q4: 'Academy or Bootcamp? Which one?',
    a4Academy: 'Learn at your own pace, ideal if you work or study. Permanent access while subscribed.',
    a4Bootcamp: '8 intensive weeks live with group and deadlines. Ideal if you want structure and commitment.',
    a4Tip: '💡 Tip: Many do Level 0-1 in the Academy and then join the Bootcamp.',
    q5: 'Does it work for my country?',
    a5: 'Yes. All content is online and in Spanish. We have students from Argentina, Mexico, Colombia, Chile, Peru, Spain and more. Payments are in USD and international cards are accepted.',
    moreQuestions: 'More questions? Write to me directly',
    askDiscord: 'Ask on Discord',
  },

  // Landing Page - About
  about: {
    title: 'About me',
    subtitle: 'Ian Saura - Data Engineer and Educator',
    role: 'Data Engineer & Professor',
    location: 'Buenos Aires, Argentina',
    bio: 'I\'m a Data Engineer with a practical and educational approach. I help people who want to enter the world of data, improve their technical skills and build a career with purpose.',
    bio2: 'I\'m passionate about teaching, creating useful content and helping solve real problems. As a professor at Universidad Nacional de San Martín, I combine my practical industry experience with my vocation for education.',
    philosophy: '💡 My philosophy: I don\'t teach abstract theory. I share exactly what works in the real world, with practical examples and tools you can use from day one.',
    yearsExp: 'Years in Data Engineering',
    transformed: 'Professionals transformed',
  },

  // Landing Page - Contact
  contact: {
    title: 'Have questions?',
    subtitle: 'Write to me directly at info@iansaura.com or use the form',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'you@email.com',
    messagePlaceholder: 'Your message...',
    send: 'Send message',
  },

  // Landing Page - Final CTA
  finalCta: {
    title: 'Ready to transform your career?',
    subtitle: 'Join +150 professionals who already made the leap to Data Engineering',
    cta: '🔐 Start Now',
    note: '✨ Cancel anytime • No commitment',
  },

  // Landing Page - Footer
  landingFooter: {
    tagline: 'Data Engineer and Educator',
    terms: 'Terms and Conditions',
    privacy: 'Privacy Policy',
    conduct: 'Code of Conduct',
  },

  // Subscription Page
  subscriptionPage: {
    redirecting: 'Redirecting to your members area...',
    hero: {
      title: 'Roadmap, videos, exercises, projects and community. Everything in one place.',
      trial: 'Subscribe Now',
      trialDesc: 'Full access • No commitment • Cancel anytime',
      startTrial: 'Subscribe - $30/month',
      afterTrial: 'Cancel anytime',
      joinNow: 'Subscribe Now',
      joinNowDesc: 'Full access to all premium content',
      subscribe: 'Subscribe - $30/month',
      cancelAnytime: 'Cancel anytime',
      students: 'Students',
      exercises: 'Exercises',
      projects: 'Projects',
      weeksVideo: 'Weeks Video',
    },
    plans: {
      choosePlan: 'Choose your plan',
      monthly: 'Monthly',
      perMonth: '/month',
      launchPrice: 'Launch price',
      afterDate: 'After 7/12: $30/month',
      allContent: 'All content',
      cancelAnytime: 'Cancel anytime',
      priceLockedForever: 'Price locked forever',
      chooseMonthly: 'Choose Monthly',
      mostPopular: '⭐ MOST POPULAR',
      sixMonths: '6 Months',
      save30: '💰 Save $30',
      sixMonthsAccess: '6 months access',
      bestPricePerMonth: 'Best price per month',
      noAutoRenewal: 'No auto-renewal',
      chooseSixMonths: 'Choose 6 Months',
      twelveMonths: '12 Months',
      save120: '🔥 Save $120',
      oneYearComplete: '1 full year',
      bestSavings: 'Best total savings',
      chooseTwelveMonths: 'Choose 12 Months',
      securePayment: 'Secure payment with card or PayPal • Instant access',
      afterPayment: '📌 After paying on Gumroad:',
      afterPaymentStep: 'Go back to iansaura.com → Click on "Sign in with Google"',
      afterPaymentNote: '(Use the same email you paid with)',
    },
    features: {
      title: 'Everything included in your subscription',
      subtitle: 'A complete platform designed to take you from zero to professional Data Engineer',
      exercises: '70+ SQL + Python Exercises',
      exercisesDesc: '51 SQL exercises (Window Functions, CTEs, dbt) + 21 Python (Pandas, ETL, Airflow). Run 100% in your browser. Real FAANG interview questions.',
      dbtAirflow: 'dbt + Airflow',
      dbtAirflowDesc: 'Practical dbt exercises (ref, source, incremental, tests, macros, snapshots) and Airflow (DAGs, operators, XCom, sensors, branching).',
      roadmap: 'Interactive Roadmap',
      roadmapDesc: '3 complete levels: get job → Jr/SSR → Senior. With checkboxes, reflections and saved progress.',
      videos: 'Bootcamp Videos',
      videosDesc: '8 weeks of recorded content. From fundamentals to production. Embedded videos, watch directly on the platform.',
      datasets: 'Dataset Generator',
      datasetsDesc: '6 types of datasets: E-commerce, Logs, Finance, HR, IoT, Streaming. Download in CSV/JSON or use the API.',
      projects: '+25 Guided Projects',
      projectsDesc: 'Projects with clear instructions, detailed steps, code and self-evaluation. From simple ETL to System Design.',
      discord: 'Discord Community',
      discordDesc: 'Exclusive subscribers channel. Network, ask questions, share achievements.',
      qa: 'Monthly Live Q&A',
      qaDesc: 'Sessions where I answer YOUR questions. First come, more time for you.',
      saurio: 'Saurio - Your AI Tutor 🦖',
      saurioDesc: 'Your intelligent assistant that guides you with hints, explains concepts, and helps you navigate the platform. Available 24/7!',
    },
    syllabus: {
      title: 'Complete Syllabus',
      subtitle: 'What will you learn exactly?',
      description: 'Structured and progressive content to take you from zero to professional Data Engineer',
    },
    roadmapLevels: {
      title: 'Roadmap in 3 Levels',
      subtitle: 'Your step-by-step guide from zero to Senior',
      level1: 'Get Your First Job',
      level2: 'From Entry to Jr/SSR',
      level3: 'Become Senior',
    },
    datasetsSection: {
      title: 'Real datasets to practice',
      subtitle: 'Generate datasets from different industries to practice SQL, Python and Data Engineering projects.',
    },
    testimonialsSection: {
      title: 'What subscribers say',
    },
    faqSection: {
      title: 'Frequently Asked Questions',
    },
    finalCta: {
      title: 'Ready to become a Data Engineer?',
      subtitle: '150+ professionals already did it. Start free today.',
    },
    moreProjects: '+19 more projects available on the platform',
  },
};

// ============================================
// PORTUGUESE TRANSLATIONS
// ============================================
export const PT: TranslationDict = {
  // Navigation
  nav: {
    home: 'Início',
    subscription: 'Assinatura',
    bootcamp: 'Bootcamp',
    bootcamps: 'Bootcamps',
    mentorias: 'Mentorias',
    empresas: 'Para Empresas',
    login: 'Entrar',
    logout: 'Sair',
    academy: 'Ir para a Academia',
    admin: 'Painel Admin',
    register: 'Cadastrar',
  },
  
  // Hero section (Landing)
  hero: {
    title: 'Domine Data Engineering',
    subtitle: 'De zero a Data Engineer em semanas, não anos',
    description: 'A academia #1 de Data Engineering na LATAM. Projetos reais, mentorias personalizadas e uma comunidade que te impulsiona.',
    cta: 'Começar Grátis',
    ctaSecondary: 'Ver Planos',
    students: 'estudantes ativos',
    rating: 'avaliação média',
    projects: 'projetos concluídos',
  },
  
  // Features
  features: {
    title: 'Por que nos escolher?',
    subtitle: 'Tudo o que você precisa para se tornar um Data Engineer',
    practice: {
      title: 'Prática Ilimitada',
      description: 'SQL e Python com exercícios reais de entrevistas',
    },
    projects: {
      title: 'Projetos Reais',
      description: 'Construa seu portfólio com projetos da indústria',
    },
    community: {
      title: 'Comunidade Ativa',
      description: 'Discord 24/7 com mentores e estudantes',
    },
    mentoring: {
      title: 'Mentorias 1:1',
      description: 'Sessões personalizadas com especialistas',
    },
  },

  // Motivational messages
  motivational: {
    start: 'Comece hoje! O melhor momento para começar foi ontem, o segundo melhor é agora.',
    progress25: 'Você está no caminho certo! Cada passo conta, continue assim.',
    progress50: 'Você está on fire! Já passou do primeiro quarto, não pare.',
    progress75: 'Mais da metade! Você é daqueles que terminam o que começam.',
    progress90: 'Quase lá! Falta pouco para ser um profissional certificado.',
    completed: 'Você conseguiu! Você é um Data Engineer de verdade. Agora continue crescendo.',
  },
  
  // Members area
  members: {
    dashboard: 'Dashboard',
    roadmap: 'Roadmap',
    projects: 'Projetos',
    datasets: 'Datasets',
    videos: 'Gravações',
    practice: 'Prática',
    store: 'Loja',
    welcome: 'Bem-vindo',
    level: 'Nível',
    xp: 'XP',
    coins: 'DataCoins',
    streak: 'Sequência',
    days: 'dias',
    progress: 'Seu Progresso',
    continueWhere: 'Continue de onde parou',
    nextStep: 'Próximo passo',
    achievements: 'Conquistas',
    leaderboard: 'Ranking',
    settings: 'Configurações',
    byIanSaura: 'por Ian Saura',
    language: 'Idioma',
    premiumActive: 'Premium Ativo',
    premiumSubscriber: 'Assinante Premium',
    goToBootcamp: 'Ir para o Bootcamp',
    goToMainSite: 'Ir para o site principal',
    discordCommunity: 'Comunidade Discord',
    support: 'Suporte',
    changePassword: 'Alterar senha',
    closeSession: 'Sair',
  },
  
  // Practice
  practice: {
    sql: 'Prática SQL',
    python: 'Prática Python',
    difficulty: {
      easy: 'Fácil',
      medium: 'Médio',
      hard: 'Difícil',
      expert: 'Expert',
    },
    category: 'Categoria',
    all: 'Todos',
    run: 'Executar',
    hint: 'Dica',
    solution: 'Ver Solução',
    reset: 'Reiniciar',
    next: 'Próximo',
    previous: 'Anterior',
    correct: 'Correto!',
    incorrect: 'Incorreto, tente novamente',
    theory: 'Teoria',
    exercise: 'Exercício',
    completed: 'Concluído',
    time: 'Tempo',
    interview: 'Modo Entrevista',
    focused: 'Modo Focado',
    exercises: 'exercícios',
    start: 'Começar',
    copy: 'Copiar',
    copied: 'Copiado',
  },
  
  // Daily challenges
  daily: {
    title: 'Missões Diárias',
    completed: 'Concluídas',
    bonus: 'Bônus por completar todas',
    streak: 'Sequência de dias',
    reset: 'Reiniciam em',
  },
  
  // Achievements
  achievements: {
    title: 'Conquistas',
    unlocked: 'Desbloqueado',
    locked: 'Bloqueado',
    progress: 'Progresso',
  },
  
  // Subscription
  subscription: {
    title: 'Escolha seu Plano',
    subtitle: 'Invista no seu futuro como Data Engineer',
    monthly: 'Mensal',
    sixMonths: '6 Meses',
    yearly: 'Anual',
    perMonth: '/mês',
    save: 'Você economiza',
    popular: 'Mais Popular',
    features: {
      unlimited: 'Prática ilimitada SQL + Python',
      projects: 'Projetos com datasets reais',
      videos: 'Gravações de aulas',
      community: 'Acesso à comunidade Discord',
      mentoring: 'Mentorias em grupo mensais',
      certificates: 'Certificados verificáveis',
    },
    trial: {
      title: '$30/mês',
      description: 'Acesso completo sem compromisso',
      cta: 'Assinar Agora',
    },
    guarantee: 'Cancele quando quiser',
    // Hero section translations
    launchPrice: 'PREÇO DE LANÇAMENTO! Agora $30/mês PARA SEMPRE',
    heroTitle: 'Torne-se um(a)',
    heroTitleHighlight: 'Data Engineer',
    heroDescription: 'Roadmap, vídeos, exercícios, projetos e comunidade. Tudo em um único lugar.',
  },
  
  // Bootcamp
  bootcamp: {
    title: 'Bootcamp de Data Engineering',
    subtitle: 'De zero a profissional em 8 semanas',
    duration: 'Duração',
    weeks: 'semanas',
    format: 'Formato',
    online: 'Online ao vivo',
    recorded: 'Gravações disponíveis',
    includes: 'Inclui',
    syllabus: 'Ementa',
    week: 'Semana',
    enroll: 'Inscrever-me',
    nextCohort: 'Próxima turma',
    spots: 'vagas disponíveis',
    whySelected: 'Por que você deveria ser selecionado?',
    joinWaitlist: 'Entrar na Lista de Espera',
    notFound: 'Bootcamp não encontrado',
  },
  
  // Auth
  auth: {
    login: 'Entrar',
    register: 'Criar Conta',
    email: 'E-mail',
    password: 'Senha',
    currentPassword: 'Senha atual',
    newPassword: 'Nova senha',
    confirmPassword: 'Confirmar Senha',
    changePassword: 'Alterar Senha',
    passwordLength: 'A senha deve ter pelo menos 6 caracteres',
    passwordsDoNotMatch: 'As senhas não coincidem',
    passwordUpdateFailed: 'Erro ao alterar senha',
    passwordUpdated: 'Senha atualizada!',
    name: 'Nome',
    forgotPassword: 'Esqueceu sua senha?',
    noAccount: 'Não tem uma conta?',
    hasAccount: 'Já tem uma conta?',
    orContinueWith: 'Ou continue com',
    google: 'Google',
    termsAgree: 'Ao se cadastrar, você concorda com nossos',
    terms: 'Termos e Condições',
    and: 'e',
    privacy: 'Política de Privacidade',
    // Auth Page specific
    welcome: '👋 Bem-vindo',
    createAccount: '✨ Criar Conta',
    premiumSubscription: '🚀 Assinatura Premium',
    joinClub: '🚀 Junte-se ao Clube',
    signInContinue: 'Faça login para continuar',
    signInSubscription: 'Faça login para continuar com sua assinatura',
    exclusiveContent: 'Acesse todo o conteúdo exclusivo',
    joinEngineers: 'Junte-se a +100 Engenheiros de Dados',
    continueSubscription: '🚀 Continuar para Assinatura',
    subscribePrice: '🎉 Inscrever-se por $10/mês',
    signIn: 'Fazer Login',
    createAccountBtn: 'Criar Conta',
    processing: 'Processando...',
    emailVerified: 'Email verificado!',
    verificationError: 'Erro de verificação',
    canLoginNow: 'Você pode fazer login com sua conta agora.',
    verificationProblem: 'Houve um problema com a verificação.',
    closeBtn: '✕ Fechar',
    continueGoogle: 'Continuar com Google',
    or: 'ou continue',
    selectGoogle: 'Selecione sua conta Google',
    connecting: 'Conectando...',
    emailNotVerified: 'Email não verificado',
    checkInbox: 'Verifique sua caixa de entrada (e spam) em {email} para o link de verificação.',
    emailResent: '✅ Email reenviado!',
    checkInboxSpam: 'Verifique sua caixa de entrada e pasta de spam',
    resending: 'Reenviando...',
    resendVerification: '📨 Reenviar email de verificação',
    contactSupport: 'Problemas? Entre em contato conosco em info@iansaura.com',
    backHome: '← Voltar ao início',
    transformCareer: '🚀 Transforme sua carreira',
    joinProfessionals: 'Junte-se a +100 profissionais que já estão crescendo',
    exclusiveVideos: 'Vídeos exclusivos semanais',
    videosDescription: 'Casos reais da indústria explicados passo a passo',
    downloadablePdfs: 'Guias em PDF para download',
    pdfsDescription: 'Templates e recursos prontos para usar',
    personalizedRoadmaps: 'Roadmaps personalizados',
    roadmapsDescription: 'Caminhos de aprendizado adaptados ao seu nível',
    privateCommunity: 'Comunidade privada',
    communityDescription: 'Discord exclusivo com outros Engenheiros de Dados',
    interviewPrep: 'Preparação para entrevistas',
    interviewDescription: 'Perguntas reais e simulações práticas',
    monthlyMentoring: 'Mentoria em grupo mensal',
    mentoringDescription: 'Sessões ao vivo com Q&A personalizado',
    rating: '5.0 (100+ avaliações)',
    testimonial: '"O conteúdo de Ian transformou minha carreira. Em 4 meses consegui meu primeiro trabalho como Engenheiro de Dados com 40% de aumento salarial."',
    testimonialAuthor: '— Maria Gonzalez, Junior Data Engineer na Mercado Libre',
    satisfaction: '💚 Garantia de satisfação',
    cancelAnytime: 'Cancele a qualquer momento. Sem contratos, sem compromisso, sem perguntas. Sua satisfação é nossa prioridade.',
    // Referral
    referralActive: 'Código de indicação ativo!',
    referralBonus: 'Você receberá um desconto especial ao assinar',
  },
  
  // Common
  common: {
    loading: 'Carregando...',
    error: 'Erro',
    save: 'Salvar',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    back: 'Voltar',
    continue: 'Continuar',
    start: 'Começar',
    finish: 'Finalizar',
    view: 'Ver',
    download: 'Baixar',
    share: 'Compartilhar',
    search: 'Buscar',
    filter: 'Filtrar',
    sort: 'Ordenar',
    more: 'Ver mais',
    less: 'Ver menos',
    all: 'Todos',
    none: 'Nenhum',
    yes: 'Sim',
    no: 'Não',
    or: 'ou',
    and: 'e',
    free: 'Grátis',
    premium: 'Premium',
    locked: 'Bloqueado',
    unlock: 'Desbloquear',
    month: 'mês',
    subscribeNow: 'Assinar Agora',
    messageSent: 'Mensagem enviada!',
    willReply: 'Responderei em menos de 24 horas.',
    sending: 'Enviando...',
    contact: 'Contato',
    refundPolicy: 'Política de Reembolso',
    allRightsReserved: 'Todos os direitos reservados.',
    completed: 'Completado',
    // Roadmap related
    jobSearch: 'Busca de emprego',
    interviews: 'Entrevistas',
    companyPerformance: 'Desempenho na empresa',
    salaryNegotiation: 'Negociação salarial',
    architectures: 'Arquiteturas',
    effectiveCommunication: 'Comunicação efetiva',
    technicalLeadership: 'Liderança técnica',
    codeQuality: 'Qualidade de código',
    architecturalDecisions: 'Decisões arquitetônicas',
    juniorMentoring: 'Mentoria de juniors',
  },
  
  // Errors
  errors: {
    generic: 'Algo deu errado. Tente novamente.',
    network: 'Erro de conexão. Verifique sua internet.',
    notFound: 'Página não encontrada',
    unauthorized: 'Você não tem acesso a esta seção',
    sessionExpired: 'Sua sessão expirou. Faça login novamente.',
  },
  
  // Success messages
  success: {
    saved: 'Salvo com sucesso!',
    copied: 'Copiado para a área de transferência!',
    purchased: 'Compra realizada com sucesso!',
    completed: 'Concluído!',
  },
  
  // Footer
  footer: {
    rights: 'Todos os direitos reservados',
    terms: 'Termos e Condições',
    privacy: 'Política de Privacidade',
    conduct: 'Código de Conduta',
    refunds: 'Política de Reembolso',
    contact: 'Contato',
  },

  // Dashboard specific
  // Tools section
  tools: {
    title: 'Ferramentas e mais',
    api: 'API de Datasets',
    apiDescription: 'Gere dados programaticamente para seus projetos',
    generateToken: 'Gerar Token',
    requestsPerHour: 'requisições/hora',
    tokenDuration: 'Duração do token',
    viewDatasets: 'Ver Datasets',
  },

  // Referral program
  referral: {
    title: '🎁 Programa de Indicação',
    subtitle: 'Compartilhe a plataforma com amigos e ambos obtêm benefícios',
    freeTrial: 'Desconto especial',
    yourBenefits: 'Seus benefícios',
    friendBenefits: 'Benefícios para seu amigo',
    yourDiscount: 'Seu desconto',
    yourDiscounts: 'Seus descontos',
    friendDiscount: 'Desconto para seu amigo',
    perFriend: 'por amigo',
    yourCode: 'Seu código de indicação',
    freeUser: {
      title: 'Usuário Free',
      description: 'Indique amigos e ganhe descontos',
      benefit1: 'Você recebe um desconto especial',
      benefit2: 'Seu amigo recebe um desconto especial',
      benefit3: 'Os benefícios acumulam! Mais indicações = mais descontos',
    },
    premiumUser: {
      title: 'Usuário Premium',
      description: 'Ajude a crescer a comunidade',
      benefit1: 'Seu amigo recebe um desconto especial',
      benefit2: 'Você ganha 10% de desconto no próximo Bootcamp',
    },
    cta: 'Obter meu Código de Indicação',
    note: 'Seu código estará disponível no seu dashboard após se cadastrar',
  },

  // Leaderboard section
  leaderboard: {
    title: 'Leaderboard do mês',
    scoring: 'Pontuação: +10 XP por exercício completado, +25 XP por projeto',
    steps: 'passos',
    projects: 'projetos',
    you: 'Você',
    gold: '🥇 Ouro',
    silver: '🥈 Prata',
    bronze: '🥉 Bronze',
    hallOfFame: 'Vencedores do mês anterior',
    currentMonth: 'Ranking atual',
    prizes: 'Os prêmios são entregues no 1º de cada mês',
  },

  dashboard: {
    sessionToday: 'Sua sessão de hoje',
    xpPossible: '~10 min • {{xp}} XP possíveis',
    tasks: '{{completed}}/{{total}} tarefas',
    go: 'Ir',
    startStreak: 'Comece sua sequência',
    tools: 'Ferramentas e mais',
    leaderboardMonth: 'Leaderboard do mês',
    tip: '💡 Dica: Complete a sessão todos os dias para manter sua sequência',
    time: {
      hour: '1 hora',
      sixHours: '6 horas',
      day: '24 horas',
      threeDays: '3 dias',
      week: '7 dias'
    },
    ranks: {
      seed: 'Semente',
      novice: 'Novato',
      apprentice: 'Aprendiz',
      adept: 'Adepto',
      expert: 'Especialista',
      master: 'Mestre',
      legend: 'Lenda'
    },
    stats: {
      xp: 'XP',
      coins: 'DataCoins',
      steps: 'Passos',
      projects: 'Projetos'
    },
    sessionComplete: 'Excelente! Você completou sua sessão de hoje',
    streakSafe: 'Sua sequência está segura. Volte amanhã para continuar.',
    weeklyChallenge: 'Desafio Semanal',
    until: 'Até {{date}}',
    instructions: 'Instruções',
    deliverable: 'Entregável',
    submitDiscord: 'Entregar no Discord',
    jobs: 'Vagas',
    achievements: 'Conquistas',
    unlocked: '{{count}}/{{total}} desbloqueados',
    certificates: 'Certificados Verificáveis',
    stepsRemaining: '{{count}} passos restantes',
    sessionTitle: {
      complete: 'Sessão completada!',
      active: 'Sua sessão de hoje'
    },
    sessionSubtitle: {
      complete: '+{{xp}} XP ganhos',
      active: '~{{time}} min • {{xp}} XP possíveis'
    }
  },

  // Onboarding
  onboarding: {
    welcome: '🎉 Bem-vindo ao Premium! 🚀',
    intro: 'Você tem acesso COMPLETO. Vou explicar rapidamente as 6 seções da plataforma para você aproveitar ao máximo.',
    tour: '💡 Tour de 1 minuto',
    prev: 'Anterior',
    next: 'Próximo',
    skip: 'Pular tour',
    start: 'Começar!',
    steps: {
      dashboard: { title: 'Seu Centro de Comando', description: 'Aqui você vê seu progresso diário, sequência e próximas tarefas.' },
      roadmap: { title: 'Seu Caminho', description: 'O mapa passo a passo para se tornar um Data Engineer.' },
      projects: { title: 'Projetos Reais', description: 'Construa seu portfólio com casos de uso da indústria.' },
      practice: { title: 'Prática Ilimitada', description: 'Exercícios de SQL e Python para aprimorar suas habilidades.' },
      datasets: { title: 'Dados Reais', description: 'Baixe datasets para seus próprios projetos.' },
      videos: { title: 'Aulas Gravadas', description: 'Acesso a todas as aulas dos bootcamps anteriores.' }
    }
  },

  // Playground (SQL/Python)
  playground: {
    mission: 'Sua Missão',
    selectColumns: 'Selecione todas as colunas da tabela products.',
    run: 'Executar',
    running: 'Executando...',
    hint: 'Dica',
    solution: 'Solução',
    viewSolution: 'Ver Solução',
    hideSolution: 'Ocultar Solução',
    copy: 'Copiar',
    copied: 'Copiado',
    reset: 'Reiniciar',
    nextExercise: 'Próximo exercício',
    correct: 'Correto!',
    incorrect: 'Incorreto, tente novamente',
    theory: 'Teoria',
    exercise: 'Exercício',
    originalData: '👆 Estes são os dados originais da tabela. Use esta informação para escrever sua query.',
    focusedMode: 'Modo Focado',
    normalMode: 'Modo Normal',
    executeCode: 'Executar código',
    importLibs: 'Importar bibliotecas',
    syntax: 'Sintaxe:',
    bestPractice: 'Melhor Prática:',
    realLife: 'Na vida real',
    output: 'Resultado',
    expected: 'Resultado Esperado',
    diff: 'Diferença',
    startTimer: 'Iniciar Timer',
    yourSqlQuery: 'Sua Query SQL'
  },

  // Shop
  shop: {
    title: 'Loja',
    badges: 'Emblemas',
    titles: 'Títulos',
    backgrounds: 'Fundos',
    rarity: {
      common: 'Comum',
      rare: 'Raro',
      epic: 'Épico',
      legendary: 'Lendário'
    },
    status: {
      acquired: 'Adquirido',
      equipped: 'Equipado',
      equip: 'Equipar',
      buy: 'Comprar',
      missing: 'Faltan {{amount}} DataCoins'
    }
  },

  // Datasets
  datasets: {
    title: 'Datasets & APIs',
    subtitle: 'Gere datasets realistas para praticar. Baixe em CSV, JSON ou use a API.',
    available: 'Disponível',
    consumeApi: 'Consuma dados diretamente do seu código:',
    availableTypes: 'Tipos disponíveis:',
    parameters: 'Parâmetros:',
    selectDataset: 'Selecione um dataset:',
    configuration: 'Configuração',
    rows: 'Linhas (tabela principal)',
    format: 'Formato download',
    generate: 'Gerar Dataset',
    generating: 'Gerando...',
    success: 'Dataset gerado com sucesso',
    downloadAll: 'Baixar Tudo',
    files: 'arquivos',
    schema: 'Esquema de tabelas',
    relations: 'Relações',
    preview: 'Prévia de {{table}}',
    tips: {
      title: '💡 Dicas para Praticar',
      tip1: 'Pratique JOINs complexos combinando múltiplas tabelas',
      tip2: 'Use Window Functions para análises avançadas',
      tip3: 'Experimente com CTEs para consultas mais legíveis',
      tip4: 'Crie dashboards com os dados que gerar'
    },
    voting: {
      title: '🗳️ Próximo Dataset',
      subtitle: 'O mais votado será adicionado no próximo mês',
      placeholder: 'Que dataset você gostaria de ver?',
      suggest: 'Sugerir um dataset',
      firstSuggest: 'Seja o primeiro a sugerir',
      leader: '🏆 Líder: {{votes}} votos'
    },
    apiToken: {
      title: 'Token da API',
      description: 'Use seu token para acessar datasets do seu código',
      generate: 'Gerar Token',
      copy: 'Copiar Token',
      delete: 'Deletar Token',
      example: 'Exemplo de uso'
    },
    types: {
      ecommerce: 'E-commerce',
      fintech: 'Fintech',
      healthcare: 'Saúde',
      iot: 'Sensores IoT'
    }
  },

  // Videos
  videos: {
    progress: 'Progresso do Bootcamp',
    watchHere: 'Assista aos vídeos aqui mesmo.',
    doubts: 'Tem dúvidas sobre os vídeos?',
    leaveQuestions: 'Deixe suas perguntas no canal',
    discordChannel: 'do Discord para a próxima sessão ao vivo.',
    goToDiscord: 'Ir para o Discord',
    comingSoon: 'Em breve'
  },

  // Certificate
  certificate: {
    title: 'Certificado de Conclusão',
    awardedTo: 'Concedido a',
    forCompleting: 'Por concluir com êxito',
    download: 'Baixar certificado',
    share: 'Compartilhar no LinkedIn'
  },

  // Energy
  energy: {
    title: 'Energia',
    refill: 'Recarrega em',
    full: 'Energia completa!'
  },
  quickWin: {
    title: '🎯 Seu Primeiro Desafio SQL',
    subtitle: 'Complete em 2 minutos e ganhe +50 XP',
    challenge: 'O Desafio:',
    description: 'Você tem uma tabela <code class="bg-slate-700 px-1.5 py-0.5 rounded text-emerald-400">vendas</code> com produtos vendidos. <strong class="text-white">Calcule o total de receitas</strong> (quantidade × preço).',
    hint: 'Dica',
    hintText: 'Use <code class="bg-slate-700 px-1 rounded">SUM(quantidade * preço)</code> para calcular o total',
    queryLabel: 'Sua consulta SQL:',
    run: 'Executar',
    skip: 'Pular por enquanto',
    success: 'Excelente!',
    successMsg: 'Você acabou de executar sua primeira consulta SQL',
    continue: 'Continuar para o Dashboard',
    progress: 'Em progresso',
    completed: 'Concluído',
    streakRisk: 'Sua sequência está em risco!',
    completeToday: 'Complete hoje para não perder',
    streakActive: 'Sequência ativa',
    record: 'Recorde: {{days}} dias',
    missionsToday: 'Missões de hoje',
    missionsBonus: 'Complete 3 para bônus de {{xp}} XP',
    resetsIn: 'Reinicia em {{hours}}h {{minutes}}m',
    completedMission: 'Completada!',
    bonusUnlocked: '🎉 Bônus desbloqueado!',
    completeMore: 'Complete mais {{count}} para o bônus',
  },
  shopExtended: {
    packages: 'Pacotes de DataCoins',
    packagesDesc: 'Compre DataCoins para desbloquear avatares, badges e títulos exclusivos. As coins são permanentes e nunca expiram!',
    mostPopular: 'MAIS POPULAR',
    totalCoins: 'DataCoins totais',
    securePayment: 'Pagamento seguro com cartão ou PayPal',
    autoCredit: 'Acreditação automática:',
    autoCreditDesc: 'Depois de pagar, suas DataCoins são creditadas automaticamente em sua conta em menos de 5 minutos. Você receberá um e-mail de confirmação.',
    support: 'Problemas com sua compra? Escreva para nós em',
    howToEarn: 'Como ganhar DataCoins grátis',
    earn: {
      step: 'Completar um passo',
      project: 'Completar um projeto',
      video: 'Assistir a um vídeo',
      streak7: 'Sequência de 7 dias',
      streak30: 'Sequência de 30 dias',
      levelUp: 'Subir de nível'
    },
    services: {
      title: 'Serviços Premium com Ian',
      subtitle: 'Mentoria personalizada direta com Ian Saura',
      desc: 'Quer feedback profissional direto? Estes serviços dão acesso exclusivo a revisões personalizadas, mentorias e mais.',
      valuable: 'O mais valioso da loja.',
      howWorks: 'Como funciona o Code Review?',
      step1: 'Resgate o Code Review com suas DataCoins',
      step2: 'Envie o link do seu projeto (GitHub) pelo Discord para',
      step3: 'Ian revisa seu código e envia um',
      document: 'documento escrito de 2-3 páginas',
      feedbackDetail: 'com feedback detalhado, melhorias e próximos passos em 48-72 horas úteis',
      feedbackNote: 'O feedback inclui: análise de código, boas práticas, erros comuns, sugestões de melhoria e recomendações para seu próximo projeto.'
    },
    redeemed: 'Resgatado!',
    redeem: 'Resgatar',
    serviceRedeemed: 'Serviço Resgatado!',
    nextSteps: 'Próximos passos:',
    gotIt: 'Entendido!',
    tip: 'Dica:',
    tipText: 'Mencione seu email da plataforma ao me escrever para que eu possa identificar sua compra.'
  },

  // Landing page specific
  landing: {
    // Banner
    banner: {
      trial: 'Assine Hoje!',
      trialDesc: 'Acesso completo à Academia Premium.',
      noRisk: 'Cancele quando quiser.',
      startFree: 'Assinar',
      hello: 'Olá',
      hasAccess: 'Você tem acesso a',
      academyBootcamp: 'Academia + Bootcamp',
      academyPremium: 'Academia Premium',
      bootcamp: 'Bootcamp',
      academyFree: 'Academia (Nível 0 Grátis)',
      academy: 'Academia',
    },
    // Hero
    hero: {
      imIan: 'Sou',
      dataEngineer: 'Data Engineer e Educador.',
      helpProfessionals: 'Ajudo profissionais a',
      increaseSalary: 'aumentar seu salário',
      getRemoteJobs: 'e conseguir trabalhos remotos como',
      dataEngineers: 'Data Engineers',
      inWeeks: 'em 4-12 semanas.',
      bootcampsIntensive: 'Bootcamps intensivos em espanhol',
      personalizedMentoring: '+ mentorias personalizadas 1:1.',
      beginnerToExpert: 'Do iniciante ao especialista.',
    },
    // Bootcamp Card
    bootcampCard: {
      nextEdition: 'PRÓXIMA EDIÇÃO A CONFIRMAR',
      title: 'Bootcamp Fundamentos de Data Engineering',
      description: '8 semanas intensivas ao vivo. Pague agora para reservar seu lugar na próxima edição (dentro dos próximos 6 meses).',
      limitedSpots: 'Uma vez confirmada a data, o preço sobe.',
      feature1: 'Python, SQL, ETL/ELT',
      feature2: 'Aulas ao vivo + gravações',
      feature3: 'Projeto final para seu portfólio',
      earlyBird: 'Preço pré-inscrição',
      viewDetails: 'Ver detalhes',
      reserve: 'Reservar vaga',
    },
    // Subscription Card
    subscriptionCard: {
      recommended: 'RECOMENDADO PARA COMEÇAR',
      title: 'Academia Premium',
      description: 'Tudo que você precisa para se tornar um Data Engineer. Acesso imediato 24/7.',
      startToday: 'Comece hoje.',
      feature1: 'Roadmap interativo completo',
      feature2: 'Exercícios SQL + Python',
      feature3: 'Projetos com datasets reais',
      feature4: 'Comunidade Discord exclusiva',
      perMonth: '/mês',
      trialDays: '$30/mês',
      startTrial: 'Assinar Agora',
      viewPlans: 'Ver todos os planos',
    },
    // Stats
    stats: {
      students: 'Estudantes formados',
      jobsLanded: 'Empregos conquistados',
      countries: 'Países',
      rating: 'Avaliação',
    },
    // Why choose us
    whyUs: {
      title: 'Por que nos escolher?',
      subtitle: 'O que nos diferencia de outros bootcamps e cursos',
      realExperience: 'Experiência Real',
      realExperienceDesc: 'Trabalho como Data Engineer Sênior em empresas de primeiro nível. Ensino o que realmente se usa na indústria.',
      provenMethod: 'Método Comprovado',
      provenMethodDesc: '150+ alunos que conseguiram trabalho como Data Engineers graças ao nosso programa.',
      activeCommunity: 'Comunidade Ativa',
      activeCommunityDesc: 'Discord 24/7 com estudantes de 15+ países. Você nunca está sozinho no seu aprendizado.',
      realProjects: 'Projetos Reais',
      realProjectsDesc: 'Você trabalha com datasets reais de empresas. Seu portfólio fala por você nas entrevistas.',
    },
    // Testimonials
    testimonials: {
      title: 'O que nossos alunos dizem',
      subtitle: 'Histórias reais de sucesso',
    },
    // About
    about: {
      title: 'Sobre mim',
      intro: 'Sou Ian Saura, Data Engineer Sênior com mais de 5 anos de experiência em empresas tech de primeiro nível.',
      experience: 'Atualmente trabalho na CookUnity (remoto da Argentina) projetando e mantendo pipelines de dados em escala.',
      teaching: 'Além do meu trabalho como Data Engineer, sou professor universitário na UNSAM, ensinando Engenharia de Dados e Big Data.',
      mission: 'Minha missão é democratizar o acesso à educação de qualidade em Data Engineering para a comunidade de língua espanhola.',
    },
    // Contact
    contact: {
      title: 'Tem dúvidas?',
      subtitle: 'Escreva para mim e eu respondo pessoalmente.',
      name: 'Seu nome',
      email: 'Seu email',
      message: 'Sua mensagem',
      send: 'Enviar mensagem',
      sending: 'Enviando...',
      success: 'Mensagem enviada! Responderei em breve.',
    },
  },

  // Locked content previews
  locked: {
    projects: {
      title: 'Projetos Práticos',
      description: 'Projetos reais que você pode adicionar ao seu portfólio. De dashboards a pipelines de dados.',
      feature1: '12+ projetos guiados',
      feature2: 'Datasets reais',
      feature3: 'Código para download',
      feature4: 'Certificados de projetos',
    },
    datasets: {
      title: 'Datasets & APIs',
      description: 'Acesso a datasets reais e APIs para praticar com dados do mundo real.',
      feature1: '50+ datasets curados',
      feature2: 'APIs ao vivo',
      feature3: 'Gerador de dados',
      feature4: 'Documentação completa',
    },
    videos: {
      title: 'Gravações de Aulas',
      description: 'Todas as gravações de aulas ao vivo, Q&As e workshops.',
      feature1: '100+ horas de vídeo',
      feature2: 'Aulas ao vivo semanais',
      feature3: 'Q&A com Ian',
      feature4: 'Workshops práticos',
    },
    store: {
      title: 'Loja de Recompensas',
      description: 'Resgate seus DataCoins por avatares, badges, títulos exclusivos e mais.',
      feature1: 'Avatares exclusivos',
      feature2: 'Badges colecionáveis',
      feature3: 'Títulos customizados',
      feature4: 'Itens sazonais',
    },
  },

  // Roadmap levels
  levels: {
    0: { name: 'Fundamentos', title: 'Fundações de Data Analytics' },
    1: { name: 'Novato', title: 'Consiga Seu Primeiro Emprego' },
    2: { name: 'Guerreiro', title: 'Junior para Mid-Level' },
    3: { name: 'Mestre', title: 'Nível Senior' },
  },

  // Python playground specific
  pythonPlayground: {
    loadingFirst: 'Isso pode demorar alguns segundos na primeira vez',
    yourCode: 'Seu código Python:',
    shortcuts: 'Ctrl+Enter executar • Tab indentar',
  },

  // API Token section
  apiTokenSection: {
    datasets: 'Datasets',
    maxRows: 'Máx: {{rows}} linhas',
    available: 'Datasets Disponíveis',
  },

  // Share Progress
  share: {
    step1: '<strong>Baixe a imagem</strong> clicando em "Baixar"',
    step2: '<strong>Copie o texto</strong> e clique em "Publicar no LinkedIn"',
    step3: '<strong>Cole o texto</strong>, suba a imagem e publique 🚀',
    tip: 'Dica',
    tagIan: 'Marque',
    forReach: 'no seu post para maior alcance. Eu vou compartilhar seu post!',
    postLinkedIn: 'Publicar no LinkedIn',
  },

  // Project Detail page
  projectDetail: {
    commonErrors: 'Erros comuns a evitar',
    deliverable: 'Entregável',
    selfEvaluation: 'Autoavaliação',
    interview: {
      title: 'Como Apresentar Este Projeto em uma Entrevista',
      subtitle: 'Storytelling profissional para impressionar',
      hook: 'Seu Hook (10 segundos)',
      situation: 'Situação',
      task: 'Tarefa',
      actions: 'Ações (o que você fez)',
      results: 'Resultados (quantificáveis)',
      learnings: 'Lições Aprendidas',
      questions: 'Perguntas que podem fazer',
      closing: 'Fechamento Memorável',
    },
    learningObjectives: 'O que você vai aprender',
    projectCompleted: 'Projeto Concluído',
    steps: 'Passos',
    outputs: 'Outputs esperados',
    challenge: 'Desafio',
    hint: 'Dica',
    solution: 'Solução Completa',
    tryFirst: 'Tente resolver o projeto por conta própria antes de ver isso.',
    bestWay: 'É a melhor forma de aprender e consolidar os conceitos.',
    markComplete: 'Marcar como concluído',
    resources: 'Recursos',
  },

  // Landing Page - Testimonials
  testimonials: {
    title: 'O que dizem os que já',
    titleHighlight: 'transformaram sua carreira',
    subtitle: '+150 profissionais já deram o salto',
    viewLinkedIn: 'Ver no LinkedIn',
    studentsWorkAt: 'Nossos alunos trabalham em',
    remoteStartups: 'Startups remotas',
  },

  // Landing Page - Subscription Section
  landingSubscription: {
    badge: 'Assinatura Premium',
    title: 'Tudo para sua carreira em',
    titleHighlight: 'Data Engineering',
    subtitle: 'Um pagamento mensal. Acesso ilimitado a todo o conteúdo.',
    feature1Title: '8 Semanas de Vídeos',
    feature1Desc: 'Bootcamp completo',
    feature2Title: 'Roadmap 3 Níveis',
    feature2Desc: 'Com progresso salvo',
    feature3Title: '6 Datasets',
    feature3Desc: 'Para praticar SQL',
    feature4Title: '5 Projetos',
    feature4Desc: 'Com autoavaliação',
    feature5Title: 'Discord Premium',
    feature5Desc: 'Comunidade exclusiva',
    feature6Title: 'Q&A Mensal',
    feature6Desc: 'Sessões ao vivo',
    feature7Title: '🆕 Interview Prep',
    feature7Desc: 'System Design + Behavioral',
    feature8Title: '🦖 Saurio AI',
    feature8Desc: 'Entrevistador virtual',
    feature9Title: 'Skill Assessment',
    feature9Desc: 'Avalie seu nível',
    priceLabel: '✨ Preço acessível para todos',
    price: '$30USD/mês',
    cta: '🔐 Entrar e Assinar',
    ctaNote: 'Acesso imediato • Cancele quando quiser • Pagamento seguro',
  },

  // Landing Page - FAQ
  faq: {
    title: 'Perguntas Frequentes',
    subtitle: 'Resolva suas dúvidas antes de começar',
    q1: 'Preciso saber programar?',
    a1Academy: 'Não. O Nível 0 é para iniciantes absolutos. Comece do zero, sem conhecimentos prévios.',
    a1Bootcamp: 'Sim, recomendado. Você deve ter pelo menos o Nível 1 da Academia completo, ou conhecimentos básicos de Python e SQL.',
    q2: 'Quanto tempo vai levar?',
    a2: 'Depende da sua dedicação. Com 1-2 horas por dia:',
    a2Level0: 'Nível 0: 2-3 semanas',
    a2Level1: 'Nível 1: 4-6 semanas',
    a2Ready: 'Pronto para entrevistas: 2-3 meses',
    q3: 'Posso cancelar quando quiser?',
    a3: 'Sim, 100%. Sem compromissos, sem letras miúdas. Cancele da sua conta em um clique a qualquer momento.',
    q4: 'Academia ou Bootcamp? Qual escolher?',
    a4Academy: 'Aprenda no seu ritmo, ideal se trabalha ou estuda. Acesso permanente enquanto estiver inscrito.',
    a4Bootcamp: '8 semanas intensivas ao vivo com grupo e prazos. Ideal se quer estrutura e compromisso.',
    a4Tip: '💡 Dica: Muitos fazem o Nível 0-1 na Academia e depois entram no Bootcamp.',
    q5: 'Funciona para meu país?',
    a5: 'Sim. Todo o conteúdo é online e em espanhol. Temos alunos da Argentina, México, Colômbia, Chile, Peru, Espanha e mais. Pagamentos em USD e cartões internacionais aceitos.',
    moreQuestions: 'Mais dúvidas? Escreva diretamente',
    askDiscord: 'Pergunte no Discord',
  },

  // Landing Page - About
  about: {
    title: 'Sobre mim',
    subtitle: 'Ian Saura - Data Engineer e Educador',
    role: 'Data Engineer & Professor',
    location: 'Buenos Aires, Argentina',
    bio: 'Sou Data Engineer com foco prático e educativo. Acompanho pessoas que querem entrar no mundo dos dados, melhorar suas habilidades técnicas e construir uma carreira com propósito.',
    bio2: 'Me apaixona ensinar, criar conteúdo útil e ajudar a resolver problemas reais. Como professor na Universidad Nacional de San Martín, combino minha experiência prática na indústria com minha vocação pela educação.',
    philosophy: '💡 Minha filosofia: Não ensino teoria abstrata. Compartilho exatamente o que funciona no mundo real, com exemplos práticos e ferramentas que você pode usar desde o primeiro dia.',
    yearsExp: 'Anos em Data Engineering',
    transformed: 'Profissionais transformados',
  },

  // Landing Page - Contact
  contact: {
    title: 'Tem perguntas?',
    subtitle: 'Escreva diretamente para info@iansaura.com ou use o formulário',
    namePlaceholder: 'Seu nome',
    emailPlaceholder: 'voce@email.com',
    messagePlaceholder: 'Sua mensagem...',
    send: 'Enviar mensagem',
  },

  // Landing Page - Final CTA
  finalCta: {
    title: 'Pronto para transformar sua carreira?',
    subtitle: 'Junte-se a +150 profissionais que já deram o salto para Data Engineering',
    cta: '🔐 Começar Agora',
    note: '✨ Cancele quando quiser • Sem compromisso',
  },

  // Landing Page - Footer
  landingFooter: {
    tagline: 'Data Engineer e Educador',
    terms: 'Termos e Condições',
    privacy: 'Política de Privacidade',
    conduct: 'Código de Conduta',
  },

  // Subscription Page
  subscriptionPage: {
    redirecting: 'Redirecionando para sua área de membros...',
    hero: {
      title: 'Roadmap, vídeos, exercícios, projetos e comunidade. Tudo em um só lugar.',
      trial: 'Assine Agora',
      trialDesc: 'Acesso completo • Sem compromisso • Cancele quando quiser',
      startTrial: 'Assinar - $30/mês',
      afterTrial: 'Cancele quando quiser',
      joinNow: 'Assine Agora',
      joinNowDesc: 'Acesso completo a todo o conteúdo premium',
      subscribe: 'Assinar - $30/mês',
      cancelAnytime: 'Cancele quando quiser',
      students: 'Estudantes',
      exercises: 'Exercícios',
      projects: 'Projetos',
      weeksVideo: 'Semanas Vídeo',
    },
    plans: {
      choosePlan: 'Escolha seu plano',
      monthly: 'Mensal',
      perMonth: '/mês',
      launchPrice: 'Preço de lançamento',
      afterDate: 'Depois de 7/12: $30/mês',
      allContent: 'Todo o conteúdo',
      cancelAnytime: 'Cancele quando quiser',
      priceLockedForever: 'Preço fixo para sempre',
      chooseMonthly: 'Escolher Mensal',
      mostPopular: '⭐ MAIS POPULAR',
      sixMonths: '6 Meses',
      save30: '💰 Economize $30',
      sixMonthsAccess: '6 meses de acesso',
      bestPricePerMonth: 'Melhor preço por mês',
      noAutoRenewal: 'Sem renovação automática',
      chooseSixMonths: 'Escolher 6 Meses',
      twelveMonths: '12 Meses',
      save120: '🔥 Economize $120',
      oneYearComplete: '1 ano completo',
      bestSavings: 'Melhor economia total',
      chooseTwelveMonths: 'Escolher 12 Meses',
      securePayment: 'Pagamento seguro com cartão ou PayPal • Acesso imediato',
      afterPayment: '📌 Depois de pagar no Gumroad:',
      afterPaymentStep: 'Volte para iansaura.com → Clique em "Entrar com Google"',
      afterPaymentNote: '(Use o mesmo email com que pagou)',
    },
    features: {
      title: 'Tudo incluído na sua assinatura',
      subtitle: 'Uma plataforma completa projetada para levá-lo de zero a Data Engineer profissional',
      exercises: '70+ Exercícios SQL + Python',
      exercisesDesc: '51 exercícios SQL (Window Functions, CTEs, dbt) + 21 Python (Pandas, ETL, Airflow). Rodam 100% no seu navegador. Perguntas reais de entrevistas FAANG.',
      dbtAirflow: 'dbt + Airflow',
      dbtAirflowDesc: 'Exercícios práticos de dbt (ref, source, incrementais, testes, macros, snapshots) e Airflow (DAGs, operators, XCom, sensors, branching).',
      roadmap: 'Roadmap Interativo',
      roadmapDesc: '3 níveis completos: conseguir emprego → Jr/SSR → Sênior. Com checkboxes, reflexões e progresso salvo.',
      videos: 'Vídeos do Bootcamp',
      videosDesc: '8 semanas de conteúdo gravado. Dos fundamentos à produção. Vídeos embutidos, assista direto na plataforma.',
      datasets: 'Gerador de Datasets',
      datasetsDesc: '6 tipos de datasets: E-commerce, Logs, Finanças, RH, IoT, Streaming. Baixe em CSV/JSON ou use a API.',
      projects: '+25 Projetos Guiados',
      projectsDesc: 'Projetos com instruções claras, passos detalhados, código e autoavaliação. De ETL simples a System Design.',
      discord: 'Comunidade Discord',
      discordDesc: 'Canal exclusivo de assinantes. Faça networking, tire dúvidas, compartilhe conquistas.',
      qa: 'Q&A Mensal ao Vivo',
      qaDesc: 'Sessões onde respondo SUAS perguntas. Quem chega primeiro, mais tempo para você.',
      saurio: 'Saurio - Seu Tutor IA 🦖',
      saurioDesc: 'Seu assistente inteligente que te guia com dicas, explica conceitos e te orienta na plataforma. Disponível 24/7!',
    },
    syllabus: {
      title: 'Syllabus Completo',
      subtitle: 'O que você vai aprender exatamente?',
      description: 'Conteúdo estruturado e progressivo para levá-lo de zero a Data Engineer profissional',
    },
    roadmapLevels: {
      title: 'Roadmap em 3 Níveis',
      subtitle: 'Seu guia passo a passo de zero a Sênior',
      level1: 'Conseguir Seu Primeiro Emprego',
      level2: 'De Entry a Jr/SSR',
      level3: 'Tornar-se Sênior',
    },
    datasetsSection: {
      title: 'Datasets reais para praticar',
      subtitle: 'Gere datasets de diferentes indústrias para praticar SQL, Python e projetos de Data Engineering.',
    },
    testimonialsSection: {
      title: 'O que os assinantes dizem',
    },
    faqSection: {
      title: 'Perguntas Frequentes',
    },
    finalCta: {
      title: 'Pronto para se tornar um Data Engineer?',
      subtitle: '150+ profissionais já conseguiram. Comece grátis hoje.',
    },
    moreProjects: '+19 projetos mais disponíveis na plataforma',
  },
};

// ============================================
// TRANSLATION SYSTEM
// ============================================

// All translations
export const TRANSLATIONS: Record<Language, TranslationDict> = {
  es: ES,
  en: EN,
  pt: PT,
};

// Get nested translation value
function getNestedValue(obj: TranslationDict, path: string): string {
  const keys = path.split('.');
  let current: TranslationDict | string = obj;
  
  for (const key of keys) {
    if (typeof current === 'string') return path; // Key not found
    current = current[key];
    if (current === undefined) return path; // Key not found
  }
  
  return typeof current === 'string' ? current : path;
}

// Translation function factory with parameter support
export function createTranslator(lang: Language) {
  return function t(key: string, params?: Record<string, string | number>): string {
    let translation = getNestedValue(TRANSLATIONS[lang], key);
    
    // Replace parameters like {{name}} with actual values
    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        translation = translation.replace(new RegExp(`{{${paramKey}}}`, 'g'), String(value));
      });
    }
    
    return translation;
  };
}

// Default translator (Spanish)
export const t = createTranslator('es');

// Get browser language with region detection
export function getBrowserLanguage(): Language {
  // Get all preferred languages
  const languages = navigator.languages || [navigator.language];
  
  for (const lang of languages) {
    const code = lang.toLowerCase();
    
    // Portuguese (Brazil, Portugal)
    if (code.startsWith('pt')) return 'pt';
    
    // English (US, UK, Australia, etc.)
    if (code.startsWith('en')) return 'en';
    
    // Spanish variants (Spain, Mexico, Argentina, Colombia, etc.)
    if (code.startsWith('es')) return 'es';
  }
  
  // Default to Spanish for LATAM audience
  return 'es';
}

// Get language from URL path (e.g., /en/..., /pt/...)
export function getLanguageFromPath(pathname: string): Language | null {
  const match = pathname.match(/^\/(en|pt|es)(\/|$)/);
  return match ? (match[1] as Language) : null;
}

// Language names for display
export const LANGUAGE_NAMES: Record<Language, string> = {
  es: 'Español',
  en: 'English',
  pt: 'Português',
};

// Language flags for display
export const LANGUAGE_FLAGS: Record<Language, string> = {
  es: '🇪🇸',
  en: '🇺🇸',
  pt: '🇧🇷',
};

// Check if language is RTL (for future support)
export function isRTL(lang: Language): boolean {
  return false; // None of our languages are RTL
}
