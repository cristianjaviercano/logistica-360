import React,{useState} from 'react';
const T=({t})=>(<div className="sec-title">{t}</div>);
const Ca=({color='green',title,children})=>(<div className={`callout ${color}`} style={{marginBottom:'.75rem'}}><div className="callout-title">{title}</div><p>{children}</p></div>);
const TABS=[['componentes','📊 Componentes de Costo (H&L)'],['basico','📦 Revisión Continua (EOQ)'],['faltantes','⚠️ Con Faltantes'],['estocastica','🎲 Demanda Aleatoria'],['ejemplos','💡 Ejemplos Resueltos'],['ejercicios','✏️ Ejercicios'],['python','🐍 Solvers Python']];

export default function Module5View(){
  const [tab,setTab]=useState('componentes');
  return(
    <div className="animate-in" style={{display:'flex',flexDirection:'column',gap:'1.25rem'}}>
      <div className="card gradient-header" style={{padding:'2rem'}}>
        <span style={{fontSize:'.7rem',fontFamily:'JetBrains Mono',color:'#10b981'}}>MÓDULO 5 · Optimización I.O.</span>
        <h1 style={{fontSize:'2rem',fontWeight:900,color:'#fff',marginTop:'.25rem'}}>Teoría de Inventarios Científica</h1>
        <p style={{color:'#94a3b8',marginTop:'.5rem',fontSize:'.85rem'}}>Basado en <i>Introducción a la Investigación de Operaciones (Hillier & Lieberman - Capítulo 18)</i>.</p>
      </div>
      <div className="tab-bar" style={{overflowX:'auto',whiteSpace:'nowrap'}}>
        {TABS.map(([id,lbl])=>(<button key={id} className={`tab-btn ${tab===id?'active':''}`} onClick={()=>setTab(id)}>{lbl}</button>))}
      </div>

      {tab==='componentes'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="18.2 Componentes de los Modelos de Inventarios"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7,marginBottom:'.75rem'}}>
              La investigación de operaciones clasifica las componentes elementales de un modelo físico en dos categorías: modelos <b>determinísticos</b> y <b>estocásticos</b>. Todos ellos están condicionados por los siguientes seis factores fundamentales descritos por Hillier & Lieberman.
            </p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.75rem'}}>
              <div style={{padding:'1rem',background:'#0f172a',border:'1px solid #1e293b',borderRadius:'8px'}}>
                <span className="badge badge-green" style={{marginBottom:'.5rem',display:'inline-block'}}>1. Costos de Ordenar c(z)</span>
                <p style={{fontSize:'.75rem',color:'#cbd5e1',lineHeight:1.6}}>El costo $c(z)$ de adquirir la cantidad $z$. Está compuesto por un término proporcional a la cantidad y una constante o costo fijo de preparación $K$.<br/><br/><code style={{color:'#10b981'}}>{'c(z) = K + cz  (si z > 0)'}<br/>{'c(z) = 0       (si z = 0)'}</code></p>
              </div>
              <div style={{padding:'1rem',background:'#0f172a',border:'1px solid #1e293b',borderRadius:'8px'}}>
                <span className="badge badge-blue" style={{marginBottom:'.5rem',display:'inline-block'}}>2. Costos de Mantener (h)</span>
                <p style={{fontSize:'.75rem',color:'#cbd5e1',lineHeight:1.6}}>Representan el **costo del capital invertido** (costo de oportunidad), espacio, seguros e impuestos. Es una función continua que multiplica la cantidad promedio alojada en el vector temporal durante el ciclo analizado.</p>
              </div>
              <div style={{padding:'1rem',background:'#0f172a',border:'1px solid #1e293b',borderRadius:'8px'}}>
                <span className="badge badge-yellow" style={{marginBottom:'.5rem',display:'inline-block'}}>3. Penalización por Faltantes (p)</span>
                <p style={{fontSize:'.75rem',color:'#cbd5e1',lineHeight:1.6}}>Ocurre cuando la demanda excede el inventario. Se divide en dos lógicas:<br/><b>Con faltantes (Backordering):</b> La orden se acumula con retraso de ingresos.<br/><b>Sin faltantes:</b> Pérdida total de la venta enviando señal prioritaria a alto costo.</p>
              </div>
              <div style={{padding:'1rem',background:'#0f172a',border:'1px solid #1e293b',borderRadius:'8px'}}>
                <span className="badge badge-yellow" style={{marginBottom:'.5rem',display:'inline-block'}}>4 y 5. Valores de Rescate (v) e Ingreso</span>
                <p style={{fontSize:'.75rem',color:'#cbd5e1',lineHeight:1.6}}>El <i>valor de salvamento</i> recupera capital en estadios terminales de venta. El ingreso se elude usualmente, dado que es exógeno a las estrategias bajo "mercados inelásticos perfectos".</p>
              </div>
              <div style={{gridColumn:'1 / span 2',padding:'1rem',background:'#022c22',border:'1px solid #10b981',borderRadius:'8px'}}>
                <span className="badge badge-green" style={{marginBottom:'.5rem',display:'inline-block'}}>6. Tasa de Descuento (α)</span>
                <p style={{fontSize:'.75rem',color:'#6ee7b7',lineHeight:1.6}}>En horizontes de planeación muy extendidos temporalmente, el modelo debe proyectar todos sus costos futuros conociendo la equivalencia temporal del valor del dinero. Se descuentan las utilidades multiplicando por un factor de descuento $\alpha$ correspondiente al Valor Presente Semestral/Anual, usualmente $\alpha = \frac{1}{1 + r}$ en lugar de emplear montos absolutos estáticos.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab==='basico'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="18.3 Modelos Determinísticos de Revisión Continua"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7,marginBottom:'.75rem'}}>
              La situación estándar modelada. La demanda se retira del inventario a una <b>tasa constante conocida $d$</b> (unidades/unidad de tiempo). La reposición es de cantidad $Q$.
            </p>
            <Ca color="blue" title="Formalización de Supuestos (Sub-Rutina Básica EOQ)">
              <ol style={{paddingLeft:'1rem',marginTop:'.25rem'}}>
                <li>Tasa de demanda constante conocida $d$.</li>
                <li>Ciclo de reposición exacto que eleva el inventario de $0$ a $Q$ sin Lead Time (entendido analíticamente como $Q$ que agota el vector de espera).</li>
                <li>No existen faltantes parametrizados (p=0).</li>
              </ol>
            </Ca>
            <div className="formula-box">
              {'Derivación del Costo T Esperado por Unidad de Tiempo:\n\n1. Costo por Ciclo = K + cQ + h(Q/2) * (Q/d)\n2. Longitud del Ciclo = Q/d\n3. Costo Total por Unidad de Tiempo T = (Costo por Ciclo) / (Longitud del Ciclo)\n\nT(Q) = [ (d/Q) * K ] + [ d*c ] + [ (Q/2) * h ]\n\nMinimización mediante Primera Derivada:\n∂T/∂Q = - (d*K / Q²) + 0 + (h / 2) = 0\n\nd*K / Q² = h / 2\nQ² = 2*d*K / h\n\nQ* = √( 2*d*K / h )'}
            </div>
          </div>
          <div className="card">
            <T t="Lote Económico con Faltantes Permitidos"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7,marginBottom:'.75rem'}}>
              Se retira el supuesto 3. Se asume que la demanda puede quedar latente asumiendo el costo de penalización $p$. Existe un umbral del déficit de inventario que definimos como $S$.
            </p>
            <div style={{fontSize:'1rem',fontFamily:'JetBrains Mono',textAlign:'center',padding:'1rem',color:'#fca5a5',background:'#450a0a',borderRadius:'8px',marginBottom:'1rem'}}>
              Q* = √( 2*d*K / h ) * √( (h+p) / p )
            </div>
            <p style={{fontSize:'.75rem',color:'#cbd5e1'}}>Este relajamiento demuestra analíticamente que, contrario a la lógica coloquial, en escenarios de demanda rígida donde el costo de penalización $p$ no cancela negocios, <b>permitir ligeros faltantes</b> economiza el gasto frente a retener excesos puros (h).</p>
          </div>
        </div>
      )}

      {tab==='faltantes'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="18.4 Modelo EOQ con Faltantes Permitidos"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7,marginBottom:'.75rem'}}>
              En la práctica, frecuentemente es economically viable permitir faltantes temporales. 
              Cuando la demanda puede acumularse (backordering), se incurre en un costo de penalización por cada unidad faltante por unidad de tiempo.
            </p>
            <div className="formula-box">
              {'Modelo con Faltantes Permitidos:\n\n• Q = Cantidad ordenada\n• S = Máximo faltante permitido\n• Q-S = Inventario máximo\n\nCosto Total por Unidad de Tiempo:\nT(Q,S) = (d/Q)·K + d·c + (h/2d)·(Q-S)² + (p/2d)·S²\n\nDerivando y igualando a cero:\nQ* = √(2dK/h) · √((h+p)/p)\nS* = Q* · (h/(h+p))'}
            </div>
          </div>
        </div>
      )}

      {tab==='ejemplos'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="Ejemplo 1: EOQ Básico (Hillier & Lieberman)"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7,marginBottom:'.75rem'}}>
              <b>Datos del problema:</b><br/>
              • Demanda anual: d = 8,000 unidades/año<br/>
              • Costo de ordenar: K = $12,000 por orden<br/>
              • Costo de mantener: h = $0.30 por unidad/año
            </p>
            <div style={{fontSize:'1.1rem',fontFamily:'JetBrains Mono',textAlign:'center',padding:'1rem',color:'#10b981',background:'#022c22',borderRadius:'8px',marginBottom:'1rem'}}>
              Q* = √(2 × 8,000 × 12,000 / 0.30) = √(640,000,000) = 25,298 unidades
            </div>
            <p style={{fontSize:'.75rem',color:'#94a3b8'}}>Costo total mínimo: T = √(2 × d × K × h) = √(2 × 8,000 × 12,000 × 0.30) = $7,589.57/año</p>
          </div>
          <div className="card">
            <T t="Ejemplo 2: Modelo con Tiempo de Entrega"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7,marginBottom:'.75rem'}}>
              <b>Datos:</b> d = 8,000/año, K = $12,000, h = $0.30/año, tiempo de entrega L = 3 días<br/>
              <b>Ciclo óptimo:</b> T* = Q*/d = 25,298/8,000 = 3.16 años (≈ 1,154 días)<br/>
              <b>Punto de reorden:</b> R = d × L = (8,000/365) × 3 = 65.75 ≈ 66 unidades
            </p>
            <div style={{fontSize:'1rem',fontFamily:'JetBrains Mono',textAlign:'center',padding:'1rem',color:'#fca5a5',background:'#450a0a',borderRadius:'8px'}}>
              Cuando el inventario baje a 66 unidades, colocar orden de 25,298 unidades
            </div>
          </div>
          <div className="card">
            <T t="Ejemplo 3: Con Faltantes Permitidos"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7,marginBottom:'.75rem'}}>
              <b>Datos:</b> d = 1,200/año, K = $50, h = $1.20/unidad-año, p = $3/unidad-año
            </p>
            <div style={{fontSize:'1rem',fontFamily:'JetBrains Mono',textAlign:'center',padding:'1rem',color:'#60a5fa',background:'#1e3a5f',borderRadius:'8px',marginBottom:'1rem'}}>
              Q* = √(2×1200×50/1.2) × √((1.2+3)/3) = √(100,000) × 1.183 = 316.23 × 1.183 = 374 unidades<br/>
              S* = 374 × (1.2/(1.2+3)) = 374 × 0.286 = 107 unidades (faltante máximo)
            </div>
          </div>
        </div>
      )}

      {tab==='ejercicios'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="Ejercicio 1: Cálculo de EOQ"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7,marginBottom:'.75rem'}}>
              Una empresa fabricante de muebles consume 5,000 ruedas de caucho mensualmente. 
              El costo de ordenar una corrida de producción es de $800 y el costo de mantener una 
              rueda en inventario es de $2 por unidad/mes.<br/><br/>
              <b>Determine:</b><br/>
              a) El tamaño óptimo del lote (Q*)<br/>
              b) El número de pedidos por año<br/>
              c) El costo total anual
            </p>
            <details style={{background:'#0f172a',padding:'1rem',borderRadius:'8px'}}>
              <summary style={{cursor:'pointer',color:'#10b981',fontWeight:'bold'}}>Ver Solución</summary>
              <div style={{marginTop:'1rem',fontSize:'.85rem',color:'#cbd5e1'}}>
                <b>Solución:</b><br/>
                d = 5,000/mes × 12 = 60,000 unidades/año<br/>
                K = $800/orden<br/>
                h = $2/unidad-mes × 12 = $24/unidad-año<br/><br/>
                Q* = √(2×60,000×800/24) = √(4,000,000) = 2,000 unidades<br/>
                Número de pedidos = 60,000/2,000 = 30 pedidos/año<br/>
                Costo total = (60,000/2,000)×800 + (2,000/2)×24 = $24,000 + $24,000 = $48,000/año
              </div>
            </details>
          </div>
          <div className="card">
            <T t="Ejercicio 2: Punto de Reorden"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7,marginBottom:'.75rem'}}>
              Utilizando los datos del ejercicio anterior, si el tiempo de entrega es de 2 semanas:<br/><br/>
              <b>Determine el punto de reorden.</b>
            </p>
            <details style={{background:'#0f172a',padding:'1rem',borderRadius:'8px'}}>
              <summary style={{cursor:'pointer',color:'#10b981',fontWeight:'bold'}}>Ver Solución</summary>
              <div style={{marginTop:'1rem',fontSize:'.85rem',color:'#cbd5e1'}}>
                <b>Solución:</b><br/>
                Demanda semanal = 60,000/52 = 1,153.85 unidades/semana<br/>
                Tiempo de entrega = 2 semanas<br/>
                R = d × L = 1,153.85 × 2 = 2,307.7 ≈ 2,308 unidades
              </div>
            </details>
          </div>
          <div className="card">
            <T t="Ejercicio 3: Modelo con Faltantes"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7,marginBottom:'.75rem'}}>
              Una librería tiene una demanda anual de 3,000 ejemplares de un libro. 
              El costo de ordenar es de $100, el costo de mantener es de $6/unidad-año, 
              y el costo por faltante es de $25/unidad-año.<br/><br/>
              <b>Determine:</b><br/>
              a) Cantidad óptima a ordenar<br/>
              b) Faltante máximo permitido
            </p>
            <details style={{background:'#0f172a',padding:'1rem',borderRadius:'8px'}}>
              <summary style={{cursor:'pointer',color:'#10b981',fontWeight:'bold'}}>Ver Solución</summary>
              <div style={{marginTop:'1rem',fontSize:'.85rem',color:'#cbd5e1'}}>
                <b>Solución:</b><br/>
                d = 3,000/año, K = $100, h = $6/unidad-año, p = $25/unidad-año<br/><br/>
                Q* = √(2×3000×100/6) × √((6+25)/25)<br/>
                Q* = √(1,000,000) × √(1.24) = 1,000 × 1.1135 = 1,114 unidades<br/><br/>
                S* = 1,114 × (6/(6+25)) = 1,114 × 0.1935 = 215 unidades
              </div>
            </details>
          </div>
        </div>
      )}

      {tab==='python'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="18.6 Modelos Estocásticos de Revisión Continua (La variabilidad Aleatoria)"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7,marginBottom:'.75rem'}}>
              Ante la imprevisibilidad genuina de los mercados, la investigación de operaciones asume la demanda no como una recta polinomial (D), sino como <b>una variable aleatoria que transita una distribución de probabilidad subyacente</b>.
            </p>
            <div className="formula-box">
              {'Función de Reposición Combinada (Incertidumbre en Tiempo L y Demanda D):\n\nLa varianza temporal combinada dicta que el Inventario de Seguridad debe contrarrestar:\n1. Qué tanto oscila la demanda durante el día a dia (Desv. Típica de la Demanda σD)\n2. Qué tanto se demora el transporte intermodal (Desv. Típica del Tiempo Lead time σL)\n\nSS = z · √[ ( L̄ * σD² ) + ( D̄² * σL² ) ]'}
            </div>
            <Ca color="yellow" title="Tolerancia Bayesiana (Métrica de Nivel de Servicio)">
              Decidir el nivel $z$ significa delimitar el área bajo la curva normal de Gauss; para lograr satisfacer demanda estocástica sin backorders (R-level), si $z \to 3$ el costo por almacenaje (h) tenderá a incrementarse de manera exponencial respecto a la desviación estándar asintótica de la red.
            </Ca>
          </div>
        </div>
      )}

      {tab==='desconocida'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="18.7 Modelo Estocástico de un Solo Periodo (Vendedor de Periódicos)"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7,marginBottom:'.75rem'}}>
              Un modelo orientado ex profeso para ciclos de consumo perecederos de periodo único (Ej: Ropa cíclica o periódicos). Aquí se sustituye el costo de oportunidad de largo plano por el <b>Análisis de ganancia marginal</b>.
            </p>
            <div style={{display:'grid',gridTemplateColumns:'1.5fr 1fr',gap:'1rem'}}>
              <div style={{padding:'1rem',background:'#0f172a',border:'1px solid #1e293b',borderRadius:'8px'}}>
                <T t="Dilema de Maximización (Hillier)"/>
                <p style={{fontSize:'.75rem',color:'#cbd5e1',lineHeight:1.6}}>El problema estriba en resolver un juego de funciones de pago. El valor esperado estadístico dictamina una regla heurística basada en probabilidades críticas:<br/><br/>Siendo <b>C_{`u`}</b> el Costo Administrativo Unitarizado de No Cumplir y <b>C_{`o`}</b> el daño remanente por Excedentes de Stock.</p>
              </div>
              <div style={{padding:'1rem',background:'#022c22',border:'1px solid #10b981',borderRadius:'8px',display:'flex',flexDirection:'column',justifyContent:'center',textAlign:'center'}}>
                <span style={{fontSize:'.7rem',color:'#6ee7b7'}}>Razón de Fractila</span>
                <span style={{fontSize:'1.5rem',fontFamily:'JetBrains Mono',color:'#fff',marginTop:'.25rem'}}>P(u) = Cu / (Cu + Co)</span>
              </div>
            </div>
            <p style={{fontSize:'.75rem',color:'#94a3b8',marginTop:'1rem'}}>Para implementar la directiva analítica, la empresa proyecta el cálculo probabilístico normal de las demandas y asegura la suficiencia del pedido por encima de las distribuciones sub-$P(u)$.</p>
          </div>
        </div>
      )}

      {tab==='python'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card" style={{padding:'2rem'}}>
            <T t="Solvers de Investigación de Operaciones (Python)"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7,marginBottom:'.75rem'}}>
              Copia este script en tu entorno (ej. Jupyter, VSCode) y córrelo asegurándote de tener instalada la librería estadística (<code>pip install scipy</code>). Contiene los métodos para EOQ y el Modelo Estocástico de P(u).
            </p>
            <div style={{background:'#0f172a',padding:'1rem',borderRadius:'8px',overflowX:'auto'}}>
              <pre style={{fontFamily:'JetBrains Mono',fontSize:'.75rem',color:'#6ee7b7',margin:0}}>
{`import math
from scipy.stats import norm

class InventorySolverIO:
    @staticmethod
    def eoq_basico(demanda_anual, costo_ordenar_K, costo_mantener_h):
        \"\"\"
        Página 806 - Modelo Determinístico Básico EOQ (Hillier & Lieberman)
        Q* = sqrt(2 * d * K / h)
        \"\"\"
        Q_optimo = math.sqrt((2 * demanda_anual * costo_ordenar_K) / costo_mantener_h)
        costo_total = (demanda_anual / Q_optimo) * costo_ordenar_K + (Q_optimo / 2) * costo_mantener_h
        return round(Q_optimo, 2), round(costo_total, 2)
        
    @staticmethod
    def eoq_con_faltantes(d, K, h, p):
        \"\"\" Lote Económico con faltantes permitidos (costo de penalización p) \"\"\"
        Q_optimo = math.sqrt((2 * d * K) / h) * math.sqrt((h + p) / p)
        S_max = Q_optimo * (h / (h + p)) # Déficit máximo permitido
        return round(Q_optimo, 2), round(S_max, 2)

    @staticmethod
    def newsvendor_model(precio_venta, costo_unitario, valor_rescate, media_demanda, std_demanda):
        \"\"\"
        Modelo Estocástico de un Solo Periodo (Revisión Continua Z)
        Cu = Beneficio perdido por faltante
        Co = Costo hundido por exceso
        \"\"\"
        Cu = precio_venta - costo_unitario
        Co = costo_unitario - valor_rescate
        
        razon_fractila = Cu / (Cu + Co)
        # Buscar el Z-score en la curvatura Normal de Gauss
        z_score = norm.ppf(razon_fractila)
        
        Q_optimo = media_demanda + (z_score * std_demanda)
        return round(razon_fractila, 4), round(z_score, 2), round(Q_optimo, 0)

# --- EJECUCIÓN (PRUEBAS DE ESCRITORIO) ---
if __name__ == "__main__":
    print("--- 1. EOQ BÁSICO ---")
    Q, TC = InventorySolverIO.eoq_basico(d=8000, K=12000, h=0.30)
    print(f"Lote Óptimo a Producir: {Q} uds | Costo Anual: ${TC}")
    
    print("\\n--- 2. NEWSVENDOR (Modelo Vendedor de Periódicos) ---")
    cu_ratio, z, q_opt = InventorySolverIO.newsvendor_model(150, 80, 20, media_demanda=250, std_demanda=45)
    print(f"Razón Fractila P(u): {cu_ratio*100}% | Z-Score: {z}σ | Inv. Óptimo: {q_opt} uds")
`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
