import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { ArrowLeft, Shield, FileText, Users, RefreshCw } from 'lucide-react';

interface LegalProps {
  user?: any;
}

const legalContent = {
  terminos: {
    title: 'Términos y Condiciones',
    icon: FileText,
    lastUpdated: '5 de diciembre de 2024',
    content: `
## 1. Aceptación de los Términos

Al acceder y utilizar los servicios de Ian Saura (iansaura.com), aceptás estos términos y condiciones en su totalidad. Si no estás de acuerdo con alguna parte de estos términos, no deberías usar nuestros servicios.

## 2. Descripción del Servicio

Ian Saura ofrece:
- Cursos y bootcamps de Data Engineering
- Suscripción a la Academia Premium
- Mentorías personalizadas
- Acceso a comunidad Discord
- Contenido educativo digital

## 3. Registro y Cuenta

- Debés proporcionar información precisa y actualizada
- Sos responsable de mantener la confidencialidad de tu cuenta
- No podés compartir tu acceso con terceros
- Debés tener al menos 18 años o contar con autorización parental

## 4. Pagos y Suscripciones

- Los precios están expresados en USD
- Las suscripciones se renuevan automáticamente
- Podés cancelar en cualquier momento desde tu cuenta
- Los bootcamps son pagos únicos no reembolsables (ver política de reembolsos)

## 5. Propiedad Intelectual

- Todo el contenido es propiedad de Ian Saura
- No podés reproducir, distribuir o vender el contenido
- Podés usar el conocimiento adquirido para tu desarrollo profesional
- Los proyectos que crees durante el aprendizaje son tuyos

## 6. Uso Aceptable

No está permitido:
- Compartir credenciales de acceso
- Descargar o redistribuir contenido protegido
- Usar el servicio para fines ilegales
- Acosar a otros miembros de la comunidad

## 7. Limitación de Responsabilidad

Ian Saura no garantiza resultados específicos como conseguir empleo o aumentos salariales. El éxito depende del esfuerzo individual de cada estudiante.

## 8. Modificaciones

Nos reservamos el derecho de modificar estos términos. Los cambios serán notificados por email.

## 9. Contacto

Para consultas sobre estos términos: info@iansaura.com
    `
  },
  privacidad: {
    title: 'Política de Privacidad',
    icon: Shield,
    lastUpdated: '5 de diciembre de 2024',
    content: `
## 1. Información que Recopilamos

### Información que nos proporcionás:
- Nombre y email al registrarte
- Información de pago procesada por terceros (Gumroad, OneInfinite)
- Progreso en cursos y ejercicios
- Reflexiones del roadmap (nivel de habilidades, metas, etc.) - esta información se usa solo para trackear tu progreso y nunca se comparte con terceros

### Información automática:
- Datos de uso de la plataforma
- Cookies para mantener tu sesión
- Analytics para mejorar el servicio

## 2. Cómo Usamos tu Información

- Para proporcionar y mejorar nuestros servicios
- Para comunicarnos contigo sobre tu cuenta
- Para enviar actualizaciones sobre cursos y contenido
- Para procesar pagos y suscripciones

## 3. Compartir Información

**No vendemos tu información personal.**

Solo compartimos datos con:
- Procesadores de pago (Gumroad, OneInfinite)
- Servicios de email (para comunicaciones)
- Analytics (Google Analytics, anonimizado)

## 4. Seguridad

- Usamos HTTPS para todas las conexiones
- Las contraseñas se almacenan encriptadas
- Acceso restringido a datos personales

## 5. Tus Derechos

Tenés derecho a:
- Acceder a tus datos personales
- Corregir información incorrecta
- Solicitar eliminación de tu cuenta
- Exportar tus datos

## 6. Cookies

Usamos cookies para:
- Mantener tu sesión activa
- Recordar tus preferencias
- Analytics de uso

Podés desactivar cookies en tu navegador, pero algunas funciones podrían no funcionar correctamente.

## 7. Menores de Edad

Nuestros servicios están dirigidos a mayores de 18 años. No recopilamos intencionalmente información de menores.

## 8. Cambios

Te notificaremos por email sobre cambios significativos en esta política.

## 9. Contacto

Para consultas sobre privacidad: info@iansaura.com
    `
  },
  conducta: {
    title: 'Código de Conducta',
    icon: Users,
    lastUpdated: '5 de diciembre de 2024',
    content: `
## Nuestra Comunidad

La comunidad de Ian Saura es un espacio de aprendizaje colaborativo. Esperamos que todos los miembros contribuyan a mantener un ambiente positivo y respetuoso.

## Principios Fundamentales

### 🤝 Respeto
- Tratá a todos con respeto y profesionalismo
- Valorá las diferentes perspectivas y experiencias
- Evitá comentarios ofensivos o discriminatorios

### 📚 Aprendizaje Colaborativo
- Compartí conocimiento generosamente
- Ayudá a otros cuando puedas
- Hacé preguntas sin miedo al "qué dirán"

### 🔒 Integridad
- No compartas contenido pago fuera de la plataforma
- Citá fuentes cuando uses material de terceros
- Sé honesto sobre tu nivel de conocimiento

## Comportamientos No Permitidos

- Acoso, discriminación o bullying de cualquier tipo
- Spam o autopromoción excesiva
- Compartir contenido inapropiado
- Plagio o violación de derechos de autor
- Crear cuentas múltiples para evadir restricciones

## En Discord

- Usá los canales apropiados para cada tema
- No hagas spam de preguntas repetidas
- Buscá antes de preguntar (puede que ya esté respondido)
- Sé paciente esperando respuestas

## Consecuencias

El incumplimiento de este código puede resultar en:
1. Advertencia privada
2. Suspensión temporal
3. Expulsión permanente sin reembolso

## Reportar Incidentes

Si experimentás o presenciás comportamiento inapropiado, contactanos a info@iansaura.com. Todos los reportes se tratan con confidencialidad.

## Compromiso

Al unirte a nuestra comunidad, te comprometés a seguir este código de conducta y contribuir a un ambiente de aprendizaje positivo.
    `
  },
  reembolsos: {
    title: 'Política de Reembolsos',
    icon: RefreshCw,
    lastUpdated: '5 de diciembre de 2024',
    content: `
## Suscripción Mensual

### Período de Prueba (7 días)
- Si cancelás dentro de los primeros 7 días, no se te cobra nada
- Tenés acceso completo durante el período de prueba

### Después del Período de Prueba
- Podés cancelar en cualquier momento
- Mantenés acceso hasta el fin del período pagado
- No hay reembolsos por períodos parciales

## Planes de 6 y 12 Meses

- Son pagos únicos no reembolsables
- Considerá empezar con el plan mensual si tenés dudas
- En casos excepcionales, contactanos para evaluar tu situación

## Bootcamps

### Antes del Inicio
- Reembolso completo hasta 7 días antes del inicio
- 50% de reembolso entre 7 y 3 días antes
- Sin reembolso dentro de los 3 días previos

### Después del Inicio
- No hay reembolsos una vez iniciado el bootcamp
- Podés transferir tu lugar a otra persona (con aviso previo)

## Mentorías

- Cancelación con 48hs de anticipación: reembolso completo
- Cancelación con menos de 48hs: sin reembolso
- No-shows: sin reembolso

## Productos Digitales (DataCoins, Items de Tienda)

- Los productos digitales no son reembolsables
- Los DataCoins comprados no tienen devolución

## Proceso de Reembolso

1. Enviá un email a info@iansaura.com
2. Incluí tu email de registro y motivo
3. Responderemos en 48-72 horas hábiles
4. Los reembolsos se procesan al método de pago original

## Excepciones

Evaluamos caso por caso situaciones como:
- Problemas técnicos que impidan el acceso
- Errores en el cobro
- Circunstancias extraordinarias documentadas

## Contacto

Para solicitar un reembolso o consultas: info@iansaura.com
    `
  }
};

export default function Legal({ user }: LegalProps) {
  const location = useLocation();
  const page = location.pathname.replace('/', '');
  const content = legalContent[page as keyof typeof legalContent];
  
  if (!content) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <Navigation user={user} />
        <div className="pt-24 px-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Página no encontrada</h1>
          <Link to="/" className="text-emerald-400 hover:text-emerald-300">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = content.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <Navigation user={user} />
      
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <IconComponent className="w-7 h-7 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{content.title}</h1>
              <p className="text-slate-400 text-sm">Última actualización: {content.lastUpdated}</p>
            </div>
          </div>
          
          {/* Content */}
          <div className="bg-slate-800/30 rounded-2xl p-8 border border-slate-700">
            <div className="prose prose-invert prose-slate max-w-none
              prose-headings:text-white prose-headings:font-bold
              prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-700
              prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-emerald-400
              prose-p:text-slate-300 prose-p:leading-relaxed
              prose-li:text-slate-300
              prose-strong:text-white
              prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:text-emerald-300
            ">
              {content.content.split('\n').map((line, i) => {
                if (line.startsWith('## ')) {
                  return <h2 key={i}>{line.replace('## ', '')}</h2>;
                }
                if (line.startsWith('### ')) {
                  return <h3 key={i}>{line.replace('### ', '')}</h3>;
                }
                if (line.startsWith('- ')) {
                  return <li key={i}>{line.replace('- ', '')}</li>;
                }
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <p key={i}><strong>{line.replace(/\*\*/g, '')}</strong></p>;
                }
                if (line.trim()) {
                  return <p key={i}>{line}</p>;
                }
                return null;
              })}
            </div>
          </div>
          
          {/* Other Legal Pages */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-slate-300 mb-4">Otros documentos legales</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(legalContent).map(([key, value]) => {
                if (key === page) return null;
                const Icon = value.icon;
                return (
                  <Link
                    key={key}
                    to={`/${key}`}
                    className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-300">{value.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
