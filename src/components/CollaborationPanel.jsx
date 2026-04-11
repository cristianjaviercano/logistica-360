import React, { useState, useEffect } from 'react';

const MOCK_COLLAB_USERS = [
  { id: 1, name: 'Ana García', avatar: '👩', status: 'active' },
  { id: 2, name: 'Carlos Ruiz', avatar: '👨', status: 'active' },
  { id: 3, name: 'María López', avatar: '👩‍🦰', status: 'away' },
];

const CHALLENGES = [
  {
    id: 1,
    title: 'Optimización de Layout',
    description: 'Diseña el layout óptimo para un CEDI de 5000m² con capacidad para 10000 SKUs',
    participants: 3,
    maxParticipants: 5,
    difficulty: 'medium',
    duration: '30 min',
    xp: 150
  },
  {
    id: 2,
    title: 'Cálculo de KPIs',
    description: 'Calcula los KPIs principales para un almacén de bebidas',
    participants: 2,
    maxParticipants: 4,
    difficulty: 'easy',
    duration: '20 min',
    xp: 100
  },
  {
    id: 3,
    title: 'Simulación Supply Chain',
    description: 'Simula una cadena de suministro con 3 proveedores y 2 centros de distribución',
    participants: 4,
    maxParticipants: 5,
    difficulty: 'hard',
    duration: '45 min',
    xp: 200
  }
];

export default function CollaborationPanel({ onClose, studentName }) {
  const [activeTab, setActiveTab] = useState('sessions');
  const [sessionActive, setSessionActive] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleStartSession = (challenge) => {
    setCurrentSession({
      ...challenge,
      startedAt: new Date().toISOString(),
      participants: [
        { id: Date.now(), name: studentName || 'Tú', avatar: '👤', isHost: true }
      ]
    });
    setSessionActive(true);
  };

  const handleJoinSession = (session) => {
    setCurrentSession({
      ...session,
      participants: [
        ...session.participants,
        { id: Date.now(), name: studentName || 'Tú', avatar: '👤', isHost: false }
      ]
    });
    setSessionActive(true);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          id: Date.now(),
          user: studentName || 'Tú',
          message: newMessage,
          time: new Date().toLocaleTimeString()
        }
      ]);
      setNewMessage('');
    }
  };

  if (sessionActive && currentSession) {
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 200, padding: '1rem'
      }}>
        <div style={{
          background: '#ffffff', borderRadius: 16, maxWidth: 900, width: '100%', maxHeight: '90vh',
          overflow: 'hidden', display: 'flex', flexDirection: 'column'
        }}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b' }}>{currentSession.title}</h3>
              <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Sesión colaborativa en vivo</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="collab-users">
                {currentSession.participants.map((p, i) => (
                  <div key={p.id} className="collab-avatar" title={p.name}>
                    {p.avatar}
                  </div>
                ))}
              </div>
              <button 
                onClick={() => { setSessionActive(false); setCurrentSession(null); }}
                style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b' }}
              >
                ×
              </button>
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            <div style={{ flex: 2, padding: '1.5rem', borderRight: '1px solid #e2e8f0' }}>
              <div style={{ 
                background: '#f8fafc', borderRadius: 12, padding: '2rem', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                height: '100%', minHeight: 300
              }}>
                <div style={{ textAlign: 'center', color: '#64748b' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
                  <p>Espacio de trabajo colaborativo</p>
                  <p style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>
                    Los participantes pueden ver y editar el contenido en tiempo real
                  </p>
                </div>
              </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 250 }}>
              <div style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>Participantes ({currentSession.participants.length})</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {currentSession.participants.map(p => (
                    <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0' }}>
                      <span>{p.avatar}</span>
                      <span style={{ fontSize: '0.8rem', color: '#334155' }}>{p.name}</span>
                      {p.isHost && <span style={{ fontSize: '0.6rem', color: '#475569', background: '#f1f5f9', padding: '0.1rem 0.3rem', borderRadius: 4 }}>Host</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Chat</span>
                </div>
                <div style={{ flex: 1, overflow: 'auto', padding: '0.75rem' }}>
                  {chatMessages.length === 0 ? (
                    <p style={{ fontSize: '0.7rem', color: '#94a3b8', textAlign: 'center' }}>No hay mensajes aún</p>
                  ) : (
                    chatMessages.map(msg => (
                      <div key={msg.id} style={{ marginBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#334155' }}>{msg.user}</span>
                          <span style={{ fontSize: '0.6rem', color: '#94a3b8' }}>{msg.time}</span>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: '#475569' }}>{msg.message}</p>
                      </div>
                    ))
                  )}
                </div>
                <div style={{ padding: '0.75rem', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Escribe un mensaje..."
                    style={{ flex: 1, padding: '0.5rem', fontSize: '0.75rem' }}
                  />
                  <button onClick={handleSendMessage} className="btn-primary" style={{ padding: '0.5rem 0.75rem' }}>
                    ➤
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 200, padding: '1rem'
    }}>
      <div style={{
        background: '#ffffff', borderRadius: 16, maxWidth: 600, width: '100%', maxHeight: '85vh',
        overflow: 'auto', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
      }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b' }}>👥 Modo Colaborativo</h2>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b' }}
          >
            ×
          </button>
        </div>

        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0' }}>
          <button
            onClick={() => setActiveTab('sessions')}
            style={{
              flex: 1, padding: '0.75rem', border: 'none', background: activeTab === 'sessions' ? '#f8fafc' : 'transparent',
              color: activeTab === 'sessions' ? '#334155' : '#64748b', fontWeight: activeTab === 'sessions' ? 600 : 400,
              fontSize: '0.8rem', cursor: 'pointer', borderBottom: activeTab === 'sessions' ? '2px solid #475569' : 'none'
            }}
          >
            Sesiones Activas
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            style={{
              flex: 1, padding: '0.75rem', border: 'none', background: activeTab === 'challenges' ? '#f8fafc' : 'transparent',
              color: activeTab === 'challenges' ? '#334155' : '#64748b', fontWeight: activeTab === 'challenges' ? 600 : 400,
              fontSize: '0.8rem', cursor: 'pointer', borderBottom: activeTab === 'challenges' ? '2px solid #475569' : 'none'
            }}
          >
            Desafíos
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            style={{
              flex: 1, padding: '0.75rem', border: 'none', background: activeTab === 'leaderboard' ? '#f8fafc' : 'transparent',
              color: activeTab === 'leaderboard' ? '#334155' : '#64748b', fontWeight: activeTab === 'leaderboard' ? 600 : 400,
              fontSize: '0.8rem', cursor: 'pointer', borderBottom: activeTab === 'leaderboard' ? '2px solid #475569' : 'none'
            }}
          >
            Clasificación
          </button>
        </div>

        <div style={{ padding: '1rem' }}>
          {activeTab === 'sessions' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Usuarios en línea: {MOCK_COLLAB_USERS.length}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                {MOCK_COLLAB_USERS.map(user => (
                  <div key={user.id} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.5rem', background: '#f8fafc', borderRadius: 20, fontSize: '0.7rem' }}>
                    <span>{user.avatar}</span>
                    <span style={{ color: '#475569' }}>{user.name}</span>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: user.status === 'active' ? '#10b981' : '#f59e0b' }}></span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', textAlign: 'center', padding: '2rem 0' }}>
                No hay sesiones activas en este momento. ¡Inicia una nueva!
              </p>
            </div>
          )}

          {activeTab === 'challenges' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {CHALLENGES.map(challenge => (
                <div key={challenge.id} className="card" style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b' }}>{challenge.title}</h4>
                      <p style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.25rem' }}>{challenge.description}</p>
                    </div>
                    <span className={`badge ${challenge.difficulty === 'easy' ? 'badge-green' : challenge.difficulty === 'medium' ? 'badge-blue' : 'badge-yellow'}`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.65rem', color: '#94a3b8' }}>
                      <span>⏱️ {challenge.duration}</span>
                      <span>👥 {challenge.participants}/{challenge.maxParticipants}</span>
                      <span>⭐ +{challenge.xp} XP</span>
                    </div>
                    <button 
                      onClick={() => handleStartSession(challenge)}
                      className="btn-primary"
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.7rem' }}
                    >
                      Iniciar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'leaderboard' && (
            <div>
              <table className="tbl">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Usuario</th>
                    <th>Sesiones</th>
                    <th>XP</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { rank: 1, name: 'Ana García', sessions: 12, xp: 1850 },
                    { rank: 2, name: 'Carlos Ruiz', sessions: 10, xp: 1620 },
                    { rank: 3, name: 'María López', sessions: 8, xp: 1400 },
                    { rank: 4, name: 'Pedro Martínez', sessions: 6, xp: 980 },
                    { rank: 5, name: 'Laura Sánchez', sessions: 5, xp: 750 },
                  ].map(user => (
                    <tr key={user.rank}>
                      <td>
                        <span style={{ 
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          width: 24, height: 24, borderRadius: '50%', fontSize: '0.7rem', fontWeight: 600,
                          background: user.rank <= 3 ? '#475569' : '#f1f5f9',
                          color: user.rank <= 3 ? '#fff' : '#64748b'
                        }}>
                          {user.rank}
                        </span>
                      </td>
                      <td style={{ fontWeight: 500 }}>{user.name}</td>
                      <td>{user.sessions}</td>
                      <td style={{ fontWeight: 600, color: '#475569' }}>{user.xp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
