import React, { useState } from 'react';
const T = ({t})=>(<div className="sec-title">{t}</div>);
const Ca = ({color='green',title,children})=>(<div className={`callout ${color}`} style={{marginBottom:'.75rem'}}><div className="callout-title">{title}</div><p>{children}</p></div>);
const TABS=[['tipos','📦 Tipos de Carga'],['jit','⚡ JIT y Cross-Docking'],['tarifas','💰 Tarifas y Costos'],['documentos','📄 Documentación']];

export default function Module2View(){
  const [tab,setTab]=useState('tipos');
  return(
    <div className="animate-in" style={{display:'flex',flexDirection:'column',gap:'1.25rem'}}>
      <div className="card gradient-header" style={{padding:'2rem'}}>
        <span style={{fontSize:'.7rem',fontFamily:'JetBrains Mono',color:'#10b981'}}>MÓDULO 2 · Gestión de Carga</span>
        <h1 style={{fontSize:'2rem',fontWeight:900,color:'#fff',marginTop:'.25rem'}}>Manejo y Gestión de Carga</h1>
        <p style={{color:'#94a3b8',marginTop:'.5rem',fontSize:'.85rem'}}>Ballou (2004) · Bowersox, Closs & Cooper (2007)</p>
      </div>
      <div className="tab-bar">
        {TABS.map(([id,lbl])=>(<button key={id} className={`tab-btn ${tab===id?'active':''}`} onClick={()=>setTab(id)}>{lbl}</button>))}
      </div>

      {tab==='tipos'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="Clasificación de la Carga por Naturaleza"/>
            <table className="tbl">
              <thead><tr><th>Tipo</th><th>Características</th><th>Requisitos especiales</th><th>Ejemplo</th></tr></thead>
              <tbody>
                {[
                  ['Perecedera','Vida útil limitada, requiere control de temperatura','Cadena de frío (2–8°C o -18°C), FEFO obligatorio','Carnes, lácteos, flores'],
                  ['Frágil','Alta susceptibilidad al daño por impacto','Embalaje especial, stacking limitado, señal ↑','Electrónicos, vidrio, cerámica'],
                  ['Peligrosa (HAZMAT)','Materiales con riesgo para personas o ambiente','Rotulado ADR/IATA, segregación, hojas de datos','Químicos, combustibles, gases'],
                  ['Sobredimensionada / OOG','Supera dimensiones estándar de contenedor','Permisos especiales, equipos específicos (SPT)','Turbinas, estructuras, maquinaria'],
                  ['A granel','Sin empacar individualmente, fluidos o sólidos finos','Silos, tanques, tolvas','Granos, cementos, líquidos'],
                  ['Carga general','Embalada en unidades estándar, paletizable','Almacenaje convencional en estanterías','Cajas de consumo masivo'],
                ].map(r=>(<tr key={r[0]}><td style={{color:'#10b981',fontWeight:600}}>{r[0]}</td><td>{r[1]}</td><td style={{color:'#f59e0b'}}>{r[2]}</td><td style={{color:'#94a3b8'}}>{r[3]}</td></tr>))}
              </tbody>
            </table>
          </div>
          <div className="card">
            <T t="Unitarización de Carga"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7,marginBottom:'.75rem'}}>
              La unitarización agrupa unidades de producto en unidades de manejo superiores, optimizando el uso del vehículo y reduciendo el riesgo de daño. La jerarquía estándar es:
            </p>
            <div style={{display:'flex',gap:'.5rem',fontSize:'.75rem',flexWrap:'wrap'}}>
              {['Unidad de consumo (ea/pieza)','→','Caja (master pack)','→','Pallet (EUR 80×120 cm)','→','Contenedor (20\'/40\' TEU)'].map((s,i)=>(
                <span key={i} style={{color: s==='→'?'#475569':'#10b981',fontWeight:s==='→'?400:600}}>{s}</span>
              ))}
            </div>
            <Ca color="blue" title="Estándar GS1 — Código de barras en logística">
              El sistema GS1 (EAN-128 / GS1-128) codifica GTIN, lote, fecha de vencimiento y número de serie en un único código de barras. Es el estándar mundial para la trazabilidad unitaria de carga en CEDIS.
            </Ca>
          </div>
        </div>
      )}

      {tab==='jit'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="Just In Time (JIT) — Filosofía Toyota"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7,marginBottom:'.75rem'}}>
              El JIT (Ohno, 1988) busca eliminar toda forma de desperdicio (Muda) en la cadena de suministro, produciendo y entregando exactamente lo necesario, en el momento preciso y en la cantidad correcta. Impacto directo en almacenamiento: <strong style={{color:'#fff'}}>reduce el inventario promedio hasta un 60%</strong>, pero exige altísima coordinación con proveedores (frecuencia de entregas diarias o varias veces por día).
            </p>
            <Ca color="yellow" title="Los 7 desperdicios de Ohno aplicados al almacén">
              Sobreproducción (inventario excesivo), Espera (tiempo muerto de operarios/equipos), Transporte innecesario (layout deficiente), Sobreprocesamiento (re-embalaje evitable), Exceso de inventario, Movimiento innecesario (mal slotting), Defectos (daños en picking).
            </Ca>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
            {[
              {t:'Cross-Docking',i:'🔄',desc:'El producto entra al CEDI y sale en menos de 24 horas sin almacenaje intermedio. Reduce costos de almacenaje hasta un 30%. Requiere perfecta sincronía entre proveedores y clientes (ventanas de tiempo). Walmart lo implementó sistemáticamente desde 1988.',pros:['Sin costo de almacenaje','Alta velocidad de respuesta'],cons:['Requiere WMS avanzado','Dependencia extrema de proveedores']},
              {t:'Milk-Run',i:'🥛',desc:'Un único vehículo realiza recolecciones programadas en múltiples proveedores en una ruta circular. Reduce el número de envíos al CEDI y mejora la utilización del vehículo. Estándar en la industria automotriz (Toyota, Renault). Combinable con JIT.',pros:['Menor costo de transporte','Reducción de emisiones CO₂'],cons:['Requiere planificación rigurosa','Sensible a incumplimientos']},
            ].map(({t,i,desc,pros,cons})=>(
              <div key={t} className="card">
                <div style={{fontSize:'1.5rem',marginBottom:'.3rem'}}>{i}</div>
                <div style={{fontWeight:700,color:'#f1f5f9',marginBottom:'.5rem'}}>{t}</div>
                <p style={{fontSize:'.75rem',color:'#94a3b8',marginBottom:'.75rem',lineHeight:1.6}}>{desc}</p>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.5rem',fontSize:'.7rem'}}>
                  <div><p style={{color:'#6ee7b7',fontWeight:700,marginBottom:'.25rem'}}>✓ Ventajas</p>{pros.map(p=><p key={p} style={{color:'#94a3b8'}}>{p}</p>)}</div>
                  <div><p style={{color:'#fca5a5',fontWeight:700,marginBottom:'.25rem'}}>✗ Limitaciones</p>{cons.map(c=><p key={c} style={{color:'#94a3b8'}}>{c}</p>)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==='tarifas'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="Estructura de Costos de Almacenamiento"/>
            <table className="tbl">
              <thead><tr><th>Componente</th><th>Tipo</th><th>% típico del costo total</th></tr></thead>
              <tbody>
                {[
                  ['Mano de obra (operarios, supervisores)','Variable','45–55%'],
                  ['Arrendamiento o depreciación del inmueble','Fijo','15–25%'],
                  ['Equipos de manutención (alquiler/deprec.)','Fijo/Variable','8–12%'],
                  ['Servicios públicos (energía, agua)','Semi-fijo','5–8%'],
                  ['Sistemas (WMS, ERP)','Fijo','3–6%'],
                  ['Seguros y pérdidas','Variable','2–5%'],
                ].map(r=>(<tr key={r[0]}><td style={{color:'#f1f5f9'}}>{r[0]}</td><td><span className={`badge ${r[1]==='Variable'?'badge-yellow':r[1]==='Fijo'?'badge-blue':'badge-green'}`}>{r[1]}</span></td><td style={{color:'#10b981',fontWeight:700}}>{r[2]}</td></tr>))}
              </tbody>
            </table>
          </div>
          <div className="card">
            <T t="Tarifas de Almacenamiento — Modelos de Cobro"/>
            <div style={{display:'flex',flexDirection:'column',gap:'.5rem',fontSize:'.8rem'}}>
              {[
                ['Por posición de pallet/mes','Se cobra una tarifa fija por cada pallet almacenado. Fácil de administrar. Riesgo: penaliza al cliente por ineficiencia del operador.'],
                ['Por m³ almacenado/día','Más preciso, requiere pesaje volumétrico. Estándar en operadores refrigerados.'],
                ['Por movimiento (entrada/salida)','Se cobra por cada operación. Incentiva la rotación. Común en fulfillment e-commerce.'],
                ['Fee de gestión + tarifa por actividad (4PL)','Tarifa base + variable por servicio. Modelo de tercerización avanzada.'],
              ].map(([t,d])=>(<div key={t} style={{display:'flex',gap:'.75rem',padding:'.6rem',borderRadius:8,background:'rgba(16,185,129,.04)',border:'1px solid rgba(16,185,129,.1)'}}><span style={{color:'#10b981',fontWeight:700,flexShrink:0,minWidth:180}}>{t}</span><span style={{color:'#94a3b8'}}>{d}</span></div>))}
            </div>
          </div>
        </div>
      )}

      {tab==='documentos'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="Documentos Esenciales en Operaciones de Almacén"/>
            <table className="tbl">
              <thead><tr><th>Documento</th><th>Propósito</th><th>Emisor</th></tr></thead>
              <tbody>
                {[
                  ['Orden de Compra (PO)','Autoriza la compra al proveedor. Genera la recepción esperada en WMS.','Compras/Procurement'],
                  ['Packing List','Detalle de cada bulto: contenido, cantidad, peso, dimensiones por ítem.','Proveedor'],
                  ['Remisión / Guía de despacho','Constancia de entrega al cliente. Firmada por receptor. Documento legal.','Almacén/CEDI'],
                  ['Bill of Lading (BL)','Contrato de transporte marítimo. Documento de propiedad negociable en comercio internacional.','Naviera'],
                  ['Manifiesto de carga','Listado de toda la carga de un vehículo. Requerido por autoridades en transporte internacional.','Transportista'],
                  ['Acta de recibo','Constancia interna de la recepción conforme del producto. Soporte para pago al proveedor.','Almacén/Calidad'],
                ].map(r=>(<tr key={r[0]}><td style={{color:'#10b981',fontWeight:600}}>{r[0]}</td><td style={{color:'#cbd5e1'}}>{r[1]}</td><td style={{color:'#94a3b8'}}>{r[2]}</td></tr>))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
