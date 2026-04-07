import React, { useState } from 'react';

const QA = [
  {q:'El almacén usa código de barras/RF en todas las ubicaciones y pallets?', opts:[{l:'No, papel',v:0},{l:'Solo ubicaciones',v:2},{l:'Todo integrado a WMS',v:5}]},
  {q:'Tipo de estrategia de picking actual:', opts:[{l:'Operario decide',v:0},{l:'Zonas estáticas',v:2},{l:'Batch/Wave por WMS',v:5}]},
  {q:'Medición de KPIs logísticos:', opts:[{l:'Ninguna',v:0},{l:'Mensual en Excel',v:2},{l:'Dashboard tiempo real',v:5}]},
  {q:'Metodología de mejora estructurada:', opts:[{l:'Prácticas ad-hoc',v:0},{l:'Tenemos manuales',v:2},{l:'Lean 5S y Kaizen activo',v:5}]},
  {q:'Trazabilidad ante devoluciones:', opts:[{l:'Pérdida de info',v:0},{l:'Trazabilidad de lote',v:3},{l:'Serialización única GS1',v:5}]}
];

export default function LabMadurez() {
  const [ans, setAns] = useState(Array(QA.length).fill(-1));

  const selectAns = (qIdx, aIdx) => {
    const next = [...ans];
    next[qIdx] = aIdx;
    setAns(next);
  };

  const isComplete = ans.every(v => v !== -1);
  const score = isComplete ? ans.reduce((acc, v, i) => acc + QA[i].opts[v].v, 0) : 0;
  const maxScore = QA.length * 5;
  const perc = (score / maxScore) * 100;

  let levelText = '';
  let levelColor = '';
  if (perc < 40) { levelText = 'Madurez Baja (Reactivo)'; levelColor = '#ef4444'; }
  else if (perc < 80) { levelText = 'Madurez Media (Estandarizado)'; levelColor = '#f59e0b'; }
  else { levelText = 'Clase Mundial (Optimizado)'; levelColor = '#10b981'; }

  return (
    <div className="animate-in" style={{display:'flex',flexDirection:'column',gap:'1.25rem'}}>
      <div className="card gradient-header" style={{padding:'2rem'}}>
        <span style={{fontSize:'.7rem',fontFamily:'JetBrains Mono',color:'#10b981'}}>LABORATORIO INTERACTIVO 6</span>
        <h1 style={{fontSize:'2rem',fontWeight:900,color:'#fff',marginTop:'.25rem'}}>Diagnóstico de Madurez WMS</h1>
        <p style={{color:'#94a3b8',marginTop:'.5rem',fontSize:'.85rem'}}>Cuestionario flash para evaluar el nivel tecnológico y operativo de un almacén vs los estándares de Clase Mundial.</p>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1.5fr 1fr',gap:'1.5rem'}}>
        <div className="card" style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          {QA.map((q, i) => (
            <div key={i} style={{paddingBottom:'1rem', borderBottom: i < QA.length-1 ? '1px solid #1e293b': 'none'}}>
              <p style={{fontSize:'.85rem',fontWeight:700,marginBottom:'.5rem',color:'#f1f5f9'}}>{i+1}. {q.q}</p>
              <div style={{display:'flex',gap:'.5rem'}}>
                {q.opts.map((opt, oIdx) => (
                  <button 
                    key={oIdx}
                    onClick={() => selectAns(i, oIdx)}
                    style={{
                      flex:1, padding:'.5rem', fontSize:'.7rem', borderRadius:'6px', cursor:'pointer',
                      border: ans[i] === oIdx ? `2px solid #10b981` : '1px solid #334155',
                      background: ans[i] === oIdx ? 'rgba(16,185,129,.1)' : '#0f172a',
                      color: ans[i] === oIdx ? '#10b981' : '#94a3b8'
                    }}
                  >
                    {opt.l}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{display:'flex',flexDirection:'column',gap:'1rem',justifyContent:'center',textAlign:'center'}}>
          {!isComplete ? (
            <p style={{color:'#64748b'}}>Responde todas las preguntas para ver tu puntuación.</p>
          ) : (
            <div className="animate-in">
              <div style={{fontSize:'.8rem',color:'#94a3b8',marginBottom:'.5rem',textTransform:'uppercase',letterSpacing:'1px',fontWeight:700}}>Nivel Alcanzado</div>
              <div style={{fontSize:'4rem',fontWeight:900,color:levelColor,fontFamily:'JetBrains Mono',lineHeight:1}}>{perc.toFixed(0)}%</div>
              <div style={{fontSize:'1.2rem',fontWeight:800,color:levelColor,marginTop:'.5rem'}}>{levelText}</div>
              
              <div style={{marginTop:'2rem',padding:'1rem',background:'#0f172a',border:'1px solid #1e293b',borderRadius:8,textAlign:'left'}}>
                <p style={{fontSize:'.75rem',color:'#cbd5e1',lineHeight:1.6}}>
                  {perc < 40 ? 'Urgente necesidad de digitalización. La operación depende totalmente del conocimiento humano y es propensa a errores.' :
                   perc < 80 ? 'Buena estandarización, pero existen silos de información. Próximo paso: Integración profunda WMS-ERP y slotting dinámico.' :
                   'Operación de alto nivel. Orientados al flujo continuo, IoT y automatización.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
