import React, { useState } from 'react';
import { 
  ShoppingBag, Coins, Check, Sparkles, Crown, 
  Star, Zap, ExternalLink, Gift, Award, User
} from 'lucide-react';
import { SHOP_ITEMS, COIN_PACKAGES, ShopItem, UserProgress } from '../../types/members';
import { useLanguage } from '../../i18n/LanguageContext';
import { LocalizedContent, t as tLocalized } from '../../types/i18n';

interface ShopProps {
  progress: UserProgress;
  onPurchase: (itemId: string) => { success: boolean; message: string };
  onEquip: (itemId: string) => void;
  onUnequip: (type: 'avatar' | 'badge' | 'title') => void;
}

const rarityColors: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  common: { bg: 'bg-slate-600', border: 'border-slate-500', text: 'text-slate-300', glow: '' },
  rare: { bg: 'bg-blue-600', border: 'border-blue-500', text: 'text-blue-300', glow: 'shadow-blue-500/20' },
  epic: { bg: 'bg-purple-600', border: 'border-purple-500', text: 'text-purple-300', glow: 'shadow-purple-500/30' },
  legendary: { bg: 'bg-yellow-600', border: 'border-yellow-500', text: 'text-yellow-300', glow: 'shadow-yellow-500/40' },
  mythic: { bg: 'bg-gradient-to-r from-red-600 to-orange-500', border: 'border-red-500', text: 'text-red-200', glow: 'shadow-red-500/50' },
};

const rarityLabels: Record<string, LocalizedContent> = {
  common: { es: 'Común', en: 'Common', pt: 'Comum' },
  rare: { es: 'Raro', en: 'Rare', pt: 'Raro' },
  epic: { es: 'Épico', en: 'Epic', pt: 'Épico' },
  legendary: { es: 'Legendario', en: 'Legendary', pt: 'Lendário' },
  mythic: { es: '🔥 MÍTICO', en: '🔥 MYTHIC', pt: '🔥 MÍTICO' },
};

export const Shop: React.FC<ShopProps> = ({ progress, onPurchase, onEquip, onUnequip }) => {
  const { language } = useLanguage();
  const t = (content: any) => tLocalized(content, language);
  const [activeTab, setActiveTab] = useState<'avatars' | 'badges' | 'titles' | 'services' | 'coins'>('avatars');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [selectedService, setSelectedService] = useState<ShopItem | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handlePurchase = (itemId: string) => {
    const result = onPurchase(itemId);
    showNotification(result.success ? 'success' : 'error', result.message);
    
    // Si es un servicio, mostrar modal con instrucciones
    const item = SHOP_ITEMS.find(i => i.id === itemId);
    if (result.success && item?.isService) {
      setSelectedService(item);
    }
  };

  const filterItems = (type: string) => SHOP_ITEMS.filter(item => item.type === type);

  const isOwned = (itemId: string) => progress.purchasedItems.includes(itemId);
  const isEquipped = (item: ShopItem) => {
    if (item.type === 'avatar') return progress.equippedAvatar === item.id;
    if (item.type === 'badge') return progress.equippedBadge === item.id;
    if (item.type === 'title') return progress.equippedTitle === item.id;
    return false;
  };

  const canAfford = (price: number) => progress.dataCoins >= price;

  const renderItem = (item: ShopItem) => {
    const owned = isOwned(item.id);
    const equipped = isEquipped(item);
    const affordable = canAfford(item.price);
    const rarity = rarityColors[item.rarity];

    return (
      <div 
        key={item.id}
        className={`relative rounded-xl border-2 p-4 transition-all ${
          equipped 
            ? 'border-emerald-500 bg-emerald-500/10' 
            : owned 
              ? `${rarity.border} bg-slate-800/50`
              : affordable 
                ? 'border-slate-600 bg-slate-800/30 hover:border-slate-500'
                : 'border-slate-700 bg-slate-900/50 opacity-60'
        } ${rarity.glow ? `shadow-lg ${rarity.glow}` : ''}`}
      >
        {/* Rarity Badge */}
        <div className={`absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs font-bold ${rarity.bg} ${rarity.text}`}>
          {t(rarityLabels[item.rarity])}
        </div>

        {/* Icon */}
        <div className="text-5xl text-center mb-3">{item.icon}</div>

        {/* Name & Description */}
        <h4 className="font-bold text-white text-center mb-1">{t(item.name)}</h4>
        <p className="text-slate-400 text-sm text-center mb-4">{t(item.description)}</p>

        {/* Price or Status */}
        <div className="flex items-center justify-center gap-2 mb-3">
          {owned ? (
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <Check className="w-4 h-4" /> {t({ es: 'Adquirido', en: 'Owned', pt: 'Adquirido' })}
            </span>
          ) : (
            <span className={`flex items-center gap-1 font-bold ${affordable ? 'text-yellow-400' : 'text-slate-500'}`}>
              💎 {item.price}
            </span>
          )}
        </div>

        {/* Action Button */}
        {owned ? (
          equipped ? (
            <button
              onClick={() => onUnequip(item.type as 'avatar' | 'badge' | 'title')}
              className="w-full py-2 rounded-lg bg-emerald-600 text-white font-medium text-sm"
            >
              ✓ {t({ es: 'Equipado', en: 'Equipped', pt: 'Equipado' })}
            </button>
          ) : (
            <button
              onClick={() => onEquip(item.id)}
              className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors"
            >
              {t({ es: 'Equipar', en: 'Equip', pt: 'Equipar' })}
            </button>
          )
        ) : (
          <button
            onClick={() => handlePurchase(item.id)}
            disabled={!affordable}
            className={`w-full py-2 rounded-lg font-medium text-sm transition-colors ${
              affordable 
                ? 'bg-yellow-600 hover:bg-yellow-500 text-white' 
                : 'bg-slate-700 text-slate-400 cursor-not-allowed'
            }`}
          >
            {affordable ? t({ es: 'Comprar', en: 'Buy', pt: 'Comprar' }) : `${t({ es: 'Faltan', en: 'Missing', pt: 'Faltam' })} ${item.price - progress.dataCoins} 💎`}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Purchase Notification with Animation */}
      {notification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div 
            className={`transform transition-all duration-500 ease-out ${
              notification.type === 'success' 
                ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 shadow-emerald-500/50' 
                : 'bg-gradient-to-r from-red-600 to-orange-600 shadow-red-500/50'
            } text-white font-bold px-8 py-6 rounded-2xl shadow-2xl animate-bounce`}
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">
                {notification.type === 'success' ? '🎉' : '❌'}
              </span>
              <div>
                <div className="text-xl">{notification.type === 'success' ? t({ es: '¡Adquirido!', en: 'Acquired!', pt: 'Adquirido!' }) : 'Error'}</div>
                <div className="text-sm opacity-90">{notification.message}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 rounded-2xl p-6 border border-yellow-500/30">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{t({ es: 'Tienda de DataCoins', en: 'DataCoins Shop', pt: 'Loja de DataCoins' })}</h2>
              <p className="text-slate-400">{t({ es: 'Personalizá tu perfil con items exclusivos', en: 'Customize your profile with exclusive items', pt: 'Personalize seu perfil com itens exclusivos' })}</p>
            </div>
          </div>
          
          {/* Balance */}
          <div className="flex items-center gap-3 bg-slate-800/50 rounded-xl px-5 py-3 border border-yellow-500/30">
            <div className="text-3xl">💎</div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">{progress.dataCoins}</div>
              <div className="text-xs text-slate-400">DataCoins</div>
            </div>
          </div>
        </div>
      </div>

      {/* Equipped Items Preview */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h3 className="text-sm font-medium text-slate-300 mb-3">{t({ es: 'Tu perfil actual', en: 'Your current profile', pt: 'Seu perfil atual' })}</h3>
        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-2xl">
              {progress.equippedAvatar 
                ? SHOP_ITEMS.find(i => i.id === progress.equippedAvatar)?.icon 
                : '👤'}
            </span>
            <span className="text-slate-400 text-sm">Avatar</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">
              {progress.equippedBadge 
                ? SHOP_ITEMS.find(i => i.id === progress.equippedBadge)?.icon 
                : '—'}
            </span>
            <span className="text-slate-400 text-sm">Badge</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">
              {progress.equippedTitle 
                ? SHOP_ITEMS.find(i => i.id === progress.equippedTitle)?.icon 
                : '📛'}
            </span>
            <span className="text-purple-300 font-medium">
              {progress.equippedTitle 
                ? t(SHOP_ITEMS.find(i => i.id === progress.equippedTitle)?.name || '')
                : t({ es: 'Sin título', en: 'No title', pt: 'Sem título' })}
            </span>
            <span className="text-slate-500 text-sm">{t({ es: 'Título', en: 'Title', pt: 'Título' })}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'avatars', label: { es: 'Avatares', en: 'Avatars', pt: 'Avatares' }, icon: User },
          { id: 'badges', label: { es: 'Badges', en: 'Badges', pt: 'Badges' }, icon: Award },
          { id: 'titles', label: { es: 'Títulos', en: 'Titles', pt: 'Títulos' }, icon: Crown },
          { id: 'services', label: { es: '🔥 Servicios', en: '🔥 Services', pt: '🔥 Serviços' }, icon: Zap, highlight: true },
          { id: 'coins', label: { es: 'Comprar Coins', en: 'Buy Coins', pt: 'Comprar Coins' }, icon: Coins },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-yellow-600 text-white' 
                : (tab as any).highlight
                  ? 'bg-gradient-to-r from-red-600/30 to-orange-600/30 border border-red-500/50 text-red-300 hover:text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {t(tab.label)}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'coins' ? (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl p-6 border border-yellow-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Gift className="w-6 h-6 text-yellow-400" />
              <h3 className="text-xl font-bold text-white">{t({ es: 'Paquetes de DataCoins', en: 'DataCoins Packages', pt: 'Pacotes de DataCoins' })}</h3>
            </div>
            <p className="text-slate-400 mb-6">
              {t({ es: 'Comprá DataCoins para desbloquear avatares, badges y títulos exclusivos. ¡Los coins son permanentes y nunca expiran!', en: 'Buy DataCoins to unlock exclusive avatars, badges and titles. Coins are permanent and never expire!', pt: 'Compre DataCoins para desbloquear avatares, badges e títulos exclusivos. As coins são permanentes e nunca expiram!' })}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {COIN_PACKAGES.map(pack => (
                <div 
                  key={pack.id}
                  className={`relative rounded-xl border-2 p-6 transition-all ${
                    pack.popular 
                      ? 'border-yellow-500 bg-yellow-500/10' 
                      : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
                  }`}
                >
                  {pack.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                      {t({ es: 'MÁS POPULAR', en: 'MOST POPULAR', pt: 'MAIS POPULAR' })}
                    </div>
                  )}

                  <div className="text-center mb-4">
                    <div className="text-5xl mb-2">💎</div>
                    <div className="text-3xl font-bold text-yellow-400">{pack.coins + pack.bonusCoins}</div>
                    <div className="text-slate-400">{t({ es: 'DataCoins totales', en: 'Total DataCoins', pt: 'DataCoins totais' })}</div>
                    {pack.bonusCoins > 0 && (
                      <div className="mt-2 inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full text-sm">
                        <Sparkles className="w-3 h-3" />
                        {pack.coins} + {pack.bonusCoins} bonus
                      </div>
                    )}
                  </div>

                  <div className="text-center mb-4">
                    <span className="text-2xl font-bold text-white">${pack.priceUSD}</span>
                    <span className="text-slate-400 ml-1">USD</span>
                  </div>

                  <a
                    href={pack.checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-bold transition-all"
                  >
                    {t({ es: 'Comprar', en: 'Buy', pt: 'Comprar' })}
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <p className="text-xs text-slate-500 text-center mt-3">
                    {t({ es: 'Pago seguro con tarjeta o PayPal', en: 'Secure payment with card or PayPal', pt: 'Pagamento seguro com cartão ou PayPal' })}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <p className="text-sm text-emerald-300">
                <strong className="text-emerald-400">⚡ {t({ es: 'Acreditación automática:', en: 'Automatic accreditation:', pt: 'Acreditação automática:' })}</strong> {t({ es: 'Después de pagar, tus DataCoins se acreditan automáticamente en tu cuenta en menos de 5 minutos. Recibirás un email de confirmación.', en: 'After paying, your DataCoins are automatically credited to your account in less than 5 minutes. You will receive a confirmation email.', pt: 'Depois de pagar, suas DataCoins são creditadas automaticamente em sua conta em menos de 5 minutos. Você receberá um e-mail de confirmação.' })}
              </p>
            </div>
            
            <div className="mt-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-500">
                {t({ es: '¿Problemas con tu compra? Escribinos a', en: 'Problems with your purchase? Write to us at', pt: 'Problemas com sua compra? Escreva para nós em' })}{' '}
                <a href="mailto:info@iansaura.com" className="text-yellow-400 hover:underline">
                  info@iansaura.com
                </a>
              </p>
            </div>
          </div>

          {/* How to earn coins */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              {t({ es: 'Cómo ganar DataCoins gratis', en: 'How to earn free DataCoins', pt: 'Como ganhar DataCoins grátis' })}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                <span className="text-2xl">✅</span>
                <div>
                  <div className="font-medium text-white">{t({ es: 'Completar un paso', en: 'Complete a step', pt: 'Completar um passo' })}</div>
                  <div className="text-sm text-yellow-400">+5 💎</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                <span className="text-2xl">🎯</span>
                <div>
                  <div className="font-medium text-white">{t({ es: 'Completar un proyecto', en: 'Complete a project', pt: 'Completar um projeto' })}</div>
                  <div className="text-sm text-yellow-400">+25 💎</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                <span className="text-2xl">🎬</span>
                <div>
                  <div className="font-medium text-white">{t({ es: 'Ver un video', en: 'Watch a video', pt: 'Assistir a um vídeo' })}</div>
                  <div className="text-sm text-yellow-400">+8 💎</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                <span className="text-2xl">🔥</span>
                <div>
                  <div className="font-medium text-white">{t({ es: 'Streak de 7 días', en: '7-day streak', pt: 'Sequência de 7 dias' })}</div>
                  <div className="text-sm text-yellow-400">+100 💎</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                <span className="text-2xl">⚡</span>
                <div>
                  <div className="font-medium text-white">{t({ es: 'Streak de 30 días', en: '30-day streak', pt: 'Sequência de 30 dias' })}</div>
                  <div className="text-sm text-yellow-400">+500 💎</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                <span className="text-2xl">🆙</span>
                <div>
                  <div className="font-medium text-white">{t({ es: 'Subir de nivel', en: 'Level up', pt: 'Subir de nível' })}</div>
                  <div className="text-sm text-yellow-400">+50 💎</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === 'services' ? (
        <div className="space-y-6">
          {/* Services Header */}
          <div className="bg-gradient-to-br from-red-500/20 via-orange-500/20 to-yellow-500/20 rounded-2xl p-6 border border-red-500/30">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center text-3xl">
                🔥
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{t({ es: 'Servicios Premium con Ian', en: 'Premium Services with Ian', pt: 'Serviços Premium com Ian' })}</h3>
                <p className="text-slate-400">{t({ es: 'Mentoría personalizada directa con Ian Saura', en: 'Direct personalized mentorship with Ian Saura', pt: 'Mentoria personalizada direta com Ian Saura' })}</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm">
              {t({ es: '¿Querés feedback profesional directo? Estos servicios te dan acceso exclusivo a revisiones personalizadas, mentorías y más.', en: 'Want direct professional feedback? These services give you exclusive access to personalized reviews, mentorships, and more.', pt: 'Quer feedback profissional direto? Estes serviços dão acesso exclusivo a revisões personalizadas, mentorias e mais.' })} <strong className="text-yellow-400">{t({ es: 'Lo más valioso de la tienda.', en: 'The most valuable in the shop.', pt: 'O mais valioso da loja.' })}</strong>
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filterItems('service').map(item => {
              const owned = isOwned(item.id);
              const affordable = canAfford(item.price);
              const rarity = rarityColors[item.rarity];

              return (
                <div 
                  key={item.id}
                  className={`relative rounded-2xl border-2 p-6 transition-all ${
                    owned 
                      ? 'border-emerald-500 bg-emerald-500/10' 
                      : affordable 
                        ? `${rarity.border} bg-gradient-to-br from-red-900/20 to-orange-900/20 hover:from-red-900/30 hover:to-orange-900/30`
                        : 'border-slate-700 bg-slate-900/50 opacity-70'
                  } shadow-xl ${rarity.glow}`}
                >
                  {/* Mythic Badge */}
                  <div className={`absolute -top-3 -right-3 px-3 py-1 rounded-full text-xs font-bold ${rarity.bg} text-white shadow-lg`}>
                    {t(rarityLabels[item.rarity])}
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-5xl">{item.icon}</div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white">{t(item.name)}</h4>
                      <p className="text-slate-400 text-sm mt-1">{t(item.description)}</p>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700/50">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">💎</span>
                      <span className="text-2xl font-bold text-yellow-400">{item.price.toLocaleString()}</span>
                    </div>
                    
                    {owned ? (
                      <div className="flex items-center gap-2 text-emerald-400 font-medium">
                        <Check className="w-5 h-5" />
                        {t({ es: '¡Canjeado!', en: 'Redeemed!', pt: 'Resgatado!' })}
                      </div>
                    ) : (
                      <button
                        onClick={() => handlePurchase(item.id)}
                        disabled={!affordable}
                        className={`px-6 py-2.5 rounded-lg font-bold transition-all flex items-center gap-2 ${
                          affordable 
                            ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white shadow-lg hover:shadow-red-500/30' 
                            : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        {affordable ? (
                          <>
                            <Zap className="w-4 h-4" />
                            {t({ es: 'Canjear', en: 'Redeem', pt: 'Resgatar' })}
                          </>
                        ) : (
                          `${t({ es: 'Faltan', en: 'Missing', pt: 'Faltam' })} ${(item.price - progress.dataCoins).toLocaleString()} 💎`
                        )}
                      </button>
                    )}
                  </div>

                  {/* Service Details (if owned) */}
                  {owned && item.serviceDetails && (
                    <div className="mt-4 p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
                      <div className="flex items-start gap-2">
                        <span className="text-lg">📋</span>
                        <div>
                          <div className="font-medium text-emerald-400 mb-1">{t({ es: 'Próximos pasos:', en: 'Next steps:', pt: 'Próximos passos:' })}</div>
                          <p className="text-sm text-slate-300">{t(item.serviceDetails)}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* How it works */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              {t({ es: '¿Cómo funciona el Code Review?', en: 'How does Code Review work?', pt: 'Como funciona o Code Review?' })}
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <span className="text-lg">1️⃣</span>
                <span>{t({ es: 'Canjeás el Code Review con tus DataCoins', en: 'Redeem Code Review with your DataCoins', pt: 'Resgate o Code Review com suas DataCoins' })}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg">2️⃣</span>
                <span>{t({ es: 'Enviás el link a tu proyecto (GitHub) por Discord a', en: 'Send your project link (GitHub) via Discord to', pt: 'Envie o link do seu projeto (GitHub) pelo Discord para' })} <span className="text-yellow-400">@iansaura</span></span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg">3️⃣</span>
                <span>{t({ es: 'Ian revisa tu código y te envía un', en: 'Ian reviews your code and sends you a', pt: 'Ian revisa seu código e envia um' })} <span className="text-emerald-400 font-medium">{t({ es: 'documento escrito de 2-3 páginas', en: '2-3 page written document', pt: 'documento escrito de 2-3 páginas' })}</span> {t({ es: 'con feedback detallado, mejoras y próximos pasos en 48-72hs hábiles', en: 'with detailed feedback, improvements, and next steps in 48-72 business hours', pt: 'com feedback detalhado, melhorias e próximos passos em 48-72 horas úteis' })}</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
              <p className="text-emerald-400 text-xs">
                📝 {t({ es: 'El feedback incluye: análisis de código, buenas prácticas, errores comunes, sugerencias de mejora y recomendaciones para tu próximo proyecto.', en: 'Feedback includes: code analysis, best practices, common mistakes, improvement suggestions, and recommendations for your next project.', pt: 'O feedback inclui: análise de código, boas práticas, erros comuns, sugestões de melhoria e recomendações para seu próximo projeto.' })}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filterItems(activeTab === 'avatars' ? 'avatar' : activeTab === 'badges' ? 'badge' : 'title').map(renderItem)}
        </div>
      )}

      {/* Service Purchased Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-emerald-500/50 shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{selectedService.icon}</div>
              <h3 className="text-2xl font-bold text-emerald-400">{t({ es: '¡Servicio Canjeado!', en: 'Service Redeemed!', pt: 'Serviço Resgatado!' })}</h3>
              <p className="text-slate-400 mt-2">{t(selectedService.name)}</p>
            </div>
            
            <div className="bg-slate-900/50 rounded-xl p-4 mb-6">
              <h4 className="font-medium text-white mb-2">📋 {t({ es: 'Próximos pasos:', en: 'Next steps:', pt: 'Próximos passos:' })}</h4>
              <p className="text-slate-300 text-sm">{selectedService.serviceDetails ? t(selectedService.serviceDetails) : ''}</p>
            </div>

            <div className="bg-yellow-500/10 rounded-xl p-4 mb-6 border border-yellow-500/30">
              <p className="text-sm text-yellow-300">
                <strong>💡 Tip:</strong> {t({ es: 'Mencioná tu email de la plataforma cuando me escribas para que pueda identificar tu compra.', en: 'Mention your platform email when you write to me so I can identify your purchase.', pt: 'Mencione seu email da plataforma ao me escrever para que eu possa identificar sua compra.' })}
              </p>
            </div>

            <button
              onClick={() => setSelectedService(null)}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors"
            >
              {t({ es: '¡Entendido!', en: 'Got it!', pt: 'Entendido!' })}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
