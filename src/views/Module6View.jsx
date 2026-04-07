import React,{useState} from 'react';
const T=({t})=>(<div className="sec-title">{t}</div>);
const Ca=({color='green',title,children})=>(<div className={`callout ${color}`} style={{marginBottom:'.75rem'}}><div className="callout-title">{title}</div><p>{children}</p></div>);
const TABS=[['wms','💻 WMS'],['lean','🔄 Lean Warehousing'],['bench','🌐 Clase Mundial'],['tendencias','🚀 Tendencias']];
export default function Module6View(){
  const [tab,setTab]=useState('wms');
  return(
    <div className="animate-in" style={{display:'flex',flexDirection:'column',gap:'1.25rem'}}>
      <div className="card gradient-header" style={{padding:'2rem'}}>
        <span style={{fontSize:'.7rem',fontFamily:'JetBrains Mono',color:'#10b981'}}>MÓDULO 6 · Clase Mundial</span>
        <h1 style={{fontSize:'2rem',fontWeight:900,color:'#fff',marginTop:'.25rem'}}>WMS y Almacenes de Clase Mundial</h1>
        <p style={{color:'#94a3b8',marginTop:'.5rem',fontSize:'.85rem'}}>Gartner (2024) · Richards (2018) · Lean Enterprise Institute</p>
      </div>
      <div className="tab-bar">
        {TABS.map(([id,lbl])=>(<button key={id} className={`tab-btn ${tab===id?'active':''}`} onClick={()=>setTab(id)}>{lbl}</button>))}
      </div>

      {tab==='wms'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="WMS — Warehouse Management System"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7,marginBottom:'.75rem'}}>
              Un WMS es el sistema de información que dirige en tiempo real todas las operaciones del almacén: recepción, putaway, picking, packing y despacho. El mercado global de WMS alcanzó USD 3.5 mil millones en 2023 y crece al 16% anual (Gartner, 2024), impulsado por el auge del e-commerce.
            </p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'1rem'}}>
              {[
                {t:'Funcionalidades Core',items:['Gestión de ubicaciones (slotting dinámico)','Trazabilidad FEFO/FIFO automática','Directed putaway y picking','Wave planning y batch picking','Cross-docking y milk-run','KPIs en tiempo real (dashboard)']},
                {t:'Funcionalidades Avanzadas',items:['Integración con AGV/robots (WCS)','Labor Management System (LMS)','Yardmanagement (YMS) — patio de camiones','Gestión de devoluciones (RMA)','Slotting optimization con IA','Integración omnicanal e-commerce']},
              ].map(({t,items})=>(<div key={t} className="card"><p style={{fontWeight:700,color:'#f1f5f9',marginBottom:'.5rem'}}>{t}</p><ul style={{fontSize:'.75rem',color:'#94a3b8',display:'flex',flexDirection:'column',gap:'.3rem'}}>{items.map(i=>(<li key={i} style={{display:'flex',gap:'.5rem'}}><span style={{color:'#10b981'}}>▸</span>{i}</li>))}</ul></div>))}
            </div>
          </div>
          <div className="card">
            <T t="Líderes del Mercado WMS — Magic Quadrant Gartner 2024"/>
            <table className="tbl">
              <thead><tr><th>Proveedor</th><th>Segmento</th><th>Fortaleza</th></tr></thead>
              <tbody>
                {[
                  ['Manhattan Associates','Líderes','Mayor funcionalidad. Ideal para retailers y e-commerce complejo.'],
                  ['Blue Yonder (JDA)','Líderes','Fuerte en planificación AI/ML integrada con WMS.'],
                  ['SAP Extended WH','Líderes','Integración nativa con ERP SAP. Ideal empresas SAP.'],
                  ['Oracle WMS Cloud','Visionarios','Flexibilidad SaaS, buena integración multicanal.'],
                  ['Infor WMS','Retadores','Fuerte en manufactura discreta y distribución especializada.'],
                  ['Softeon','Nicho','Alta personalización, ideal PYMES y 3PLs.'],
                ].map(r=>(<tr key={r[0]}><td style={{color:'#10b981',fontWeight:600}}>{r[0]}</td><td><span className={`badge ${r[1]==='Líderes'?'badge-green':r[1]==='Visionarios'?'badge-blue':'badge-yellow'}`}>{r[1]}</span></td><td style={{color:'#94a3b8'}}>{r[2]}</td></tr>))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab==='lean'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="Lean Warehousing — Aplicación de Toyota en el Almacén"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7,marginBottom:'.75rem'}}>
              Lean Warehousing aplica los principios del Sistema de Producción Toyota (TPS) al CEDI, eliminando los 7 desperdicios y estableciendo flujo continuo. La diferencia con manufactura: el almacén maneja demanda variable y miles de SKUs, lo que requiere adaptar las herramientas.
            </p>
            {[
              {t:'5S en el Almacén',items:[['Seiri (Clasificar)','Eliminar ítems obsoletos, dañados o sin movimiento de todas las ubicaciones'],['Seiton (Ordenar)','Cada cosa en su lugar: slotting ABC aplicado, señalización de pisos y ubicaciones'],['Seiso (Limpiar)','Limpieza sistemática diaria: pasillos, equipos, zonas de trabajo'],['Seiketsu (Estandarizar)','Procedimientos documentados: "Un operario, una forma correcta de hacer cada tarea"'],['Shitsuke (Sostener)','Auditorías 5S semanales, tableros visuales, participación activa de operarios']]},
              {t:'Kaizen en el CEDI',items:[['¿Qué es?','Mejora continua incremental. No requiere grandes inversiones: busca eliminar pequeños desperdicios diariamente.'],['SMED aplicado','Reducir el tiempo de setup entre waves de picking o cambio de estantería. Objetivo: &lt;10 minutos.'],['Poka-Yoke','Dispositivos anti-error: lectores de código de barras que imposibilitan el picking equivocado.']]}
            ].map(({t,items})=>(<div key={t} className="card"><p style={{fontWeight:700,color:'#f1f5f9',marginBottom:'.75rem'}}>{t}</p><div style={{display:'flex',flexDirection:'column',gap:'.4rem'}}>{items.map(([k,v])=>(<div key={k} style={{display:'flex',gap:'.75rem',fontSize:'.78rem'}}><span style={{color:'#10b981',fontWeight:700,minWidth:150,flexShrink:0}}>{k}</span><span style={{color:'#94a3b8'}}>{v}</span></div>))}</div></div>))}
          </div>
        </div>
      )}

      {tab==='bench'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          {[
            {empresa:'Amazon Fulfillment Center',pais:'🇺🇸 USA',logro:'Velocidad de fulfill en &lt;2 horas para pedidos Prime. Uso de 750,000+ robots Kiva/Amazon Robotics. SKU count: 350 millones de productos. Pick rate: 120–300 ítems/hora con robots colaborativos.',kpi:'99.8% precisión de picking, 2h fulfill Prime'},
            {empresa:'Zara (Inditex) — Centro Arteixo',pais:'🇪🇸 España',logro:'El CEDI más eficiente del fast fashion: 300,000 m², 3 millones de prendas/semana. Cross-docking casi total — el 95% del producto sale en &lt;48h. Repone tiendas globales 2 veces por semana.', kpi:'Lead time fábrica-tienda: 2 semanas'},
            {empresa:'Toyota — Just-in-Sequence',pais:'🇯🇵 Japón',logro:'Los componentes llegan a la línea de ensamble en el orden exacto de montaje, con precisión de minutos. El almacén dentro de la planta tiene inventario para máximo 2–4 horas de producción. Cero overstock estructural.',kpi:'Inventario &lt;4h producción, 0 faltantes'},
          ].map(({empresa,pais,logro,kpi})=>(
            <div key={empresa} className="card">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'.5rem'}}>
                <div><p style={{fontWeight:800,color:'#f1f5f9',fontSize:'.9rem'}}>{empresa}</p><p style={{color:'#94a3b8',fontSize:'.72rem'}}>{pais}</p></div>
                <span className="badge badge-green">{kpi}</span>
              </div>
              <p style={{fontSize:'.78rem',color:'#cbd5e1',lineHeight:1.6}} dangerouslySetInnerHTML={{__html:logro}} />
            </div>
          ))}
        </div>
      )}

      {tab==='tendencias'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
            {[
              {i:'🤖',t:'Robótica y Automatización',d:'Los cobots (robots colaborativos) de Boston Dynamics, Geek+, y Locus Robotics reducen el tiempo de picking en 50–70%. La inversión global en robots de almacén superará USD 18 mil millones en 2027 (IDC).'},
              {i:'🧠',t:'IA y Machine Learning',d:'Pronóstico de demanda con ML (precisión +30% vs métodos clásicos), slotting dinámico automatizado, mantenimiento predictivo de equipos. Amazon usa modelos propios entrenados con billones de transacciones.'},
              {i:'📡',t:'IoT y Visibilidad en Tiempo Real',d:'Sensores en cada ubicación, temperatura, peso, videoanálisis. El "almacén digital" tiene gemelo digital que permite simular cambios antes de implementarlos físicamente.'},
              {i:'🌱',t:'Green Logistics',d:'CEDIS con certificación LEED: techos solares, recuperación de calor de refrigeración, montacargas 100% eléctrica. DHL, UPS y FedEx comprometidos a flota 100% eléctrica para 2030.'},
              {i:'🛸',t:'Drones en el Almacén',d:'Drones para inventario cíclico automatizado (Gather AI, Corvus One): escanean códigos de barras en altura sin operario. Reducen costo de conteo en 90%.'},
              {i:'🪙',t:'Blockchain para Trazabilidad',d:'Trazabilidad inmutable de carga en múltiples eslabones. Walmart exige a sus proveedores de vegetales trazabilidad blockchain de granja a tienda en &lt;2 segundos (antes: &gt;6 días por papel).'},
            ].map(({i,t,d})=>(
              <div key={t} className="card">
                <div style={{fontSize:'1.5rem',marginBottom:'.3rem'}}>{i}</div>
                <p style={{fontWeight:700,color:'#f1f5f9',fontSize:'.82rem',marginBottom:'.4rem'}}>{t}</p>
                <p style={{fontSize:'.73rem',color:'#94a3b8',lineHeight:1.5}}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
