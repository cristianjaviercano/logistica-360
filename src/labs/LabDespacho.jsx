import React, { useState, useEffect } from 'react';

const INITIAL_ORDERS = [
  { id: 'PED-001', cliente: 'Almacenes Éxito', productos: 5, prioridad: 'alta', estado: 'pendiente', destino: 'Bogotá' },
  { id: 'PED-002', cliente: 'Mercado Libre', productos: 12, prioridad: 'media', estado: 'pendiente', destino: 'Medellín' },
  { id: 'PED-003', cliente: 'Falabella', productos: 3, prioridad: 'baja', estado: 'pendiente', destino: 'Cali' },
  { id: 'PED-004', cliente: 'Tienda D1', productos: 8, prioridad: 'alta', estado: 'pendiente', destino: 'Bogotá' },
  { id: 'PED-005', cliente: 'Jumbo', productos: 15, prioridad: 'media', estado: 'pendiente', destino: 'Barranquilla' },
];

const INITIAL_INVENTORY = [
  { sku: 'SKU-001', nombre: 'Portátil HP 15s', ubicacion: 'A-01-01', cantidad: 150 },
  { sku: 'SKU-002', nombre: 'Mouse Inalámbrico', ubicacion: 'B-02-03', cantidad: 500 },
  { sku: 'SKU-003', nombre: 'Escritorio Metal', ubicacion: 'C-01-01', cantidad: 45 },
  { sku: 'SKU-004', nombre: 'Silla Ergonómica', ubicacion: 'C-01-02', cantidad: 30 },
  { sku: 'SKU-005', nombre: 'Monitor 24"', ubicacion: 'A-02-01', cantidad: 80 },
  { sku: 'SKU-006', nombre: 'Teclado Mecánico', ubicacion: 'B-01-02', cantidad: 200 },
];

export default function LabDespacho() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [pickingProgress, setPickingProgress] = useState({});
  const [currentPhase, setCurrentPhase] = useState('pendiente');
  const [stats, setStats] = useState({ despachados: 0, errores: 0, tiempo: 0 });
  const [log, setLog] = useState(['Sistema de simulación de despacho iniciado']);

  const addLog = (msg) => setLog(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 4)]);

  const startPicking = (orderId) => {
    setSelectedOrder(orders.find(o => o.id === orderId));
    setCurrentPhase('picking');
    setPickingProgress({});
    addLog(`Iniciado picking para pedido ${orderId}`);
  };

  const completePicking = () => {
    if (selectedOrder) {
      setOrders(prev => prev.map(o => o.id === selectedOrder.id ? { ...o, estado: 'alistado' } : o));
      setCurrentPhase('consolidacion');
      addLog(`Picking completado para ${selectedOrder.id}. Pedido alistado.`);
    }
  };

  const startConsolidation = () => {
    setCurrentPhase('despacho');
    addLog(`Iniciando consolidación para ${selectedOrder.id}`);
  };

  const completeDespatch = () => {
    if (selectedOrder) {
      setOrders(prev => prev.map(o => o.id === selectedOrder.id ? { ...o, estado: 'despachado' } : o));
      setStats(prev => ({ ...prev, despachados: prev.despachados + 1 }));
      setCurrentPhase('completo');
      addLog(`Pedido ${selectedOrder.id} despachado exitosamente`);
      setSelectedOrder(null);
    }
  };

  const selectRoute = (route) => {
    addLog(`Ruta seleccionada: ${route}`);
    setPickingProgress(prev => ({ ...prev, route }));
  };

  const selectEquipment = (equip) => {
    addLog(`Equipo seleccionado: ${equip}`);
    setPickingProgress(prev => ({ ...prev, equipment: equip }));
  };

  const pickProduct = (sku) => {
    setPickingProgress(prev => ({ ...prev, [sku]: true }));
    addLog(`Producto ${sku} recolectado`);
  };

  const getPhaseColor = (phase) => {
    switch(phase) {
      case 'pendiente': return '#94a3b8';
      case 'picking': return '#f59e0b';
      case 'consolidacion': return '#3b82f6';
      case 'despacho': return '#10b981';
      case 'completo': return '#334155';
      default: return '#94a3b8';
    }
  };

  return (
    <div className="animate-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="card gradient-header" style={{ padding: '2rem' }}>
        <span style={{ fontSize: '.7rem', fontFamily: 'JetBrains Mono', color: '#64748b' }}>LABORATORIO · Simulación de Despacho</span>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#1e293b', marginTop: '.25rem' }}>Simulador de Despacho de Mercancías</h1>
        <p style={{ color: '#64748b', marginTop: '.5rem', fontSize: '.85rem' }}>
          Practica el proceso completo de despacho: alistamiento, consolidación y entrega
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="card">
          <div className="sec-title">Fases del Proceso</div>
          <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
            {['pendiente', 'picking', 'consolidacion', 'despacho'].map((phase, i) => (
              <React.Fragment key={phase}>
                <div style={{
                  padding: '.4rem .75rem',
                  background: currentPhase === phase ? getPhaseColor(phase) : '#f1f5f9',
                  color: currentPhase === phase ? '#fff' : '#64748b',
                  borderRadius: 6,
                  fontSize: '.65rem',
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}>
                  {phase === 'picking' ? 'Picking' : phase === 'consolidacion' ? 'Consolid.' : phase === 'despacho' ? 'Despacho' : 'Pendiente'}
                </div>
                {i < 3 && <span style={{ color: '#cbd5e1' }}>→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="sec-title">Estadísticas</div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#334155' }}>{stats.despachados}</div>
              <div style={{ fontSize: '.6rem', color: '#64748b' }}>Despachados</div>
            </div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ef4444' }}>{stats.errores}</div>
              <div style={{ fontSize: '.6rem', color: '#64748b' }}>Errores</div>
            </div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#10b981' }}>{stats.tiempo}s</div>
              <div style={{ fontSize: '.6rem', color: '#64748b' }}>Tiempo</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="card">
          <div className="sec-title">Pedidos en Cola ({orders.length})</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', maxHeight: 250, overflow: 'auto' }}>
            {orders.map(order => (
              <div key={order.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '.75rem',
                padding: '.5rem .75rem',
                background: selectedOrder?.id === order.id ? '#e2e8f0' : '#f8fafc',
                border: order.estado === 'despachado' ? '1px solid #10b981' : '1px solid #e2e8f0',
                borderRadius: 8,
                cursor: 'pointer'
              }} onClick={() => order.estado === 'pendiente' && startPicking(order.id)}>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '.7rem', fontWeight: 600 }}>{order.id}</span>
                <span style={{ fontSize: '.7rem', flex: 1 }}>{order.cliente}</span>
                <span className={`badge ${order.prioridad === 'alta' ? 'badge-red' : order.prioridad === 'media' ? 'badge-yellow' : 'badge-green'}`}>
                  {order.prioridad}
                </span>
                <span style={{ fontSize: '.65rem', color: order.estado === 'despachado' ? '#10b981' : '#64748b' }}>
                  {order.estado}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="sec-title">Inventario Disponible</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.25rem', maxHeight: 250, overflow: 'auto' }}>
            {INITIAL_INVENTORY.map(item => (
              <div key={item.sku} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '.75rem',
                padding: '.4rem .75rem',
                background: pickingProgress[item.sku] ? '#dcfce7' : '#f8fafc',
                borderRadius: 6,
                fontSize: '.7rem'
              }}>
                <span style={{ fontFamily: 'JetBrains Mono', fontWeight: 600, minWidth: 70 }}>{item.sku}</span>
                <span style={{ flex: 1 }}>{item.nombre}</span>
                <span style={{ fontFamily: 'JetBrains Mono', color: '#64748b' }}>{item.ubicacion}</span>
                <span style={{ fontWeight: 600, color: item.cantidad < 50 ? '#ef4444' : '#334155' }}>{item.cantidad}</span>
                {currentPhase === 'picking' && !pickingProgress[item.sku] && (
                  <button onClick={() => pickProduct(item.sku)} style={{ padding: '.2rem .4rem', fontSize: '.6rem', background: '#e2e8f0', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
                    Pick
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedOrder && currentPhase === 'pendiente' && (
        <div className="card">
          <div className="sec-title">Iniciar Picking: {selectedOrder.id}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem' }}>
            <div>
              <div style={{ fontSize: '.7rem', color: '#64748b', marginBottom: '.5rem' }}>1. Selecciona Ruta</div>
              <div style={{ display: 'flex', gap: '.5rem' }}>
                {['Zona A→B→C', 'Zona C→B→A', 'Por destino'].map(route => (
                  <button key={route} onClick={() => selectRoute(route)} className="btn-secondary" style={{ padding: '.4rem .5rem', fontSize: '.65rem' }}>
                    {route}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '.7rem', color: '#64748b', marginBottom: '.5rem' }}>2. Selecciona Equipo</div>
              <div style={{ display: 'flex', gap: '.5rem' }}>
                {['Carretilla', 'Carro Picking', 'Transpaleta'].map(equip => (
                  <button key={equip} onClick={() => selectEquipment(equip)} className="btn-secondary" style={{ padding: '.4rem .5rem', fontSize: '.65rem' }}>
                    {equip}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <button onClick={completePicking} className="btn-primary" disabled={!pickingProgress.route || !pickingProgress.equipment}>
              Completar Picking
            </button>
          </div>
        </div>
      )}

      {selectedOrder && currentPhase === 'picking' && (
        <div className="card">
          <div className="sec-title">Picking en Progreso</div>
          <p style={{ fontSize: '.75rem', color: '#64748b', marginBottom: '.75rem' }}>
            Recolecta los productos del inventario para el pedido {selectedOrder.id}
          </p>
          <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
            {INITIAL_INVENTORY.slice(0, selectedOrder.productos).map(item => (
              <button key={item.sku} onClick={() => pickProduct(item.sku)} className="btn-secondary" style={{ padding: '.4rem .75rem', fontSize: '.7rem', background: pickingProgress[item.sku] ? '#dcfce7' : '#f8fafc' }}>
                {item.sku} {pickingProgress[item.sku] ? '✓' : '+'}
              </button>
            ))}
          </div>
          <div style={{ marginTop: '1rem' }}>
            <button onClick={completePicking} className="btn-primary">
              Finalizar Picking
            </button>
          </div>
        </div>
      )}

      {currentPhase === 'consolidacion' && (
        <div className="card">
          <div className="sec-title">Consolidación de Pedido</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1rem' }}>
            <div style={{ padding: '.75rem', background: '#f8fafc', borderRadius: 8, flex: 1 }}>
              <div style={{ fontSize: '.7rem', color: '#64748b' }}>Cliente</div>
              <div style={{ fontWeight: 600 }}>{selectedOrder?.cliente}</div>
            </div>
            <div style={{ padding: '.75rem', background: '#f8fafc', borderRadius: 8, flex: 1 }}>
              <div style={{ fontSize: '.7rem', color: '#64748b' }}>Destino</div>
              <div style={{ fontWeight: 600 }}>{selectedOrder?.destino}</div>
            </div>
            <div style={{ padding: '.75rem', background: '#f8fafc', borderRadius: 8, flex: 1 }}>
              <div style={{ fontSize: '.7rem', color: '#64748b' }}>Productos</div>
              <div style={{ fontWeight: 600 }}>{selectedOrder?.productos}</div>
            </div>
          </div>
          <button onClick={startConsolidation} className="btn-primary">
            Consolidar y Continuar a Despacho
          </button>
        </div>
      )}

      {currentPhase === 'despacho' && (
        <div className="card">
          <div className="sec-title">Zona de Despacho</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '.5rem', marginBottom: '1rem' }}>
            {['Verificar docs', 'Asignar vehículo', 'Ubicar muelle', 'Cargue'].map((step, i) => (
              <div key={step} style={{ padding: '.5rem', background: i === 3 ? '#fef3c7' : '#f8fafc', borderRadius: 6, textAlign: 'center', fontSize: '.65rem' }}>
                {i + 1}. {step}
              </div>
            ))}
          </div>
          <button onClick={completeDespatch} className="btn-primary">
            Completar Despacho
          </button>
        </div>
      )}

      <div className="card">
        <div className="sec-title">Log de Operaciones</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.25rem' }}>
          {log.map((l, i) => (
            <div key={i} style={{ fontSize: '.6rem', fontFamily: 'JetBrains Mono', color: i === 0 ? '#334155' : '#94a3b8', padding: '.2rem 0', borderBottom: '1px solid #f1f5f9' }}>
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
