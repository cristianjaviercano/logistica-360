import React, { useState } from 'react';
const T=({t})=>(<div className="sec-title">{t}</div>);
const Ca=({color='green',title,children})=>(<div className={`callout ${color}`} style={{marginBottom:'.75rem'}}><div className="callout-title">{title}</div><p>{children}</p></div>);
const TABS=[['abc','📊 Clasificación ABC'],['peps','📥 PEPS / FIFO'],['ueps','📤 UEPS / LIFO'],['prom','⚖️ Promedio Ponderado'],['python','🐍 Código Python']];

export default function Module3View(){
  const [tab,setTab]=useState('abc');
  return(
    <div className="animate-in" style={{display:'flex',flexDirection:'column',gap:'1.25rem'}}>
      <div className="card gradient-header" style={{padding:'2rem'}}>
        <span style={{fontSize:'.7rem',fontFamily:'JetBrains Mono',color:'#10b981'}}>MÓDULO 3 · Clasificación</span>
        <h1 style={{fontSize:'2rem',fontWeight:900,color:'#fff',marginTop:'.25rem'}}>Clasificación y Valorización de Existencias</h1>
        <p style={{color:'#94a3b8',marginTop:'.5rem',fontSize:'.85rem'}}>Roux (2009) · Silver, Pyke & Peterson (1998) · NIIF / NIC 2</p>
      </div>
      <div className="tab-bar">
        {TABS.map(([id,lbl])=>(<button key={id} className={`tab-btn ${tab===id?'active':''}`} onClick={()=>setTab(id)}>{lbl}</button>))}
      </div>

      {tab==='abc'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="Análisis ABC — Principio de Pareto aplicado a inventarios"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7,marginBottom:'.75rem'}}>
              El análisis ABC clasifica los SKUs del inventario según su <strong style={{color:'#fff'}}>valor de consumo anual</strong> (Precio unitario × Demanda anual), ordenándolos de mayor a menor y acumulando su participación. La regla 80-20 de Pareto establece que aproximadamente el 20% de los SKUs concentra el 80% del valor total.
            </p>
            <div className="formula-box">{'Valor_consumo_i = Precio_i × Demanda_anual_i\n\n% Acumulado_i = Σ(Valor_consumo₁..ᵢ) / Σ(Valor_total) × 100'}</div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1rem'}}>
            {[
              {z:'A',c:'#10b981',bg:'rgba(16,185,129,.1)',sku:'10–20%',val:'70–80%',control:'Inventario cíclico semanal, pronóstico detallado, proveedor certificado, lote mínimo de reposición bajo'},
              {z:'B',c:'#3b82f6',bg:'rgba(59,130,246,.1)',sku:'30%',val:'15–25%',control:'Conteo mensual, reposición por punto de reorden, política intermedia'},
              {z:'C',c:'#f59e0b',bg:'rgba(245,158,11,.1)',sku:'50–60%',val:'5–10%',control:'Conteo semestral o anual, política "two-bin" o reposición periódica masiva, mínima gestión'},
            ].map(({z,c,bg,sku,val,control})=>(
              <div key={z} className="card" style={{borderColor:c+'44',borderWidth:1,borderStyle:'solid'}}>
                <div style={{fontSize:'2rem',fontWeight:900,color:c,marginBottom:'.5rem'}}>Clase {z}</div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'.72rem',color:'#94a3b8',marginBottom:'.5rem'}}>
                  <span>SKUs: <strong style={{color:c}}>{sku}</strong></span>
                  <span>Valor: <strong style={{color:c}}>{val}</strong></span>
                </div>
                <p style={{fontSize:'.72rem',color:'#94a3b8',lineHeight:1.5}}><strong style={{color:'#f1f5f9'}}>Política de control:</strong> {control}</p>
              </div>
            ))}
          </div>
          <div className="card">
            <T t="Extensiones del ABC — Análisis Multicriterio"/>
            <div style={{display:'flex',flexDirection:'column',gap:'.5rem',fontSize:'.8rem'}}>
              {[
                ['ABC-VED (Vital-Essential-Desirable)','Usado en inventarios hospitalarios y de mantenimiento. Clasifica por impacto operativo si el ítem falta, independiente de su costo.'],
                ['ABC-SDE (Scarce-Difficult-Easy)','Clasifica por dificultad de aprovisionamiento. Un ítem de bajo valor pero difícil de conseguir puede ser prioritario.'],
                ['Matriz ABC × VED','Combinación 3×3: los ítems A-Vital reciben máxima atención (9 categorías resultantes), estándar en hospitales y aerolíneas.'],
              ].map(([t,d])=>(<div key={t} style={{display:'flex',gap:'.75rem',padding:'.5rem .75rem',borderRadius:8,background:'rgba(59,130,246,.04)',border:'1px solid rgba(59,130,246,.1)'}}><span style={{color:'#3b82f6',fontWeight:700,flexShrink:0,minWidth:160}}>{t}</span><span style={{color:'#94a3b8'}}>{d}</span></div>))}
            </div>
          </div>
        </div>
      )}

      {tab==='peps'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="PEPS (Primero en Entrar, Primero en Salir) — FIFO"/>
            <Ca color="green" title="Principio fundamental">
              Las unidades que ingresaron primero al almacén son las primeras en salir. El inventario final queda valorado al precio más reciente. Obligatorio para perecederos (cadena de frío) y recomendado por NIC 2 bajo NIIF.
            </Ca>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7,marginBottom:'.75rem'}}>
              Bajo PEPS el costo de ventas refleja los costos más antiguos (posiblemente más bajos en contextos inflacionarios), lo que resulta en una <strong style={{color:'#fff'}}>utilidad bruta mayor</strong> y, por tanto, mayor carga fiscal. Sin embargo, el inventario final se valora a precios actuales, reflejando mejor la realidad económica.
            </p>
          </div>
          <div className="card">
            <T t="Ejemplo Numérico PEPS — 3 entradas, 2 salidas"/>
            <table className="tbl">
              <thead><tr><th>Fecha</th><th>Concepto</th><th>Cant.</th><th>C.Unit.</th><th>Total</th><th>Inventario (PEPS)</th></tr></thead>
              <tbody>
                {[
                  ['01/01','Entrada',100,'$10.00','$1,000','100u @ $10'],
                  ['05/01','Entrada',50,'$12.00','$600','100u@$10 + 50u@$12'],
                  ['08/01','Salida',80,'—','—','20u@$10 + 50u@$12 → Costo: 80×$10=$800'],
                  ['12/01','Entrada',60,'$13.00','$780','20u@$10 + 50u@$12 + 60u@$13'],
                  ['15/01','Salida',70,'—','—','Costo: 20×$10 + 50×$12 = $200+$600=$800'],
                  ['31/01','Inventario Final',60,'$13.00','$780','60u@$13 = $780'],
                ].map((r,i)=>(<tr key={i}><td style={{color:'#94a3b8'}}>{r[0]}</td><td style={{color:r[1]==='Entrada'?'#6ee7b7':r[1]==='Salida'?'#fca5a5':'#f1f5f9',fontWeight:600}}>{r[1]}</td><td>{r[2]}</td><td style={{fontFamily:'JetBrains Mono'}}>{r[3]}</td><td style={{fontFamily:'JetBrains Mono',color:'#10b981'}}>{r[4]}</td><td style={{fontFamily:'JetBrains Mono',fontSize:'.65rem',color:'#fcd34d'}}>{r[5]}</td></tr>))}
              </tbody>
            </table>
            <Ca color="blue" title="Resultado PEPS">
              Costo de ventas = $800 + $800 = $1,600. Inventario final = $780. Utilidad bruta (si ventas = $2,500) = $900.
            </Ca>
          </div>
        </div>
      )}

      {tab==='ueps'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="UEPS (Último en Entrar, Primero en Salir) — LIFO"/>
            <Ca color="red" title="Restricción normativa">
              UEPS está <strong>prohibido bajo las Normas Internacionales de Información Financiera (NIIF/IAS 2)</strong> desde 2005. Sin embargo, sigue siendo legal en EE.UU. bajo US-GAAP. En Colombia, desde la adopción de NIIF en 2015, no puede usarse para efectos contables aunque sí para análisis gerencial interno.
            </Ca>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7}}>
              Bajo UEPS, las últimas unidades en entrar son las primeras en salir. En contextos inflacionarios, el costo de ventas refleja precios más recientes (más altos), generando menor utilidad y menor carga fiscal. El inventario final queda subvalorado a precios históricos.
            </p>
          </div>
          <div className="card">
            <T t="Comparativa PEPS vs UEPS vs Promedio (mismo ejemplo)"/>
            <table className="tbl">
              <thead><tr><th>Método</th><th>Costo de Ventas</th><th>Inventario Final</th><th>Utilidad Bruta*</th><th>Contexto favorable</th></tr></thead>
              <tbody>
                {[
                  ['PEPS / FIFO','$1,600','$780 (precio reciente)','$900','Deflación o reporte a inversores'],
                  ['UEPS / LIFO','$1,740','$640 (precio antiguo)','$760','Inflación, minimizar impuesto (solo US-GAAP)'],
                  ['Promedio Pond.','$1,668','$712','$832','Estabilidad de márgenes, NIIF'],
                ].map(r=>(<tr key={r[0]}><td style={{color:'#10b981',fontWeight:600}}>{r[0]}</td><td style={{fontFamily:'JetBrains Mono'}}>{r[1]}</td><td style={{fontFamily:'JetBrains Mono'}}>{r[2]}</td><td style={{fontFamily:'JetBrains Mono',color:'#f59e0b'}}>{r[3]}</td><td style={{color:'#94a3b8'}}>{r[4]}</td></tr>))}
              </tbody>
            </table>
            <p style={{fontSize:'.7rem',color:'#475569',marginTop:'.5rem'}}>*Ventas = $2,500 en todos los casos</p>
          </div>
        </div>
      )}

      {tab==='prom'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="Método del Promedio Ponderado"/>
            <Ca color="green" title="Método recomendado bajo NIIF (NIC 2)">
              El costo de cada unidad se recalcula después de cada entrada dividiendo el costo total acumulado entre las unidades totales disponibles. Es el método más usado en la práctica colombiana y latinoamericana.
            </Ca>
            <div className="formula-box">{'Costo promedio = Costo total disponible / Unidades disponibles\n\nTras cada nueva entrada: revalorar TODO el inventario al nuevo promedio'}</div>
          </div>
          <div className="card">
            <T t="Trazabilidad paso a paso (mismo ejemplo)"/>
            <table className="tbl">
              <thead><tr><th>Evento</th><th>Cant. entrada</th><th>C.Unit.</th><th>Inv. unidades</th><th>Inv. valor</th><th>Costo Promedio</th></tr></thead>
              <tbody>
                {[
                  ['Entrada 01/01',100,'$10.00',100,'$1,000.00','$10.00'],
                  ['Entrada 05/01',50,'$12.00',150,'$1,600.00','$10.67'],
                  ['Salida 08/01 (80u)','—','—',70,'$746.67','$10.67'],
                  ['Entrada 12/01',60,'$13.00',130,'$1,526.67','$11.74'],
                  ['Salida 15/01 (70u)','—','—',60,'$704.40','$11.74'],
                ].map((r,i)=>(<tr key={i}><td style={{color:r[0].includes('Salida')?'#fca5a5':r[0].includes('Entrada')?'#6ee7b7':'#f1f5f9',fontWeight:600}}>{r[0]}</td><td>{r[1]}</td><td style={{fontFamily:'JetBrains Mono'}}>{r[2]}</td><td style={{fontFamily:'JetBrains Mono',color:'#f1f5f9'}}>{r[3]}</td><td style={{fontFamily:'JetBrains Mono',color:'#10b981'}}>{r[4]}</td><td style={{fontFamily:'JetBrains Mono',color:'#fcd34d'}}>{r[5]}</td></tr>))}
              </tbody>
            </table>
            <Ca color="blue" title="Resultado Promedio Ponderado">Costo de ventas = (80×$10.67) + (70×$11.74) = $853.60 + $821.80 = $1,675.40. Inventario final = 60u × $11.74 = $704.40</Ca>
          </div>
        </div>
      )}

      {tab==='python'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card" style={{padding:'2rem'}}>
            <T t="Implementación del Algoritmo ABC (Pandas)"/>
            <p style={{fontSize:'.82rem',color:'#cbd5e1',lineHeight:1.7,marginBottom:'.75rem'}}>
              Este script en Python utiliza la librería <b>pandas</b> para aplicar el Análisis ABC masivo sobre el maestro de datos de tu inventario. Solo asegúrate de tener instalada la librería (<code>pip install pandas</code>).
            </p>
            <div style={{background:'#0f172a',padding:'1rem',borderRadius:'8px',overflowX:'auto'}}>
              <pre style={{fontFamily:'JetBrains Mono',fontSize:'.75rem',color:'#6ee7b7',margin:0}}>
{`import pandas as pd

def clasificar_abc(df, col_demanda, col_precio):
    \"\"\"
    Clasifica los SKUs de un DataFrame en A, B o C basándose 
    en el Principio de Pareto del Valor de Consumo.
    \"\"\"
    # 1. Calcular el Valor de Consumo Anual
    df['Valor_Consumo'] = df[col_demanda] * df[col_precio]
    
    # 2. Ordenar de mayor a menor y acumular
    df = df.sort_values(by='Valor_Consumo', ascending=False)
    df['Porcentaje'] = df['Valor_Consumo'] / df['Valor_Consumo'].sum()
    df['Porc_Acumulado'] = df['Porcentaje'].cumsum()
    
    # 3. Asignar clases A (80%), B (15%), C (5%)
    def asignar_clase(acum):
        if acum <= 0.80:
            return 'A'
        elif acum <= 0.95:
            return 'B'
        else:
            return 'C'
            
    df['Clase_ABC'] = df['Porc_Acumulado'].apply(asignar_clase)
    return df

# ---------- EJEMPLO DE USO ----------
if __name__ == "__main__":
    datos = {
        'SKU': ['SKU01', 'SKU02', 'SKU03', 'SKU04', 'SKU05'],
        'Demanda_Anual': [1500, 200, 3000, 50, 10],
        'Precio_Unitario': [50.0, 120.0, 5.0, 1000.0, 15.0]
    }
    inventario = pd.DataFrame(datos)
    
    # Ejecutar la clasificación
    resultado = clasificar_abc(inventario, 'Demanda_Anual', 'Precio_Unitario')
    
    print(resultado[['SKU', 'Valor_Consumo', 'Porc_Acumulado', 'Clase_ABC']])`}
              </pre>
            </div>
            <Ca color="blue" title="¿Cómo integrarlo?">Copia y pega este código en un archivo <code>clasificador_abc.py</code>. Reemplaza el diccionario de "datos" por un <code>pd.read_excel('tu_archivo.xlsx')</code> para procesar bases de datos reales.</Ca>
          </div>
        </div>
      )}
    </div>
  );
}
