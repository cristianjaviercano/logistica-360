import React, { useState, useEffect } from 'react';

const INITIAL_DATA = [
  { id: 1, producto: 'Portátil HP 15s', categoria: 'Electrónica', cantidad: 150, costo: 450000, proveedor: 'HP Colombia', fecha: '2025-01-15' },
  { id: 2, producto: 'Mouse Inalámbrico', categoria: 'Accesorios', cantidad: 500, costo: 25000, proveedor: 'Logitech', fecha: '2025-01-14' },
  { id: 3, producto: 'Escritorio Metal', categoria: 'Mobiliario', cantidad: 45, costo: 280000, proveedor: 'Muebles UPB', fecha: '2025-01-13' },
  { id: 4, producto: 'Silla Ergonómica', categoria: 'Mobiliario', cantidad: 30, costo: 350000, proveedor: 'Herman Miller', fecha: '2025-01-12' },
  { id: 5, producto: 'Monitor 24"', categoria: 'Electrónica', cantidad: 80, costo: 180000, proveedor: 'Samsung', fecha: '2025-01-11' },
  { id: 6, producto: 'Teclado Mecánico', categoria: 'Accesorios', cantidad: 200, costo: 75000, proveedor: 'Logitech', fecha: '2025-01-10' },
  { id: 7, producto: 'Webcam HD', categoria: 'Electrónica', cantidad: 120, costo: 95000, proveedor: 'Logitech', fecha: '2025-01-09' },
  { id: 8, producto: 'Audífonos USB', categoria: 'Accesorios', cantidad: 300, costo: 45000, proveedor: 'JBL', fecha: '2025-01-08' },
];

const EXERCISES = [
  {
    id: 1,
    title: 'SUMA y SUMAR.SI',
    description: 'Calcula el total de unidades y el total por categoría',
    formula: '=SUMA(B2:B9) / =SUMAR.SI(C2:C9,"Electrónica",D2:D9)',
    category: 'Matemáticas'
  },
  {
    id: 2,
    title: 'CONTAR y CONTAR.SI',
    description: 'Cuenta el número de productos y los de una categoría',
    formula: '=CONTAR(A2:A9) / =CONTAR.SI(C2:C9,"Mobiliario")',
    category: 'Conteo'
  },
  {
    id: 3,
    title: 'BUSCARV',
    description: 'Busca un producto por su ID',
    formula: '=BUSCARV(3,A2:E9,2,FALSO)',
    category: 'Búsqueda'
  },
  {
    id: 4,
    title: 'PROMEDIO y MAX/MIN',
    description: 'Calcula estadísticas de costo',
    formula: '=PROMEDIO(D2:D9) / =MAX(D2:D9)',
    category: 'Estadística'
  },
  {
    id: 5,
    title: 'Tabla Dinámica',
    description: 'Crea un resumen por categoría',
    formula: 'Insertar > Tabla Dinámica > Arrastrar categoría a filas',
    category: 'Análisis'
  },
  {
    id: 6,
    title: 'Formato Condicional',
    description: 'Resalta productos con stock bajo',
    formula: 'Seleccionar > Inicio > Formato Condicional > Reglas superiores/inferiores',
    category: 'Formato'
  }
];

export default function LabExcelData() {
  const [data, setData] = useState(INITIAL_DATA);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [results, setResults] = useState({});
  const [showFormula, setShowFormula] = useState(null);

  const calculateExercise = (exId) => {
    let result = 0;
    switch(exId) {
      case 1:
        const electronica = data.filter(d => d.categoria === 'Electrónica').reduce((a, b) => a + b.costo, 0);
        result = electronica;
        break;
      case 2:
        const mobiliario = data.filter(d => d.categoria === 'Mobiliario').length;
        result = mobiliario;
        break;
      case 3:
        const producto = data.find(d => d.id === 3)?.producto || 'No encontrado';
        result = producto;
        break;
      case 4:
        const maxCosto = Math.max(...data.map(d => d.costo));
        result = maxCosto;
        break;
      default:
        result = 'Demo';
    }
    setResults(prev => ({ ...prev, [exId]: result }));
  };

  const totalUnidades = data.reduce((a, b) => a + b.cantidad, 0);
  const totalCosto = data.reduce((a, b) => a + b.costo, 0);
  const promedioCosto = totalCosto / data.length;

  return (
    <div className="animate-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="card gradient-header" style={{ padding: '2rem' }}>
        <span style={{ fontSize: '.7rem', fontFamily: 'JetBrains Mono', color: '#64748b' }}>LABORATORIO · Excel para Datos</span>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#1e293b', marginTop: '.25rem' }}>Excel para Gestión Logística</h1>
        <p style={{ color: '#64748b', marginTop: '.5rem', fontSize: '.85rem' }}>
          Aprende funciones de Excel aplicadas a la gestión de inventarios y despacho
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#334155' }}>{data.length}</div>
          <div style={{ fontSize: '.65rem', color: '#64748b' }}>Productos</div>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#334155' }}>{totalUnidades.toLocaleString()}</div>
          <div style={{ fontSize: '.65rem', color: '#64748b' }}>Total Unidades</div>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#334155' }}>${totalCosto.toLocaleString()}</div>
          <div style={{ fontSize: '.65rem', color: '#64748b' }}>Valor Total</div>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#334155' }}>${Math.round(promedioCosto).toLocaleString()}</div>
          <div style={{ fontSize: '.65rem', color: '#64748b' }}>Costo Promedio</div>
        </div>
      </div>

      <div className="card">
        <div className="sec-title">Datos de Inventario (Simulación Excel)</div>
        <div style={{ overflowX: 'auto' }}>
          <table className="tbl">
            <thead>
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Cantidad</th>
                <th>Costo Unitario</th>
                <th>Proveedor</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id}>
                  <td style={{ fontFamily: 'JetBrains Mono', fontWeight: 600 }}>{item.id}</td>
                  <td>{item.producto}</td>
                  <td><span className="badge badge-blue">{item.categoria}</span></td>
                  <td style={{ textAlign: 'right', color: item.cantidad < 50 ? '#ef4444' : '#334155' }}>{item.cantidad}</td>
                  <td style={{ textAlign: 'right', fontFamily: 'JetBrains Mono' }}>${item.costo.toLocaleString()}</td>
                  <td style={{ color: '#64748b' }}>{item.proveedor}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: '.65rem' }}>{item.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="sec-title">Ejercicios de Excel</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '.75rem' }}>
          {EXERCISES.map(ex => (
            <div key={ex.id} style={{ padding: '.75rem', background: '#f8fafc', borderRadius: 8, cursor: 'pointer' }} onClick={() => { setSelectedExercise(ex); calculateExercise(ex.id); }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.25rem' }}>
                <span style={{ fontWeight: 600, fontSize: '.8rem', color: '#334155' }}>{ex.title}</span>
                <span className="badge badge-green" style={{ fontSize: '.55rem' }}>{ex.category}</span>
              </div>
              <p style={{ fontSize: '.65rem', color: '#64748b' }}>{ex.description}</p>
              {results[ex.id] !== undefined && (
                <div style={{ marginTop: '.5rem', padding: '.25rem .5rem', background: '#e2e8f0', borderRadius: 4, fontSize: '.65rem', fontFamily: 'JetBrains Mono' }}>
                  Resultado: {typeof results[ex.id] === 'number' && results[ex.id] > 1000 ? `$${results[ex.id].toLocaleString()}` : results[ex.id]}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedExercise && (
        <div className="card">
          <div className="sec-title">{selectedExercise.title}</div>
          <p style={{ fontSize: '.8rem', color: '#64748b', marginBottom: '.75rem' }}>{selectedExercise.description}</p>
          
          <div style={{ background: '#f8fafc', borderRadius: 8, padding: '1rem', marginBottom: '.75rem' }}>
            <div style={{ fontSize: '.7rem', color: '#64748b', marginBottom: '.25rem' }}>Fórmula en Excel:</div>
            <code style={{ fontFamily: 'JetBrains Mono', fontSize: '.85rem', color: '#334155' }}>{selectedExercise.formula}</code>
          </div>

          <div style={{ display: 'flex', gap: '.75rem', alignItems: 'center' }}>
            <button onClick={() => calculateExercise(selectedExercise.id)} className="btn-primary" style={{ padding: '.5rem 1rem', fontSize: '.75rem' }}>
              Calcular
            </button>
            {results[selectedExercise.id] !== undefined && (
              <div style={{ padding: '.5rem 1rem', background: '#dcfce7', borderRadius: 8 }}>
                <span style={{ fontSize: '.7rem', color: '#64748b' }}>Resultado: </span>
                <span style={{ fontWeight: 600, color: '#166534' }}>
                  {typeof results[selectedExercise.id] === 'number' && results[selectedExercise.id] > 1000 
                    ? `$${results[selectedExercise.id].toLocaleString()}`
                    : results[selectedExercise.id]}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="card">
        <div className="sec-title">Funciones de Excel Más Usadas en Logística</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '.5rem' }}>
          {[
            ['SUMA', 'Sumar valores'],
            ['SUMAR.SI', 'Sumar con condición'],
            ['CONTAR', 'Contar celdas'],
            ['CONTAR.SI', 'Contar con condición'],
            ['BUSCARV', 'Buscar en tabla'],
            ['BUSCARH', 'Buscar horizontal'],
            ['INDICE', 'Referencia por posición'],
            ['COINCIDIR', 'Buscar posición'],
            ['SI', 'Condicional'],
            ['Y/O', 'Condiciones múltiples'],
            ['CONCATENAR', 'Unir textos'],
            ['EXTRAE', 'Extraer caracteres'],
          ].map(([fn, desc]) => (
            <div key={fn} style={{ padding: '.4rem', background: '#f8fafc', borderRadius: 6, textAlign: 'center' }}>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: '.65rem', fontWeight: 600, color: '#334155' }}>{fn}()</div>
              <div style={{ fontSize: '.55rem', color: '#94a3b8' }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="sec-title">Atajos de Teclado en Excel</div>
        <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
          {[
            ['Ctrl+C', 'Copiar'],
            ['Ctrl+V', 'Pegar'],
            ['Ctrl+Z', 'Deshacer'],
            ['Ctrl+B', 'Negrita'],
            ['Ctrl+S', 'Guardar'],
            ['F2', 'Editar celda'],
            ['Alt+=', 'Autosuma'],
            ['Ctrl+Shift+L', 'Filtros'],
          ].map(([key, action]) => (
            <div key={key} style={{ padding: '.3rem .5rem', background: '#f1f5f9', borderRadius: 4, display: 'flex', gap: '.5rem', alignItems: 'center' }}>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: '.6rem', background: '#e2e8f0', padding: '.1rem .3rem', borderRadius: 3 }}>{key}</span>
              <span style={{ fontSize: '.6rem', color: '#64748b' }}>{action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
