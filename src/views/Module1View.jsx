import React, { useState } from 'react';
const T = ({t,c='#10b981'})=>(<div className="sec-title" style={{color:c}}>{t}</div>);
const Ca = ({color='green',title,children})=>(<div className={`callout ${color}`} style={{marginBottom:'.75rem'}}><div className="callout-title">{title}</div><p>{children}</p></div>);

const TABS = [['conceptos','📚 Conceptos Clave'],['tipos','🏭 Tipos de Almacén'],['layout','📐 Diseño y Principios'],['indicadores','📊 Indicadores Base']];

export default function Module1View(){
  const [tab,setTab]=useState('conceptos');
  return(
    <div className="animate-in" style={{display:'flex',flexDirection:'column',gap:'1.25rem'}}>
      <div className="card gradient-header" style={{padding:'2rem'}}>
        <span style={{fontSize:'.7rem',fontFamily:'JetBrains Mono',color:'#10b981'}}>MÓDULO 1 · Fundamentos</span>
        <h1 style={{fontSize:'2rem',fontWeight:900,color:'#fff',marginTop:'.25rem'}}>Fundamentos de Almacenamiento</h1>
        <p style={{color:'#94a3b8',marginTop:'.5rem',fontSize:'.85rem'}}>Michel Roux (2009) · Taha (Investigación de Operaciones) · Hillier & Lieberman</p>
      </div>

      <div className="tab-bar">
        {TABS.map(([id,lbl])=>(<button key={id} className={`tab-btn ${tab===id?'active':''}`} onClick={()=>setTab(id)}>{lbl}</button>))}
      </div>

      {tab==='conceptos'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="¿Qué es un Almacén? Evolución del concepto"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7,marginBottom:'.75rem'}}>
              Históricamente un almacén era un espacio inerte de contingencia. En la <b>Investigación de Operaciones Avanzada (Taha / Hillier)</b>, se concibe como un <strong style={{color:'#fff'}}>nodo capacitando en una red de grafos dirigida (Supply Chain)</strong>. Sirve como una variable de amortiguación o variable de holgura ($s_i$) dentro del modelo matemático que equilibra restricciones restrictivas entre tasas de oferta y demanda estocástica. Michel Roux lo perfila estructuralmente como "el sub-sistema físico de amortiguación sistémica".
            </p>
            <Ca color="green" title="Diferencia clave: Almacén vs CEDI">
              Un <strong>almacén</strong> almacena productos por períodos medianos/largos. Un <strong>CEDI</strong> (Centro de Distribución) es de tránsito rápido: su función principal es el <em>sorting</em> y la preparación de pedidos (picking), no el almacenaje prolongado.
            </Ca>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
            {[
              ['🏭','Subsistema de Recepción','Control de calidad, verificación de cantidades, registro en WMS, devoluciones a proveedor.'],
              ['📦','Subsistema de Almacenaje','Ubicación física por zonas (FIFO/LIFO), slotting, gestión de ubicaciones rotativas.'],
              ['🔍','Subsistema de Picking','Preparación de pedidos por operario o sistema automatizado. Primer costo de la operación.'],
              ['🚚','Subsistema de Despacho','Consolidación de órdenes, verificación, cargue, generación de documentos (remisión, BL).'],
            ].map(([i,t,d])=>(
              <div key={t} className="card">
                <div style={{fontSize:'1.5rem',marginBottom:'.5rem'}}>{i}</div>
                <div style={{fontWeight:700,fontSize:'.82rem',color:'#f1f5f9',marginBottom:'.3rem'}}>{t}</div>
                <p style={{fontSize:'.75rem',color:'#94a3b8'}}>{d}</p>
              </div>
            ))}
          </div>

          <div className="card">
            <T t="La Logística Inversa — El flujo olvidado"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7}}>
              La logística inversa gestiona el retorno de productos desde el cliente hacia el almacén o el proveedor. Incluye devoluciones, reciclaje, reparación y disposición final. Rogers & Tibben-Lembke (1999) estiman que la logística inversa puede representar el <strong style={{color:'#10b981'}}>3–8% de las ventas totales</strong> en sectores de retail y manufactura. Los CEDIS modernos reservan entre el 8–15% de su área para este proceso.
            </p>
          </div>
        </div>
      )}

      {tab==='tipos'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="Clasificación de Almacenes por Función"/>
            <table className="tbl">
              <thead><tr><th>Tipo</th><th>Función principal</th><th>Ejemplo</th></tr></thead>
              <tbody>
                {[
                  ['Almacén de Materia Prima','Abastece la línea de producción con materiales sin transformar','Acería: palanquilla de acero'],
                  ['Almacén de Producto en Proceso (WIP)','Inventario entre etapas del proceso productivo','Ensamblaje automotriz'],
                  ['Almacén de Producto Terminado','Almacena el output antes del despacho al cliente','Bodega de electrodomésticos'],
                  ['CEDI / Centro de Distribución','Nodo de consolidación y desconsolidación para distribución','Almacenes Éxito, DHL'],
                  ['Almacén de Devoluciones','Gestiona retornos y logística inversa','Amazon Returns Center'],
                  ['Almacén Regulador','Nivela la producción estacional con la demanda','Café, azúcar, frutas'],
                ].map(r=>(<tr key={r[0]}><td style={{color:'#10b981',fontWeight:600}}>{r[0]}</td><td>{r[1]}</td><td style={{color:'#94a3b8'}}>{r[2]}</td></tr>))}
              </tbody>
            </table>
          </div>

          <div className="card">
            <T t="Clasificación por Régimen"/>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'.75rem'}}>
              {[
                ['Almacén Propio','Activo de la empresa. Alto control, alta inversión. Recomendado si el volumen es predecible y constante.','badge-green'],
                ['Almacén en Alquiler (3PL)','Operador logístico externo. Flexibilidad y costos variables. Ideal para picos de demanda.','badge-blue'],
                ['Almacén en Leasing','Infraestructura arrendada operada internamente. Balance entre control y flexibilidad financiera.','badge-yellow'],
              ].map(([t,d,b])=>(
                <div key={t} className="card">
                  <span className={`badge ${b}`} style={{marginBottom:'.5rem',display:'inline-block'}}>{t}</span>
                  <p style={{fontSize:'.75rem',color:'#94a3b8'}}>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab==='layout'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="Los 7 Principios del Diseño de Almacenes (Roux, 2009)"/>
            <div style={{display:'flex',flexDirection:'column',gap:'.5rem'}}>
              {[
                ['1. Flujo lineal','El producto debe moverse siempre en el mismo sentido (entrada ↠ almacenaje ↠ picking ↠ salida), evitando flujos cruzados.'],
                ['2. Accesibilidad','Todo producto debe ser accesible sin mover otro (principio FIFO/FEFO garantizado por diseño).'],
                ['3. Espacios mínimos en pasillos','Optimizar el ancho de pasillos según el equipo de manutención. Estanterías selectivas: 2.7–3.5 m. Drive-in: 1.5 m.'],
                ['4. Flexibilidad','El layout debe permitir reasignación de zonas ante cambios de mix de producto sin obras civiles.'],
                ['5. Aprovechamiento de altura','El volumen cúbico (m³) es el recurso, no el área en planta (m²). Estanterías de 8–12 m son estándar moderno.'],
                ['6. Seguridad','Separación clara de pasillos de personas y máquinas. Señalización, guardas y zonas de emergencia.'],
                ['7. Trazabilidad','Cada ubicación tiene una dirección única (Pasillo-Módulo-Nivel) legible por WMS y código de barras.'],
              ].map(([t,d])=>(
                <div key={t} style={{display:'flex',gap:'.75rem',padding:'.6rem',background:'rgba(16,185,129,.04)',borderRadius:8,border:'1px solid rgba(16,185,129,.1)'}}>
                  <span style={{color:'#10b981',fontWeight:700,fontSize:'.78rem',flexShrink:0,minWidth:160}}>{t}</span>
                  <p style={{fontSize:'.75rem',color:'#94a3b8'}}>{d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <T t="Zonificación ABC en el Layout"/>
            <Ca color="blue" title="Concepto de slotting">
              El <em>slotting</em> asigna ubicaciones físicas a los SKUs según su rotación. Los productos A (alta rotación) se colocan cerca de la zona de despacho, a altura ergonómica (0.5–1.5 m), minimizando distancia recorrida. Los productos C se colocan en el fondo o en altura.
            </Ca>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'.5rem',fontSize:'.75rem',textAlign:'center',marginTop:'.5rem'}}>
              {[['Zona A','80% rotación\n20% SKUs','Cerca despacho\n0.5–1.5 m altura','badge-green'],
                ['Zona B','15% rotación\n30% SKUs','Área media','badge-blue'],
                ['Zona C','5% rotación\n50% SKUs','Fondo/altura','badge-yellow']
              ].map(([z,r,u,b])=>(
                <div key={z} className="card" style={{textAlign:'center'}}>
                  <span className={`badge ${b}`}>{z}</span>
                  <p style={{marginTop:'.4rem',color:'#94a3b8',whiteSpace:'pre-line'}}>{r}</p>
                  <p style={{marginTop:'.25rem',color:'#64748b',whiteSpace:'pre-line'}}>{u}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab==='indicadores'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="KPIs Fundamentales del Almacén"/>
            <table className="tbl">
              <thead><tr><th>Indicador</th><th>Fórmula</th><th>Óptimo</th><th>Descripción</th></tr></thead>
              <tbody>
                {[
                  ['Exactitud de Inventario','(Ítems correctos / Total ítems)×100','≥ 99.5%','Mide la confiabilidad del registro vs la realidad física'],
                  ['Utilización de Capacidad','(Ubicaciones ocupadas / Total ubicaciones)×100','75–90%','Capacidad usada. Más del 95% genera ineficiencia operativa'],
                  ['Productividad del Picking','Líneas por hora-hombre','Benchmark sectorial','Eficiencia del proceso de preparación de pedidos'],
                  ['Costo por Unidad Almacenada','Costo total / Unidades·mes almacenadas','Reducir período a período','Eficiencia global del costo logístico de almacenaje'],
                  ['OTIF (On Time In Full)','(Órdenes entregadas a tiempo y completas / Total)×100','≥ 95%','Nivel de servicio al cliente interno/externo'],
                ].map(r=>(<tr key={r[0]}><td style={{color:'#10b981',fontWeight:600}}>{r[0]}</td><td style={{fontFamily:'JetBrains Mono',fontSize:'.7rem',color:'#6ee7b7'}}>{r[1]}</td><td style={{color:'#f59e0b'}}>{r[2]}</td><td style={{color:'#94a3b8'}}>{r[3]}</td></tr>))}
              </tbody>
            </table>
          </div>
          <Ca color="yellow" title="Referencia bibliográfica">
            Los benchmarks de KPIs logísticos son compilados anualmente por CSCMP (Council of Supply Chain Management Professionals) en su "State of Logistics Report" y por Grupo Consultor FIELT para Latinoamérica.
          </Ca>
        </div>
      )}
    </div>
  );
}
