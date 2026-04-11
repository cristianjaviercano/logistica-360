import React, { useState, useEffect } from 'react';

const BADGES = {
  eoq_master: { emoji: '🎯', label: 'EOQ Master', desc: 'Dominio del lote económico', xp: 100 },
  abc_expert: { emoji: '📊', label: 'ABC Expert', desc: 'Clasificación ABC completada', xp: 100 },
  sc_designer: { emoji: '🔗', label: 'Supply Chain Designer', desc: 'Simulador SC completado', xp: 150 },
  warehouse_pro: { emoji: '🏭', label: 'Warehouse Pro', desc: 'Completado Módulo 1', xp: 50 },
  data_master: { emoji: '🗃️', label: 'Data Master', desc: 'Estructura de datos dominada', xp: 200 },
  collaboration_king: { emoji: '👑', label: 'Collaboration King', desc: '5+ sesiones colaborativas', xp: 150 },
  layout_master: { emoji: '🗺️', label: 'Layout Master', desc: 'Diseño de CEDI completado', xp: 100 },
  kpi_expert: { emoji: '📈', label: 'KPI Expert', desc: 'Calculadora de KPIs dominada', xp: 100 },
};

export default function GamificationHUD({ gamification, onBadgeClick }) {
  const [expanded, setExpanded] = useState(false);
  const [showBadges, setShowBadges] = useState(false);

  const level = gamification.level || 1;
  const xp = gamification.xp || 0;
  const badges = gamification.badges || [];
  const xpForNextLevel = level * 100;
  const currentLevelXp = (level - 1) * 100;
  const progressToNextLevel = Math.min(100, Math.round(((xp - currentLevelXp) / (xpForNextLevel - currentLevelXp)) * 100));

  const unlockedBadges = Object.entries(BADGES).filter(([key]) => badges.includes(key));

  return (
    <div style={{
      position: 'fixed', top: 70, right: 20,
      background: '#ffffff',
      border: '1px solid #e2e8f0', borderRadius: 12, padding: expanded ? '1.25rem' : '1rem',
      zIndex: 100, minWidth: 220,
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: expanded ? '.75rem' : '.5rem' }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: 'linear-gradient(135deg, #475569, #334155)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 600, color: '#fff', fontSize: '0.9rem'
        }}>
          {level}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '.7rem', color: '#64748b' }}>Nivel {level}</div>
          <div style={{ fontSize: '.75rem', color: '#334155', fontWeight: 600 }}>{xp} XP</div>
        </div>
        <button 
          onClick={() => setExpanded(!expanded)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '1rem' }}
        >
          {expanded ? '−' : '+'}
        </button>
      </div>

      <div style={{ background: '#f8fafc', borderRadius: 8, padding: '.5rem', marginBottom: expanded ? '.75rem' : 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.6rem', color: '#94a3b8', marginBottom: '.25rem' }}>
          <span>Progreso</span><span>{progressToNextLevel}%</span>
        </div>
        <div style={{ height: 4, background: '#e2e8f0', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ width: `${progressToNextLevel}%`, height: '100%', background: 'linear-gradient(90deg, #475569, #64748b)' }}></div>
        </div>
        <div style={{ fontSize: '.55rem', color: '#cbd5e1', marginTop: '.25rem', textAlign: 'center' }}>
          {xpForNextLevel - xp} XP para nivel {level + 1}
        </div>
      </div>

      {expanded && (
        <div style={{ animation: 'fadeUp 0.3s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.5rem' }}>
            <span style={{ fontSize: '.7rem', color: '#475569', fontWeight: 600 }}>Logros Desbloqueados</span>
            <button 
              onClick={() => setShowBadges(!showBadges)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', fontSize: '.7rem' }}
            >
              {showBadges ? 'Ocultar' : 'Ver todos'}
            </button>
          </div>

          <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '.75rem' }}>
            {unlockedBadges.length > 0 ? (
              unlockedBadges.map(([key, badge]) => (
                <div 
                  key={key}
                  onClick={() => onBadgeClick(key)}
                  style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: '#f8fafc', border: '1px solid #e2e8f0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    fontSize: '1rem', cursor: 'pointer',
                    position: 'relative'
                  }}
                  title={`${badge.label}: ${badge.desc} (+${badge.xp} XP)`}
                >
                  {badge.emoji}
                </div>
              ))
            ) : (
              <div style={{ fontSize: '.65rem', color: '#94a3b8', padding: '.5rem' }}>
                Completa módulos para desbloquear logros
              </div>
            )}
          </div>

          {showBadges && (
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '.75rem' }}>
              <div style={{ fontSize: '.65rem', color: '#64748b', marginBottom: '.5rem' }}>Todos los logros disponibles:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
                {Object.entries(BADGES).map(([key, badge]) => (
                  <div 
                    key={key}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '.5rem',
                      padding: '.4rem .5rem', borderRadius: 6,
                      background: badges.includes(key) ? '#f8fafc' : '#fafafa',
                      opacity: badges.includes(key) ? 1 : 0.5
                    }}
                  >
                    <span>{badge.emoji}</span>
                    <span style={{ fontSize: '.65rem', color: '#475569', flex: 1 }}>{badge.label}</span>
                    <span style={{ fontSize: '.55rem', color: badges.includes(key) ? '#10b981' : '#cbd5e1' }}>
                      {badges.includes(key) ? `+${badge.xp} XP` : '🔒'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
