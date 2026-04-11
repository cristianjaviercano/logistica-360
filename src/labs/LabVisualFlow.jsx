import React, { useState, useEffect } from 'react';

const INITIAL_DATA = [
  { id: 'SKU-001', name: 'Portátil HP 15s', category: 'Electrónica', quantity: 150, cost: 450, location: 'A-01-01' },
  { id: 'SKU-002', name: 'Mouse Inalámbrico', category: 'Accesorios', quantity: 500, cost: 25, location: 'B-02-03' },
  { id: 'SKU-003', name: 'Escritorio Metal', category: 'Mobiliario', quantity: 45, cost: 280, location: 'C-01-01' },
  { id: 'SKU-004', name: 'Silla Ergonómica', category: 'Mobiliario', quantity: 30, cost: 350, location: 'C-01-02' },
  { id: 'SKU-005', name: 'Monitor 24"', category: 'Electrónica', quantity: 80, cost: 180, location: 'A-02-01' },
  { id: 'SKU-006', name: 'Teclado Mecánico', category: 'Accesorios', quantity: 200, cost: 75, location: 'B-01-02' },
];

const ANIMATION_STEPS = {
  array: {
    title: 'Array (Arreglo)',
    description: 'Secuencia ordenada de elementos accessed by index. En logística: lista de SKUs en un pedido.',
    visualize: (data) => data.map((item, i) => ({ index: i, value: item.id, label: item.name }))
  },
  hash: {
    title: 'Hash Table (Diccionario)',
    description: 'Estructura clave-valor para búsqueda O(1). En logística: {código SKU → información del producto}.',
    visualize: (data) => data.map(item => ({ key: item.id, value: item.name }))
  },
  queue: {
    title: 'Cola (FIFO)',
    description: 'First In First Out. En logística: pedidos por procesar en orden de llegada.',
    visualize: (data) => data.map((item, i) => ({ order: i + 1, value: item.id, status: i === 0 ? 'Procesando' : 'En espera' }))
  },
  stack: {
    title: 'Pila (LIFO)',
    description: 'Last In First Out. En logística: método PEPS para gestión de inventario.',
    visualize: (data) => [...data].reverse().map((item, i) => ({ position: i, value: item.id, method: i === 0 ? 'PEPS' : 'Stock anterior' }))
  },
  tree: {
    title: 'Árbol Jerárquico',
    description: 'Estructura padre-hijo. En logística: categorías de productos (Electrónica > Computadores > Portátiles).',
    visualize: () => [
      { id: 1, name: 'Inventario', level: 0 },
      { id: 2, name: 'Electrónica', level: 1, parent: 1 },
      { id: 3, name: 'Mobiliario', level: 1, parent: 1 },
      { id: 4, name: 'Accesorios', level: 1, parent: 1 },
      { id: 5, name: 'Portátiles', level: 2, parent: 2 },
      { id: 6, name: 'Monitores', level: 2, parent: 2 },
      { id: 7, name: 'Sillas', level: 2, parent: 3 },
      { id: 8, name: 'Escritorios', level: 2, parent: 3 },
    ]
  },
  graph: {
    title: 'Grafo (Red de Distribución)',
    description: 'Nodos conectados con aristas ponderadas. En logística: red de rutas entre almacenes y centros de distribución.',
    visualize: () => [
      { node: 'CEDI Principal', connections: ['Bodega Norte', 'Bodega Sur'], distances: [50, 80] },
      { node: 'Bodega Norte', connections: ['CEDI Principal', 'Punto Venta 1', 'Punto Venta 2'], distances: [50, 20, 30] },
      { node: 'Bodega Sur', connections: ['CEDI Principal', 'Punto Venta 3'], distances: [80, 40] },
      { node: 'Punto Venta 1', connections: ['Bodega Norte'], distances: [20] },
      { node: 'Punto Venta 2', connections: ['Bodega Norte'], distances: [30] },
      { node: 'Punto Venta 3', connections: ['Bodega Sur'], distances: [40] },
    ]
  }
};

export default function LabVisualFlow() {
  const [data, setData] = useState(INITIAL_DATA);
  const [selectedType, setSelectedType] = useState('array');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showCode, setShowCode] = useState(false);
  const [operationLog, setOperationLog] = useState(['Sistema inicializado con datos de ejemplo']);

  const addLog = (message) => {
    setOperationLog(prev => [`[${new Date().toLocaleTimeString()}] ${message}`, ...prev.slice(0, 4)]);
  };

  const handleAddItem = () => {
    const newId = `SKU-${String(data.length + 1).padStart(3, '0')}`;
    const newItem = {
      id: newId,
      name: `Producto ${data.length + 1}`,
      category: 'General',
      quantity: Math.floor(Math.random() * 100) + 10,
      cost: Math.floor(Math.random() * 500) + 50,
      location: `${String.fromCharCode(65 + Math.floor(Math.random() * 3))}-${String(Math.floor(Math.random() * 3) + 1).padStart(2, '0')}-01`
    };
    setData([...data, newItem]);
    addLog(`Agregado: ${newId} - ${newItem.name}`);
    setSelectedItem(newItem);
  };

  const handleRemoveItem = (id) => {
    setData(data.filter(item => item.id !== id));
    addLog(`Eliminado: ${id}`);
    setSelectedItem(null);
  };

  const handleSearch = (id) => {
    const found = data.find(item => item.id === id);
    if (found) {
      setSelectedItem(found);
      addLog(`Búsqueda exitosa: ${id}`);
    } else {
      addLog(`Búsqueda fallida: ${id} no encontrado`);
    }
  };

  const visualData = ANIMATION_STEPS[selectedType].visualize(data);

  return (
    <div className="animate-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="card gradient-header" style={{ padding: '2rem' }}>
        <span style={{ fontSize: '.7rem', fontFamily: 'JetBrains Mono', color: '#64748b' }}>LABORATORIO VISUAL · Estructura de Datos</span>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#1e293b', marginTop: '.25rem' }}>Visualizador Interactivo</h1>
        <p style={{ color: '#64748b', marginTop: '.5rem', fontSize: '.85rem' }}>
          Explora visualmente cómo se estructuran y manipulan los datos en sistemas logísticos
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="card">
          <div className="sec-title">Selecciona una Estructura</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
            {Object.keys(ANIMATION_STEPS).map(type => (
              <button
                key={type}
                onClick={() => { setSelectedType(type); setSelectedItem(null); addLog(`Cambiado a: ${ANIMATION_STEPS[type].title}`); }}
                className={`btn-secondary ${selectedType === type ? 'active' : ''}`}
                style={{
                  padding: '0.5rem', fontSize: '0.7rem', textAlign: 'center',
                  background: selectedType === type ? '#e2e8f0' : '#f8fafc',
                  borderColor: selectedType === type ? '#475569' : '#e2e8f0'
                }}
              >
                {ANIMATION_STEPS[type].title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="sec-title">Operaciones</div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button onClick={handleAddItem} className="btn-primary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.7rem' }}>
              + Agregar
            </button>
            <button onClick={() => setShowCode(!showCode)} className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.7rem' }}>
              {showCode ? 'Ocultar Código' : 'Ver Código'}
            </button>
            <button onClick={() => setData(INITIAL_DATA)} className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.7rem' }}>
              Reiniciar
            </button>
          </div>
        </div>
      </div>

      <div className="lab-visual-container">
        <div className="lab-visual-canvas" style={{ padding: '1.5rem', minHeight: 280 }}>
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b' }}>{ANIMATION_STEPS[selectedType].title}</h3>
            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{ANIMATION_STEPS[selectedType].description}</p>
          </div>

          {selectedType === 'array' && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {visualData.map((item, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedItem(data[i])}
                  style={{
                    padding: '0.5rem 0.75rem',
                    background: selectedItem?.id === item.value ? '#e2e8f0' : '#f8fafc',
                    border: selectedItem?.id === item.value ? '2px solid #475569' : '1px solid #e2e8f0',
                    borderRadius: 8,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>Index {item.index}</div>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>{item.value}</div>
                </div>
              ))}
            </div>
          )}

          {selectedType === 'hash' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              {visualData.map((item, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedItem(data[i])}
                  style={{
                    padding: '0.75rem',
                    background: selectedItem?.id === item.key ? '#e2e8f0' : '#f8fafc',
                    border: selectedItem?.id === item.key ? '2px solid #475569' : '1px solid #e2e8f0',
                    borderRadius: 8,
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontSize: '0.6rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Key</div>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>{item.key}</div>
                  <div style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '0.25rem' }}>→ {item.value}</div>
                </div>
              ))}
            </div>
          )}

          {selectedType === 'queue' && (
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', overflowX: 'auto', padding: '0.5rem 0' }}>
              <div style={{ padding: '0.5rem', background: '#f1f5f9', borderRadius: 6, fontSize: '0.65rem', color: '#64748b' }}>FRENTE ↓</div>
              {visualData.map((item, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedItem(data[i])}
                  style={{
                    padding: '0.5rem 0.75rem',
                    background: item.status === 'Procesando' ? '#dcfce7' : '#f8fafc',
                    border: item.status === 'Procesando' ? '2px solid #475569' : '1px solid #e2e8f0',
                    borderRadius: 8,
                    minWidth: 80,
                    textAlign: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontSize: '0.6rem', color: item.status === 'Procesando' ? '#166534' : '#64748b' }}>#{item.order}</div>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', fontWeight: 600 }}>{item.value}</div>
                  <div style={{ fontSize: '0.55rem', color: item.status === 'Procesando' ? '#166534' : '#94a3b8' }}>{item.status}</div>
                </div>
              ))}
              <div style={{ padding: '0.5rem', background: '#f1f5f9', borderRadius: 6, fontSize: '0.65rem', color: '#64748b' }}>← COLA</div>
            </div>
          )}

          {selectedType === 'stack' && (
            <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: '0.25rem', alignItems: 'center' }}>
              {visualData.map((item, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedItem(data.find(d => d.id === item.value))}
                  style={{
                    padding: '0.4rem 1rem',
                    background: item.method === 'PEPS' ? '#dcfce7' : '#f8fafc',
                    border: item.method === 'PEPS' ? '2px solid #475569' : '1px solid #e2e8f0',
                    borderRadius: 6,
                    minWidth: 120,
                    textAlign: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: '0.65rem', color: item.method === 'PEPS' ? '#166534' : '#64748b' }}>{item.method}</span>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', fontWeight: 600, marginLeft: '0.5rem' }}>{item.value}</span>
                </div>
              ))}
              <div style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '0.5rem' }}>↑ Tope (PEPS)</div>
            </div>
          )}

          {selectedType === 'tree' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              {[
                { items: [{ name: 'Inventario', children: 3 }], level: 0 },
                { items: [{ name: 'Electrónica', children: 2 }, { name: 'Mobiliario', children: 2 }, { name: 'Accesorios', children: 0 }], level: 1 },
                { items: [{ name: 'Portátiles' }, { name: 'Monitores' }, { name: 'Sillas' }, { name: 'Escritorios' }, { name: 'Periféricos' }], level: 2 },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                  {row.items.map((item, j) => (
                    <div
                      key={j}
                      style={{
                        padding: '0.4rem 0.75rem',
                        background: row.level === 0 ? '#334155' : row.level === 1 ? '#64748b' : '#e2e8f0',
                        color: row.level <= 1 ? '#fff' : '#334155',
                        borderRadius: 6,
                        fontSize: '0.7rem',
                        fontWeight: row.level < 2 ? 600 : 400,
                        position: 'relative'
                      }}
                    >
                      {item.name}
                      {item.children > 0 && <span style={{ marginLeft: '0.25rem', opacity: 0.7 }}>({item.children})</span>}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {selectedType === 'graph' && (
            <svg width="100%" height="180" viewBox="0 0 500 180">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                </marker>
              </defs>
              <g>
                <circle cx="250" cy="30" r="25" fill="#334155" />
                <text x="250" y="35" textAnchor="middle" fill="white" fontSize="9">CEDI Principal</text>
                
                <circle cx="100" cy="90" r="20" fill="#64748b" />
                <text x="100" y="95" textAnchor="middle" fill="white" fontSize="8">Bodega Norte</text>
                
                <circle cx="400" cy="90" r="20" fill="#64748b" />
                <text x="400" y="95" textAnchor="middle" fill="white" fontSize="8">Bodega Sur</text>
                
                <circle cx="40" cy="150" r="15" fill="#94a3b8" />
                <text x="40" y="155" textAnchor="middle" fill="white" fontSize="7">PV1</text>
                
                <circle cx="100" cy="150" r="15" fill="#94a3b8" />
                <text x="100" y="155" textAnchor="middle" fill="white" fontSize="7">PV2</text>
                
                <circle cx="400" cy="150" r="15" fill="#94a3b8" />
                <text x="400" y="155" textAnchor="middle" fill="white" fontSize="7">PV3</text>

                <line x1="250" y1="55" x2="120" y2="70" stroke="#cbd5e1" strokeWidth="1" markerEnd="url(#arrowhead)" />
                <text x="170" y="55" fontSize="7" fill="#64748b">50km</text>
                
                <line x1="250" y1="55" x2="380" y2="70" stroke="#cbd5e1" strokeWidth="1" markerEnd="url(#arrowhead)" />
                <text x="320" y="55" fontSize="7" fill="#64748b">80km</text>
                
                <line x1="100" y1="70" x2="55" y2="135" stroke="#cbd5e1" strokeWidth="1" markerEnd="url(#arrowhead)" />
                <text x="50" y="95" fontSize="7" fill="#64748b">20km</text>
                
                <line x1="100" y1="70" x2="100" y2="135" stroke="#cbd5e1" strokeWidth="1" markerEnd="url(#arrowhead)" />
                <text x="105" y="105" fontSize="7" fill="#64748b">30km</text>
                
                <line x1="400" y1="70" x2="400" y2="135" stroke="#cbd5e1" strokeWidth="1" markerEnd="url(#arrowhead)" />
                <text x="405" y="105" fontSize="7" fill="#64748b">40km</text>
              </g>
            </svg>
          )}
        </div>

        {showCode && (
          <div style={{ padding: '1rem', borderTop: '1px solid #e2e8f0', background: '#fafafa' }}>
            <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '0.5rem' }}>Código de ejemplo:</div>
            <pre style={{ fontSize: '0.65rem', fontFamily: 'JetBrains Mono', color: '#334155', overflow: 'auto' }}>
{`// ${selectedType} en JavaScript
${selectedType === 'array' ? `const productos = [${data.map(d => `"${d.id}"`).join(', ')}];
productos[0]; // "${data[0]?.id}"` : ''}
${selectedType === 'hash' ? `const inventario = {
${data.map(d => `  "${d.id}": "${d.name}"`).join(',\n')}
};
inventario["SKU-001"]; // "${data[0]?.name}"` : ''}
${selectedType === 'queue' ? `const colaPedidos = [];
colaPedidos.push("Pedido 1");
colaPedidos.push("Pedido 2");
colaPedidos.shift(); // Procesa "Pedido 1"` : ''}
${selectedType === 'stack' ? `const stockPEPS = [];
stockPEPS.push("Lote A");
stockPEPS.push("Lote B");
stockPEPS.pop(); // Sale "Lote B"` : ''}`}
            </pre>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
        <div className="card">
          <div className="sec-title">Datos Actuales ({data.length} registros)</div>
          <div style={{ maxHeight: 200, overflow: 'auto' }}>
            <table className="tbl">
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Cantidad</th>
                  <th>Ubicación</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {data.map(item => (
                  <tr key={item.id} onClick={() => setSelectedItem(item)} style={{ cursor: 'pointer', background: selectedItem?.id === item.id ? '#f1f5f9' : 'transparent' }}>
                    <td style={{ fontFamily: 'JetBrains Mono', fontSize: '.7rem' }}>{item.id}</td>
                    <td>{item.name}</td>
                    <td><span className="badge badge-blue">{item.category}</span></td>
                    <td style={{ textAlign: 'right' }}>{item.quantity}</td>
                    <td style={{ fontFamily: 'JetBrains Mono', fontSize: '.7rem' }}>{item.location}</td>
                    <td>
                      <button onClick={(e) => { e.stopPropagation(); handleRemoveItem(item.id); }} style={{ padding: '0.2rem 0.4rem', fontSize: '0.6rem', background: '#fee2e2', border: 'none', borderRadius: 4, color: '#dc2626', cursor: 'pointer' }}>
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="sec-title">Log de Operaciones</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {operationLog.map((log, i) => (
              <div key={i} style={{ fontSize: '0.65rem', fontFamily: 'JetBrains Mono', color: i === 0 ? '#334155' : '#94a3b8', padding: '0.25rem 0', borderBottom: '1px solid #f1f5f9' }}>
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedItem && (
        <div className="card" style={{ padding: '1rem' }}>
          <div className="sec-title">Detalle del Elemento</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.75rem', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#64748b' }}>SKU</div>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', fontWeight: 600 }}>{selectedItem.id}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Nombre</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 500 }}>{selectedItem.name}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Categoría</div>
              <div style={{ fontSize: '0.8rem' }}>{selectedItem.category}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Cantidad</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{selectedItem.quantity}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Costo</div>
              <div style={{ fontSize: '0.8rem' }}>${selectedItem.cost}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Ubicación</div>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem' }}>{selectedItem.location}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
