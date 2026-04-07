import React, { useState } from 'react';

export default function LabLayout() {
  const [grid, setGrid] = useState(Array(100).fill(null)); // 10x10 grid
  const [selectedZone, setSelectedZone] = useState('recepcion');
  const [score, setScore] = useState(0);

  const ZONES = {
    recepcion: { color: '#3b82f6', label: 'Recepción' },
    almacenaje: { color: '#f59e0b', label: 'Almacenaje' },
    picking: { color: '#10b981', label: 'Picking (A)' },
    despacho: { color: '#ef4444', label: 'Despacho' }
  };

  const handleCellClick = (idx) => {
    const newGrid = [...grid];
    newGrid[idx] = selectedZone;
    setGrid(newGrid);
  };

  const evalLayout = () => {
    // Simple heuristic for educational purpose
    // Good layout: recepcion on top/left, despacho on bottom/right, etc.
    let s = 0;
    const hasRecep = grid.includes('recepcion');
    const hasDesp = grid.includes('despacho');
    const hasPick = grid.includes('picking');
    const hasAlm = grid.includes('almacenaje');
    
    if (hasRecep && hasDesp && hasPick && hasAlm) s += 40;
    
    // check flow: if dispatch is generally below reception
    const recIndices = grid.map((v,i)=>v==='recepcion'?i:-1).filter(i=>i!==-1);
    const despIndices = grid.map((v,i)=>v==='despacho'?i:-1).filter(i=>i!==-1);
    
    if (recIndices.length > 0 && despIndices.length > 0) {
      const avgRecY = recIndices.reduce((sum, i) => sum + Math.floor(i/10), 0) / recIndices.length;
      const avgDespY = despIndices.reduce((sum, i) => sum + Math.floor(i/10), 0) / despIndices.length;
      
      if (Math.abs(avgRecY - avgDespY) > 4) {
        s += 60; // good separation
      } else {
        s += 20; // flow might be overlapping
      }
    }
    setScore(s);
  };

  const clearGrid = () => {
    setGrid(Array(100).fill(null));
    setScore(0);
  };

  return (
    <div className="animate-in" style={{display:'flex',flexDirection:'column',gap:'1.25rem'}}>
      <div className="card gradient-header" style={{padding:'2rem'}}>
        <span style={{fontSize:'.7rem',fontFamily:'JetBrains Mono',color:'#10b981'}}>LABORATORIO INTERACTIVO 1</span>
        <h1 style={{fontSize:'2rem',fontWeight:900,color:'#fff',marginTop:'.25rem'}}>Diseño de Layout CEDI</h1>
        <p style={{color:'#94a3b8',marginTop:'.5rem',fontSize:'.85rem'}}>Aplica el principio de "Flujo Lineal". Dibuja el layout asignando zonas en la cuadrícula.</p>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 300px',gap:'1.5rem'}}>
        <div className="card" style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
          <div style={{
            display:'grid', gridTemplateColumns:'repeat(10, 1fr)', gap:'2px',
            background:'#1e293b', padding:'4px', borderRadius:'8px', width:'100%', maxWidth:'400px', aspectRatio:'1'
          }}>
            {grid.map((cell, idx) => (
              <div 
                key={idx} 
                onClick={() => handleCellClick(idx)}
                style={{
                  background: cell ? ZONES[cell].color : '#0f172a',
                  borderRadius:'2px', cursor:'pointer', border:'1px solid #334155'
                }}
              />
            ))}
          </div>
          <div style={{display:'flex',gap:'1rem',marginTop:'1.5rem'}}>
            <button className="btn-secondary" onClick={clearGrid}>Limpiar</button>
            <button className="btn-primary" onClick={evalLayout}>Evaluar Layout (Flujo lineal)</button>
          </div>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <h3 className="sec-title">Herramientas (Zonas)</h3>
            <div style={{display:'flex',flexDirection:'column',gap:'.5rem'}}>
              {Object.entries(ZONES).map(([k, v]) => (
                <button 
                  key={k} 
                  onClick={() => setSelectedZone(k)}
                  style={{
                    display:'flex',alignItems:'center',gap:'1rem',padding:'.5rem 1rem',borderRadius:'8px',
                    border: selectedZone === k ? `2px solid ${v.color}` : '1px solid #1e293b',
                    background: '#0f172a', color:'#fff', cursor:'pointer'
                  }}
                >
                  <div style={{width:'16px',height:'16px',borderRadius:'4px',background:v.color}} />
                  <span style={{fontSize:'.8rem'}}>{v.label}</span>
                </button>
              ))}
            </div>
            <p style={{fontSize:'.75rem',color:'#94a3b8',marginTop:'.75rem'}}>Selecciona una zona arriba y haz clic en la cuadrícula para "pintar" el diseño. Evita cruces de flujo.</p>
          </div>

          {score > 0 && (
            <div className={`card ${score >= 80 ? '' : 'callout yellow'}`} style={score>=80?{borderColor:'#10b981',background:'rgba(16,185,129,.05)'}:{}}>
              <h3 className="sec-title" style={{color:score>=80?'#10b981':'#f59e0b'}}>Evaluación</h3>
              <div style={{fontSize:'2.5rem',fontWeight:900,color:score>=80?'#10b981':'#f59e0b'}}>{score}/100</div>
              <p style={{fontSize:'.8rem',color:'#cbd5e1',marginTop:'.5rem'}}>
                {score >= 80 
                  ? '¡Excelente diseño en U o flujo recto! Las zonas están bien separadas reduciendo flujos cruzados.' 
                  : 'Faltan zonas esenciales o hay probabilidad de cruce de flujos. Intenta separar la recepción del despacho.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
