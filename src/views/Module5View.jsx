import React,{useState} from 'react';
const T=({t})=>(<div className="sec-title">{t}</div>);
const Ca=({color='green',title,children})=>(<div className={`callout ${color}`} style={{marginBottom:'.75rem'}}><div className="callout-title">{title}</div><p>{children}</p></div>);
const Formula=({children})=><div className="formula-box" style={{whiteSpace:'pre-wrap'}}>{children}</div>;
const TABS=[
  ['fundamentos','📚 Fundamentos de Inventarios'],
  ['costos','💰 Costos de Inventario'],
  ['eoq','📦 Modelo EOQ Básico'],
  ['extensiones','🔄 Extensiones EOQ'],
  ['produccion','🏭 Lote Económico de Producción'],
  ['estocastico','🎲 Modelos Estocásticos'],
  ['service','📊 Nivel de Servicio'],
  ['ejemplos','💡 Ejemplos Resueltos'],
  ['ejercicios','✏️ Ejercicios'],
  ['python','🐍 Solvers Python']
];

export default function Module5View(){
  const [tab,setTab]=useState('fundamentos');
  return(
    <div className="animate-in" style={{display:'flex',flexDirection:'column',gap:'1.25rem'}}>
      <div className="card gradient-header" style={{padding:'2rem'}}>
        <span style={{fontSize:'.7rem',fontFamily:'JetBrains Mono',color:'#10b981'}}>MÓDULO 5 · Optimización I.O.</span>
        <h1 style={{fontSize:'2rem',fontWeight:900,color:'#fff',marginTop:'.25rem'}}>Gestión Científica de Inventarios</h1>
        <p style={{color:'#94a3b8',marginTop:'.5rem',fontSize:'.85rem'}}>
          Basado en: Hillier & Lieberman • Ballou • Chopra & Meindl
        </p>
      </div>
      <div className="tab-bar" style={{overflowX:'auto',whiteSpace:'nowrap'}}>
        {TABS.map(([id,lbl])=>(<button key={id} className={`tab-btn ${tab===id?'active':''}`} onClick={()=>setTab(id)}>{lbl}</button>))}
      </div>

      {tab==='fundamentos'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="5.1 Importancia de la Gestión de Inventarios"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7,marginBottom:'.75rem'}}>
              Los inventarios son uno de los activos más importantes de una empresa. Según Ballou (2004), 
              "el inventario representa típicamente el 25% al 50% del capital de trabajo de una empresa".
            </p>
            <Ca color="blue" title="¿Por qué mantener inventario?">
              Los inventarios existen por tres razones principales: 1) desacoplar las operaciones de proveedores y clientes, 
              2) permitir economías de escala en producción y compra, 3) proteger contra la incertidumbre en demanda y oferta.
            </Ca>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.75rem'}}>
              <div style={{padding:'1rem',background:'#0f172a',border:'1px solid #1e293b',borderRadius:'8px'}}>
                <span className="badge badge-blue" style={{marginBottom:'.5rem',display:'inline-block'}}>Demanda Independiente</span>
                <p style={{fontSize:'.75rem',color:'#cbd5e1',lineHeight:1.6}}>Artículos terminados o repuestos para clientes externos. No se puede predecir con certeza.</p>
              </div>
              <div style={{padding:'1rem',background:'#0f172a',border:'1px solid #1e293b',borderRadius:'8px'}}>
                <span className="badge badge-green" style={{marginBottom:'.5rem',display:'inline-block'}}>Demanda Dependiente</span>
                <p style={{fontSize:'.75rem',color:'#cbd5e1',lineHeight:1.6}}>Componentes o materias primas que dependen de la producción de otros artículos. Se calcula determinísticamente.</p>
              </div>
            </div>
          </div>
          <div className="card">
            <T t="5.2 Tipos de Inventario"/>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'.5rem',marginTop:'.5rem'}}>
              {[
                ['Materia Prima','Insumos básicos para producción'],
                ['Trabajo en Proceso','Productos en elaboración'],
                ['Producto Terminado','Bienes listos para venta'],
                ['Repuestos','Piezas para mantenimiento']
              ].map(([tipo,desc])=>(
                <div key={tipo} style={{padding:'.75rem',background:'#1e293b',borderRadius:'6px',textAlign:'center'}}>
                  <div style={{fontSize:'.7rem',color:'#10b981',fontWeight:'bold'}}>{tipo}</div>
                  <div style={{fontSize:'.65rem',color:'#94a3b8'}}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab==='costos'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="5.3 Componentes del Costo de Inventario"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7,marginBottom:'.75rem'}}>
              Según Chopra & Meindl, los costos de inventario se dividen en cuatro categorías fundamentales.
            </p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.75rem'}}>
              <div style={{padding:'1rem',background:'#0f172a',border:'1px solid #1e293b',borderRadius:'8px'}}>
                <span className="badge badge-green" style={{marginBottom:'.5rem',display:'inline-block'}}>1. Costo de Adquisición c(z)</span>
                <p style={{fontSize:'.75rem',color:'#cbd5e1',lineHeight:1.6}}>
                  C(z) = K + cz (si z es mayor que 0)<br/>
                  K = Costo fijo de ordenamiento<br/>
                  c = Costo unitario variable
                </p>
              </div>
              <div style={{padding:'1rem',background:'#0f172a',border:'1px solid #1e293b',borderRadius:'8px'}}>
                <span className="badge badge-blue" style={{marginBottom:'.5rem',display:'inline-block'}}>2. Costo de Mantener h</span>
                <p style={{fontSize:'.75rem',color:'#cbd5e1',lineHeight:1.6}}>
                  Incluye: costo de capital, almacenamiento, seguros, impuestos, obsolescencia.<br/>
                  h = IC (tasa de mantener × costo unitario)
                </p>
              </div>
              <div style={{padding:'1rem',background:'#0f172a',border:'1px solid #1e293b',borderRadius:'8px'}}>
                <span className="badge badge-yellow" style={{marginBottom:'.5rem',display:'inline-block'}}>3. Costo por Faltantes p</span>
                <p style={{fontSize:'.75rem',color:'#cbd5e1',lineHeight:1.6}}>
                  Pérdida de imagen, ventas perdidas, trabajo administrativo adicional.<br/>
                  Backordering vs Sales Lost
                </p>
              </div>
              <div style={{padding:'1rem',background:'#0f172a',border:'1px solid #1e293b',borderRadius:'8px'}}>
                <span className="badge badge-purple" style={{marginBottom:'.5rem',display:'inline-block'}}>4. Costo de Preparación</span>
                <p style={{fontSize:'.75rem',color:'#cbd5e1',lineHeight:1.6}}>
                  Costos de setup en producción: tiempo muerto, ajustes de maquinaria, herramientas.
                </p>
              </div>
            </div>
          </div>
          <div className="card">
            <T t="Cálculo del Costo de Mantener"/>
            <Formula>{'h = C × i\n\nDonde:\n• C = Costo unitario del artículo\n• i = Tasa anual de mantener (%)\n\nEjemplo: C = $100, i = 25%\nh = 100 × 0.25 = $25/unidad-año'}</Formula>
          </div>
        </div>
      )}

      {tab==='eoq'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="5.4 Modelo de Cantidad Económica de Pedido (EOQ)"/>
            <Ca color="blue" title="Supuestos del Modelo EOQ Básico">
              1. Demanda determinística y constante (d unidades/tiempo)<br/>
              2. Tiempo de entrega conocido y constante<br/>
              3. No se permiten faltantes<br/>
              4. Costo de adquisición lineal<br/>
              5. Reabastecimiento instantáneo
            </Ca>
            <Formula>{'Derivación del Modelo EOQ:\n\n1. Costo por ciclo = K + cQ\n2. Inventario promedio = Q/2\n3. Costo mantener por ciclo = h(Q/2)(Q/d)\n4. Número de ciclos/año = d/Q\n\nCT(Q) = (d/Q)K + dc + (hQ/2)\n\nDerivando e igualando a cero:\ndCT/dQ = -dK/Q² + h/2 = 0\n\nQ* = √(2dK/h)'}</Formula>
          </div>
          <div className="card">
            <T t="Ejemplo EOQ Básico"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',marginBottom:'.5rem'}}>
              Una empresa vende 8,000 unidades/año. El costo de ordenar es $50 por pedido y el costo unitario es $25. 
              La tasa de mantener es 20% anual.
            </p>
            <Formula>{'Datos:\nd = 8,000 unidades/año\nK = $50/pedido\nC = $25/unidad\ni = 20%\nh = C × i = 25 × 0.20 = $5/unidad-año\n\nSolución:\nQ* = √(2 × 8000 × 50 / 5)\nQ* = √(160,000) = 400 unidades\n\nCosto Total Anual:\nCT = (8000/400)×50 + (400/2)×5 + 8000×25\nCT = 1000 + 1000 + 200,000 = $202,000'}</Formula>
          </div>
          <div className="card">
            <T t="Punto de Reorden (ROP)"/>
            <Formula>{'ROP = d × L\n\nDonde:\n• d = Demanda diaria (D/365)\n• L = Tiempo de entrega (días)\n\nEjemplo: D = 8000/año, L = 5 días\ndiaria = 8000/365 = 21.92 ud/día\nROP = 21.92 × 5 = 109.6 ≈ 110 unidades'}</Formula>
          </div>
        </div>
      )}

      {tab==='extensiones'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="5.5 EOQ con Descuentos por Cantidad"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7,marginBottom:'.75rem'}}>
              Los proveedores ofrecen precios unitarios más bajos para pedidos grandes. 
              Se debe comparar el costo total para diferentes niveles de descuento.
            </p>
            <Formula>{'Algoritmo:\n\n1. Calcular Q* con precio base\n2. Si Q* ≥ cantidad con descuento → usar Q*\n3. Si Q* < cantidad con descuento:\n   • Calcular CT en Q* (precio base)\n   • Calcular CT en punto de descuento\n   • Comparar y elegir el menor'}</Formula>
          </div>
          <div className="card">
            <T t="EOQ con Faltantes Permitidos"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7,marginBottom:'.75rem'}}>
              Permite faltantes (backordering) para reducir costos de mantener. 
              El cliente espera el reabastecimiento.
            </p>
            <Formula>{'Q* = √(2dK/h) × √((h+p)/p)\n\nS* = Q* × (h/(h+p))\n\nDonde:\n• S = Máximo faltante permitido\n• p = Costo de faltante por unidad/tiempo'}</Formula>
            <Ca color="yellow" title="Trade-off">
              Mayor faltante → Menor inventario → Menor costo de mantener → Mayor penalización
            </Ca>
          </div>
        </div>
      )}

      {tab==='produccion'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="5.6 Lote Económico de Producción (EPQ)"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7,marginBottom:'.75rem'}}>
              Aplicable cuando la reposición es gradual (producción en lugar de compra instantánea). 
              El inventario alcanza un pico y luego se consume mientras se produce.
            </p>
            <Formula>{'Modelo EPQ (Economic Production Quantity):\n\nQ* = √(2dK/h) × √(p/(p-d))\n\nDonde:\n• d = Tasa de demanda\n• p = Tasa de producción (p > d)\n• h = Costo de mantener\n\nInventario máximo = Q*(1 - d/p)'}</Formula>
          </div>
          <div className="card">
            <T t="Ejemplo EPQ"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',marginBottom:'.5rem'}}>
              Una fábrica produce 200 unidades/día y las consume a 50 unidades/día. 
              Costo de setup = $1,000, costo de mantener = $2/unidad-año.
            </p>
            <Formula>{'Datos:\nd = 50 ud/día × 365 = 18,250/año\np = 200 ud/día\nK = $1,000\nh = $2\n\nQ* = √(2×18250×1000/2) × √(200/(200-50))\nQ* = √(18,250,000) × √(1.333)\nQ* = 4,271 × 1.155 = 4,937 unidades\n\nInventario máximo = 4937 × (1 - 50/200) = 4937 × 0.75 = 3703 ud'}</Formula>
          </div>
        </div>
      )}

      {tab==='estocastico'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="5.7 Modelos con Demanda Probabilística"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7,marginBottom:'.75rem'}}>
              En la realidad, la demanda rarely es constante. Los modelos estocásticos consideran 
              la variabilidad mediante distribuciones de probabilidad.
            </p>
            <Formula>{'Componentes del modelo estocástico:\n\n• Demanda D ~ N(μ, σ²)\n• Tiempo de entrega L ~ N(L̄, σL²)\n• Stock de seguridad SS\n• Punto de reorden R = μL + SS\n\nDemanda durante lead time:\nD LT = μL + zσ LT'}</Formula>
          </div>
          <div className="card">
            <T t="Stock de Seguridad"/>
            <Formula>{'SS = z × σ DLT\n\nσ DLT = √(L × σD² + μD² × σL²)\n\ndonde:\n• z = Factor de servicio (número de desv. estándar)\n• σD = Desviación estándar de demanda\n• σL = Desviación estándar de lead time\n• μD = Demanda promedio'}</Formula>
            <Ca color="yellow" title="Nivel de Servicio vs Costo">
              Mayor z → Mayor stock de seguridad → Mayor costo de mantener pero menor probabilidad de faltante
            </Ca>
          </div>
          <div className="card">
            <T t="5.8 Modelo de un Solo Período (Newsvendor)"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7,marginBottom:'.75rem'}}>
              Para productos perecederos o de temporada única (periódicos, moda, productos frescos).
            </p>
            <Formula>{'Razón de Fractila:\n\nP(unidades) = Cu / (Cu + Co)\n\n• Cu = Costo por faltante (beneficio perdido)\n• Co = Costo por exceso (costo hundido)\n\nQ* = μ + z × σ\n(z = valor z de la distribución normal correspondiente a P)'}</Formula>
          </div>
        </div>
      )}

      {tab==='service'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="5.9 Medición del Nivel de Servicio"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7,marginBottom:'.75rem'}}>
              El nivel de servicio indica qué porcentaje de la demanda se satisface inmediatamente del inventario.
            </p>
            <Formula>{'Nivel de Servicio (Fill Rate):\n\nNS = 1 - (Faltantes / Demanda Total)\n\nTipo I (Ciclo):\nP(Demanda ≤ R) ≥ NS objetivo\n\nTipo II (Fill Rate):\nFR = 1 - (Unidades faltantes / Demanda total)'}</Formula>
          </div>
          <div className="card">
            <T t="Relación Nivel de Servicio - z"/>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'.5rem',marginTop:'.5rem'}}>
              {[
                ['90%','1.28'],
                ['95%','1.65'],
                ['97.5%','1.96'],
                ['99%','2.33']
              ].map(([ns,z])=>(
                <div key={ns} style={{padding:'.75rem',background:'#1e293b',borderRadius:'6px',textAlign:'center'}}>
                  <div style={{fontSize:'.7rem',color:'#10b981',fontWeight:'bold'}}>{ns}</div>
                  <div style={{fontSize:'.9rem',color:'#fff'}}>z = {z}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <T t="Costo Total Esperado"/>
            <Formula>{'CTE = Costo mantener inventario + Costo faltantes\n\nPara fill rate dado:\nCTE = (Q/2 - sS)h + (sS/Q)p\n\ndonde s = nivel de servicio'}</Formula>
          </div>
        </div>
      )}

      {tab==='ejemplos'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="Ejemplo 1: EOQ Básico Completo"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',marginBottom:'.5rem'}}>
              <b>Datos:</b> Una empresa tiene demanda anual de 12,000 unidades. Costo de ordenar = $75, 
              costo unitario = $30, tasa de mantener = 25% anual. Tiempo de entrega = 3 días.
            </p>
            <Formula>{'Paso 1: Calcular h\nh = C × i = 30 × 0.25 = $7.50/unidad-año\n\nPaso 2: Calcular Q*\nQ* = √(2 × 12000 × 75 / 7.5)\nQ* = √(240,000) = 489.9 ≈ 490 unidades\n\nPaso 3: Punto de reorden\nDemanda diaria = 12000/365 = 32.88 ud/día\nROP = 32.88 × 3 = 96.6 ≈ 97 unidades\n\nPaso 4: Verificación\nPedidos/año = 12000/490 = 24.49 ≈ 25\nCiclo = 365/25 = 14.6 días'}</Formula>
          </div>
          <div className="card">
            <T t="Ejemplo 2: EOQ con Faltantes"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',marginBottom:'.5rem'}}>
              <b>Datos:</b> d=3,000/año, K=$50, h=$4/unidad-año, p=$10/unidad-año
            </p>
            <Formula>{'Q* = √(2×3000×50/4) × √((4+10)/10)\nQ* = √(75,000) × √(1.4)\nQ* = 273.9 × 1.183 = 324 unidades\n\nS* = Q* × (h/(h+p))\nS* = 324 × (4/14) = 92.6 unidades\n\nInventario máximo = Q - S = 324 - 92.6 = 231.4 ud'}</Formula>
          </div>
          <div className="card">
            <T t="Ejemplo 3: Stock de Seguridad"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',marginBottom:'.5rem'}}>
              <b>Datos:</b> Demanda media = 100 ud/semana, σ = 20 ud. Lead time = 2 semanas, σL = 0.5 sem. 
              Nivel de servicio = 95%
            </p>
            <Formula>{'σDLT = √(L × σD² + μD² × σL²)\nσDLT = √(2×400 + 10000×0.25)\nσDLT = √(800 + 2500) = √(3300) = 57.44 ud\n\nPara NS=95%, z = 1.65\n\nSS = z × σDLT = 1.65 × 57.44 = 94.78 ud\n\nROP = μL + SS = (100×2) + 94.78 = 294.78 ≈ 295 ud'}</Formula>
          </div>
        </div>
      )}

      {tab==='ejercicios'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="Ejercicio 1: EOQ Básico"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',marginBottom:'.5rem'}}>
              Una empresa manufacturera consume 10,000 toneladas de materia prima al año. 
              Cada orden tiene un costo de $200. El costo de mantener una tonelada en inventario es de $10/año.
              El tiempo de entrega es de 5 días.
            </p>
            <details style={{background:'#0f172a',padding:'1rem',borderRadius:'8px'}}>
              <summary style={{cursor:'pointer',color:'#10b981',fontWeight:'bold'}}>Ver Solución</summary>
              <div style={{marginTop:'1rem',fontSize:'.85rem',color:'#cbd5e1'}}>
                <b>Solución:</b><br/>
                d = 10,000 ton/año<br/>
                K = $200/orden<br/>
                h = $10/ton-año<br/>
                L = 5 días<br/><br/>
                Q* = √(2×10000×200/10) = √(4,000,000) = 2,000 ton<br/>
                Demanda diaria = 10,000/365 = 27.40 ton/día<br/>
                ROP = 27.40 × 5 = 137 ton
              </div>
            </details>
          </div>
          <div className="card">
            <T t="Ejercicio 2: Descuentos por Cantidad"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',marginBottom:'.5rem'}}>
              El proveedor ofrece: $20/unidad para &lt;500 uds, $18/unidad para 500-999 uds, $15/unidad para ≥1000 uds.
              Demanda = 4,000/año, K = $100, h = 25%.
            </p>
            <details style={{background:'#0f172a',padding:'1rem',borderRadius:'8px'}}>
              <summary style={{cursor:'pointer',color:'#10b981',fontWeight:'bold'}}>Ver Solución</summary>
              <div style={{marginTop:'1rem',fontSize:'.85rem',color:'#cbd5e1'}}>
                <b>Solución:</b><br/>
                h = 20×0.25 = $5 (con precio base $20)<br/>
                Q* = √(2×4000×100/5) = √(1,600,000) = 1,265 uds<br/><br/>
                Como Q* = 1265 está entre 500-999, el precio de $18 aplica.<br/>
                h nuevo = 18×0.25 = $4.50<br/>
                Q* recalculada = √(2×4000×100/4.5) = √(1,777,778) = 1,333 uds<br/><br/>
                Verificar: CT(1265, $18) vs CT(1000, $15)<br/>
                Seleccionar la de menor costo total.
              </div>
            </details>
          </div>
          <div className="card">
            <T t="Ejercicio 3: Newsvendor"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',marginBottom:'.5rem'}}>
              Un quiosco vende periódicos a $1.50. El costo de compra es $0.75. 
              La demanda promedio es 100 con σ=30. No hay valor de rescate.
            </p>
            <details style={{background:'#0f172a',padding:'1rem',borderRadius:'8px'}}>
              <summary style={{cursor:'pointer',color:'#10b981',fontWeight:'bold'}}>Ver Solución</summary>
              <div style={{marginTop:'1rem',fontSize:'.85rem',color:'#cbd5e1'}}>
                <b>Solución:</b><br/>
                Cu = 1.50 - 0.75 = $0.75 (margen por venta)<br/>
                Co = 0.75 - 0 = $0.75 (costo del periódico no vendido)<br/><br/>
                P(u) = Cu/(Cu+Co) = 0.75/1.50 = 0.50<br/><br/>
                z para P=0.50 es 0<br/>
                Q* = μ + zσ = 100 + 0×30 = 100 periódicos
              </div>
            </details>
          </div>
        </div>
      )}

      {tab==='python'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card" style={{padding:'2rem'}}>
            <T t="Solvers Python - Gestión de Inventarios"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7,marginBottom:'.75rem'}}>
              Bibliotecas útiles: <code>pip install scipy pandas numpy</code>
            </p>
            <div style={{background:'#0f172a',padding:'1rem',borderRadius:'8px',overflowX:'auto'}}>
              <pre style={{fontFamily:'JetBrains Mono',fontSize:'.7rem',color:'#6ee7b7',margin:0}}>{`import math
import numpy as np
from scipy.stats import norm

class InventorySolver:
    """Solvers para Gestión de Inventarios - Basado en Ballou, Hillier & Lieberman"""
    
    @staticmethod
    def eoq_basic(D, K, h):
        """EOQ Básico: Q* = sqrt(2DK/h)"""
        Q = math.sqrt(2 * D * K / h)
        cycles = D / Q
        TC = (D/Q)*K + (Q/2)*h + D*0  # Sin costo unitario
        return round(Q, 2), round(TC, 2), round(cycles, 2)
    
    @staticmethod
    def eoq_backorder(D, K, h, p):
        """EOQ con faltantes: Q*, S"""
        Q = math.sqrt(2*D*K/h) * math.sqrt((h+p)/p)
        S = Q * (h/(h+p))
        return round(Q, 2), round(S, 2)
    
    @staticmethod
    def epq(D, K, h, p_rate, d_rate):
        """Lote Económico de Producción"""
        if p_rate <= d_rate:
            return None, "Tasa producción debe ser > tasa demanda"
        Q = math.sqrt(2*D*K/h) * math.sqrt(p_rate/(p_rate-d_rate))
        max_inv = Q * (1 - d_rate/p_rate)
        return round(Q, 2), round(max_inv, 2)
    
    @staticmethod
    def safety_stock(daily_demand, sigma_d, lead_time, sigma_l, service_level=0.95):
        """Stock de Seguridad y ROP"""
        sigma_dlt = math.sqrt(lead_time * sigma_d**2 + daily_demand**2 * sigma_l**2)
        z = norm.ppf(service_level)
        SS = z * sigma_dlt
        ROP = daily_demand * lead_time + SS
        return round(SS, 2), round(ROP, 2), round(z, 2)
    
    @staticmethod
    def newsvendor(unit_price, unit_cost, salvage, mu_d, sigma_d):
        """Modelo Newsvendor - Un solo período"""
        Cu = unit_price - unit_cost
        Co = unit_cost - salvage
        if Cu <= 0 or Co <= 0:
            return None, "Costos deben ser positivos"
        P = Cu / (Cu + Co)
        z = norm.ppf(P)
        Q = mu_d + z * sigma_d
        return round(P, 4), round(z, 3), round(Q, 0)

# === EJEMPLOS DE USO ===
if __name__ == "__main__":
    solver = InventorySolver()
    
    print("=== 1. EOQ Básico ===")
    Q, TC, n = solver.eoq_basic(D=8000, K=50, h=5)
    print(f"Q* = {Q} uds | Costo Anual = ${TC} | Pedidos/año = {n}")
    
    print("\\n=== 2. EOQ con Faltantes ===")
    Q, S = solver.eoq_backorder(D=3000, K=50, h=4, p=10)
    print(f"Q* = {Q} uds | S (máx faltante) = {S} uds")
    
    print("\\n=== 3. EPQ ===")
    Q, Imax = solver.epq(D=10000, K=200, h=3, p_rate=100, d_rate=30)
    print(f"Q* = {Q} uds | Inventario máximo = {Imax} uds")
    
    print("\\n=== 4. Stock de Seguridad ===")
    SS, ROP, z = solver.safety_stock(daily_demand=50, sigma_d=15, 
                                     lead_time=3, sigma_l=0.5, 
                                     service_level=0.95)
    print(f"SS = {SS} uds | ROP = {ROP} uds | z = {z}")
    
    print("\\n=== 5. Newsvendor ===")
    P, z, Q = solver.newsvendor(unit_price=1.50, unit_cost=0.75, 
                                salvage=0, mu_d=100, sigma_d=30)
    print(f"P(u) = {P*100}% | z = {z} | Q* = {Q} uds")`}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}