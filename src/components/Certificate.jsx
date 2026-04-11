import React, { useState, useEffect } from 'react';

const CERTIFICATE_CONFIG = {
  courseName: 'Gestión de Almacenamiento',
  institution: 'Universidad Pontificia Boliviana',
  program: 'Ingeniería Industrial VII',
  duration: '64 horas (32h teoría + 32h práctica)',
  credits: 3,
  instructor: 'Ing. Michel Roux (2009)',
  dateFormat: { year: 'numeric', month: 'long', day: 'numeric' }
};

export default function CertificateGenerator({ studentName, onClose }) {
  const [certData, setCertData] = useState({
    studentName: studentName || '',
    completionDate: new Date().toISOString(),
    grade: 0,
    modulesCompleted: 0,
    totalModules: 14,
    verificationCode: ''
  });
  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    try {
      const done = JSON.parse(localStorage.getItem('gestion_done') || '[]');
      const gamification = JSON.parse(localStorage.getItem('logistica_gamification') || '{}');
      
      const code = generateVerificationCode(studentName);
      
      setCertData(prev => ({
        ...prev,
        modulesCompleted: done.length,
        grade: Math.min(100, done.length * 7),
        verificationCode: code
      }));
    } catch (e) {
      console.error('Error loading cert data:', e);
    }
  }, [studentName]);

  const generateVerificationCode = (name) => {
    const timestamp = Date.now().toString(36);
    const nameHash = name ? name.substring(0, 3).toUpperCase() : 'STD';
    return `CERT-UPB-${nameHash}-${timestamp}`.toUpperCase();
  };

  const handleDownload = () => {
    setGenerated(true);
  };

  const handleShare = () => {
    const shareData = {
      title: 'Certificado de Gestión de Almacenamiento',
      text: `He completado el curso de Gestión de Almacenamiento en UPB con una calificación de ${certData.grade}%`,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(`Certificado: ${certData.verificationCode} - ${shareData.text}`);
      alert('¡Información del certificado copiada al portapapeles!');
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 200, padding: '1rem'
    }}>
      <div style={{
        background: '#ffffff', borderRadius: 16, maxWidth: 800, width: '100%', maxHeight: '90vh',
        overflow: 'auto', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
      }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b' }}>🎓 Certificado de Completación</h2>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b' }}
          >
            ×
          </button>
        </div>

        <div style={{ padding: '2rem' }}>
          {!generated ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                background: '#f8fafc', border: '2px solid #e2e8f0', borderRadius: 16, 
                padding: '3rem 2rem', marginBottom: '1.5rem' 
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏆</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>
                  {studentName || 'Estudiante'}
                </h3>
                <p style={{ color: '#64748b', marginBottom: '1rem' }}>
                  ha completado exitosamente el curso de
                </p>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#334155' }}>
                  {CERTIFICATE_CONFIG.courseName}
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.5rem' }}>
                  {CERTIFICATE_CONFIG.institution} · {CERTIFICATE_CONFIG.program}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#334155' }}>{certData.modulesCompleted}</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Módulos Completados</div>
                </div>
                <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#334155' }}>{certData.grade}%</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Calificación</div>
                </div>
                <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#334155' }}>{CERTIFICATE_CONFIG.credits}</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Créditos</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button 
                  onClick={handleDownload}
                  className="btn-primary"
                  disabled={certData.modulesCompleted < 10}
                  style={{ padding: '0.75rem 1.5rem' }}
                >
                  Descargar Certificado
                </button>
                <button 
                  onClick={handleShare}
                  className="btn-secondary"
                  style={{ padding: '0.75rem 1.5rem' }}
                >
                  Compartir en LinkedIn
                </button>
              </div>

              {certData.modulesCompleted < 10 && (
                <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '1rem' }}>
                  Completa al menos 10 módulos para obtener el certificado
                </p>
              )}
            </div>
          ) : (
            <div className="certificate-container">
              <div className="certificate-border">
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#64748b', marginBottom: '0.25rem' }}>
                    {CERTIFICATE_CONFIG.institution}
                  </div>
                  <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>
                    Certificación Oficial
                  </div>
                </div>

                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎓</div>

                <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '0.5rem' }}>
                  CERTIFICADO DE COMPLETACIÓN
                </div>

                <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginBottom: '1rem' }}>
                  {studentName || 'Estudiante'}
                </h1>

                <p style={{ color: '#475569', marginBottom: '1.5rem', maxWidth: 500, margin: '0 auto 1.5rem' }}>
                  Por haber completado satisfactoriamente el curso de <strong>{CERTIFICATE_CONFIG.courseName}</strong> con una duración de {CERTIFICATE_CONFIG.duration}.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '1.5rem' }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Fecha</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                      {new Date(certData.completionDate).toLocaleDateString('es-CO', CERTIFICATE_CONFIG.dateFormat)}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Calificación</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>{certData.grade}%</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Créditos</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>{CERTIFICATE_CONFIG.credits}</div>
                  </div>
                </div>

                <div style={{ 
                  padding: '0.75rem 1rem', background: '#f8fafc', borderRadius: 8, 
                  fontSize: '0.7rem', color: '#64748b', fontFamily: 'JetBrains Mono, monospace' 
                }}>
                  Código de Verificación: {certData.verificationCode}
                </div>

                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8' }}>
                  <span>Instructor: {CERTIFICATE_CONFIG.instructor}</span>
                  <span>UPB Montería</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '1.5rem' }}>
                <button onClick={handleShare} className="btn-primary" style={{ padding: '0.6rem 1.2rem' }}>
                  Compartir Logro
                </button>
                <button onClick={onClose} className="btn-secondary" style={{ padding: '0.6rem 1.2rem' }}>
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
