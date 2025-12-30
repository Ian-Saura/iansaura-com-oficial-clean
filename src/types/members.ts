import { LocalizedContent } from './i18n';

// ============================================
// TYPES - Área de Miembros
// ============================================

// ============================================
// SISTEMA DE ECONOMÍA
// ============================================

// Niveles de usuario basados en XP total
export type UserRank = 'Novato' | 'Aprendiz' | 'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Arquitecto';

export interface UserRankInfo {
  rank: UserRank;
  minXP: number;
  maxXP: number;
  icon: string;
  color: string;
  title: LocalizedContent;
}

// Rangos ajustados para que tengan sentido con el contenido:
// - Nivel 1 (Novato) tiene ~100 pasos = ~1000 XP
// - Nivel 2 (Guerrero) tiene ~80 pasos = ~800 XP  
// - Nivel 3 (Maestro) tiene ~60 pasos = ~600 XP
// - Total posible: ~2400 XP de pasos + proyectos + videos = ~4000 XP
export const USER_RANKS: UserRankInfo[] = [
  { rank: 'Novato', minXP: 0, maxXP: 299, icon: '🌱', color: 'slate', title: { es: 'Recién llegado', en: 'Newcomer', pt: 'Recém-chegado' } },
  { rank: 'Aprendiz', minXP: 300, maxXP: 799, icon: '📚', color: 'emerald', title: { es: 'Estudiante dedicado', en: 'Dedicated Student', pt: 'Estudante dedicado' } },
  { rank: 'Junior', minXP: 800, maxXP: 1499, icon: '🚀', color: 'blue', title: { es: 'Completaste Nivel 1', en: 'Completed Level 1', pt: 'Completou Nível 1' } },
  { rank: 'Mid', minXP: 1500, maxXP: 2499, icon: '⚡', color: 'purple', title: { es: 'Completaste Nivel 2', en: 'Completed Level 2', pt: 'Completou Nível 2' } },
  { rank: 'Senior', minXP: 2500, maxXP: 3499, icon: '🔥', color: 'orange', title: { es: 'Completaste Nivel 3', en: 'Completed Level 3', pt: 'Completou Nível 3' } },
  { rank: 'Lead', minXP: 3500, maxXP: 4999, icon: '👑', color: 'yellow', title: { es: 'Dominaste todo', en: 'Mastered everything', pt: 'Dominou tudo' } },
  { rank: 'Arquitecto', minXP: 5000, maxXP: Infinity, icon: '🏛️', color: 'pink', title: { es: 'Leyenda', en: 'Legend', pt: 'Lenda' } },
];

// Recompensas por acciones
export const REWARDS = {
  STEP_COMPLETE: { xp: 10, coins: 5 },
  PROJECT_COMPLETE: { xp: 50, coins: 25 },
  VIDEO_WATCHED: { xp: 15, coins: 8 },
  STREAK_7_DAYS: { xp: 0, coins: 100 },
  STREAK_30_DAYS: { xp: 0, coins: 500 },
  LEVEL_UP: { xp: 0, coins: 50 },
  FIRST_PROJECT: { xp: 0, coins: 100 },
  ALL_LEVEL1_COMPLETE: { xp: 0, coins: 500 },
  // System Design Interviews
  FIRST_SYSTEM_DESIGN: { xp: 100, coins: 50 },
  THREE_SYSTEM_DESIGNS: { xp: 200, coins: 100 },
  ALL_SYSTEM_DESIGNS: { xp: 500, coins: 250 },
} as const;

// System Design Achievements
export const SYSTEM_DESIGN_ACHIEVEMENTS = {
  first_system_design: {
    id: 'first_system_design',
    name: { es: '🏗️ Arquitecto Novato', en: '🏗️ Novice Architect', pt: '🏗️ Arquiteto Novato' },
    description: { es: 'Completaste tu primera System Design Interview', en: 'Completed your first System Design Interview', pt: 'Completou sua primeira System Design Interview' },
    reward: REWARDS.FIRST_SYSTEM_DESIGN,
  },
  three_system_designs: {
    id: 'three_system_designs',
    name: { es: '🎯 Diseñador de Sistemas', en: '🎯 Systems Designer', pt: '🎯 Designer de Sistemas' },
    description: { es: 'Completaste 3 System Design Interviews', en: 'Completed 3 System Design Interviews', pt: 'Completou 3 System Design Interviews' },
    reward: REWARDS.THREE_SYSTEM_DESIGNS,
  },
  all_system_designs: {
    id: 'all_system_designs',
    name: { es: '👑 Master Arquitecto', en: '👑 Master Architect', pt: '👑 Arquiteto Mestre' },
    description: { es: 'Completaste TODAS las System Design Interviews', en: 'Completed ALL System Design Interviews', pt: 'Completou TODAS as System Design Interviews' },
    reward: REWARDS.ALL_SYSTEM_DESIGNS,
  },
} as const;

// Items de la tienda
export interface ShopItem {
  id: string;
  name: LocalizedContent;
  description: LocalizedContent;
  price: number; // en DataCoins
  type: 'avatar' | 'badge' | 'theme' | 'title' | 'service';
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  unlockRequirement?: { type: 'level' | 'xp' | 'projects'; value: number };
  isService?: boolean; // Para servicios que requieren acción manual
  serviceDetails?: LocalizedContent; // Instrucciones adicionales para servicios
}

export const SHOP_ITEMS: ShopItem[] = [
  // ============================================
  // AVATARES (20 items)
  // ============================================
  // Common (50-150 coins)
  { id: 'avatar-python', name: { es: 'Python Master', en: 'Python Master', pt: 'Mestre Python' }, description: { es: 'Dominás las serpientes del código', en: 'You master code snakes', pt: 'Você domina as cobras do código' }, price: 100, type: 'avatar', icon: '🐍', rarity: 'common' },
  { id: 'avatar-sql', name: { es: 'SQL Warrior', en: 'SQL Warrior', pt: 'Guerreiro SQL' }, description: { es: 'Las queries tiemblan ante vos', en: 'Queries tremble before you', pt: 'Queries tremem diante de você' }, price: 100, type: 'avatar', icon: '🗃️', rarity: 'common' },
  { id: 'avatar-terminal', name: { es: 'Terminal Hacker', en: 'Terminal Hacker', pt: 'Hacker de Terminal' }, description: { es: 'La consola es tu hogar', en: 'The console is your home', pt: 'O console é sua casa' }, price: 75, type: 'avatar', icon: '💻', rarity: 'common' },
  { id: 'avatar-coffee', name: { es: 'Coffee Coder', en: 'Coffee Coder', pt: 'Programador de Café' }, description: { es: 'Funciona con café', en: 'Runs on coffee', pt: 'Funciona com café' }, price: 50, type: 'avatar', icon: '☕', rarity: 'common' },
  { id: 'avatar-bug', name: { es: 'Bug Hunter', en: 'Bug Hunter', pt: 'Caçador de Bugs' }, description: { es: 'Ningún bug escapa', en: 'No bug escapes', pt: 'Nenhum bug escapa' }, price: 100, type: 'avatar', icon: '🐛', rarity: 'common' },
  { id: 'avatar-rocket', name: { es: 'Rocket Dev', en: 'Rocket Dev', pt: 'Dev Foguete' }, description: { es: 'Siempre en ascenso', en: 'Always rising', pt: 'Sempre em ascensão' }, price: 125, type: 'avatar', icon: '🚀', rarity: 'common' },
  
  // Rare (200-400 coins)
  { id: 'avatar-cloud', name: { es: 'Cloud Ninja', en: 'Cloud Ninja', pt: 'Ninja da Nuvem' }, description: { es: 'Movés datos entre nubes', en: 'You move data between clouds', pt: 'Você move dados entre nuvens' }, price: 250, type: 'avatar', icon: '☁️', rarity: 'rare' },
  { id: 'avatar-spark', name: { es: 'Spark Lord', en: 'Spark Lord', pt: 'Lorde Spark' }, description: { es: 'Big Data es tu segundo nombre', en: 'Big Data is your middle name', pt: 'Big Data é seu nome do meio' }, price: 350, type: 'avatar', icon: '⚡', rarity: 'rare' },
  { id: 'avatar-docker', name: { es: 'Docker Captain', en: 'Docker Captain', pt: 'Capitão Docker' }, description: { es: 'Contenedores a tu servicio', en: 'Containers at your service', pt: 'Contêineres ao seu serviço' }, price: 300, type: 'avatar', icon: '🐳', rarity: 'rare' },
  { id: 'avatar-robot', name: { es: 'Data Bot', en: 'Data Bot', pt: 'Robô de Dados' }, description: { es: 'Automatización es tu pasión', en: 'Automation is your passion', pt: 'Automação é sua paixão' }, price: 275, type: 'avatar', icon: '🤖', rarity: 'rare' },
  { id: 'avatar-ninja', name: { es: 'Code Ninja', en: 'Code Ninja', pt: 'Ninja do Código' }, description: { es: 'Silencioso pero letal', en: 'Silent but lethal', pt: 'Silencioso mas letal' }, price: 325, type: 'avatar', icon: '🥷', rarity: 'rare' },
  { id: 'avatar-fire', name: { es: 'Pipeline Burner', en: 'Pipeline Burner', pt: 'Queimador de Pipeline' }, description: { es: 'Tus pipelines son fuego', en: 'Your pipelines are fire', pt: 'Seus pipelines são fogo' }, price: 300, type: 'avatar', icon: '🔥', rarity: 'rare' },
  
  // Epic (500-800 coins)
  { id: 'avatar-architect', name: { es: 'Data Architect', en: 'Data Architect', pt: 'Arquiteto de Dados' }, description: { es: 'Diseñás sistemas que escalan', en: 'You design systems that scale', pt: 'Você projeta sistemas que escalam' }, price: 600, type: 'avatar', icon: '🏛️', rarity: 'epic' },
  { id: 'avatar-dragon', name: { es: 'Data Dragon', en: 'Data Dragon', pt: 'Dragão de Dados' }, description: { es: 'Guardián de los datos', en: 'Guardian of data', pt: 'Guardião dos dados' }, price: 700, type: 'avatar', icon: '🐉', rarity: 'epic' },
  { id: 'avatar-alien', name: { es: 'ETL Alien', en: 'ETL Alien', pt: 'Alien ETL' }, description: { es: 'Tecnología de otro mundo', en: 'Otherworldly technology', pt: 'Tecnologia de outro mundo' }, price: 650, type: 'avatar', icon: '👽', rarity: 'epic' },
  { id: 'avatar-crown', name: { es: 'Pipeline King', en: 'Pipeline King', pt: 'Rei do Pipeline' }, description: { es: 'Reinás sobre los flujos de datos', en: 'You reign over data flows', pt: 'Você reina sobre os fluxos de dados' }, price: 750, type: 'avatar', icon: '👑', rarity: 'epic' },
  
  // Legendary (1000+ coins)
  { id: 'avatar-wizard', name: { es: 'Data Wizard', en: 'Data Wizard', pt: 'Mago dos Dados' }, description: { es: 'La magia de los datos fluye en vos', en: 'Data magic flows in you', pt: 'A magia dos dados flui em você' }, price: 1000, type: 'avatar', icon: '🧙', rarity: 'legendary' },
  { id: 'avatar-unicorn', name: { es: 'Unicorn Engineer', en: 'Unicorn Engineer', pt: 'Engenheiro Unicórnio' }, description: { es: 'El mítico 10x engineer', en: 'The mythical 10x engineer', pt: 'O mítico engenheiro 10x' }, price: 1500, type: 'avatar', icon: '🦄', rarity: 'legendary' },
  { id: 'avatar-diamond', name: { es: 'Diamond Coder', en: 'Diamond Coder', pt: 'Programador Diamante' }, description: { es: 'Código pulido a la perfección', en: 'Code polished to perfection', pt: 'Código polido à perfeição' }, price: 2000, type: 'avatar', icon: '💎', rarity: 'legendary' },
  { id: 'avatar-galaxy', name: { es: 'Galaxy Brain', en: 'Galaxy Brain', pt: 'Cérebro Galáxia' }, description: { es: 'Tu conocimiento es infinito', en: 'Your knowledge is infinite', pt: 'Seu conhecimento é infinito' }, price: 2500, type: 'avatar', icon: '🌌', rarity: 'legendary' },
  
  // ============================================
  // BADGES (20 items) - Logros y coleccionables
  // ============================================
  // Common - Primeros pasos
  { id: 'badge-newbie', name: { es: 'Primer Paso', en: 'First Step', pt: 'Primeiro Passo' }, description: { es: 'Completaste tu primer paso del roadmap', en: 'You completed your first roadmap step', pt: 'Você completou seu primeiro passo do roadmap' }, price: 50, type: 'badge', icon: '👣', rarity: 'common' },
  { id: 'badge-curious', name: { es: 'Curioso', en: 'Curious', pt: 'Curioso' }, description: { es: 'Visitaste todas las secciones', en: 'You visited all sections', pt: 'Você visitou todas as seções' }, price: 75, type: 'badge', icon: '🔍', rarity: 'common' },
  { id: 'badge-video', name: { es: 'Cinéfilo', en: 'Cinephile', pt: 'Cinéfilo' }, description: { es: 'Viste tu primer video del bootcamp', en: 'You watched your first bootcamp video', pt: 'Você assistiu ao seu primeiro vídeo do bootcamp' }, price: 50, type: 'badge', icon: '🎬', rarity: 'common' },
  { id: 'badge-dataset', name: { es: 'Data Explorer', en: 'Data Explorer', pt: 'Explorador de Dados' }, description: { es: 'Generaste tu primer dataset', en: 'You generated your first dataset', pt: 'Você gerou seu primeiro dataset' }, price: 75, type: 'badge', icon: '📊', rarity: 'common' },
  
  // Rare - Progreso constante
  { id: 'badge-early', name: { es: 'Early Adopter', en: 'Early Adopter', pt: 'Early Adopter' }, description: { es: 'De los primeros 100 en unirse', en: 'One of the first 100 to join', pt: 'Um dos primeiros 100 a entrar' }, price: 200, type: 'badge', icon: '🌟', rarity: 'rare' },
  { id: 'badge-helper', name: { es: 'Community Helper', en: 'Community Helper', pt: 'Ajudante da Comunidade' }, description: { es: 'Ayudás a otros en Discord', en: 'You help others on Discord', pt: 'Você ajuda outros no Discord' }, price: 250, type: 'badge', icon: '🤝', rarity: 'rare' },
  { id: 'badge-streak7', name: { es: 'Semana Perfecta', en: 'Perfect Week', pt: 'Semana Perfeita' }, description: { es: '7 días de streak', en: '7-day streak', pt: '7 dias de sequência' }, price: 150, type: 'badge', icon: '📅', rarity: 'rare' },
  { id: 'badge-project1', name: { es: 'Builder', en: 'Builder', pt: 'Construtor' }, description: { es: 'Completaste tu primer proyecto', en: 'You completed your first project', pt: 'Você completou seu primeiro projeto' }, price: 200, type: 'badge', icon: '🔨', rarity: 'rare' },
  { id: 'badge-python', name: { es: 'Pythonista', en: 'Pythonista', pt: 'Pythonista' }, description: { es: 'Dominaste la sección de Python', en: 'You mastered the Python section', pt: 'Você dominou a seção de Python' }, price: 250, type: 'badge', icon: '🐍', rarity: 'rare' },
  { id: 'badge-sql', name: { es: 'Query Master', en: 'Query Master', pt: 'Mestre das Queries' }, description: { es: 'Dominaste la sección de SQL', en: 'You mastered the SQL section', pt: 'Você dominou a seção de SQL' }, price: 250, type: 'badge', icon: '🗃️', rarity: 'rare' },
  
  // Epic - Logros importantes
  { id: 'badge-streak30', name: { es: 'Imparable', en: 'Unstoppable', pt: 'Imparável' }, description: { es: '30 días de streak consecutivos', en: '30 consecutive days of streak', pt: '30 dias consecutivos de sequência' }, price: 400, type: 'badge', icon: '🔥', rarity: 'epic' },
  { id: 'badge-level1', name: { es: 'Novato Graduado', en: 'Graduated Novice', pt: 'Novato Graduado' }, description: { es: 'Completaste el Nivel 1 al 100%', en: 'You completed Level 1 at 100%', pt: 'Você completou o Nível 1 em 100%' }, price: 500, type: 'badge', icon: '🌱', rarity: 'epic' },
  { id: 'badge-projects5', name: { es: 'Project Master', en: 'Project Master', pt: 'Mestre de Projetos' }, description: { es: 'Completaste 5 proyectos', en: 'You completed 5 projects', pt: 'Você completou 5 projetos' }, price: 600, type: 'badge', icon: '🚀', rarity: 'epic' },
  { id: 'badge-videos', name: { es: 'Maratonista', en: 'Marathoner', pt: 'Maratonista' }, description: { es: 'Viste todos los videos del bootcamp', en: 'You watched all bootcamp videos', pt: 'Você assistiu a todos os vídeos do bootcamp' }, price: 450, type: 'badge', icon: '📺', rarity: 'epic' },
  { id: 'badge-reto', name: { es: 'Challenger', en: 'Challenger', pt: 'Desafiante' }, description: { es: 'Completaste un reto semanal', en: 'You completed a weekly challenge', pt: 'Você completou um desafio semanal' }, price: 350, type: 'badge', icon: '🎯', rarity: 'epic' },
  
  // Legendary - Élite
  { id: 'badge-champion', name: { es: 'Campeón Mensual', en: 'Monthly Champion', pt: 'Campeão Mensal' }, description: { es: 'Top 1 del ranking mensual', en: 'Top 1 in monthly ranking', pt: 'Top 1 no ranking mensal' }, price: 1000, type: 'badge', icon: '🏆', rarity: 'legendary' },
  { id: 'badge-level3', name: { es: 'Data Master', en: 'Data Master', pt: 'Mestre de Dados' }, description: { es: 'Completaste los 3 niveles', en: 'You completed all 3 levels', pt: 'Você completou os 3 níveis' }, price: 1500, type: 'badge', icon: '👑', rarity: 'legendary' },
  { id: 'badge-og', name: { es: 'OG Member', en: 'OG Member', pt: 'Membro Fundador' }, description: { es: 'Miembro fundador de la comunidad', en: 'Founding member of the community', pt: 'Membro fundador da comunidade' }, price: 2000, type: 'badge', icon: '🎖️', rarity: 'legendary' },
  { id: 'badge-codereview', name: { es: 'Revisado por Ian', en: 'Reviewed by Ian', pt: 'Revisado por Ian' }, description: { es: 'Recibiste un Code Review de Ian', en: 'You received a Code Review from Ian', pt: 'Você recebeu um Code Review do Ian' }, price: 0, type: 'badge', icon: '✨', rarity: 'legendary' },
  { id: 'badge-hired', name: { es: 'Hired!', en: 'Hired!', pt: 'Contratado!' }, description: { es: 'Conseguiste tu primer trabajo como DE', en: 'You got your first job as DE', pt: 'Você conseguiu seu primeiro emprego como DE' }, price: 0, type: 'badge', icon: '💼', rarity: 'legendary' },
  
  // ============================================
  // TÍTULOS (15 items)
  // ============================================
  // Common
  { id: 'title-rookie', name: { es: 'El Prometedor', en: 'The Promising', pt: 'O Promissor' }, description: { es: 'Título especial para tu perfil', en: 'Special title for your profile', pt: 'Título especial para seu perfil' }, price: 75, type: 'title', icon: '📛', rarity: 'common' },
  { id: 'title-dedicated', name: { es: 'El Dedicado', en: 'The Dedicated', pt: 'O Dedicado' }, description: { es: 'Título que muestra tu compromiso', en: 'Title showing your commitment', pt: 'Título que mostra seu compromisso' }, price: 100, type: 'title', icon: '💪', rarity: 'common' },
  { id: 'title-learner', name: { es: 'El Estudiante', en: 'The Student', pt: 'O Estudante' }, description: { es: 'Siempre aprendiendo', en: 'Always learning', pt: 'Sempre aprendendo' }, price: 75, type: 'title', icon: '📚', rarity: 'common' },
  { id: 'title-coder', name: { es: 'El Coder', en: 'The Coder', pt: 'O Programador' }, description: { es: 'Código es tu lenguaje', en: 'Code is your language', pt: 'Código é sua linguagem' }, price: 100, type: 'title', icon: '⌨️', rarity: 'common' },
  
  // Rare
  { id: 'title-unstoppable', name: { es: 'El Imparable', en: 'The Unstoppable', pt: 'O Imparável' }, description: { es: 'Nada te detiene', en: 'Nothing stops you', pt: 'Nada te detém' }, price: 250, type: 'title', icon: '🚀', rarity: 'rare' },
  { id: 'title-datamaster', name: { es: 'Data Master', en: 'Data Master', pt: 'Mestre de Dados' }, description: { es: 'Maestro de los datos', en: 'Master of data', pt: 'Mestre dos dados' }, price: 300, type: 'title', icon: '📊', rarity: 'rare' },
  { id: 'title-pipeline', name: { es: 'Pipeline Pro', en: 'Pipeline Pro', pt: 'Pro do Pipeline' }, description: { es: 'Experto en pipelines', en: 'Expert in pipelines', pt: 'Especialista em pipelines' }, price: 275, type: 'title', icon: '🔧', rarity: 'rare' },
  { id: 'title-cloud', name: { es: 'Cloud Expert', en: 'Cloud Expert', pt: 'Especialista em Nuvem' }, description: { es: 'La nube es tu territorio', en: 'The cloud is your territory', pt: 'A nuvem é seu território' }, price: 325, type: 'title', icon: '☁️', rarity: 'rare' },
  
  // Epic
  { id: 'title-senior', name: { es: 'Senior Engineer', en: 'Senior Engineer', pt: 'Engenheiro Sênior' }, description: { es: 'Nivel senior alcanzado', en: 'Senior level reached', pt: 'Nível sênior alcançado' }, price: 500, type: 'title', icon: '🎯', rarity: 'epic' },
  { id: 'title-architect', name: { es: 'Arquitecto de Datos', en: 'Data Architect', pt: 'Arquiteto de Dados' }, description: { es: 'Diseñás el futuro', en: 'You design the future', pt: 'Você projeta o futuro' }, price: 600, type: 'title', icon: '🏗️', rarity: 'epic' },
  { id: 'title-mentor', name: { es: 'El Mentor', en: 'The Mentor', pt: 'O Mentor' }, description: { es: 'Guía de la comunidad', en: 'Community guide', pt: 'Guia da comunidade' }, price: 550, type: 'title', icon: '🧭', rarity: 'epic' },
  
  // Legendary
  { id: 'title-legend', name: { es: 'La Leyenda', en: 'The Legend', pt: 'A Lenda' }, description: { es: 'Tu nombre será recordado', en: 'Your name will be remembered', pt: 'Seu nome será lembrado' }, price: 1000, type: 'title', icon: '👑', rarity: 'legendary' },
  { id: 'title-guru', name: { es: 'Data Guru', en: 'Data Guru', pt: 'Guru de Dados' }, description: { es: 'Sabiduría infinita', en: 'Infinite wisdom', pt: 'Sabedoria infinita' }, price: 1500, type: 'title', icon: '🧘', rarity: 'legendary' },
  { id: 'title-goat', name: { es: 'The GOAT', en: 'The GOAT', pt: 'O Melhor de Todos' }, description: { es: 'El mejor de todos los tiempos', en: 'The greatest of all time', pt: 'O melhor de todos os tempos' }, price: 3000, type: 'title', icon: '🐐', rarity: 'legendary' },

  // ============================================
  // SERVICIOS PREMIUM (Mythic - Lo más exclusivo)
  // ============================================
  // Alcanzable completando el curso (~1500-2000 coins ganados)
  { 
    id: 'service-code-review', 
    name: { es: '🔥 Code Review por Ian', en: '🔥 Code Review by Ian', pt: '🔥 Code Review por Ian' }, 
    description: { es: 'Ian revisa tu proyecto personalmente y te envía feedback escrito detallado con mejoras, buenas prácticas, consejos profesionales y próximos pasos. Documento completo de 2-3 páginas.', en: 'Ian personally reviews your project and sends you detailed written feedback with improvements, best practices, professional tips, and next steps. Complete 2-3 page document.', pt: 'Ian revisa seu projeto pessoalmente e envia feedback escrito detalhado com melhorias, boas práticas, dicas profissionais e próximos passos. Documento completo de 2-3 páginas.' }, 
    price: 1500, 
    type: 'service', 
    icon: '👨‍💻', 
    rarity: 'mythic',
    isService: true,
    serviceDetails: { es: 'Enviá tu proyecto (GitHub link) por Discord a @iansaura. Recibirás el feedback escrito en 48-72hs hábiles.', en: 'Send your project (GitHub link) via Discord to @iansaura. You will receive written feedback within 48-72 business hours.', pt: 'Envie seu projeto (link do GitHub) pelo Discord para @iansaura. Você receberá o feedback escrito em 48-72 horas úteis.' }
  },
  // PRÓXIMAMENTE: Más servicios
  // { id: 'service-mock-interview', name: '🎯 Mock Interview con Ian', price: 5000, ... },
  // { id: 'service-1on1-call', name: '📞 Mentoría 1:1 con Ian', price: 5000, ... },
];

// Paquetes de DataCoins para comprar
export interface CoinPackage {
  id: string;
  coins: number;
  bonusCoins: number;
  priceUSD: number;
  popular?: boolean;
  checkoutUrl: string;
  productId?: string; // ID del producto en OneInfinite para webhook
}

export const COIN_PACKAGES: CoinPackage[] = [
  { id: 'pack-starter', coins: 500, bonusCoins: 50, priceUSD: 10, checkoutUrl: 'https://onei.la/Jqw', productId: 'datacoins-500' },
  { id: 'pack-popular', coins: 1200, bonusCoins: 300, priceUSD: 20, popular: true, checkoutUrl: 'https://onei.la/7PN', productId: 'datacoins-1200' },
  { id: 'pack-mega', coins: 2500, bonusCoins: 750, priceUSD: 30, checkoutUrl: 'https://onei.la/H0e', productId: 'datacoins-2500' },
];

// User Progress con economía
export interface UserProgress {
  completedSteps: string[];
  completedProjects: string[];
  completedProjectSteps: Record<string, string[]>; // projectId -> stepIds completados
  watchedVideos: string[];
  textInputs: Record<string, string>;
  lastUpdated: string;
  // Sistema de economía
  totalXP: number;
  dataCoins: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string;
  activityDates: string[]; // Array de fechas únicas de actividad ["2025-12-01", "2025-12-02", ...]
  purchasedItems: string[]; // IDs de items comprados
  equippedAvatar?: string;
  equippedBadge?: string;
  equippedTitle?: string;
  // Logros
  achievements: string[];
  coinsPurchased: number; // Total de coins comprados (para tracking)
  // Ejercicios de práctica completados (SQL/Python)
  completedSqlExercises: string[];
  completedPythonExercises: string[];
}

// Roadmap Types
export interface RoadmapResource {
  type: 'video' | 'external' | 'dataset' | 'project' | 'exercise' | 'practice';
  label: LocalizedContent | string; // Allow string for backward compatibility or simple labels
  link?: string;
  videoWeek?: number;
  datasetId?: string;
  projectId?: string;
  // For practice type - goes to Práctica tab with preselected category
  practiceType?: 'sql' | 'python';
  practiceCategory?: string; // e.g., 'basics', 'pandas', etc.
}

export interface RoadmapStep {
  id: string;
  text: LocalizedContent;
  type: 'task' | 'stop' | 'reflection' | 'resource';
  resource?: RoadmapResource;
  checkbox?: boolean;
  textInput?: LocalizedContent; // Changed to LocalizedContent for placeholders/questions
  explanation?: LocalizedContent;
  learnMoreLink?: string;
  learnMoreLabel?: LocalizedContent | string;
}

export interface RoadmapSection {
  id: string;
  title: LocalizedContent;
  description: LocalizedContent;
  steps: RoadmapStep[];
  stopTitle?: LocalizedContent;
  stopContent?: LocalizedContent;
}

export interface RoadmapPhase {
  id: string;
  title: LocalizedContent;
  emoji: string;
  sections: RoadmapSection[];
}

export interface RoadmapLevel {
  level: number;
  title: LocalizedContent;
  subtitle: LocalizedContent;
  description: LocalizedContent;
  badge: LocalizedContent | string; // Allow both for backward compat or simple emojis
  color: 'emerald' | 'blue' | 'purple' | 'teal' | 'orange' | 'yellow' | 'pink' | 'slate'; // Added colors from USER_RANKS
  phases: RoadmapPhase[];
  checklist: LocalizedContent[];
  resources: { title: LocalizedContent; items: LocalizedContent[] }[];
}

// Specialization Types
export interface Specialization {
  id: string;
  title: LocalizedContent;
  subtitle: LocalizedContent;
  description: LocalizedContent;
  icon: string;
  color: string;
  status: 'available' | 'coming_soon';
  isNext?: boolean; // Si es la próxima en lanzarse (para destacar)
  isHidden?: boolean; // Si está oculta
  releaseDate?: string; // Fecha formateada para mostrar
  releaseDateISO?: string; // Fecha ISO para countdown (ej: '2025-01-01T00:00:00')
  prerequisites: string[];
  duration: string;
  skills: LocalizedContent[];
  projects: number;
  phases?: RoadmapPhase[];
  // Stats extendidos
  stats?: {
    phases?: number;
    steps?: number;
    exercises?: number;
    projects?: number;
    labs?: number;
  };
  dataPath?: string; // Ruta a los datos extendidos
}

// Project Types
export interface ProjectHint {
  level: 1 | 2 | 3;        // 1 = pista suave, 2 = más ayuda, 3 = solución
  title: LocalizedContent; // Changed
  content: LocalizedContent; // Changed
  code?: string;           // Código si aplica
}

export interface ProjectStep {
  order: number;
  text: LocalizedContent; // Changed
  code?: string;           // Código para este paso específico (OCULTO por defecto)
  explanation?: LocalizedContent; // Changed
  tip?: LocalizedContent; // Changed
  warning?: LocalizedContent; // Changed
  checkpoint?: LocalizedContent; // Changed
  hints?: ProjectHint[];   // Sistema de hints progresivos
  challenge?: LocalizedContent; // Changed
  estimatedTime?: string;  // Tiempo estimado: "5min", "15min", "30min"
  difficulty?: 'easy' | 'medium' | 'hard'; // Dificultad del paso
  expectedOutput?: string; // Output esperado (texto o código)
}

export interface CommonMistake {
  mistake: LocalizedContent; // Changed
  why: LocalizedContent; // Changed
  solution: LocalizedContent; // Changed
  code?: string;           // Código de ejemplo si aplica
}

export interface Project {
  id: string;
  level: number;
  title: LocalizedContent; // Changed
  description: LocalizedContent; // Changed
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado' | 'Expert';
  duration: string;
  skills: LocalizedContent[]; // Changed
  steps: ProjectStep[];
  deliverable: LocalizedContent; // Changed
  evaluation: LocalizedContent[]; // Changed
  datasetId?: string;
  // Campos premium - guía completa
  codeExample?: string;    // Código de ejemplo completo
  theory?: LocalizedContent; // Changed
  videoWeek?: number;      // Video del bootcamp relacionado
  prerequisites?: string[]; // IDs de proyectos prerequisito
  // Campos épicos - UI mejorada
  icon?: string;           // Emoji o icono del proyecto
  color?: string;          // Color temático (emerald, blue, purple, orange)
  estimatedLines?: number; // Líneas de código aproximadas
  realWorldExample?: LocalizedContent; // Changed
  learningObjectives?: LocalizedContent[]; // Changed
  commonMistakes?: LocalizedContent[] | CommonMistake[]; // Changed
  nextSteps?: LocalizedContent[]; // Changed
  resources?: { title: LocalizedContent; url: string; type: 'video' | 'article' | 'docs' }[]; // Changed
  // Outputs esperados
  expectedOutputs?: {
    step: number;
    description: LocalizedContent; // Changed
    example: string;       // Código o texto del output esperado
  }[];
  // Empresas que usan esto
  usedBy?: string[];       // ["Spotify", "Netflix", "MercadoLibre"]
  
  // 🎤 STORYTELLING PARA ENTREVISTAS
  // Cómo contar este proyecto en una entrevista con entusiasmo
  interviewStory?: {
    // El "hook" inicial - captura atención en 10 segundos
    hook: LocalizedContent; // Changed
    // El contexto/problema de negocio
    situation: LocalizedContent; // Changed
    // Qué hiciste específicamente (técnico)
    task: LocalizedContent; // Changed
    // Acciones concretas con detalles técnicos
    actions: LocalizedContent[]; // Changed
    // Resultados cuantificables
    results: LocalizedContent[]; // Changed
    // Lecciones aprendidas (muestra madurez)
    learnings: LocalizedContent[]; // Changed
    // Preguntas que te pueden hacer y cómo responderlas
    possibleQuestions: {
      question: LocalizedContent; // Changed
      answer: LocalizedContent; // Changed
    }[];
    // Frase de cierre memorable
    closingStatement: LocalizedContent; // Changed
  };
}

// Dataset Types
export interface DatasetField {
  name: string;
  type: string;
  description: LocalizedContent; // Changed
}

export interface Dataset {
  id: string;
  name: LocalizedContent; // Changed
  description: LocalizedContent; // Changed
  icon: string;
  tables: string[];
  fields: DatasetField[];
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado' | 'Expert';
}

// Video Types
export interface BootcampVideo {
  week: number;
  title: LocalizedContent; // Changed
  youtubeId: string;
  description: LocalizedContent; // Changed
  duration?: string;
}

export interface Bootcamp {
  id: string;
  title: LocalizedContent; // Changed from string
  edition: LocalizedContent; // Changed from string
  date: string;
  status: 'available' | 'coming_soon';
  videos: BootcampVideo[];
}

// Coming Soon Types
export interface UpcomingFeature {
  id: string;
  title: LocalizedContent;
  description: LocalizedContent;
  estimatedDate: string;
  icon: string;
}
