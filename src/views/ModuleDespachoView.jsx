import React, { useState } from 'react';

const T = ({t,c='#334155'})=>(<div className="sec-title" style={{color:c}}>{t}</div>);
const Ca = ({color='green',title,children})=>(<div className={`callout ${color}`} style={{marginBottom:'.75rem'}}><div className="callout-title">{title}</div><p>{children}</p></div>);

const TABS = [
  ['intro','📚 Introducción'],
  ['alistamiento','📋 Alistar Pedidos'],
  ['entrega','🚚 Entrega de Pedidos'],
  ['documentos','📄 Documentación'],
  ['equipos','🏗️ Equipos'],
  ['zonas','🏭 Zonas de Muelle'],
];

export default function ModuleDespachoView(){
  const [tab,setTab]=useState('intro');
  return(
    <div className="animate-in" style={{display:'flex',flexDirection:'column',gap:'1.25rem'}}>
      <div className="card gradient-header" style={{padding:'2rem'}}>
        <span style={{fontSize:'.7rem',fontFamily:'JetBrains Mono',color:'#64748b'}}>MÓDULO 8 · Despacho</span>
        <h1 style={{fontSize:'2rem',fontWeight:700,color:'#1e293b',marginTop:'.25rem'}}>Despacho de Mercancías</h1>
        <p style={{color:'#64748b',marginTop:'.5rem',fontSize:'.85rem'}}>Técnico Laboral en Asistente Logístico · UPBtec</p>
      </div>

      <div className="tab-bar">
        {TABS.map(([id,lbl])=>(<button key={id} className={`tab-btn ${tab===id?'active':''}`} onClick={()=>setTab(id)}>{lbl}</button>))}
      </div>

      {tab==='intro'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="El Despacho en la Cadena Logística"/>
            <p style={{fontSize:'.82rem',color:'#475569',lineHeight:1.7,marginBottom:'.75rem'}}>
              El despacho de mercancías es el proceso mediante el cual se liberan los productos del almacén hacia los clientes o puntos de venta. 
              Es el eslabón final de la operación interna del almacén y el inicio de la distribución física. Una gestión eficiente del despacho 
              garantiza la satisfacción del cliente y la optimización de costos logísticos.
            </p>
            <Ca color="blue" title="Importancia del Despacho">
              <ul style={{paddingLeft:'1rem',marginTop:'.25rem'}}>
                <li>Es el punto de contacto final con el cliente interno/externo</li>
                <li>Determina los tiempos de entrega y nivel de servicio</li>
                <li>Representa el 40-60% del costo operativo de un almacén</li>
                <li>Impacta directamente en la rotación de inventario</li>
              </ul>
            </Ca>
          </div>

          <div className="card">
            <T t="Competencias del Módulo"/>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.75rem'}}>
              {[
                ['Alistar Pedidos','Selección de ruta, equipos, recogida, acondicionamiento y registro'],
                ['Entregar Pedidos','Órdenes de entrega, consolidación y ubicación en zonas de cargue'],
              ].map(([c,d])=>(
                <div key={c} style={{padding:'.75rem',background:'#f8fafc',borderRadius:8}}>
                  <div style={{fontWeight:600,fontSize:'.85rem',color:'#334155',marginBottom:'.25rem'}}>{c}</div>
                  <p style={{fontSize:'.7rem',color:'#64748b'}}>{d}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1rem'}}>
            {[
              ['📋','Pedidos/día','>500 pedidos'],
              ['⏱️','Tiempo picking','<15 min/pedido'],
              ['✅','Precisión','>99.5%'],
            ].map(([e,t,d])=>(
              <div key={t} className="card" style={{textAlign:'center'}}>
                <div style={{fontSize:'1.5rem',marginBottom:'.5rem',color:'#475569'}}>{e}</div>
                <div style={{fontWeight:600,fontSize:'.85rem',color:'#1e293b'}}>{t}</div>
                <p style={{fontSize:'.7rem',color:'#64748b',marginTop:'.25rem'}}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==='alistamiento'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="Proceso de Alistamiento de Pedidos"/>
            <p style={{fontSize:'.82rem',color:'#475569',lineHeight:1.7,marginBottom:'.75rem'}}>
              El alistamiento (picking) es el proceso de recolección de productos del inventario para satisfacer una orden de pedido. 
              Representa aproximadamente el 55% del tiempo total de procesamiento de un pedido y es donde se concentra la mayor parte de los errores.
            </p>
          </div>

          <div className="card">
            <T t="Criterios de Alistamiento"/>
            <div style={{display:'flex',flexDirection:'column',gap:'.5rem'}}>
              {[
                ['1.1','Selección de Ruta','La selección de ruta del pedido está acorde con los procedimientos y solicitudes'],
                ['1.2','Elección de Equipos','La elección de los equipos está acorde con la ruta de alistamiento y especificaciones de la mercancía'],
                ['1.3','Recogida de Productos','La recogida de los productos cumple con los métodos de preparación de pedidos y solicitud'],
                ['1.4','Acondicionamiento','El acondicionamiento del pedido está acorde con las solicitudes y métodos'],
                ['1.5','Registro del Pedido','El registro de los pedidos cumple los procedimientos del sistema'],
              ].map(([n,t,d])=>(
                <div key={n} style={{display:'flex',gap:'.75rem',padding:'.6rem',background:'#f8fafc',borderRadius:8,alignItems:'center'}}>
                  <span style={{fontSize:'.7rem',fontWeight:700,color:'#64748b',minWidth:30}}>{n}</span>
                  <span style={{fontWeight:600,fontSize:'.8rem',color:'#334155',flex:1}}>{t}</span>
                  <span style={{fontSize:'.7rem',color:'#64748b',flex:2}}>{d}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <T t="Métodos de Preparación de Pedidos"/>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'.75rem'}}>
              {[
                ['Picking por Batch','Se preparan múltiples pedidos simultáneamente en un solo recorrido'],
                ['Picking por Zona','Cada operario es responsable de una zona específica del almacén'],
                ['Picking por Orden','Se prepara un pedido completo en un solo recorrido'],
                ['Picking por Movimiento','El producto se mueve al operario (sistemas automatizados)'],
              ].map(([t,d])=>(
                <div key={t} style={{padding:'.75rem',background:'#f8fafc',borderRadius:8}}>
                  <span className="badge badge-blue" style={{marginBottom:'.25rem',display:'inline-block'}}>{t}</span>
                  <p style={{fontSize:'.7rem',color:'#64748b'}}>{d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <T t="Errores Comunes en el Picking"/>
            <table className="tbl">
              <thead><tr><th>Error</th><th>Causa</th><th>Impacto</th></tr></thead>
              <tbody>
                {[
                  ['Producto errado','Selección visual incorrecta','Devolución, costo adicional'],
                  ['Cantidad incorrecta','Conteo erróneo','Faltante/sobrante, insatisfacción'],
                  ['Ubicación incorrecta','No verificar ubicación','Retraso en búsqueda'],
                  ['Mercancía dañada','Manipulación inadecuada','Pérdida de producto'],
                ].map(r=>(<tr key={r[0]}><td style={{fontWeight:500}}>{r[0]}</td><td>{r[1]}</td><td style={{color:'#64748b'}}>{r[2]}</td></tr>))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab==='entrega'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="Proceso de Entrega de Pedidos"/>
            <p style={{fontSize:'.82rem',color:'#475569',lineHeight:1.7,marginBottom:'.75rem'}}>
              La entrega de pedidos comprende todas las actividades desde que el pedido está alistado hasta que se entrega al transporte 
              correspondiente. Incluye la elaboración de documentos, consolidación y ubicación en zonas de cargue.
            </p>
          </div>

          <div className="card">
            <T t="Criterios de Entrega"/>
            <div style={{display:'flex',flexDirection:'column',gap:'.5rem'}}>
              {[
                ['2.1','Orden de Entrega','La elaboración de la orden de entrega está acorde con los procedimientos de despacho'],
                ['2.2','Consolidación','La consolidación de pedidos está acorde con la lista de despacho'],
                ['2.3','Ubicación','La ubicación del pedido cumple con los procedimientos de despacho y zonas de cargue'],
              ].map(([n,t,d])=>(
                <div key={n} style={{display:'flex',gap:'.75rem',padding:'.6rem',background:'#f8fafc',borderRadius:8,alignItems:'center'}}>
                  <span style={{fontSize:'.7rem',fontWeight:700,color:'#64748b',minWidth:30}}>{n}</span>
                  <span style={{fontWeight:600,fontSize:'.8rem',color:'#334155',flex:1}}>{t}</span>
                  <span style={{fontSize:'.7rem',color:'#64748b',flex:2}}>{d}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <T t="Flujo de Entrega"/>
            <div style={{display:'flex',gap:'.5rem',alignItems:'center',overflowX:'auto',padding:'.5rem 0'}}>
              {[
                ['📋','Pedido\nalistado'],
                ['📄','Generar\ndocumentos'],
                ['📦','Consolidar\npor destino'],
                ['🚛','Asignar a\ntransporte'],
                ['🏭','Ubic en\nmuelle'],
                ['🚚','Cargue y\ndespacho'],
              ].map(([e,l],i)=>(
                <div key={i} style={{display:'flex',alignItems:'center'}}>
                  <div style={{padding:'.5rem',background:'#f8fafc',border:'1px solid #e2e8f0',borderRadius:8,textAlign:'center',minWidth:70}}>
                    <div style={{fontSize:'1.25rem'}}>{e}</div>
                    <div style={{fontSize:'.55rem',color:'#64748b',whiteSpace:'pre-line'}}>{l}</div>
                  </div>
                  {i < 5 && <span style={{fontSize:'1rem',color:'#94a3b8',margin:'0 .25rem'}}>→</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <T t="Indicadores de Despacho"/>
            <table className="tbl">
              <thead><tr><th>Indicador</th><th>Fórmula</th><th>Meta</th></tr></thead>
              <tbody>
                {[
                  ['OTIF','(Entregas a tiempo y completas / Total)×100','≥ 95%'],
                  ['Tiempo de ciclo','Hora despacho - Hora pedido','< 4 horas'],
                  ['Pedidos por hora','Pedidos despachados / Hora hombre','> 20'],
                  ['Tasa de error','Pedidos con error / Total despachados','< 0.5%'],
                ].map(r=>(<tr key={r[0]}><td style={{fontWeight:500}}>{r[0]}</td><td style={{fontFamily:'JetBrains Mono',fontSize:'.65rem'}}>{r[1]}</td><td>{r[2]}</td></tr>))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab==='documentos'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="Documentación de Despacho"/>
            <p style={{fontSize:'.82rem',color:'#475569',lineHeight:1.7,marginBottom:'.75rem'}}>
              La documentación es esencial para la trazabilidad y legalización del despacho. Cada documento cumple una función específica 
              en el proceso y debe ser elaborado con precisión.
            </p>
          </div>

          <div className="card">
            <T t="Documentos Principales"/>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'.75rem'}}>
              {[
                ['📋 Orden de Pedido','Documento que inicia el proceso. Contiene: código cliente, productos, cantidades, dirección de entrega'],
                ['📄 Lista de Picking','Guía para recolección. Indica ubicaciones, cantidades a recoger, secuencia de productos'],
                ['📦 Lista de Despacho','Relación de pedidos consolidados por destino o transporte'],
                ['🚚 Guía de Transporte','Documento de transporte. Incluye datos del vehículo, conductor, ruta'],
                ['📊 Remisión','Aval de entrega. Detalla productos, cantidades, condiciones de recepción'],
                ['📋 Factura','Documento comercial. Valorización de la mercancía despachada'],
              ].map(([t,d])=>(
                <div key={t} style={{padding:'.75rem',background:'#f8fafc',borderRadius:8}}>
                  <span className="badge badge-blue" style={{marginBottom:'.25rem',display:'inline-block'}}>{t}</span>
                  <p style={{fontSize:'.7rem',color:'#64748b'}}>{d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <T t="Elementos de un Picking Eficiente"/>
            <Ca color="yellow" title="Lista de Picking Ideal">
              <ul style={{paddingLeft:'1rem'}}>
                <li><strong>Código SKU:</strong> Identificador único del producto</li>
                <li><strong>Ubicación:</strong> Pasillo-Estante-Nivel (ej: A-03-02)</li>
                <li><strong>Descripción:</strong> Nombre completo del producto</li>
                <li><strong>Cantidad requerida:</strong> Unidades a picking</li>
                <li><strong>Cantidad picked:</strong> Espacio para marcar lo recolectado</li>
                <li><strong>Observaciones:</strong> Notas especiales del producto</li>
              </ul>
            </Ca>
          </div>
        </div>
      )}

      {tab==='equipos'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="Equipos para Manejo en Despacho"/>
            <p style={{fontSize:'.82rem',color:'#475569',lineHeight:1.7,marginBottom:'.75rem'}}>
              La selección del equipo adecuado depende del tipo de mercancía, volumen y configuración del almacén. 
              Una elección incorrecta afecta la productividad y seguridad.
            </p>
          </div>

          <div className="card">
            <T t="Equipos de Picking"/>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'.75rem'}}>
              {[
                ['Carretilla Manual','Cargas hasta 500kg','Pasillos angostos'],
                ['Montacargas','Cargas hasta 3,000kg','Carga pesada'],
                ['Transpaleta','Cargas hasta 2,500kg','Transporte horizontal'],
                ['Carro de Picking','Cargas hasta 200kg','Múltiples pedidos'],
                ['Reacher','Cargas ligeras','Cajas pequeñas'],
                ['Grúa horquilla','Cargas verticales','Estanterías altas'],
              ].map(([e,c,u])=>(
                <div key={e} style={{padding:'.75rem',background:'#f8fafc',borderRadius:8}}>
                  <div style={{fontWeight:600,fontSize:'.75rem',color:'#334155'}}>{e}</div>
                  <p style={{fontSize:'.65rem',color:'#64748b',marginTop:'.25rem'}}>Cap: {c}</p>
                  <p style={{fontSize:'.65rem',color:'#94a3b8'}}>Uso: {u}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <T t="Selección de Equipo según Mercancía"/>
            <table className="tbl">
              <thead><tr><th>Tipo de Mercancía</th><th>Equipo Recomendado</th><th>Consideración</th></tr></thead>
              <tbody>
                {[
                  ['Pesada (>100kg)','Montacargas','Capacidad vertical y horizontal'],
                  ['Voluminosa','Montacargas/Reacher','Espacio de maniobra'],
                  ['Frágil','Carretilla manual','Manipulación cuidadosa'],
                  ['Alta rotación','Carro de picking','Velocidad de respuesta'],
                  ['Pedidos pequeños','Transpaleta','Flexibilidad'],
                ].map(r=>(<tr key={r[0]}><td style={{fontWeight:500}}>{r[0]}</td><td>{r[1]}</td><td style={{color:'#64748b'}}>{r[2]}</td></tr>))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab==='zonas'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="Zonas de Almacén para Despacho"/>
            <p style={{fontSize:'.82rem',color:'#475569',lineHeight:1.7,marginBottom:'.75rem'}}>
              El área de despacho incluye los muelles de carga y las zonas de espera para vehículos. 
              Una correcta zonificación optimiza el flujo de mercancía y reduce tiempos de espera.
            </p>
          </div>

          <div className="card">
            <T t="Zonas del Área de Despacho"/>
            <div style={{display:'flex',flexDirection:'column',gap:'.5rem'}}>
              {[
                ['Zona de Consolidación','Área donde se agrupan los pedidos por destino antes del despacho'],
                ['Muelle de Carga','Plataforma elevada para carga/descarga de vehículos'],
                ['Zona de Espera','Área para vehículos en cola antes del muelle'],
                ['Zona de Verificación','Área paraontrol de cantidades antes del cargue'],
                ['Oficina de Despacho',' espacio para documentación y coordinación'],
              ].map(([z,d])=>(
                <div key={z} style={{display:'flex',gap:'.75rem',padding:'.6rem',background:'#f8fafc',borderRadius:8,alignItems:'center'}}>
                  <span style={{fontWeight:600,fontSize:'.8rem',color:'#334155',flex:1}}>{z}</span>
                  <span style={{fontSize:'.7rem',color:'#64748b',flex:2}}>{d}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <T t="Configuración de Muelles"/>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'.75rem'}}>
              {[
                ['Muelle de carga nivelado','Plataforma a altura de remolque (1.2-1.5m)'],
                ['Muelle retráctil','Plataforma extensible para diferentes alturas'],
                ['Dock nivelador','Sistema hidráulico para nivelación automática'],
                ['Muelle de carga很低','Para vehículos ligeros y vans'],
              ].map(([t,d])=>(
                <div key={t} style={{padding:'.75rem',background:'#f8fafc',borderRadius:8}}>
                  <span className="badge badge-green" style={{marginBottom:'.25rem',display:'inline-block'}}>{t}</span>
                  <p style={{fontSize:'.7rem',color:'#64748b'}}>{d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <T t="Best Practices en Zonas de Despacho"/>
            <Ca color="green" title="Recomendaciones">
              <ul style={{paddingLeft:'1rem'}}>
                <li>Mantener el muelle libre de obstáculos</li>
                <li>Señalización clara de zonas de espera</li>
                <li>Sistema FIFO para vehículos por llegada</li>
                <li>Verificar documentación antes del cargue</li>
                <li>Control de tiempos de muelle (target: {'<'}15 min)</li>
              </ul>
            </Ca>
          </div>
        </div>
      )}
    </div>
  );
}
