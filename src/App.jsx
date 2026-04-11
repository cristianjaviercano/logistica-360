import React, { useState, useEffect } from 'react';
import './index.css';

import Module1View from './views/Module1View';
import Module2View from './views/Module2View';
import Module3View from './views/Module3View';
import Module4View from './views/Module4View';
import Module5View from './views/Module5View';
import Module6View from './views/Module6View';
import ModuleDataStructures from './views/ModuleDataStructures';
import ModuleDespachoView from './views/ModuleDespachoView';
import LabLayout   from './labs/LabLayout';
import LabCarga    from './labs/LabCarga';
import LabABC      from './labs/LabABC';
import LabKPI      from './labs/LabKPI';
import LabEOQ      from './labs/LabEOQ';
import LabMadurez  from './labs/LabMadurez';
import LabSupplyChain from './labs/LabSupplyChain';
import LabVisualFlow from './labs/LabVisualFlow';
import LabDespacho from './labs/LabDespacho';
import LabExcelData from './labs/LabExcelData';
import GamificationHUD from './components/GamificationHUD';
import CertificateGenerator from './components/Certificate';
import CollaborationPanel from './components/CollaborationPanel';

const NAV = [
  { section: 'GENERAL' },
  { id: 'syllabus', label: 'Syllabus e Introducción', icon: '📘' },

  { section: 'UNIDAD 1: FUNDAMENTOS' },
  { id: 'm1', label: 'Módulo 1: Fundamentos del Almacén', icon: '🏭' },
  { id: 'lab1', label: 'Lab: Diseño de Layout CEDI', icon: '🗺️' },

  { section: 'UNIDAD 2: GESTIÓN DE CARGA' },
  { id: 'm2', label: 'Módulo 2: Manejo de Carga', icon: '📦' },
  { id: 'lab2', label: 'Lab: Costos de Carga', icon: '💰' },

  { section: 'UNIDAD 3: CLASIFICACIÓN Y VALORIZACIÓN' },
  { id: 'm3', label: 'Módulo 3: Clasificación de Existencias', icon: '🏷️' },
  { id: 'lab3', label: 'Lab: ABC + PEPS / UEPS', icon: '📊' },

  { section: 'UNIDAD 4: MANIPULACIÓN' },
  { id: 'm4', label: 'Módulo 4: Manipulación de Materiales', icon: '🔧' },
  { id: 'lab4', label: 'Lab: Calculadora de KPIs', icon: '📈' },

  { section: 'UNIDAD 5: OPTIMIZACIÓN' },
  { id: 'm5', label: 'Módulo 5: Optimización del Inventario', icon: '📐' },
  { id: 'lab5', label: 'Lab: EOQ + Punto de Reorden', icon: '⚙️' },

  { section: 'UNIDAD 6: CADENA DE SUMINISTRO' },
  { id: 'labSC', label: 'Lab: Simulador Supply Chain', icon: '🔗' },

  { section: 'UNIDAD 7: CLASE MUNDIAL' },
  { id: 'm6', label: 'Módulo 6: WMS y Clase Mundial', icon: '🌐' },
  { id: 'lab6', label: 'Lab: Diagnóstico de Madurez', icon: '🏆' },

  { section: 'ESTRUCTURA DE DATOS' },
  { id: 'm7', label: 'Módulo 7: Estructura de Datos', icon: '🗃️' },
  { id: 'labData', label: 'Lab: Visual Interactivo', icon: '🔬' },
  { id: 'labExcel', label: 'Lab: Excel para Datos', icon: '📊' },

  { section: 'UNIDAD 8: DESPACHO' },
  { id: 'm8', label: 'Módulo 8: Despacho de Mercancías', icon: '🚚' },
  { id: 'labDespacho', label: 'Lab: Simulación de Despacho', icon: '📋' },

  { section: 'EVALUACIÓN' },
  { id: 'evaluacion', label: 'Examen de Certificación', icon: '📝' },
];

const VIEWS = {
  syllabus: () => <SyllabusView />,
  m1: () => <Module1View />,   lab1: () => <LabLayout />,
  m2: () => <Module2View />,   lab2: () => <LabCarga />,
  m3: () => <Module3View />,   lab3: () => <LabABC />,
  m4: () => <Module4View />,   lab4: () => <LabKPI />,
  m5: () => <Module5View />,   lab5: () => <LabEOQ />,
  labSC: () => <LabSupplyChain />,
  m6: () => <Module6View />,   lab6: () => <LabMadurez />,
  m7: () => <ModuleDataStructures />, labData: () => <LabVisualFlow />,
  labExcel: () => <LabExcelData />,
  m8: () => <ModuleDespachoView />, labDespacho: () => <LabDespacho />,
  evaluacion: () => <EvalView />,
};

const COMPLETABLE = ['m1','lab1','m2','lab2','m3','lab3','m4','lab4','m5','lab5','labSC','m6','lab6','m7','labData','labExcel','m8','labDespacho'];

const BADGES = {
  eoq_master: { emoji: '🎯', label: 'EOQ Master', desc: 'Dominio del lote económico', xp: 100 },
  abc_expert: { emoji: '📊', label: 'ABC Expert', desc: 'Clasificación ABC completada', xp: 100 },
  sc_designer: { emoji: '🔗', label: 'Supply Chain Designer', desc: 'Simulador SC completado', xp: 150 },
  warehouse_pro: { emoji: '🏭', label: 'Warehouse Pro', desc: 'Completado Módulo 1', xp: 50 },
  data_master: { emoji: '🗃️', label: 'Data Master', desc: 'Estructura de datos dominada', xp: 200 },
  collaboration_king: { emoji: '👑', label: 'Collaboration King', desc: '5+ sesiones colaborativas', xp: 150 },
};

function SyllabusView() {
  return (
    <div className="space-y-5 animate-in" style={{display:'flex',flexDirection:'column',gap:'1.25rem'}}>
      <div className="card gradient-header" style={{padding:'2rem'}}>
        <span style={{fontSize:'.7rem',fontFamily:'JetBrains Mono',color:'#475569'}}>GESTIÓN DE ALMACENAMIENTO · UPB Montería</span>
        <h1 style={{fontSize:'2rem',fontWeight:700,color:'#1e293b',marginTop:'.25rem'}}>Gestión de Almacenamiento</h1>
        <p style={{color:'#64748b',marginTop:'.5rem',fontSize:'.85rem'}}>Ing. Industrial · 3 créditos · 32h teóricas + 32h lab · Michel Roux (2009)</p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1rem'}}>
        {[['6','Módulos','🏭'],['6','Laboratorios','⚙️'],['3','Créditos','🎓']].map(([n,l,i])=>(
          <div key={l} className="card" style={{textAlign:'center'}}>
            <div style={{fontSize:'2rem',color:'#475569'}}>{i}</div>
            <div style={{fontSize:'1.5rem',fontWeight:700,color:'#334155'}}>{n}</div>
            <div style={{fontSize:'.75rem',color:'#94a3b8'}}>{l}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="sec-title">Descripción del Curso</div>
        <p style={{fontSize:'.82rem',color:'#475569',lineHeight:1.7}}>
          El curso Gestión de Almacenamiento le proporcionará al estudiante definiciones, herramientas y técnicas de análisis para proponer estrategias y modelos de gestión que ayuden a mejorar la productividad y competitividad de almacenes y Centros de Distribución (CEDIS), mediante el conocimiento y aplicación de principios teóricos y buenas prácticas.
        </p>
      </div>
      <div className="card">
        <div className="sec-title">Competencias del Curso</div>
        <div style={{display:'flex',flexDirection:'column',gap:'.6rem'}}>
          {[
            ['1','Receptivo','Identifico las necesidades de almacenes/CEDIS/empaque en una organización'],
            ['2','Resolutivo','Aplico requerimientos operativos de la carga (JIT, tarifas, cadenas de abastecimiento)'],
            ['3','Resolutivo','Aplico técnicas de clasificación y valorización de existencias (ABC, PEPS, UEPS)'],
            ['4','Resolutivo','Aplico principios de manipulación de materiales para optimizar el almacén'],
            ['5','Autónomo','Aplico técnicas estadísticas y programación matemática (EOQ, ROP, Safety Stock)'],
            ['6','Estratégico','Analizo metodologías y mejores prácticas de almacenes de clase mundial'],
          ].map(([n,nv,d])=>(
            <div key={n} style={{display:'flex',gap:'.75rem',alignItems:'flex-start',padding:'.6rem',background:'#f8fafc',borderRadius:8}}>
              <div style={{width:24,height:24,borderRadius:6,background:'#f1f5f9',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.7rem',fontWeight:700,color:'#475569',flexShrink:0}}>{n}</div>
              <div>
                <span className="badge badge-green" style={{marginBottom:'.2rem',display:'inline-block'}}>{nv}</span>
                <p style={{fontSize:'.78rem',color:'#64748b'}}>{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EvalView() {
  return (
    <div className="animate-in" style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
      <div className="card gradient-header" style={{padding:'2rem'}}>
        <span style={{fontSize:'.7rem',fontFamily:'JetBrains Mono',color:'#475569'}}>EVALUACIÓN FINAL</span>
        <h1 style={{fontSize:'1.8rem',fontWeight:700,color:'#1e293b',marginTop:'.25rem'}}>Examen de Certificación</h1>
      </div>
      <div className="card" style={{textAlign:'center',padding:'3rem'}}>
        <div style={{fontSize:'3rem',marginBottom:'1rem',color:'#475569'}}>🏆</div>
        <p style={{color:'#64748b'}}>Completa todos los módulos y laboratorios para desbloquear el examen de certificación.</p>
      </div>
    </div>
  );
}

export default function App() {
  const [current, setCurrent] = useState('syllabus');
  const [done, setDone]       = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem('gestion_done') || '[]')); }
    catch { return new Set(); }
  });
  const [student, setStudent] = useState(() => localStorage.getItem('gestion_student') || '');
  const [inputVal, setInputVal] = useState(student);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showCollab, setShowCollab] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const [gamification, setGamification] = useState(() => {
    try {
      const saved = localStorage.getItem('logistica_gamification');
      return saved ? JSON.parse(saved) : { xp: 0, level: 1, badges: [], completed: [] };
    } catch { return { xp: 0, level: 1, badges: [], completed: [] }; }
  });

  const progress = Math.round((done.size / COMPLETABLE.length) * 100);

  useEffect(() => {
    localStorage.setItem('gestion_done', JSON.stringify([...done]));
  }, [done]);

  useEffect(() => {
    localStorage.setItem('logistica_gamification', JSON.stringify(gamification));
  }, [gamification]);

  useEffect(() => {
    const newXp = done.size * 10;
    const newLevel = Math.floor(newXp / 100) + 1;
    setGamification(prev => ({ ...prev, xp: newXp, level: newLevel, completed: [...done] }));
  }, [done.size]);

  const navigate = (id) => {
    setCurrent(id);
    setMenuOpen(false);
    if (COMPLETABLE.includes(id) && !done.has(id)) {
      setDone(prev => {
        const next = new Set(prev); next.add(id);
        return next;
      });
    }
  };

  const saveStudent = () => {
    setStudent(inputVal);
    localStorage.setItem('gestion_student', inputVal);
  };

  const Comp = VIEWS[current];

  const unlockBadge = (badgeKey) => {
    if (!gamification.badges.includes(badgeKey)) {
      const badge = BADGES[badgeKey];
      setGamification(prev => ({
        ...prev,
        xp: prev.xp + badge.xp,
        badges: [...prev.badges, badgeKey]
      }));
    }
  };

  return (
    <div className="app relative">
      <GamificationHUD 
        gamification={gamification} 
        onBadgeClick={(badge) => console.log('Badge:', badge)}
      />

      {showCollab && (
        <CollaborationPanel 
          onClose={() => setShowCollab(false)}
          studentName={student}
        />
      )}

      {showCertificate && (
        <CertificateGenerator
          studentName={student}
          onClose={() => setShowCertificate(false)}
        />
      )}

      <div className={`sidebar-overlay ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)}></div>

      <aside className={`sidebar ${menuOpen ? 'open' : ''} ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="brand">
          <div className="brand-logo" style={{display:'flex', justifyContent: sidebarCollapsed ? 'center' : 'space-between', width:'100%'}}>
            <div style={{display:'flex', gap:'0.625rem', alignItems:'center'}}>
              <div className="brand-icon">🏭</div>
              {!sidebarCollapsed && (
                <div>
                  <div className="brand-name">Gestión de<br/>Almacenamiento</div>
                </div>
              )}
            </div>
            {!sidebarCollapsed && (
              <button className="close-btn mobile-only" onClick={() => setMenuOpen(false)}>✕</button>
            )}
          </div>
          {!sidebarCollapsed && <div className="brand-sub pt-2">UPB · Ing. Industrial VII</div>}
        </div>

        {!sidebarCollapsed && (
          <>
            <div className="progress-wrap">
              <div className="progress-label">
                <span>Progreso del curso</span>
                <span style={{color:'#475569',fontWeight:600}}>{progress}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{width:`${progress}%`}} />
              </div>
            </div>

            {NAV.map((item, idx) =>
              item.section ? (
                <div key={idx} className="nav-section-label">{item.section}</div>
              ) : (
                <button key={item.id} className={`nav-item ${current===item.id?'active':''}`}
                  onClick={() => navigate(item.id)}>
                  <span className="nav-item-icon">{item.icon}</span>
                  <span style={{flex:1,lineHeight:1.3}}>{item.label}</span>
                  {done.has(item.id) && <span className="nav-done">✓</span>}
                </button>
              )
            )}

            <div style={{padding: '0.75rem 1rem', display: 'flex', gap: '0.5rem'}}>
              <button 
                className="btn-secondary" 
                style={{flex: 1, padding: '0.5rem', fontSize: '0.7rem'}}
                onClick={() => setShowCollab(true)}
              >
                👥 Colaborar
              </button>
              <button 
                className="btn-primary" 
                style={{flex: 1, padding: '0.5rem', fontSize: '0.7rem'}}
                onClick={() => setShowCertificate(true)}
              >
                🎓 Certificado
              </button>
            </div>

            <div className="student-wrap">
              <input
                placeholder="Tu nombre completo"
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && saveStudent()}
              />
              <button onClick={saveStudent}>✓</button>
            </div>
          </>
        )}
      </aside>

      <div className="main-area-container">
        <div className="app-mobile-header">
          <div style={{display:'flex', gap:'0.625rem', alignItems:'center'}}>
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              style={{background:'none', border:'none', cursor:'pointer', padding:'0.25rem'}}
            >
              <div style={{fontSize:'1.2rem'}}>☰</div>
            </button>
            <div className="brand-name font-bold">Gestión de Almacenamiento</div>
          </div>
          <div style={{display:'flex', gap:'0.5rem'}}>
            <button 
              onClick={() => setShowCollab(true)}
              style={{background:'#f1f5f9', border:'1px solid #e2e8f0', borderRadius:'8px', padding:'0.4rem 0.6rem', cursor:'pointer'}}
            >
              👥
            </button>
            <button className="menu-btn" onClick={() => setMenuOpen(true)}>☰</button>
          </div>
        </div>

        <main className="main-area" key={current}>
          {Comp ? <Comp /> : <div style={{color:'#94a3b8'}}>Selecciona un módulo</div>}
        </main>
      </div>
    </div>
  );
}
