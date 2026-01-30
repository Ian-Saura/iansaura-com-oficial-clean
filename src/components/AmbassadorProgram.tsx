import React from 'react';
import { Users, Mail, DollarSign, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface AmbassadorProgramProps {
  userEmail: string;
  userName: string;
}

export const AmbassadorProgram: React.FC<AmbassadorProgramProps> = ({ userEmail, userName }) => {
  const { tLocalized: t } = useLanguage();

  const contactEmail = 'ian@iansaura.com';
  const subject = encodeURIComponent(t({ 
    es: 'Quiero ser Embajador', 
    en: 'I want to be an Ambassador', 
    pt: 'Quero ser Embaixador' 
  }));
  const body = encodeURIComponent(t({ 
    es: `Hola Ian!\n\nMe interesa ser embajador de la plataforma.\n\nMi nombre: ${userName}\nMi email: ${userEmail}\n\nQuedo atento!`, 
    en: `Hi Ian!\n\nI'm interested in becoming an ambassador for the platform.\n\nMy name: ${userName}\nMy email: ${userEmail}\n\nLooking forward to hearing from you!`,
    pt: `Olá Ian!\n\nTenho interesse em ser embaixador da plataforma.\n\nMeu nome: ${userName}\nMeu email: ${userEmail}\n\nAguardo retorno!`
  }));

  const mailtoLink = `mailto:${contactEmail}?subject=${subject}&body=${body}`;

  return (
    <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 rounded-2xl border border-amber-500/30 overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-amber-500/20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {t({ es: '🤝 Programa de Embajadores', en: '🤝 Ambassador Program', pt: '🤝 Programa de Embaixadores' })}
            </h3>
            <p className="text-slate-400 text-sm">
              {t({ 
                es: 'Ganá una comisión por cada nuevo suscriptor', 
                en: 'Earn a commission for each new subscriber', 
                pt: 'Ganhe uma comissão por cada novo assinante' 
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-slate-900/50 rounded-lg p-4 text-center">
            <DollarSign className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <p className="text-sm text-slate-300">
              {t({ es: 'Comisión por venta', en: 'Commission per sale', pt: 'Comissão por venda' })}
            </p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 text-center">
            <Sparkles className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <p className="text-sm text-slate-300">
              {t({ es: 'Beneficios exclusivos', en: 'Exclusive benefits', pt: 'Benefícios exclusivos' })}
            </p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 text-center">
            <Users className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <p className="text-sm text-slate-300">
              {t({ es: 'Comunidad VIP', en: 'VIP Community', pt: 'Comunidade VIP' })}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="bg-slate-900/30 rounded-lg p-4">
          <p className="text-sm text-slate-300 leading-relaxed">
            {t({ 
              es: '¿Te gusta la plataforma y querés compartirla con tu red? Convertite en embajador y ganá una comisión por cada persona que se suscriba a través de tu recomendación. Es un programa privado y personalizado.', 
              en: 'Do you love the platform and want to share it with your network? Become an ambassador and earn a commission for each person who subscribes through your recommendation. This is a private and personalized program.',
              pt: 'Você gosta da plataforma e quer compartilhá-la com sua rede? Torne-se embaixador e ganhe uma comissão por cada pessoa que assinar através da sua recomendação. É um programa privado e personalizado.'
            })}
          </p>
        </div>

        {/* CTA */}
        <a
          href={mailtoLink}
          className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02]"
        >
          <Mail className="w-5 h-5" />
          {t({ es: 'Contactanos para ser Embajador', en: 'Contact us to become an Ambassador', pt: 'Entre em contato para ser Embaixador' })}
        </a>

        <p className="text-xs text-slate-500 text-center">
          {t({ 
            es: 'Te responderemos a la brevedad con todos los detalles del programa.', 
            en: "We'll get back to you shortly with all the program details.", 
            pt: 'Responderemos em breve com todos os detalhes do programa.' 
          })}
        </p>
      </div>
    </div>
  );
};

export default AmbassadorProgram;
