import React, { useState } from 'react';

export default function CertificateGenerator({ studentName }) {
  const [stats, setStats] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('logistica_gamification') || '{}');
    } catch { return {}; }
  });

  const [generated, setGenerated] = useState(false);
  const [certId] = useState(() => Math.random().toString(36).substring(2, 10).toUpperCase());

  const completion = Math.round((stats.completed?.length || 0) / 14 * 100);

  if (completion < 100) {
    return (
      <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem' }}>🎓</div>
        <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Certificado de Completion</h2>
        <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>Completa el 100% del curso para obtener tu certificado</p>
        <div style={{ background: '#0f172a', borderRadius: 8, padding: '1rem' }}>
          <div style={{ height: 8, background: '#334155', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ width: `${completion}%`, height: '100%', background: '#10b981' }}></div>
          </div>
          <div style={{ marginTop: '.5rem', color: '#94a3b8', fontSize: '.8rem' }}>{completion}% completado</div>
        </div>
      </div>
    );
  }

  if (!generated) {
    return (
      <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem' }}>🎉</div>
        <h2 style={{ color: '#fff', fontSize: '1.5rem' }}>Felicidades!</h2>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Has completado el curso</p>
        <button onClick={() => setGenerated(true)} style={{
          padding: '1rem 2rem', background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
          border: 'none', borderRadius: 8, color: '#000', fontWeight: 'bold', cursor: 'pointer'
        }}>
          Generar Certificado
        </button>
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', padding: '2rem', textAlign: 'center', border: '4px solid #f59e0b' }}>
        <div style={{ fontSize: '.6rem', color: '#94a3b8', letterSpacing: '3px', marginBottom: '1rem' }}>CERTIFICADO</div>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎓</div>
        <p style={{ color: '#94a3b8' }}>Se certifica que</p>
        <h1 style={{ color: '#fff', fontSize: '1.8rem', margin: '.5rem 0' }}>{studentName || 'Estudiante'}</h1>
        <p style={{ color: '#94a3b8' }}>ha completado el curso de</p>
        <h2 style={{ color: '#f59e0b', margin: '1rem 0' }}>Gestion de Almacenamiento</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', margin: '1rem 0' }}>
          <div><div style={{ fontSize: '1.5rem', color: '#10b981' }}>{stats.xp || 0}</div><div style={{ fontSize: '.6rem', color: '#94a3b8' }}>XP</div></div>
          <div><div style={{ fontSize: '1.5rem', color: '#3b82f6' }}>{stats.completed?.length || 0}</div><div style={{ fontSize: '.6rem', color: '#94a3b8' }}>Modulos</div></div>
        </div>
        <div style={{ fontSize: '.7rem', color: '#64748b' }}>ID: {certId} | {new Date().toLocaleDateString()}</div>
      </div>
    </div>
  );
}