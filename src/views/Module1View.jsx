import React, { useState } from 'react';
const T = ({t,c='#10b981'})=>(<div className="sec-title" style={{color:c}}>{t}</div>);
const Ca = ({color='green',title,children})=>(<div className={`callout ${color}`} style={{marginBottom:'.75rem'}}><div className="callout-title">{title}</div><p>{children}</p></div>);

const TABS = [['logistica','📦 Triángulo de Logística'],['conceptos','📚 Conceptos Clave'],['tipos','🏭 Tipos de Almacén'],['layout','📐 Diseño y Principios'],['indicadores','📊 Indicadores Base']];

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

      {tab==='logistica'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="El Triángulo de la Logística" c="#f59e0b"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7,marginBottom:'.75rem'}}>
              La gestión logística se fundamenta en tres dimensiones que definen el servicio: <strong style={{color:'#fff'}}>Costo, Tiempo y Calidad</strong>. 
              Este equilibrio es el corazón de toda decisión logística. Según Ballou (2004), "toda decisión logística implica un trade-off entre estas tres dimensiones".
            </p>
            
            <div style={{
              display:'flex',
              justifyContent:'center',
              alignItems:'center',
              padding:'2rem',
              position:'relative'
            }}>
              <svg width="300" height="280" viewBox="0 0 300 280">
                <polygon points="150,20 270,220 30,220" fill="none" stroke="#10b981" strokeWidth="3"/>
                <circle cx="150" cy="20" r="8" fill="#f59e0b"/>
                <circle cx="270" cy="220" r="8" fill="#3b82f6"/>
                <circle cx="30" cy="220" r="8" fill="#ec4899"/>
                <text x="150" y="15" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">COSTO</text>
                <text x="280" y="220" textAnchor="start" fill="#3b82f6" fontSize="12" fontWeight="bold">TIEMPO</text>
                <text x="20" y="220" textAnchor="end" fill="#ec4899" fontSize="12" fontWeight="bold">CALIDAD</text>
                <text x="150" y="140" textAnchor="middle" fill="#94a3b8" fontSize="11">SERVICIO</text>
                <text x="150" y="155" textAnchor="middle" fill="#94a3b8" fontSize="11">ÓPTIMO</text>
              </svg>
            </div>

            <Ca color="yellow" title="Interpretación del Triángulo">
              <ul style={{paddingLeft:'1rem',marginTop:'.25rem'}}>
                <li><strong>Minimizar COSTOS</strong> → Mayor tiempo de entrega o menor calidad</li>
                <li><strong>Minimizar TIEMPO</strong> → Mayor costo de transporte o menor calidad</li>
                <li><strong>Maximizar CALIDAD</strong> → Mayor costo y tiempo</li>
              </ul>
            </Ca>
          </div>

          <div className="card">
            <T t="Cadena de Suministro (Supply Chain)" c="#3b82f6"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7,marginBottom:'.75rem'}}>
              La Cadena de Suministro es la red de organizaciones, personas, actividades, información y recursos involucrados en mover un producto o servicio desde el proveedor hasta el cliente.
            </p>
            
            <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'.5rem',marginTop:'.75rem'}}>
              {[
                {e:'🏭',l:'Proveedor',c:'#3b82f6'},
                {e:'⚙️',l:'Manufactura',c:'#8b5cf6'},
                {e:'📦',l:'CEDI',c:'#f59e0b'},
                {e:'🏪',l:'Distribución',c:'#10b981'},
                {e:'👤',l:'Cliente',c:'#ef4444'}
              ].map((item,i)=>(
                <div key={i} style={{padding:'.75rem',background:item.c+'20',border:`1px solid ${item.c}`,borderRadius:'8px',textAlign:'center'}}>
                  <div style={{fontSize:'1.5rem'}}>{item.e}</div>
                  <div style={{fontSize:'.7rem',color:item.c,fontWeight:'bold',marginTop:'.25rem'}}>{item.l}</div>
                  <svg width="100%" height="20" style={{marginTop:'.5rem'}}>
                    <line x1="0" y1="10" x2="90" y2="10" stroke={item.c} strokeWidth="2" strokeDasharray="4"/>
                    <polygon points="95,5 100,10 95,15" fill={item.c}/>
                  </svg>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <T t="Logística vs Cadena de Suministro" c="#10b981"/>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
              <div style={{padding:'1rem',background:'#0f172a',border:'1px solid #1e293b',borderRadius:'8px'}}>
                <div style={{fontWeight:'bold',color:'#f59e0b',marginBottom:'.5rem'}}>LOGÍSTICA</div>
                <p style={{fontSize:'.75rem',color:'#94a3b8',lineHeight:1.6}}>
                  Se enfoca en el flujo interno de materiales y información dentro de una organización. 
                  Incluye: almacenamiento, transporte, manejo de materiales, procesamiento de pedidos.
                </p>
              </div>
              <div style={{padding:'1rem',background:'#0f172a',border:'1px solid #1e293b',borderRadius:'8px'}}>
                <div style={{fontWeight:'bold',color:'#3b82f6',marginBottom:'.5rem'}}>SUPPLY CHAIN</div>
                <p style={{fontSize:'.75rem',color:'#94a3b8',lineHeight:1.6}}>
                  Abarca toda la red: proveedores → empresa → distribuidores → clientes. 
                  Incluye procurement, producción, distribución, retornología.
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <T t="Flujos en la Cadena de Suministro" c="#8b5cf6"/>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
              <div>
                <div style={{fontWeight:'bold',color:'#10b981',marginBottom:'.5rem'}}>→ Flujo de materiales (físico)</div>
                <p style={{fontSize:'.75rem',color:'#94a3b8'}}>
                  Materia prima → Producción → Inventario → Distribución → Cliente
                </p>
              </div>
              <div>
                <div style={{fontWeight:'bold',color:'#3b82f6',marginBottom:'.5rem'}}>→ Flujo de información</div>
                <p style={{fontSize:'.75rem',color:'#94a3b8'}}>
                  Pedidos forecast → Procesos → Estados de inventario
                </p>
              </div>
              <div>
                <div style={{fontWeight:'bold',color:'#f59e0b',marginBottom:'.5rem'}}>→ Flujo financiero</div>
                <p style={{fontSize:'.75rem',color:'#94a3b8'}}>
                  Pagos → Crédito → Liquidación → Costos
                </p>
              </div>
              <div>
                <div style={{fontWeight:'bold',color:'#ec4899',marginBottom:'.5rem'}}>→ Flujo inverso (retornos)</div>
                <p style={{fontSize:'.75rem',color:'#94a3b8'}}>
                  Devoluciones → Reparación → Reciclaje → Disposición
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

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
