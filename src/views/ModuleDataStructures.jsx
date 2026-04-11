import React, { useState } from 'react';

const T = ({t,c='#334155'})=>(<div className="sec-title" style={{color:c}}>{t}</div>);
const Ca = ({color='green',title,children})=>(<div className={`callout ${color}`} style={{marginBottom:'.75rem'}}><div className="callout-title">{title}</div><p>{children}</p></div>);

const TABS = [
  ['intro','📚 Introducción'],
  ['datatypes','🔢 Tipos de Datos'],
  ['structures','🗃️ Estructuras de Datos'],
  ['excel','📊 Excel & Tablas'],
  ['sqlite','💾 SQLite'],
  ['pandas','🐼 Pandas & DB'],
  ['relationships','🔗 Relaciones'],
];

export default function ModuleDataStructures(){
  const [tab,setTab]=useState('intro');
  return(
    <div className="animate-in" style={{display:'flex',flexDirection:'column',gap:'1.25rem'}}>
      <div className="card gradient-header" style={{padding:'2rem'}}>
        <span style={{fontSize:'.7rem',fontFamily:'JetBrains Mono',color:'#64748b'}}>MÓDULO 7 · Estructura de Datos</span>
        <h1 style={{fontSize:'2rem',fontWeight:700,color:'#1e293b',marginTop:'.25rem'}}>Estructura de Datos para Logística</h1>
        <p style={{color:'#64748b',marginTop:'.5rem',fontSize:'.85rem'}}>Excel · SQLite · Pandas · Modelado de Bases de Datos</p>
      </div>

      <div className="tab-bar">
        {TABS.map(([id,lbl])=>(<button key={id} className={`tab-btn ${tab===id?'active':''}`} onClick={()=>setTab(id)}>{lbl}</button>))}
      </div>

      {tab==='intro'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="¿Por qué aprender Estructura de Datos en Logística?"/>
            <p style={{fontSize:'.82rem',color:'#475569',lineHeight:1.7,marginBottom:'.75rem'}}>
              En la gestión logística moderna, los datos son el activo más valioso. Desde el seguimiento de inventarios hasta la optimización de rutas, 
              todo depende de cómo estructuramos, almacenamos y procesamos la información. Este módulo te enseñará a dominar las herramientas 
              que usan los profesionales de logística para gestionar grandes volúmenes de datos.
            </p>
            <Ca color="blue" title="Objetivos del Módulo">
              <ul style={{paddingLeft:'1rem',marginTop:'.25rem'}}>
                <li>Comprender los tipos de datos fundamentales y su aplicación en contextos logísticos</li>
                <li>Dominar Excel para gestión de datos tabulares (tablas dinámicas, funciones)</li>
                <li>Introducirse en SQLite para bases de datos relacionales locales</li>
                <li>Aprender Pandas para análisis de datos en Python</li>
                <li>Modelar relaciones entre tablas (SKUs, proveedores, ubicaciones, pedidos)</li>
              </ul>
            </Ca>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1rem'}}>
            {[
              ['📊','Excel','Gestión tabular, tablas dinámicas, macros'],
              ['💾','SQLite','Bases de datos locales, consultas SQL'],
              ['🐼','Pandas','Análisis de datos, transformación'],
              ['🔗','Relaciones','Modelado ER, claves foráneas'],
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

      {tab==='datatypes'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="Tipos de Datos Fundamentales"/>
            <p style={{fontSize:'.82rem',color:'#475569',lineHeight:1.7,marginBottom:'.75rem'}}>
              Los tipos de datos definen qué valores pueden almacenar nuestras variables y cómo se comportan en operaciones. 
              En logística, elegir el tipo correcto es crucial para el rendimiento y la precisión.
            </p>
            <table className="tbl">
              <thead><tr><th>Tipo</th><th>Ejemplo Logístico</th><th>Uso</th></tr></thead>
              <tbody>
                {[
                  ['Texto (String)','Código SKU (SKU-001)','Identificadores, nombres'],
                  ['Numérico Entero','Cantidad de unidades (150)','Conteo, índices'],
                  ['Numérico Decimal','Peso kg (2450.75)','Medidas, costos'],
                  ['Fecha/Hora','Fecha de recepción','Trazabilidad, vencimientos'],
                  ['Booleano','¿Está disponible? (Sí/No)','Estados,flags'],
                  ['Moneda','Costo unitario ($15.99)','Valores financieros'],
                ].map(r=>(<tr key={r[0]}><td style={{fontWeight:600,color:'#334155'}}>{r[0]}</td><td>{r[1]}</td><td style={{color:'#64748b'}}>{r[2]}</td></tr>))}
              </tbody>
            </table>
          </div>

          <div className="card">
            <T t="Tipos de Datos en Excel vs SQL vs Pandas"/>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'.75rem'}}>
              {[
                ['Excel','General, Número, Moneda, Fecha, Texto'],
                ['SQLite','INTEGER, REAL, TEXT, BLOB, NULL'],
                ['Pandas','int64, float64, object, datetime64, bool'],
              ].map(([t,d])=>(
                <div key={t} className="card">
                  <span className="badge badge-blue" style={{marginBottom:'.5rem',display:'inline-block'}}>{t}</span>
                  <p style={{fontSize:'.75rem',color:'#64748b',whiteSpace:'pre-line'}}>{d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <T t="Ejercicio: Identifica el Tipo de Dato"/>
            <div style={{display:'flex',flexDirection:'column',gap:'.5rem'}}>
              {[
                ['Código del producto','Texto','SKU-2345'],
                ['Cantidad en bodega','Entero','1250'],
                ['Precio unitario','Decimal','$24.99'],
                ['Fecha de vencimiento','Fecha','2025-12-31'],
                ['Producto activo','Booleano','TRUE'],
              ].map(([c,t,e])=>(
                <div key={c} style={{display:'flex',gap:'.75rem',padding:'.5rem .75rem',background:'#f8fafc',borderRadius:8,alignItems:'center'}}>
                  <span style={{flex:1,fontSize:'.8rem',color:'#334155'}}>{c}</span>
                  <span className="badge badge-green">{t}</span>
                  <span style={{fontFamily:'JetBrains Mono',fontSize:'.75rem',color:'#64748b'}}>{e}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab==='structures'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="Estructuras de Datos en Logística"/>
            <p style={{fontSize:'.82rem',color:'#475569',lineHeight:1.7,marginBottom:'.75rem'}}>
              Las estructuras de datos organizan la información de manera eficiente. Cada tipo de estructura tiene ventajas específicas para diferentes problemas logísticos.
            </p>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
            {[
              ['📋','Array/Lista','Secuencia ordenada de elementos. Ej: Lista de SKUs en un pedido'],
              ['📊','Matriz/Tabla','Datos en filas y columnas. Ej: Inventario por ubicación'],
              ['🔍','Hash/Diccionario','Pares clave-valor. Ej: {codigo: producto}'],
              ['📚','Pila (Stack)','LIFO - Last In First Out. Ej: Pallets apilados (PEPS)'],
              ['🎯','Cola (Queue)','FIFO - First In First Out. Ej: Pedidos por procesar'],
              ['🌳','Árbol','Jerarquía padre-hijo. Ej: Categorías de productos'],
              ['🔗','Grafo','Nodos conectados. Ej: Red de distribución'],
            ].map(([e,t,d])=>(
              <div key={t} className="card">
                <div style={{display:'flex',alignItems:'center',gap:'.5rem',marginBottom:'.5rem'}}>
                  <span style={{fontSize:'1.25rem'}}>{e}</span>
                  <span style={{fontWeight:600,fontSize:'.85rem',color:'#1e293b'}}>{t}</span>
                </div>
                <p style={{fontSize:'.75rem',color:'#64748b'}}>{d}</p>
              </div>
            ))}
          </div>

          <div className="card">
            <T t="Casos de Uso en Supply Chain"/>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'.75rem'}}>
              {[
                ['Gestión de Inventario','Array de SKU con cantidades'],
                ['Rutas de Distribución','Grafo ponderado (distancias)'],
                ['Procesamiento de Pedidos','Cola FIFO'],
                ['Categorización','Árbol jerárquico'],
                {'Búsqueda Rápida':'Hash table (código → producto)'},
                {' 历史 FIFO':'Pila para método PEPS'},
              ].map(([c,d])=>(
                <div key={c} style={{padding:'.5rem',background:'#f8fafc',borderRadius:6}}>
                  <span style={{fontSize:'.75rem',fontWeight:600,color:'#334155'}}>{c}</span>
                  <p style={{fontSize:'.7rem',color:'#64748b',marginTop:'.2rem'}}>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab==='excel'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="Organización de Datos en Excel"/>
            <p style={{fontSize:'.82rem',color:'#475569',lineHeight:1.7,marginBottom:'.75rem'}}>
              Excel es la herramienta más usada en logística para gestión de datos. Una organización correcta es fundamental para el análisis eficiente.
            </p>
            <Ca color="blue" title="Mejores Prácticas">
              <ul style={{paddingLeft:'1rem'}}>
                <li>Primera fila siempre como encabezado</li>
                <li>Una sola fila por registro</li>
                <li>Una sola columna por atributo</li>
                <li>No dejar filas vacías dentro de los datos</li>
                <li>Usar tipos de datos consistentes por columna</li>
                <li>Nombres descriptivos sin espacios (usar _ o camelCase)</li>
              </ul>
            </Ca>
          </div>

          <div className="card">
            <T t="Ejemplo: Tabla de Inventario"/>
            <div style={{overflow:'auto'}}>
              <table className="tbl" style={{fontSize:'.7rem'}}>
                <thead>
                  <tr>
                    <th>sku_id</th>
                    <th>product_name</th>
                    <th>category</th>
                    <th>quantity</th>
                    <th>unit_cost</th>
                    <th>location</th>
                    <th>last_update</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['SKU-001','Portátil HP 15s','Electrónica',150,450.00,'A-01-01','2025-01-15'],
                    ['SKU-002','Mouse Inalámbrico','Accesorios',500,25.00,'B-02-03','2025-01-14'],
                    ['SKU-003','Escritorio Metal','Mobiliario',45,280.00,'C-01-01','2025-01-13'],
                    ['SKU-004','Silla Ergonómica','Mobiliario',30,350.00,'C-01-02','2025-01-12'],
                  ].map(r=>(<tr key={r[0]}><td style={{fontFamily:'JetBrains Mono'}}>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td style={{textAlign:'right'}}>{r[3]}</td><td style={{textAlign:'right'}}>${r[4]}</td><td style={{fontFamily:'JetBrains Mono'}}>{r[5]}</td><td>{r[6]}</td></tr>))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <T t="Funciones Esenciales para Logística"/>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'.5rem'}}>
              {[
                ['SUMA()','Total de unidades/costos'],
                ['CONTAR()','Cantidad de SKUs activos'],
                ['BUSCARV()','Buscar por código SKU'],
                ['SUMAR.SI()','Sumar por categoría'],
                ['CONTAR.SI()','Contar por estado'],
                ['INDICE()','Referencia avanzada'],
                ['COINCIDIR()','Buscar posición'],
                {'PIVOT':'Tablas dinámicas'},
              ].map(([f,d])=>(
                <div key={f} style={{padding:'.4rem .6rem',background:'#f8fafc',borderRadius:6,display:'flex',justifyContent:'space-between'}}>
                  <span style={{fontFamily:'JetBrains Mono',fontSize:'.7rem',color:'#334155'}}>{f}</span>
                  <span style={{fontSize:'.7rem',color:'#64748b'}}>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab==='sqlite'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="SQLite: Base de Datos Local"/>
            <p style={{fontSize:'.82rem',color:'#475569',lineHeight:1.7,marginBottom:'.75rem'}}>
              SQLite es una base de datos embebida, perfecta para aplicaciones locales y aprendizaje. No requiere servidor y es ideal para gestionar datos logísticos de manera persistente.
            </p>
            <Ca color="green" title="Ventajas de SQLite en Logística">
              <ul style={{paddingLeft:'1rem'}}>
                <li>Sin instalación ni configuración</li>
                <li>Archivo único portable</li>
                <li>Rápido para volúmenes medianos</li>
                <li>Soporte completo de SQL</li>
                <li>Integración con Python (pandas)</li>
              </ul>
            </Ca>
          </div>

          <div className="card">
            <T t="Comandos SQL Básicos"/>
            <div style={{display:'flex',flexDirection:'column',gap:'.5rem'}}>
              {[
                ['CREATE TABLE inventario (id INTEGER PRIMARY KEY, sku TEXT, cantidad INTEGER);','Crear tabla'],
                ['INSERT INTO inventario (sku, cantidad) VALUES ("SKU-001", 150);','Insertar registro'],
                ['SELECT * FROM inventario WHERE cantidad > 100;','Consultar datos'],
                ['UPDATE inventario SET cantidad = 200 WHERE sku = "SKU-001";','Actualizar registro'],
                ['DELETE FROM inventario WHERE cantidad = 0;','Eliminar registros'],
              ].map(([q,d])=>(
                <div key={q} style={{padding:'.5rem',background:'#f8fafc',borderRadius:6}}>
                  <span style={{fontFamily:'JetBrains Mono',fontSize:'.65rem',color:'#334155',display:'block',marginBottom:'.25rem'}}>{q}</span>
                  <span style={{fontSize:'.7rem',color:'#64748b'}}>{d}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <T t="Estructura de Tablas para Logística"/>
            <table className="tbl">
              <thead><tr><th>Tabla</th><th>Campos Principales</th></tr></thead>
              <tbody>
                {[
                  ['productos','id, sku, nombre, categoria, peso, volumen'],
                  ['inventario','id, producto_id, bodega_id, cantidad, ubicacion'],
                  ['bodegas','id, nombre, direccion, capacidad'],
                  ['pedidos','id, cliente_id, fecha, estado, total'],
                  ['detalle_pedido','id, pedido_id, producto_id, cantidad'],
                  ['proveedores','id, nombre, contacto, tiempo_entrega'],
                ].map(r=>(<tr key={r[0]}><td style={{fontWeight:600,color:'#334155'}}>{r[0]}</td><td style={{fontFamily:'JetBrains Mono',fontSize:'.7rem',color:'#64748b'}}>{r[1]}</td></tr>))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab==='pandas'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="Pandas: Análisis de Datos en Python"/>
            <p style={{fontSize:'.82rem',color:'#475569',lineHeight:1.7,marginBottom:'.75rem'}}>
              Pandas es la librería más popular para análisis de datos. Combina la simplicidad de Excel con el poder de la programación para automatizar procesos logísticos.
            </p>
          </div>

          <div className="card">
            <T t="Operaciones Básicas con Pandas"/>
            <div style={{display:'flex',flexDirection:'column',gap:'.5rem'}}>
              {[
                ['import pandas as pd','Importar librería'],
                ['df = pd.read_excel("inventario.xlsx")','Leer archivo Excel'],
                ['df.head()','Ver primeras filas'],
                ['df.describe()','Estadísticas básicas'],
                ['df.groupby("categoria").sum()','Agrupar por categoría'],
                ['df.to_sql("inventario", conn)','Exportar a SQLite'],
              ].map(([c,d])=>(
                <div key={c} style={{padding:'.4rem .6rem',background:'#f8fafc',borderRadius:6,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span style={{fontFamily:'JetBrains Mono',fontSize:'.7rem',color:'#334155'}}>{c}</span>
                  <span style={{fontSize:'.7rem',color:'#64748b'}}>{d}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <T t="Ejemplo: Análisis de Inventario"/>
            <div className="formula-box" style={{fontSize:'.75rem',textAlign:'left',whiteSpace:'pre-line'}}>
{`import pandas as pd

# Cargar datos
df = pd.read_excel("inventario.xlsx")

# Calcular valor total por categoría
df["valor_total"] = df["cantidad"] * df["costo_unitario"]
resumen = df.groupby("categoria").agg({
    "cantidad": "sum",
    "valor_total": "sum"
}).sort_values("valor_total", ascending=False)

# Top 10 SKUs por valor
top10 = df.nlargest(10, "valor_total")[["sku", "producto", "valor_total"]]

# Exportar a SQLite
df.to_sql("inventario", sqlite_conn, if_exists="replace")`}
            </div>
          </div>

          <div className="card">
            <T t="Funciones de Aggregación"/>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'.5rem'}}>
              {['count()','sum()','mean()','median()','min()','max()','std()','var()'].map(f=>(
                <div key={f} style={{padding:'.4rem',background:'#f8fafc',borderRadius:6,textAlign:'center'}}>
                  <span style={{fontFamily:'JetBrains Mono',fontSize:'.7rem',color:'#475569'}}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab==='relationships'&&(
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <T t="Relaciones entre Tablas"/>
            <p style={{fontSize:'.82rem',color:'#475569',lineHeight:1.7,marginBottom:'.75rem'}}>
              El modelado de datos define cómo se relacionan las entidades. En logística, un buen modelo permite trazabilidad completa desde el proveedor hasta el cliente final.
            </p>
          </div>

          <div className="card">
            <T t="Tipos de Relaciones"/>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'.75rem'}}>
              {[
                ['1:1 (Uno a Uno)','Cada producto tiene un código único','producto ↔ codigo_barras'],
                ['1:N (Uno a Muchos)','Una bodega tiene muchos productos','bodega → productos'],
                ['N:N (Muchos a Muchos)','Pedidos tienen muchos productos','pedido ↔ producto'],
              ].map(([t,d,e])=>(
                <div key={t} className="card">
                  <span className="badge badge-blue" style={{marginBottom:'.5rem',display:'inline-block'}}>{t}</span>
                  <p style={{fontSize:'.75rem',color:'#64748b',marginBottom:'.25rem'}}>{d}</p>
                  <p style={{fontFamily:'JetBrains Mono',fontSize:'.65rem',color:'#94a3b8'}}>{e}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <T t="Diagrama Entidad-Relación: Sistema Logístico"/>
            <div style={{
              background:'#f8fafc',borderRadius:12,padding:'1.5rem',
              display:'flex',flexDirection:'column',gap:'.75rem',alignItems:'center'
            }}>
              {[
                {table:'proveedores',fields:'id, nombre, nit, contacto',color:'#e2e8f0'},
                {table:'productos',fields:'id, sku, nombre, categoria_id, proveedor_id',color:'#e2e8f0'},
                {table:'categorias',fields:'id, nombre, padre_id',color:'#e2e8f0'},
                {table:'bodegas',fields:'id, nombre, direccion, capacidad',color:'#e2e8f0'},
                {table:'inventario',fields:'id, producto_id, bodega_id, cantidad, ubicacion',color:'#e2e8f0'},
                {table:'pedidos',fields:'id, cliente_id, fecha, estado',color:'#e2e8f0'},
                {table:'detalle_pedido',fields:'id, pedido_id, producto_id, cantidad',color:'#e2e8f0'},
              ].map((t,i)=>(
                <div key={t.table} style={{
                  background:t.color,border:'1px solid #cbd5e1',borderRadius:8,
                  padding:'.5rem 1rem',minWidth:250
                }}>
                  <div style={{fontWeight:600,fontSize:'.75rem',color:'#334155'}}>{t.table}</div>
                  <div style={{fontFamily:'JetBrains Mono',fontSize:'.6rem',color:'#64748b'}}>{t.fields}</div>
                </div>
              ))}
              <div style={{fontSize:'.7rem',color:'#94a3b8',textAlign:'center'}}>
                Las flechas indican claves foráneas (foreign keys)
              </div>
            </div>
          </div>

          <div className="card">
            <T t="Claves en Base de Datos"/>
            <Ca color="yellow" title="Conceptos Clave">
              <ul style={{paddingLeft:'1rem'}}>
                <li><strong>Primary Key (PK):</strong> Identificador único de cada registro</li>
                <li><strong>Foreign Key (FK):</strong> Campo que referencia otra tabla</li>
                <li><strong>Unique Key:</strong> Valor no repetido en la tabla</li>
                <li><strong>Index:</strong> Estructura para búsquedas rápidas</li>
              </ul>
            </Ca>
          </div>
        </div>
      )}
    </div>
  );
}
