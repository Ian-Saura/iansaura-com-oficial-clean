/**
 * LAB STEPS - Labs convertidos a pasos del roadmap
 * Estos pasos se integran en el flujo normal de cada fase
 */

import { AWSStep, LocalizedContent } from './types';
import { awsLabs, AWSLab } from './labs';

/**
 * Convierte un lab en un paso del roadmap
 * Los labs se integran como pasos prácticos dentro de cada fase
 */
function labToStep(lab: AWSLab, stepNumber: number): AWSStep {
  // Generar teoría desde los pasos del lab
  const theoryContent = generateLabTheory(lab);
  
  // Generar tips prácticos
  const practicalTips: LocalizedContent[] = [
    {
      es: `⏱️ Este lab toma aproximadamente ${lab.estimatedMinutes} minutos. Asegúrate de tener tiempo suficiente.`,
      en: `⏱️ This lab takes approximately ${lab.estimatedMinutes} minutes. Make sure you have enough time.`,
      pt: `⏱️ Este lab leva aproximadamente ${lab.estimatedMinutes} minutos. Certifique-se de ter tempo suficiente.`
    },
    {
      es: `💰 Recuerda ejecutar los comandos de cleanup al final para evitar costos innecesarios.`,
      en: `💰 Remember to run the cleanup commands at the end to avoid unnecessary costs.`,
      pt: `💰 Lembre-se de executar os comandos de cleanup no final para evitar custos desnecessários.`
    },
    {
      es: `🔧 Si algo falla, revisa los permisos IAM - es la causa más común de errores.`,
      en: `🔧 If something fails, check IAM permissions - it's the most common cause of errors.`,
      pt: `🔧 Se algo falhar, verifique as permissões IAM - é a causa mais comum de erros.`
    }
  ];

  return {
    id: `lab-step-${lab.id}`,
    stepNumber,
    title: {
      es: `🔬 Lab: ${lab.title.es}`,
      en: `🔬 Lab: ${lab.title.en}`,
      pt: `🔬 Lab: ${lab.title.pt}`
    },
    description: lab.description,
    theory: theoryContent,
    practicalTips,
    externalLinks: [
      {
        title: 'AWS Documentation',
        url: `https://docs.aws.amazon.com/${lab.services[0]?.toLowerCase() || 'index'}/`,
        type: 'aws_docs'
      }
    ],
    checkpoint: {
      es: `✅ ¿Completaste todos los pasos del lab y ejecutaste el cleanup?`,
      en: `✅ Did you complete all lab steps and run the cleanup?`,
      pt: `✅ Você completou todos os passos do lab e executou o cleanup?`
    },
    xpReward: lab.xpReward,
    estimatedMinutes: lab.estimatedMinutes,
    services: lab.services,
    isLab: true,
    labId: lab.id
  };
}

/**
 * Genera el contenido teórico del lab con arquitectura y pasos
 */
function generateLabTheory(lab: AWSLab): LocalizedContent {
  const architectureSection = `\`\`\`
${lab.architecture}
\`\`\``;

  // Generar pasos en cada idioma
  const stepsEs = lab.steps.map((step, i) => 
    `### Paso ${i + 1}: ${step.title.es}\n${step.description.es}\n${step.code ? `\`\`\`${step.language || 'bash'}\n${step.code}\n\`\`\`` : ''}`
  ).join('\n\n');

  const stepsEn = lab.steps.map((step, i) => 
    `### Step ${i + 1}: ${step.title.en}\n${step.description.en}\n${step.code ? `\`\`\`${step.language || 'bash'}\n${step.code}\n\`\`\`` : ''}`
  ).join('\n\n');

  const stepsPt = lab.steps.map((step, i) => 
    `### Passo ${i + 1}: ${step.title.pt}\n${step.description.pt}\n${step.code ? `\`\`\`${step.language || 'bash'}\n${step.code}\n\`\`\`` : ''}`
  ).join('\n\n');

  return {
    es: `## 🔬 Lab Práctico: ${lab.title.es}

### Objetivo
${lab.description.es}

### Arquitectura
${architectureSection}

### Servicios involucrados
${lab.services.map(s => `- **${s}**`).join('\n')}

### Dificultad: ${lab.difficulty === 'beginner' ? '🟢 Principiante' : lab.difficulty === 'intermediate' ? '🟡 Intermedio' : '🔴 Avanzado'}

---

## Pasos del Lab

${stepsEs}

---

## 🧹 Limpieza de Recursos

**IMPORTANTE**: Ejecuta estos comandos al terminar para evitar costos:

\`\`\`bash
${lab.cleanup}
\`\`\``,

    en: `## 🔬 Hands-on Lab: ${lab.title.en}

### Objective
${lab.description.en}

### Architecture
${architectureSection}

### Services involved
${lab.services.map(s => `- **${s}**`).join('\n')}

### Difficulty: ${lab.difficulty === 'beginner' ? '🟢 Beginner' : lab.difficulty === 'intermediate' ? '🟡 Intermediate' : '🔴 Advanced'}

---

## Lab Steps

${stepsEn}

---

## 🧹 Resource Cleanup

**IMPORTANT**: Run these commands when finished to avoid costs:

\`\`\`bash
${lab.cleanup}
\`\`\``,

    pt: `## 🔬 Lab Prático: ${lab.title.pt}

### Objetivo
${lab.description.pt}

### Arquitetura
${architectureSection}

### Serviços envolvidos
${lab.services.map(s => `- **${s}**`).join('\n')}

### Dificuldade: ${lab.difficulty === 'beginner' ? '🟢 Iniciante' : lab.difficulty === 'intermediate' ? '🟡 Intermediário' : '🔴 Avançado'}

---

## Passos do Lab

${stepsPt}

---

## 🧹 Limpeza de Recursos

**IMPORTANTE**: Execute estes comandos ao terminar para evitar custos:

\`\`\`bash
${lab.cleanup}
\`\`\``
  };
}

/**
 * Obtiene los lab steps para una fase específica
 */
export function getLabStepsForPhase(phaseId: string): AWSStep[] {
  const phaseLabs = awsLabs.filter(lab => lab.phaseIds.includes(phaseId));
  
  // Asignar números de step basados en el orden
  return phaseLabs.map((lab, index) => labToStep(lab, 900 + index)); // 900+ para que vayan al final
}

/**
 * Obtiene todos los lab steps
 */
export function getAllLabSteps(): AWSStep[] {
  return awsLabs.map((lab, index) => labToStep(lab, 900 + index));
}

/**
 * Mapa de labs por fase para fácil acceso
 */
export const labsByPhase: Record<string, AWSStep[]> = {
  'phase1': getLabStepsForPhase('phase1'),
  'phase2': getLabStepsForPhase('phase2'),
  'phase3': getLabStepsForPhase('phase3'),
  'phase4': getLabStepsForPhase('phase4'),
  'phase5': getLabStepsForPhase('phase5'),
  'phase6': getLabStepsForPhase('phase6'),
  'phase7': getLabStepsForPhase('phase7'),
  'phase8': getLabStepsForPhase('phase8'),
  'phase9': getLabStepsForPhase('phase9'),
  'phase10': getLabStepsForPhase('phase10'),
  'phase11': getLabStepsForPhase('phase11'),
  'phase12': getLabStepsForPhase('phase12')
};

/**
 * Estadísticas de lab steps
 */
export const labStepsStats = {
  total: awsLabs.length,
  totalXP: awsLabs.reduce((sum, lab) => sum + lab.xpReward, 0),
  totalMinutes: awsLabs.reduce((sum, lab) => sum + lab.estimatedMinutes, 0),
  byPhase: Object.entries(labsByPhase).reduce((acc, [phase, steps]) => {
    acc[phase] = steps.length;
    return acc;
  }, {} as Record<string, number>)
};








