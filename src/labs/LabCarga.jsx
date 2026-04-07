import React, { useState } from 'react';

export default function LabCarga() {
  const [val, setVal] = useState({ 
    peso: 1000, 
    vol: 2, 
    tipo: 'general', 
    dist: 100 
  });
  
  const T = ({t})=>(<div className="sec-title" style={{fontSize:'.8rem'}}>{t}</div>);

  // Cálculos
  const factorEspacial = val.tipo === 'perecedera' ? 1.5 : val.tipo === 'peligrosa' ? 2.0 : 1.0;
  const costoAlmacenaje = (val.vol * 15000) * factorEspacial; // $15k per m3 base
  
  // Peso equivalente (1 m3 = 333 kg terrestre)
  const pesoVol = val.vol * 333;
  const pesoCobro = Math.max(val.peso, pesoVol);
  const costoTrans = (pesoCobro / 1000) * val.dist * 2500; // $2500 per ton per km
  const total = costoAlmacenaje + costoTrans;

  const handleChange = (e) => setVal({...val, [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value});

  return (
    <div className="animate-in" style={{display:'flex',flexDirection:'column',gap:'1.25rem'}}>
      <div className="card gradient-header" style={{padding:'2rem'}}>
        <span style={{fontSize:'.7rem',fontFamily:'JetBrains Mono',color:'#10b981'}}>LABORATORIO INTERACTIVO 2</span>
        <h1 style={{fontSize:'2rem',fontWeight:900,color:'#fff',marginTop:'.25rem'}}>Simulador de Costos de Carga</h1>
        <p style={{color:'#94a3b8',marginTop:'.5rem',fontSize:'.85rem'}}>Calcula el impacto del volumen, peso y tipo de carga en los costos de almacén (m³) y transporte terrestre (Ton/km vs Peso Volumétrico).</p>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.5rem'}}>
        <div className="card" style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <T t="Parámetros de la Carga" />
          
          <div>
            <label style={{fontSize:'.75rem',color:'#94a3b8',display:'block',marginBottom:'.2rem'}}>Peso (kg) — {val.peso} kg</label>
            <input type="range" name="peso" min="100" max="5000" step="100" value={val.peso} onChange={handleChange} />
          </div>

          <div>
            <label style={{fontSize:'.75rem',color:'#94a3b8',display:'block',marginBottom:'.2rem'}}>Volumen (m³) — {val.vol} m³</label>
            <input type="range" name="vol" min="1" max="20" step="0.5" value={val.vol} onChange={handleChange} />
            <p style={{fontSize:'.65rem',color:'#64748b',marginTop:'.2rem'}}>Peso Volumétrico: {pesoVol.toLocaleString('es-CO')} kg (Factor 333 kg/m³)</p>
          </div>

          <div>
            <label style={{fontSize:'.75rem',color:'#94a3b8',display:'block',marginBottom:'.2rem'}}>Distancia Transporte (km)</label>
            <input type="number" name="dist" value={val.dist} onChange={handleChange} style={{width:'100%'}} />
          </div>

          <div>
            <label style={{fontSize:'.75rem',color:'#94a3b8',display:'block',marginBottom:'.2rem'}}>Tipo de Carga</label>
            <select name="tipo" value={val.tipo} onChange={handleChange} style={{width:'100%'}}>
              <option value="general">General (Estándar)</option>
              <option value="perecedera">Perecedera (+50% almacenaje frío)</option>
              <option value="peligrosa">Peligrosa (+100% seguros/aislamiento)</option>
            </select>
          </div>
        </div>

        <div className="card" style={{display:'flex',flexDirection:'column'}}>
          <T t="Resultados Monetarios" />
          
          <div style={{background:'#0f172a',border:'1px solid #1e293b',borderRadius:'8px',padding:'1rem',marginBottom:'1rem',flex:1}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'.5rem',fontSize:'.8rem'}}>
              <span style={{color:'#94a3b8'}}>Peso Base de Cobro Transporte:</span>
              <span style={{color:'#f1f5f9',fontFamily:'JetBrains Mono'}}>{pesoCobro > val.peso ? `${pesoCobro.toLocaleString('es-CO')} kg (Por Volumen)` : `${val.peso.toLocaleString('es-CO')} kg (Por Peso Real)`}</span>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'.5rem',fontSize:'.8rem'}}>
              <span style={{color:'#94a3b8'}}>Costo Almacenaje Base:</span>
              <span style={{color:'#f1f5f9',fontFamily:'JetBrains Mono'}}>${costoAlmacenaje.toLocaleString('es-CO')} / mes</span>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'.5rem',fontSize:'.8rem'}}>
              <span style={{color:'#94a3b8'}}>Costo Transporte:</span>
              <span style={{color:'#f1f5f9',fontFamily:'JetBrains Mono'}}>${costoTrans.toLocaleString('es-CO')} / viaje</span>
            </div>
          </div>
          
          <div style={{background:'rgba(16,185,129,.1)',border:'1px solid #10b981',borderRadius:'8px',padding:'1.5rem',textAlign:'center'}}>
            <p style={{fontSize:'.75rem',color:'#10b981',fontWeight:700,textTransform:'uppercase',letterSpacing:'1px',marginBottom:'.2rem'}}>Costo Total Logístico</p>
            <div style={{fontSize:'2rem',fontWeight:900,color:'#fff',fontFamily:'JetBrains Mono'}}>${total.toLocaleString('es-CO', {maximumFractionDigits:0})}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
