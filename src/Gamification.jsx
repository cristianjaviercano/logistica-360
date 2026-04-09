import React, { useState, useEffect } from 'react';

const BADGES = {
  eoq_master: { emoji: '🎯', label: 'EOQ Master', desc: 'Dominio del lote económico', color: '#f59e0b', condition: (stats) => stats.m5Completed },
  abc_expert: { emoji: '📊', label: 'ABC Expert', desc: 'Clasificación ABC completada', color: '#3b82f6', condition: (stats) => stats.m3Completed },
  layout_pro: { emoji: '🗺️', label: 'Layout Pro', desc: 'Diseño de almacén completado', color: '#10b981', condition: (stats) => stats.lab1Completed },
  sc_designer: { emoji: '🔗', label: 'Supply Chain Designer', desc: 'Simulador SC completado', color: '#8b5cf6', condition: (stats) => stats.labSCCompleted },
  kpi_analyst: { emoji: '📈', label: 'KPI Analyst', desc: 'Laboratorio de KPIs completado', color: '#06b6d4', condition: (stats) => stats.lab4Completed },
  first_blood: { emoji: '🔥', label: 'First Blood', desc: 'Primer módulo completado', color: '#ef4444', condition: (stats) => stats.totalCompleted >= 1 },
  half_way: { emoji: '⚡', label: 'Half Way', desc: '50% del curso completado', color: '#ec4899', condition: (stats) => stats.totalCompleted >= 7 },
  graduate: { emoji: '🎓', label: 'Graduate', desc: 'Curso completado al 100%', color: '#fbbf24', condition: (stats) => stats.totalCompleted >= 14 },
};

const ACHIEVEMENTS = {
  perfect_eoq: { emoji: '💯', label: 'Perfect EOQ', desc: 'Obtener 100 en laboratorio EOQ', points: 50 },
  layout_master: { emoji: '🏆', label: 'Layout Master', desc: 'Puntuación perfecta en layout', points: 50 },
  fast_learner: { emoji: '⚡', label: 'Fast Learner', desc: 'Completar 3 módulos en una sesión', points: 30 },
  sc_optimizer: { emoji: '🔄', label: 'SC Optimizer', desc: 'Ejecutar 10 simulaciones SC', points: 40 },
};

export default function GamificationSystem({ studentName, onUpdateProgress }) {
  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem('logistica_gamification');
      return saved ? JSON.parse(saved) : {
        xp: 0,
        level: 1,
        completed: new Set(),
        badges: new Set(),
        achievements: new Set(),
        labScores: {},
        totalTime: 0,
        sessionsStart: Date.now()
      };
    } catch {
      return { xp: 0, level: 1, completed: new Set(), badges: new Set(), achievements: new Set(), labScores: {}, totalTime: 0, sessionsStart: Date.now() };
    }
  });

  useEffect(() => {
    const total = stats.completed ? stats.completed.size : 0;
    const newLevel = Math.floor(total / 2) + 1;
    if (newLevel !== stats.level) {
      setStats(s => ({ ...s, level: newLevel }));
    }
  }, [stats.completed, stats.level]);

  useEffect(() => {
    localStorage.setItem('logistica_gamification', JSON.stringify({
      ...stats,
      completed: Array.from(stats.completed || []),
      badges: Array.from(stats.badges || []),
      achievements: Array.from(stats.achievements || [])
    }));
  }, [stats]);

  useEffect(() => {
    const newBadges = new Set(stats.badges || []);
    const statObj = {
      m1Completed: stats.completed?.has('m1') || false,
      m2Completed: stats.completed?.has('m2') || false,
      m3Completed: stats.completed?.has('m3') || false,
      m4Completed: stats.completed?.has('m4') || false,
      m5Completed: stats.completed?.has('m5') || false,
      m6Completed: stats.completed?.has('m6') || false,
      lab1Completed: stats.completed?.has('lab1') || false,
      lab2Completed: stats.completed?.has('lab2') || false,
      lab3Completed: stats.completed?.has('lab3') || false,
      lab4Completed: stats.completed?.has('lab4') || false,
      lab5Completed: stats.completed?.has('lab5') || false,
      lab6Completed: stats.completed?.has('lab6') || false,
      labSCCompleted: stats.completed?.has('labSC') || false,
      totalCompleted: stats.completed?.size || 0
    };

    Object.entries(BADGES).forEach(([key, badge]) => {
      if (badge.condition(statObj) && !(stats.badges || new Set()).has(key)) {
        newBadges.add(key);
      }
    });

    if (newBadges.size > (stats.badges?.size || 0)) {
      setStats(s => ({ ...s, badges: newBadges }));
    }
  }, [stats.completed]);

  const addXP = (amount, itemId) => {
    setStats(s => {
      const newXP = s.xp + amount;
      const newCompleted = new Set(s.completed);
      newCompleted.add(itemId);
      return { ...s, xp: newXP, completed: newCompleted };
    });
  };

  const addLabScore = (labId, score) => {
    setStats(s => ({
      ...s,
      labScores: { ...s.labScores, [labId]: Math.max(s.labScores[labId] || 0, score) },
      xp: s.xp + score
    }));
  };

  const unlockAchievement = (achId) => {
    const achievement = ACHIEVEMENTS[achId];
    if (achievement) {
      setStats(s => {
        const newAchievements = new Set(s.achievements);
        if (!newAchievements.has(achId)) {
          newAchievements.add(achId);
          return { ...s, achievements: newAchievements, xp: s.xp + achievement.points };
        }
        return s;
      });
    }
  };

  const progressPercent = Math.round(((stats.completed?.size || 0) / 14) * 100);
  const xpToNextLevel = stats.level * 100;
  const xpProgress = ((stats.xp % 100) / 100) * 100;

  const unlockedBadges = Object.entries(BADGES).filter(([_, b]) => (stats.badges || new Set()).has(_));
  const lockedBadges = Object.entries(BADGES).filter(([_, b]) => !(stats.badges || new Set()).has(_));

  return {
    stats,
    addXP,
    addLabScore,
    unlockAchievement,
    GamificationHUD: () => (
      <div style={{
        position: 'fixed',
        top: 70,
        right: 20,
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        border: '1px solid #334155',
        borderRadius: 12,
        padding: '1rem',
        zIndex: 100,
        minWidth: 200,
        boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
      }}>
        <div style={{display:'flex',alignItems:'center',gap:'.75rem',marginBottom:'.75rem'}}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: `linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#000'
          }}>
            {stats.level}
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:'.75rem',color:'#94a3b8'}}>Nivel {stats.level}</div>
            <div style={{fontSize:'.65rem',color:'#10b981'}}>{stats.xp} XP</div>
          </div>
        </div>
        
        <div style={{background:'#0f172a',borderRadius:6,padding:'.5rem',marginBottom:'.75rem'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'.65rem',color:'#94a3b8',marginBottom:'.25rem'}}>
            <span>Progreso</span>
            <span>{progressPercent}%</span>
          </div>
          <div style={{height:6,background:'#334155',borderRadius:3,overflow:'hidden'}}>
            <div style={{width:`${progressPercent}%`,height:'100%',background:'linear-gradient(90deg, #10b981, #06b6d4)',borderRadius:3}}></div>
          </div>
        </div>

        <div style={{display:'flex',gap:'.5rem',flexWrap:'wrap',justifyContent:'center'}}>
          {unlockedBadges.slice(0, 4).map(([key, badge]) => (
            <div key={key} style={{fontSize:'1.5rem'}} title={badge.label}>{badge.emoji}</div>
          ))}
        </div>
      </div>
    ),
    BadgeModal: () => {
      const [show, setShow] = useState(false);
      return {
        open: () => setShow(true),
        close: () => setShow(false),
        component: show ? (
          <div style={{
            position:'fixed',inset:0,background:'rgba(0,0,0,0.8)',zIndex:200,
            display:'flex',alignItems:'center',justifyContent:'center'
          }} onClick={()=>setShow(false)}>
            <div style={{
              background:'#1e293b',borderRadius:16,padding:'1.5rem',maxWidth:500,
              border:'1px solid #334155',maxHeight:'80vh',overflow:'auto'
            }} onClick={e=>e.stopPropagation()}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem'}}>
                <h2 style={{color:'#fff',fontSize:'1.5rem'}}>🏆 Insignias Desbloqueadas</h2>
                <button onClick={()=>setShow(false)} style={{background:'none',border:'none',fontSize:'1.5rem',cursor:'pointer'}}>✕</button>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'.75rem'}}>
                {Object.entries(BADGES).map(([key, badge]) => {
                  const unlocked = (stats.badges || new Set()).has(key);
                  return (
                    <div key={key} style={{
                      padding:'.75rem',background:unlocked ? badge.color+'20' : '#0f172a',
                      borderRadius:8,textAlign:'center',opacity:unlocked?1:0.4,
                      border:`1px solid ${unlocked ? badge.color : '#334155'}`
                    }}>
                      <div style={{fontSize:'2rem',marginBottom:'.25rem'}}>{badge.emoji}</div>
                      <div style={{fontSize:'.65rem',color:unlocked ? '#fff' : '#64748b',fontWeight:'bold'}}>{badge.label}</div>
                      <div style={{fontSize:'.55rem',color:'#94a3b8',marginTop:'.25rem'}}>{badge.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null
      };
    }
  };
}