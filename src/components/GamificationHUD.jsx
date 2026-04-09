import React, { useState, useEffect } from 'react';

const BADGES = {
  eoq_master: { emoji: '🎯', label: 'EOQ Master', desc: 'Dominio del lote económico' },
  abc_expert: { emoji: '📊', label: 'ABC Expert', desc: 'Clasificación ABC completada' },
  sc_designer: { emoji: '🔗', label: 'Supply Chain Designer', desc: 'Simulador SC completado' },
};

export default function GamificationHUD() {
  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem('logistica_gamification');
      return saved ? JSON.parse(saved) : { xp: 0, level: 1, completed: [] };
    } catch { return { xp: 0, level: 1, completed: [] }; }
  });

  const progress = Math.round((stats.completed?.length || 0) / 14 * 100);

  useEffect(() => {
    localStorage.setItem('logistica_gamification', JSON.stringify(stats));
  }, [stats]);

  return (
    <div style={{
      position: 'fixed', top: 70, right: 20,
      background: 'linear-gradient(135deg, #1e293b, #0f172a)',
      border: '1px solid #334155', borderRadius: 12, padding: '1rem',
      zIndex: 100, minWidth: 180
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '.5rem' }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 'bold', color: '#000'
        }}>
          {stats.level}
        </div>
        <div>
          <div style={{ fontSize: '.7rem', color: '#94a3b8' }}>Nivel {stats.level}</div>
          <div style={{ fontSize: '.65rem', color: '#10b981' }}>{stats.xp} XP</div>
        </div>
      </div>
      <div style={{ background: '#0f172a', borderRadius: 6, padding: '.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.6rem', color: '#94a3b8', marginBottom: '.25rem' }}>
          <span>Progreso</span><span>{progress}%</span>
        </div>
        <div style={{ height: 5, background: '#334155', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #06b6d4)' }}></div>
        </div>
      </div>
    </div>
  );
}