import React, { useState, useEffect, useRef } from 'react';

const ACTORS = {
  proveedor: { emoji: '🏭', label: 'Proveedor', color: '#3b82f6', x: 50, y: 20 },
  manufactura: { emoji: '⚙️', label: 'Manufactura', color: '#8b5cf6', x: 50, y: 35 },
  cedi: { emoji: '📦', label: 'CEDI', color: '#f59e0b', x: 50, y: 50 },
  mayorista: { emoji: '🏪', label: 'Mayorista', color: '#10b981', x: 30, y: 70 },
  minorista: { emoji: '🏪', label: 'Minorista', color: '#06b6d4', x: 50, y: 70 },
  retailer: { emoji: '🏬', label: 'Retailer', color: '#ec4899', x: 70, y: 70 },
  cliente: { emoji: '👤', label: 'Cliente', color: '#ef4444', x: 50, y: 85 }
};

const PIXEL_ART = {
  proveedor: `████▀▀█▀▀████
██▀▄▀▄▀▄▀▄▀██
██▄▀▄▀▄▀▄▀▄▀██
████████████
  ██████
  ██████`,
  manufactura: `  ██  ██
████████████
▀▀█▀▀▀▀█▀▀▀
████████████
▀▀█▀▀▀▀█▀▀▀
  ██  ██`,
  cedi: `████████████
██▀▀▀▀▀▀▀▀██
██        ██
██        ██
████████████`,
  mayorista: `████████████
██  ██  ██  ██
████████████
  ████████
  ████████`,
  minorista: `   ██████   
  ████████  
████████████
██▀▀▀▀▀▀▀▀██
████████████`,
  cliente: `    ██    
   ██ ██   
  ████████  
   ██ ██   
    ██`
};

export default function LabSupplyChain() {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedActor, setSelectedActor] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [simulation, setSimulation] = useState(false);
  const [time, setTime] = useState(0);
  const [packages, setPackages] = useState([]);
  const [mode, setMode] = useState('lineal');
  const [params, setParams] = useState({
    leadTimeMin: 1,
    leadTimeMax: 3,
    demandMin: 10,
    demandMax: 50,
    transformCost: 5,
    holdingCost: 2
  });
  const canvasRef = useRef(null);

  useEffect(() => {
    if (simulation && nodes.length > 1) {
      const interval = setInterval(() => {
        setTime(t => t + 1);
        setPackages(pkgs => {
          const active = pkgs.filter(p => p.progress < 100);
          if (active.length < params.demandMax && Math.random() > 0.7) {
            const startNode = nodes[0];
            const newPkg = {
              id: Date.now(),
              from: startNode.id,
              to: connections.find(c => c.from === startNode.id)?.to || nodes[1].id,
              progress: 0,
              stage: 0,
              value: Math.floor(Math.random() * (params.demandMax - params.demandMin) + params.demandMin)
            };
            return [...active, newPkg];
          }
          return active.map(p => ({
            ...p,
            progress: p.progress + (Math.random() * 5 + 2)
          }));
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [simulation, nodes, connections, params, time]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    nodes.forEach(node => {
      ctx.fillStyle = node.color + '40';
      ctx.beginPath();
      ctx.arc(node.x * 6, node.y * 5, 25, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#fff';
      ctx.font = '30px serif';
      ctx.textAlign = 'center';
      ctx.fillText(node.emoji, node.x * 6, node.y * 5 + 10);
      
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px sans-serif';
      ctx.fillText(node.label, node.x * 6, node.y * 5 + 40);
    });

    connections.forEach(conn => {
      const fromNode = nodes.find(n => n.id === conn.from);
      const toNode = nodes.find(n => n.id === conn.to);
      if (!fromNode || !toNode) return;
      
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(fromNode.x * 6, fromNode.y * 5);
      
      if (mode === 'circular') {
        const midX = (fromNode.x + toNode.x) / 6 + 50;
        const midY = Math.max(fromNode.y, toNode.y) * 5 - 30;
        ctx.quadraticCurveTo(midX, midY, toNode.x * 6, toNode.y * 5);
      } else {
        ctx.lineTo(toNode.x * 6, toNode.y * 5);
      }
      ctx.stroke();

      packages.forEach(pkg => {
        if (pkg.from === conn.from && pkg.to === conn.to) {
          const prog = pkg.progress / 100;
          const px = fromNode.x * 6 + (toNode.x * 6 - fromNode.x * 6) * prog;
          const py = fromNode.y * 5 + (toNode.y * 5 - fromNode.y * 5) * prog;
          
          ctx.fillStyle = '#fbbf24';
          ctx.beginPath();
          ctx.arc(px, py, 6, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.fillStyle = '#000';
          ctx.font = '8px sans-serif';
          ctx.fillText(pkg.value, px, py - 10);
        }
      });
    });
  }, [nodes, connections, packages, mode]);

  const addNode = (actorKey) => {
    const actor = ACTORS[actorKey];
    const newNode = {
      id: Date.now(),
      key: actorKey,
      emoji: actor.emoji,
      label: actor.label,
      color: actor.color,
      x: actor.x + (Math.random() - 0.5) * 10,
      y: actor.y + (Math.random() - 0.5) * 10
    };
    setNodes([...nodes, newNode]);
  };

  const connectNodes = () => {
    if (nodes.length >= 2) {
      const newConn = {
        from: nodes[nodes.length - 2].id,
        to: nodes[nodes.length - 1].id,
        leadTime: Math.floor(Math.random() * (params.leadTimeMax - params.leadTimeMin + 1)) + params.leadTimeMin
      };
      setConnections([...connections, newConn]);
    }
  };

  const clearAll = () => {
    setNodes([]);
    setConnections([]);
    setPackages([]);
    setTime(0);
  };

  return (
    <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
      <div className="card gradient-header" style={{padding:'1.5rem'}}>
        <h1 style={{fontSize:'1.5rem',fontWeight:900,color:'#fff'}}>🔗 Simulador de Supply Chain</h1>
        <p style={{color:'#94a3b8',fontSize:'.85rem'}}>Diseña tu cadena de suministro y simula el flujo de productos</p>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'250px 1fr',gap:'1rem'}}>
        <div style={{display:'flex',flexDirection:'column',gap:'.75rem'}}>
          <div className="card">
            <div className="sec-title">🏗️ Actores</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.5rem'}}>
              {Object.entries(ACTORS).map(([key, actor]) => (
                <button
                  key={key}
                  onClick={() => addNode(key)}
                  style={{
                    padding:'.5rem',
                    background:'#1e293b',
                    border:'1px solid #334155',
                    borderRadius:'6px',
                    cursor:'pointer',
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                    gap:'.25rem'
                  }}
                >
                  <span style={{fontSize:'1.5rem'}}>{actor.emoji}</span>
                  <span style={{fontSize:'.6rem',color:'#94a3b8'}}>{actor.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="sec-title">⚙️ Parámetros</div>
            <div style={{display:'flex',flexDirection:'column',gap:'.5rem',fontSize:'.75rem'}}>
              <label style={{display:'flex',justifyContent:'space-between'}}>
                <span>Lead Time Min:</span>
                <input type="number" value={params.leadTimeMin} onChange={e=>setParams({...params,leadTimeMin:parseInt(e.target.value)})} style={{width:40,background:'#0f172a',border:'1px solid #334155',color:'#fff',borderRadius:4}} />
              </label>
              <label style={{display:'flex',justifyContent:'space-between'}}>
                <span>Lead Time Max:</span>
                <input type="number" value={params.leadTimeMax} onChange={e=>setParams({...params,leadTimeMax:parseInt(e.target.value)})} style={{width:40,background:'#0f172a',border:'1px solid #334155',color:'#fff',borderRadius:4}} />
              </label>
              <label style={{display:'flex',justifyContent:'space-between'}}>
                <span>Demanda Min:</span>
                <input type="number" value={params.demandMin} onChange={e=>setParams({...params,demandMin:parseInt(e.target.value)})} style={{width:40,background:'#0f172a',border:'1px solid #334155',color:'#fff',borderRadius:4}} />
              </label>
              <label style={{display:'flex',justifyContent:'space-between'}}>
                <span>Demanda Max:</span>
                <input type="number" value={params.demandMax} onChange={e=>setParams({...params,demandMax:parseInt(e.target.value)})} style={{width:40,background:'#0f172a',border:'1px solid #334155',color:'#fff',borderRadius:4}} />
              </label>
            </div>
          </div>

          <div className="card">
            <div className="sec-title">🔄 Modo</div>
            <div style={{display:'flex',gap:'.5rem'}}>
              <button onClick={() => setMode('lineal')} style={{flex:1,padding:'.5rem',background:mode==='lineal'?'#10b981':'#1e293b',border:'1px solid #334155',borderRadius:6,cursor:'pointer',color:'#fff'}}>
                Lineal →
              </button>
              <button onClick={() => setMode('circular')} style={{flex:1,padding:'.5rem',background:mode==='circular'?'#10b981':'#1e293b',border:'1px solid #334155',borderRadius:6,cursor:'pointer',color:'#fff'}}>
                Circular 🔄
              </button>
            </div>
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:'.5rem'}}>
            <button onClick={connectNodes} disabled={nodes.length<2} style={{padding:'.75rem',background:'#3b82f6',border:'none',borderRadius:8,cursor:'pointer',color:'#fff',fontWeight:'bold'}}>
              🔗 Conectar Nodos
            </button>
            <button onClick={() => setSimulation(!simulation)} style={{padding:'.75rem',background:simulation?'#ef4444':'#10b981',border:'none',borderRadius:8,cursor:'pointer',color:'#fff',fontWeight:'bold'}}>
              {simulation ? '⏹️ Detener' : '▶️ Iniciar Simulación'}
            </button>
            <button onClick={clearAll} style={{padding:'.75rem',background:'#475569',border:'none',borderRadius:8,cursor:'pointer',color:'#fff'}}>
              🗑️ Limpiar Todo
            </button>
          </div>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'.75rem'}}>
          <canvas
            ref={canvasRef}
            width={600}
            height={500}
            style={{background:'#0f172a',borderRadius:12,border:'2px solid #1e293b'}}
          />
          
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'.5rem'}}>
            <div className="card" style={{textAlign:'center'}}>
              <div style={{fontSize:'.7rem',color:'#94a3b8'}}>NODOS</div>
              <div style={{fontSize:'1.5rem',fontWeight:'bold',color:'#10b981'}}>{nodes.length}</div>
            </div>
            <div className="card" style={{textAlign:'center'}}>
              <div style={{fontSize:'.7rem',color:'#94a3b8'}}>CONEXIONES</div>
              <div style={{fontSize:'1.5rem',fontWeight:'bold',color:'#10b981'}}>{connections.length}</div>
            </div>
            <div className="card" style={{textAlign:'center'}}>
              <div style={{fontSize:'.7rem',color:'#94a3b8'}}>PAQUETES</div>
              <div style={{fontSize:'1.5rem',fontWeight:'bold',color:'#10b981'}}>{packages.length}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}