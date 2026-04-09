import React, { useState, useEffect } from 'react';

export default function CertificateGenerator({ stats, studentName }) {
  const [generated, setGenerated] = useState(false);
  const [certificateId] = useState(() => Math.random().toString(36).substring(2, 10).toUpperCase());

  const completionPercent = Math.round((stats.completed?.size || 0) / 14 * 100);
  const earnedBadges = Object.keys(stats.badges || {}).length;

  const generateCertificate = () => {
    setGenerated(true);
    const certificateData = {
      id: certificateId,
      name: studentName || 'Estudiante',
      date: new Date().toLocaleDateString('es-CO'),
      courses: 'Gestión de Almacenamiento y Cadena de Suministro',
      score: stats.xp,
      badges: earnedBadges,
      modules: stats.completed?.size || 0
    };
    localStorage.setItem(`cert_${certificateId}`, JSON.stringify(certificateData));
  };

  if (completionPercent < 100) {
    return (
      <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎓</div>
        <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '.5rem' }}>Certificado de Completion</h2>
        <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>
          Completa el 100% del curso para obtener tu certificado
        </p>
        <div style={{ background: '#0f172a', borderRadius: 8, padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.8rem', color: '#94a3b8', marginBottom: '.5rem' }}>
            <span>Progreso actual</span>
            <span style={{ color: '#10b981' }}>{completionPercent}%</span>
          </div>
          <div style={{ height: 8, background: '#334155', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ width: `${completionPercent}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #06b6d4)', borderRadius: 4 }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {!generated ? (
        <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h2 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '.5rem' }}>¡Felicidades! Has completado el curso</h2>
          <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
            Has completado {stats.completed?.size || 0} módulos y obtenido {earnedBadges} insignias
          </p>
          <button onClick={generateCertificate} style={{
            padding: '1rem 2rem', background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
            border: 'none', borderRadius: 8, color: '#000', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer'
          }}>
            🖇️ Generar Certificado
          </button>
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            padding: '2rem',
            border: '8px solid',
            borderImage: 'linear-gradient(135deg, #f59e0b, #fbbf24, #f59e0b) 1',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '.7rem', color: '#94a3b8', letterSpacing: '3px', marginBottom: '1rem' }}>
              CERTIFICADO DE COMPLETION
            </div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎓</div>
            <p style={{ color: '#94a3b8', fontSize: '.9rem', marginBottom: '.5rem' }}>Se certifica que</p>
            <h1 style={{ color: '#fff', fontSize: '2rem', marginBottom: '.5rem', fontFamily: 'serif' }}>
              {studentName || 'Estudiante'}
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '.9rem', marginBottom: '1rem' }}>
              ha completado satisfactoriamente el curso de
            </p>
            <h2 style={{ color: '#f59e0b', fontSize: '1.3rem', marginBottom: '1.5rem' }}>
              Gestión de Almacenamiento y Cadena de Suministro
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>{stats.xp}</div>
                <div style={{ fontSize: '.7rem', color: '#94a3b8' }}>XP GANADOS</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>{earnedBadges}</div>
                <div style={{ fontSize: '.7rem', color: '#94a3b8' }}>INSIGNIAS</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>{stats.completed?.size || 0}</div>
                <div style={{ fontSize: '.7rem', color: '#94a3b8' }}>MÓDULOS</div>
              </div>
            </div>
            <div style={{ fontSize: '.7rem', color: '#64748b', borderTop: '1px solid #334155', paddingTop: '1rem' }}>
              ID del Certificado: <span style={{ color: '#f59e0b' }}>{certificateId}</span> • 
              Fecha: {new Date().toLocaleDateString('es-CO')}
            </div>
          </div>
          <div style={{ padding: '1rem', background: '#0f172a', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button onClick={() => window.print()} style={{
              padding: '.5rem 1rem', background: '#3b82f6', border: 'none', borderRadius: 6, color: '#fff', cursor: 'pointer'
            }}>
              🖨️ Imprimir
            </button>
            <button onClick={() => {
              const data = { name: studentName, id: certificateId, date: new Date().toISOString() };
              const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `certificado_${certificateId}.json`;
              a.click();
            }} style={{
              padding: '.5rem 1rem', background: '#10b981', border: 'none', borderRadius: 6, color: '#fff', cursor: 'pointer'
            }}>
              📥 Descargar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}