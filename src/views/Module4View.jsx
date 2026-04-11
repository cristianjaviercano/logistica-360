import React,{useState} from 'react';
const T=({t,c='#334155'})=>(<div className="sec-title" style={{color:c}}>{t}</div>);
const Ca=({color='green',title,children})=>(<div className={`callout ${color}`} style={{marginBottom:'.75rem'}}><div className="callout-title">{title}</div><p>{children}</p></div>);
const TABS=[['equipos','🚜 Equipos de Manutención'],['estanterias','🗄️ Sistemas de Estanterías'],['picking','📋 Picking y Preparación'],['ergonomia','🦺 Ergonomía y Seguridad'],['kpis','📊 KPIs de Manipulación']];
export default function Module4View(){
  const [tab,setTab]=useState('equipos');
  return(
    <div className="animate-in" style={{display:'flex',flexDirection:'column',gap:'1.25rem'}}>
      <div className="card gradient-header" style={{padding:'2rem'}}>
        <span style={{fontSize:'.7rem',fontFamily:'JetBrains Mono',color:'#64748b'}}>MÓDULO 4 · Manipulación</span>
        <h1 style={{fontSize:'2rem',fontWeight:700,color:'#1e293b',marginTop:'.25rem'}}>Manipulación de Materiales</h1>
        <p style={{color:'#64748b',marginTop:'.5rem',fontSize:'.85rem'}}>Apple (1977) · Tompkins et al. (2010) · ANSI MH16.1</p>
      </div>
      <div className="tab-bar">
        {TABS.map(([id,lbl])=>(<button key={id} className={`tab-btn ${tab===id?'active':''}`} onClick={()=>setTab(id)}>{lbl}</button>))}
      </div>

              {tab==='equipos'&&(
          <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
            <div className="card">
              <T t="Clasificación de Equipos de Manutención"/>
              <table className="tbl">
                <thead><tr><th>Equipo</th><th>Capacidad</th><th>Altura max</th><th>Pasillo min</th><th>Aplicación</th></tr></thead>
                <tbody>
                  {[
                    ['Transpaleta manual','2,000 kg','0.2 m (solo suelo)','1.5 m','Cargue/descargue en andén'],
                    ['Transpaleta eléctrica','2,500 kg','0.3 m','1.6 m','Traslados en planta, ágil'],
                    ['Montacargas contrapesado','1,500–5,000 kg','6–7 m','3.5 m','Almacenaje estantería selectiva'],
                    ['Reach Truck','1,200–2,500 kg','10–12 m','2.7 m','Almacenaje en altura, pasillos estrechos'],
                    ['Trilateral / VNA','1,000–1,500 kg','14–16 m','1.5–1.8 m','Very Narrow Aisle, alta densidad'],
                    ['AGV (Veh. Guiado Autom.)','Variado','Variado','Diseñado','Almacenes automatizados, e-commerce'],
                    ['Transelevador (AS/RS)','500–2,000 kg','45+ m','0.8–1.2 m','Alta densidad, automatización total'],
                  ].map(r=>(<tr key={r[0]}><td style={{color:'#334155',fontWeight:600}}>{r[0]}</td><td>{r[1]}</td><td style={{color:'#64748b'}}>{r[2]}</td><td>{r[3]}</td><td style={{color:'#64748b'}}>{r[4]}</td></tr>))}
                </tbody>
              </table>
            </div>
            <div className="card">
              <T t="Criterios de Selección del Equipo Óptimo"/>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'.75rem',fontSize:'.75rem'}}>
                {[['Volumen de Operación','Operaciones por hora necesarias vs capacidad del equipo. Dimensionar para el pico, no el promedio.'],['Altura de Almacenaje','La altura determina el tipo de equipo. Por encima de 8m, solo reach truck o VNA es práctico.'],['Tipo de carga','Peso, dimensiones, estabilidad. Cargas irregulares requieren accesorios (pinzas, ganchos).'],['Ancho de pasillo','El pasillo define el equipo, o viceversa. Rediseñar layout y equipo conjuntamente.'],['Costo total de propiedad','No solo el precio de compra: mantenimiento, energía, capacitación, repuestos.'],['Nivel de automatización','Capex elevado vs reducción de mano de obra a largo plazo. ROI típico: 3–7 años.']].map(([t,d])=>(<div key={t} className="card"><p style={{fontWeight:600,color:'#334155',marginBottom:'.3rem'}}>{t}</p><p style={{color:'#64748b'}}>{d}</p></div>))}
              </div>
            </div>
          </div>
        )}

              {tab==='estanterias'&&(
          <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
            <div className="card">
              <T t="Sistemas de Estanterías — Guía de Selección"/>
              {[
                {n:'Estantería Selectiva',d:'El estándar más usado. Acceso directo a cada pallet sin mover otro. FIFO natural. Pasillos de 3.0–3.5 m. Densidad media (~40% del área es pasillo). Ideal para alta variedad de SKUs con poca profundidad de stock.',pro:'100% selectividad',con:'Baja densidad de almacenaje'},
                {n:'Drive-In / Drive-Through',d:'Montacargas entra dentro de la estantería. Alta densidad (mínimos pasillos). Drive-In: LIFO forzado. Drive-Through: FIFO posible. Ideal para productos de alta rotación y pocos SKUs (frigoríficos, bebidas).',pro:'Densidad hasta 85%',con:'Só1 referencia por callejón'},
                {n:'Estantería Dinámica (Gravity Flow)',d:'Carrileras con rodillos inclinados. El producto se desliza por gravedad desde la carga (posterior) hasta el picking (frontal). FIFO automático. Ideales para zonas de picking de alta velocidad.',pro:'FIFO automático, alta productividad',con:'Só1 para cajas de peso homogéneo'},
                {n:'Estantería Móvil (Compactus)',d:'Filas de estanterías sobre rieles motorizados. Se abre só1 el pasillo necesario. Densidad hasta 90%. Ideales para archivos, repuestos, farmacéutica. Velocidad de acceso baja.',pro:'Máxima densidad',con:'Un só1 pasillo abierto a la vez'},
                {n:'Cantilever',d:'Sin columnas frontales. Brazos horizontales para cargas largas (tubos, perfiles, maderas). No apto para pallets convencionales.',pro:'Único sistema para carga larga',con:'Requiere montacargas especial'},
              ].map(({n,d,pro,con})=>(<div key={n} style={{display:'flex',flexDirection:'column',gap:'.3rem',padding:'.75rem',borderRadius:8,background:'#f8fafc',border:'1px solid #e2e8f0',marginBottom:'.5rem'}}>
                <div style={{fontWeight:700,color:'#334155',fontSize:'.82rem'}}>{n}</div>
                <p style={{fontSize:'.75rem',color:'#475569',lineHeight:1.5}}>{d}</p>
                <div style={{display:'flex',gap:'1rem',fontSize:'.7rem',marginTop:'.25rem'}}>
                  <span style={{color:'#10b981'}}>✓ {pro}</span>
                  <span style={{color:'#ef4444'}}>✗ {con}</span>
                </div>
              </div>))}
            </div>
          </div>
        )}

      {tab==='picking'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="Sistemas de Preparación de Pedidos (Picking)"/>
            <p style={{fontSize:'.8rem',color:'#475569',marginBottom:'.75rem'}}>
              El picking representa el 55% del tiempo total de procesamiento de un pedido y es donde se concentra la mayor parte de los errores. 
              Elegir el método adecuado depende del volumen de pedidos, tipo de productos y nivel de automatización.
            </p>
          </div>

          <div className="card">
            <T t="Métodos de Picking"/>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'.75rem'}}>
              {[
                ['Picking por Orden (Piece Picking)','Se prepara un pedido completo en un solo recorrido. Simple pero costoso para muchos pedidos.'],
                ['Picking por Batch','Se preparan múltiples pedidos simultáneamente en un solo recorrido. Mayor eficiencia.'],
                ['Picking por Zona','Cada operario es responsable de una zona específica. Reduce movimiento pero requiere consolidación.'],
                ['Picking por Paso (Zone Picking)','El pedido se divide en zonas; cada operario pickingea su zona y pasa al siguiente.'],
                ['Picking por Grupo (Batch Zoning)','Combina zonas con batch picking para máximo rendimiento.'],
                ['Picking por Movimiento','El producto se mueve al operario (sistemas automatizados, carruseles).'],
              ].map(([t,d])=>(
                <div key={t} style={{padding:'.75rem',background:'#f8fafc',borderRadius:8}}>
                  <span className="badge badge-blue" style={{marginBottom:'.25rem',display:'inline-block'}}>{t}</span>
                  <p style={{fontSize:'.7rem',color:'#64748b'}}>{d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <T t="Herramientas de Picking"/>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'.5rem'}}>
              {[
                ['📖 Lista de Picking','Documento con ubicaciones y cantidades'],
                ['🔢 picking por voz','Sistema Voice Picking (hands-free)'],
                ['📱 Terminal RF','Escaneo en tiempo real'],
                ['💻 Sistema WMS','Gestión integrada de pedidos'],
                ['🚚 Carro de Picking','Capacidad múltiple de pedidos'],
                ['📊 Zona de Picking','Área designada para preparación'],
              ].map(([e,t])=>(
                <div key={t} style={{padding:'.5rem',background:'#f8fafc',borderRadius:6,textAlign:'center'}}>
                  <div style={{fontSize:'1rem',marginBottom:'.25rem'}}>{e}</div>
                  <div style={{fontSize:'.65rem',color:'#475569'}}>{t}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <T t="Indicadores de Picking"/>
            <table className="tbl">
              <thead><tr><th>Indicador</th><th>Fórmula</th><th>Meta</th></tr></thead>
              <tbody>
                {[
                  ['Líneas por hora','Líneas pickeadas / Horas hombre','> 80 líneas/hora'],
                  ['Órdenes por hora','Órdenes completadas / Hora','> 15 órdenes/hora'],
                  ['Tiempo medio por línea','Tiempo total / Líneas pickeadas','< 45 segundos/línea'],
                  ['Tasa de error','Líneas erroneas / Total líneas','< 0.5%'],
                  ['Distancia recorrida','Metros por pedido','< 500 m/pedido'],
                ].map(r=>(<tr key={r[0]}><td style={{fontWeight:500}}>{r[0]}</td><td style={{fontFamily:'JetBrains Mono',fontSize:'.65rem'}}>{r[1]}</td><td>{r[2]}</td></tr>))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab==='ergonomia'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="Ergonomía en el Almacén — Zona de Confort"/>
            <Ca color="green" title="Zona óptima de manipulación manual">
              La zona de confort ergonómica está entre 75 cm y 130 cm de altura desde el suelo, y a no más de 35 cm del cuerpo horizontalmente. Los SKUs A del slotting deben ubicarse en esta zona para minimizar esfuerzo y lesiones.
            </Ca>
            <table className="tbl">
              <thead><tr><th>Zona de Altura</th><th>Peso máximo recomendado</th><th>Riesgo</th></tr></thead>
              <tbody>
                {[
                  ['Por encima de hombros ({'>'}160 cm)','5 kg','Alto — esfuerzo cervical'],
                  ['A la altura del hombro (120–160 cm)','10 kg','Medio'],
                  ['Zona de confort (75–120 cm)','25 kg','Mínimo — posición neutra'],
                  ['A la altura de la rodilla (40–75 cm)','15 kg','Medio — flexión de columna'],
                  ['A nivel del suelo ({'<'}40 cm)','10 kg','Alto — esfuerzo lumbar'],
                ].map(r=>(<tr key={r[0]}><td style={{color:'#334155'}}>{r[0]}</td><td style={{color:'#64748b',fontWeight:600}}>{r[1]}</td><td style={{color:r[2].startsWith('Alto')?'#ef4444':r[2].startsWith('Medio')?'#f59e0b':'#10b981'}}>{r[2]}</td></tr>))}
              </tbody>
            </table>
          </div>
          <div className="card">
            <T t="Normativa de Seguridad Industrial en Almacenes"/>
            <div style={{display:'flex',flexDirection:'column',gap:'.5rem',fontSize:'.78rem'}}>
              {[
                ['NTC 3680 (Colombia)','Señalización de almacenes: colores, símbolos y ubicación de señales de seguridad.'],
                ['ANSI/ASME B56.1','Seguridad de montacargas. Velocidad máxima 8 km/h interior, 6 km/h zona peatonal.'],
                ['OSHA 1910.178','Operación de montacargas: certificación de operadores, inspección diaria, mantenimiento.'],
                ['ISO 45001:2018','Sistema de gestión de seguridad y salud en el trabajo. Reemplaza OHSAS 18001.'],
                ['Res. 2400/1979 (Colombia)','Higiene y seguridad industrial: iluminación mínima (200 lux en almacenes), pasillos mínimos.'],
              ].map(([n,d])=>(<div key={n} style={{display:'flex',gap:'.75rem'}}><span style={{color:'#334155',fontWeight:600,flexShrink:0,minWidth:160}}>{n}</span><span style={{color:'#64748b'}}>{d}</span></div>))}
            </div>
          </div>
        </div>
      )}

      {tab==='kpis'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="KPIs de Manipulación y Productividad"/>
            <table className="tbl">
              <thead><tr><th>Indicador</th><th>Fórmula</th><th>Meta</th></tr></thead>
              <tbody>
                {[
                  ['Líneas por hora-hombre picking','Líneas procesadas / Horas hombre operativas','30–60 líneas/hh (manual)'],
                  ['Tasa de daño en manipulación','(Ítems dañados / Total manipulados) × 100','{'<'} 0.1%'],
                  ['Tiempo promedio de recepción','Tiempo (recepción → ubicado en WMS) / N° recepciones','{'<'} 2 horas'],
                  ['Costo por línea de picking','Costo total picking / Líneas totales','Reducción continua'],
                  ['Utilización de equipos','Horas productivas / Horas disponibles × 100','75–85%'],
                  ['Accidentes por millón de horas','(N° accidentes / Horas totales) × 10⁶','0 (objetivo)'],
                ].map(r=>(<tr key={r[0]}><td style={{color:'#334155',fontWeight:600}}>{r[0]}</td><td style={{fontFamily:'JetBrains Mono',fontSize:'.68rem',color:'#475569'}}>{r[1]}</td><td style={{color:'#64748b'}}>{r[2]}</td></tr>))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
