import React, { useState } from 'react';

export default function LabEOQ() {
  const [val, setVal] = useState({ 
    D: 10000, // Demanda anual
    S: 50,    // Costo por orden
    H: 2.5,   // Costo de mantener unidad/año
    L: 5      // Lead time en días
  });

  const handleChange = (e) => setVal({...val, [e.target.name]: Number(e.target.value)});

  // Calcs
  const eoq = Math.sqrt((2 * val.D * val.S) / val.H);
  const numOrders = val.D / (eoq || 1);
  const dDaily = val.D / 365;
  const rop = dDaily * val.L;
  const tc = (val.D / (eoq || 1)) * val.S + ((eoq || 0) / 2) * val.H;

  return (
    <div className="animate-in" style={{display:'flex',flexDirection:'column',gap:'1.25rem'}}>
      <div className="card gradient-header" style={{padding:'2rem'}}>
        <span style={{fontSize:'.7rem',fontFamily:'JetBrains Mono',color:'#10b981'}}>LABORATORIO INTERACTIVO 5</span>
        <h1 style={{fontSize:'2rem',fontWeight:900,color:'#fff',marginTop:'.25rem'}}>Solver EOQ + Punto de Reorden</h1>
        <p style={{color:'#94a3b8',marginTop:'.5rem',fontSize:'.85rem'}}>Ajusta los parámetros para encontrar la cantidad económica de pedido que minimiza los costos totales de inventario.</p>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.5rem'}}>
        <div className="card" style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="sec-title" style={{fontSize:'.8rem'}}>Parámetros de Entrada</div>
          
          <div>
            <label style={{fontSize:'.75rem',color:'#94a3b8',display:'block',marginBottom:'.2rem'}}>Demanda Anual (D) — {val.D} u/año</label>
            <input type="range" name="D" min="1000" max="50000" step="1000" value={val.D} onChange={handleChange} />
          </div>
          <div>
            <label style={{fontSize:'.75rem',color:'#94a3b8',display:'block',marginBottom:'.2rem'}}>Costo de Ordenar (S) — ${val.S}</label>
            <input type="range" name="S" min="10" max="500" step="10" value={val.S} onChange={handleChange} />
          </div>
          <div>
            <label style={{fontSize:'.75rem',color:'#94a3b8',display:'block',marginBottom:'.2rem'}}>Costo Mantener (H) — ${val.H}/u/año</label>
            <input type="range" name="H" min="0.5" max="25" step="0.5" value={val.H} onChange={handleChange} />
          </div>
          <div>
            <label style={{fontSize:'.75rem',color:'#94a3b8',display:'block',marginBottom:'.2rem'}}>Lead Time (L) — {val.L} días</label>
            <input type="range" name="L" min="1" max="30" step="1" value={val.L} onChange={handleChange} />
          </div>
        </div>

        <div className="card" style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="sec-title" style={{fontSize:'.8rem'}}>Resultados Óptimos</div>
          
          <div style={{background:'rgba(16,185,129,.1)',border:'1px solid #10b981',borderRadius:'8px',padding:'1.5rem',textAlign:'center'}}>
            <p style={{fontSize:'.75rem',color:'#10b981',fontWeight:700,textTransform:'uppercase',marginBottom:'.2rem'}}>Q* (Cantidad Óptima de Pedido)</p>
            <div style={{fontSize:'3rem',fontWeight:900,color:'#fff',fontFamily:'JetBrains Mono'}}>{Math.round(eoq)} <span style={{fontSize:'1rem',color:'#10b981'}}>un.</span></div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
            <div style={{padding:'1rem', background:'#0f172a', border:'1px solid #1e293b', borderRadius:8}}>
              <p style={{color:'#94a3b8',fontSize:'.7rem'}}>Punto de Reorden (ROP)</p>
              <div style={{color:'#3b82f6',fontFamily:'JetBrains Mono',fontWeight:700,fontSize:'1.25rem'}}>{Math.round(rop)} u</div>
            </div>
            <div style={{padding:'1rem', background:'#0f172a', border:'1px solid #1e293b', borderRadius:8}}>
              <p style={{color:'#94a3b8',fontSize:'.7rem'}}>Pedidos al año (N)</p>
              <div style={{color:'#f59e0b',fontFamily:'JetBrains Mono',fontWeight:700,fontSize:'1.25rem'}}>{numOrders.toFixed(1)}</div>
            </div>
          </div>

          <div style={{padding:'1rem', background:'#0f172a', border:'1px solid #1e293b', borderRadius:8, textAlign:'center'}}>
            <p style={{color:'#94a3b8',fontSize:'.7rem'}}>Costo Total Anual Mínimo (CT)</p>
            <div style={{color:'#6ee7b7',fontFamily:'JetBrains Mono',fontWeight:700,fontSize:'1.5rem'}}>${tc.toLocaleString('es-CO', {maximumFractionDigits:0})}</div>
          </div>

        </div>
      </div>
    </div>
  );
}
