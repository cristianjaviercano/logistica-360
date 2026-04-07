import React, { useState } from 'react';

export default function LabKPI() {
  const [v, setV] = useState({ 
    orders: 1000, 
    onTime: 950, 
    complete: 980,
    itemsPhy: 5000,
    itemsWms: 5015,
    capTotal: 10000,
    capUse: 8500
  });

  const handleChange = (e) => setV({...v, [e.target.name]: Number(e.target.value)});

  // Calcs
  const otif = (v.onTime / v.orders) * (v.complete / v.orders) * 100; // Simplified OTIF
  const exactitud = ((v.itemsPhy - Math.abs(v.itemsPhy - v.itemsWms)) / v.itemsPhy) * 100;
  const utilizacion = (v.capUse / v.capTotal) * 100;

  return (
    <div className="animate-in" style={{display:'flex',flexDirection:'column',gap:'1.25rem'}}>
      <div className="card gradient-header" style={{padding:'2rem'}}>
        <span style={{fontSize:'.7rem',fontFamily:'JetBrains Mono',color:'#10b981'}}>LABORATORIO INTERACTIVO 4</span>
        <h1 style={{fontSize:'2rem',fontWeight:900,color:'#fff',marginTop:'.25rem'}}>Calculadora de KPIs</h1>
        <p style={{color:'#94a3b8',marginTop:'.5rem',fontSize:'.85rem'}}>Simula el estado de tu centro de distribución a través de indicadores clave.</p>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.5rem'}}>
        <div className="card" style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="sec-title" style={{fontSize:'.8rem'}}>Datos de Operación</div>
          
          <div style={{padding:'1rem', background:'#0f172a', border:'1px solid #1e293b', borderRadius:8}}>
            <p style={{color:'#10b981',fontSize:'.75rem',fontWeight:700,marginBottom:'.5rem'}}>Servicio (OTIF)</p>
            <input type="number" name="orders" value={v.orders} onChange={handleChange} placeholder="Pedidos Totales" style={{marginBottom:'.5rem',width:'100%'}}/>
            <input type="number" name="onTime" value={v.onTime} onChange={handleChange} placeholder="Pedidos a Tiempo" style={{marginBottom:'.5rem',width:'100%'}}/>
            <input type="number" name="complete" value={v.complete} onChange={handleChange} placeholder="Pedidos Completos" style={{width:'100%'}}/>
          </div>

          <div style={{padding:'1rem', background:'#0f172a', border:'1px solid #1e293b', borderRadius:8}}>
            <p style={{color:'#3b82f6',fontSize:'.75rem',fontWeight:700,marginBottom:'.5rem'}}>Inventario (ERI)</p>
            <input type="number" name="itemsPhy" value={v.itemsPhy} onChange={handleChange} placeholder="Ítems Físicos" style={{marginBottom:'.5rem',width:'100%'}}/>
            <input type="number" name="itemsWms" value={v.itemsWms} onChange={handleChange} placeholder="Ítems WMS" style={{width:'100%'}}/>
          </div>

          <div style={{padding:'1rem', background:'#0f172a', border:'1px solid #1e293b', borderRadius:8}}>
            <p style={{color:'#f59e0b',fontSize:'.75rem',fontWeight:700,marginBottom:'.5rem'}}>Capacidad</p>
            <input type="number" name="capTotal" value={v.capTotal} onChange={handleChange} placeholder="Posiciones Totales" style={{marginBottom:'.5rem',width:'100%'}}/>
            <input type="number" name="capUse" value={v.capUse} onChange={handleChange} placeholder="Posiciones Ocupadas" style={{width:'100%'}}/>
          </div>
        </div>

        <div className="card" style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="sec-title" style={{fontSize:'.8rem'}}>Dashboard de Resultados</div>
          
          {[
            {n:'OTIF (Perfect Order)',v:otif, t:'≥ 95%'},
            {n:'ERI (Exactitud Inv.)',v:exactitud, t:'≥ 99%'},
            {n:'Utilización Capacidad',v:utilizacion, t:'80-90%'}
          ].map(k => (
            <div key={k.n} style={{padding:'1.5rem', background: k.v >= 95 ? 'rgba(16,185,129,.1)' : k.v >= 80 ? 'rgba(59,130,246,.1)' : 'rgba(239,68,68,.1)', border:`1px solid ${k.v >= 95 ? '#10b981' : k.v >= 80 ? '#3b82f6' : '#ef4444'}`, borderRadius:8, textAlign:'center'}}>
              <p style={{fontSize:'.75rem',color:'#94a3b8',marginBottom:'.25rem'}}>{k.n}</p>
              <div style={{fontSize:'2.5rem',fontWeight:900,color:'#fff'}}>{k.v?k.v.toFixed(1):0}%</div>
              <p style={{fontSize:'.65rem',color:k.v >= 95 ? '#6ee7b7' : k.v >= 80 ? '#93c5fd' : '#fca5a5'}}>Objetivo: {k.t}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
