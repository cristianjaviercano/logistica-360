import React, { useState, useMemo } from 'react';

export default function LabABC() {
  const [items, setItems] = useState([
    { id: 'SKU-01', p: 50, d: 2000 },
    { id: 'SKU-02', p: 10, d: 5000 },
    { id: 'SKU-03', p: 200, d: 100 },
    { id: 'SKU-04', p: 5, d: 1000 },
    { id: 'SKU-05', p: 15, d: 300 }
  ]);

  const [newItem, setNewItem] = useState({ id: 'SKU-NEW', p: 20, d: 1000 });

  const addItem = () => {
    setItems([...items, { ...newItem }]);
    setNewItem({ id: `SKU-0${items.length+2}`, p: 20, d: 1000 });
  };

  const abcData = useMemo(() => {
    const list = items.map(i => ({ ...i, v: i.p * i.d })).sort((a,b) => b.v - a.v);
    const totalV = list.reduce((s,i) => s + i.v, 0);
    let cumV = 0;
    return list.map(i => {
      cumV += i.v;
      const pCum = (cumV / totalV) * 100;
      const clase = pCum <= 80 ? 'A' : pCum <= 95 ? 'B' : 'C';
      return { ...i, cumV, pCum, clase };
    });
  }, [items]);

  return (
    <div className="animate-in" style={{display:'flex',flexDirection:'column',gap:'1.25rem'}}>
      <div className="card gradient-header" style={{padding:'2rem'}}>
        <span style={{fontSize:'.7rem',fontFamily:'JetBrains Mono',color:'#10b981'}}>LABORATORIO INTERACTIVO 3</span>
        <h1 style={{fontSize:'2rem',fontWeight:900,color:'#fff',marginTop:'.25rem'}}>Clasificador ABC Dinámico</h1>
        <p style={{color:'#94a3b8',marginTop:'.5rem',fontSize:'.85rem'}}>Añade SKUs con su precio unitario y demanda anual. El simulador calculará automáticamente la clase A (80%), B (15%) o C (5%).</p>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:'1.5rem'}}>
        <div className="card" style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="sec-title" style={{fontSize:'.8rem'}}>Nuevo SKU</div>
          <input type="text" placeholder="ID (ej. SKU-06)" value={newItem.id} onChange={e=>setNewItem({...newItem, id:e.target.value})} />
          <input type="number" placeholder="Precio ($)" value={newItem.p} onChange={e=>setNewItem({...newItem, p:Number(e.target.value)})} />
          <input type="number" placeholder="Demanda (un)" value={newItem.d} onChange={e=>setNewItem({...newItem, d:Number(e.target.value)})} />
          <button className="btn-primary" onClick={addItem}>Agregar / Recalcular ABC</button>
        </div>

        <div className="card">
          <div className="sec-title" style={{fontSize:'.8rem'}}>Resultados Análisis ABC ({abcData.length} SKUs)</div>
          <table className="tbl" style={{marginTop:'1rem'}}>
            <thead><tr><th>SKU</th><th>P. Unit.</th><th>Demanda</th><th>Valor Total</th><th>% Acum</th><th>Clase</th></tr></thead>
            <tbody>
              {abcData.map(d => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td style={{fontFamily:'JetBrains Mono'}}>${d.p}</td>
                  <td style={{fontFamily:'JetBrains Mono'}}>{d.d}</td>
                  <td style={{color:'#10b981',fontFamily:'JetBrains Mono'}}>${d.v.toLocaleString()}</td>
                  <td style={{color:'#94a3b8',fontFamily:'JetBrains Mono'}}>{d.pCum.toFixed(1)}%</td>
                  <td><span className={`badge ${d.clase==='A'?'badge-green':d.clase==='B'?'badge-blue':'badge-yellow'}`}>{d.clase}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
