import React, { useState, useEffect, useRef } from 'react';

export default function LabEOQRealtime({ onScore, gamification }) {
  const [val, setVal] = useState({ D: 10000, S: 50, H: 2.5, L: 5 });
  const [exercise, setExercise] = useState(null);
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const chartRef = useRef(null);

  const eoq = Math.sqrt((2 * val.D * val.S) / val.H);
  const numOrders = val.D / (eoq || 1);
  const dDaily = val.D / 365;
  const rop = dDaily * val.L;
  const tc = (val.D / (eoq || 1)) * val.S + ((eoq || 0) / 2) * val.H;

  const policies = [
    { name: 'EOQ', q: eoq, tc: tc },
    { name: 'Q/2', q: eoq / 2, tc: (val.D / (eoq / 2 || 1)) * val.S + ((eoq / 2 || 0) / 2) * val.H },
    { name: '2×EOQ', q: eoq * 2, tc: (val.D / (eoq * 2 || 1)) * val.S + ((eoq * 2 || 0) / 2) * val.H }
  ].sort((a, b) => a.tc - b.tc);

  const generateExercise = () => {
    const D = Math.floor(Math.random() * 10000 + 5000);
    const S = Math.floor(Math.random() * 100 + 20);
    const H = Math.random() * 5 + 1;
    const targetQ = Math.sqrt((2 * D * S) / H);
    setExercise({ D, S, H, targetQ: Math.round(targetQ) });
    setFeedback({ show: false, type: '', message: '' });
    setAttempts(0);
  };

  useEffect(() => {
    if (exercise) {
      const currentQ = Math.sqrt((2 * exercise.D * exercise.S) / exercise.H);
      const diff = Math.abs(currentQ - exercise.targetQ);
      if (diff < 5) {
        setFeedback({ show: true, type: 'success', message: '🎉 ¡Correcto! Has calculado el EOQ perfectamente.' });
        const points = Math.max(100 - attempts * 10, 20);
        setScore(points);
        if (onScore) onScore(points);
        if (gamification?.unlockAchievement) gamification.unlockAchievement('perfect_eoq');
      } else if (attempts > 0) {
        const hint = diff < 20 ? '¡Muy cerca! Un poco más alto' : diff < 50 ? 'Estás en el rango correcto' : 'Intenta de nuevo';
        setFeedback({ show: true, type: 'warning', message: `💡 Pista: ${hint}. Diferencia: ${Math.round(diff)} unidades` });
      }
    }
  }, [val, exercise, attempts]);

  useEffect(() => {
    const canvas = chartRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const range = [Math.max(eoq * 0.3, 500), Math.min(eoq * 2, 20000)];
    const data = [];
    for (let q = range[0]; q <= range[1]; q += (range[1] - range[0]) / 50) {
      const tc_q = (val.D / q) * val.S + (q / 2) * val.H;
      data.push({ q, tc: tc_q });
    }

    const maxTC = Math.max(...data.map(d => d.tc));
    const minTC = Math.min(...data.map(d => d.tc));
    
    data.forEach((d, i) => {
      const x = (i / data.length) * canvas.width;
      const y = canvas.height - ((d.tc - minTC) / (maxTC - minTC)) * canvas.height * 0.8 - 20;
      ctx.fillStyle = Math.abs(d.q - eoq) < (range[1] - range[0]) / 20 ? '#10b981' : '#3b82f6';
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    data.forEach((d, i) => {
      const x = (i / data.length) * canvas.width;
      const y = canvas.height - ((d.tc - minTC) / (maxTC - minTC)) * canvas.height * 0.8 - 20;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    const bestX = (data.findIndex(d => Math.abs(d.q - eoq) < (range[1] - range[0]) / 20) / data.length) * canvas.width;
    ctx.arc(bestX, canvas.height - ((tc - minTC) / (maxTC - minTC)) * canvas.height * 0.8 - 20, 8, 0, Math.PI * 2);
    ctx.fill();
  }, [val, eoq, tc]);

  const handleChange = (e) => setVal({ ...val, [e.target.name]: Number(e.target.value) });

  return (
    <div className="animate-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="card gradient-header" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '.7rem', fontFamily: 'JetBrains Mono', color: '#10b981' }}>LABORATORIO 5 · EOQ</span>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', marginTop: '.25rem' }}>⚡ Solver EOQ en Tiempo Real</h1>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fbbf24' }}>{score} pts</div>
            <div style={{ fontSize: '.7rem', color: '#94a3b8' }}>{attempts} intentos</div>
          </div>
        </div>
      </div>

      {feedback.show && (
        <div style={{
          padding: '1rem', borderRadius: 8, background: feedback.type === 'success' ? '#10b98120' : '#f59e0b20',
          border: `1px solid ${feedback.type === 'success' ? '#10b981' : '#f59e0b'}`, display: 'flex', alignItems: 'center', gap: '.75rem'
        }}>
          <span style={{ fontSize: '1.5rem' }}>{feedback.type === 'success' ? '✅' : '💡'}</span>
          <span style={{ color: '#fff' }}>{feedback.message}</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
          <div className="card">
            <div className="sec-title">📊 Parámetros</div>
            {['D', 'S', 'H', 'L'].map(param => (
              <div key={param} style={{ marginBottom: '.5rem' }}>
                <label style={{ fontSize: '.7rem', color: '#94a3b8', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{param === 'D' ? 'Demanda Anual' : param === 'S' ? 'Costo Ordenar ($)' : param === 'H' ? 'Costo Mantener ($/u)' : 'Lead Time (días)'}</span>
                  <span style={{ color: '#10b981' }}>{val[param]}</span>
                </label>
                <input type="range" name={param} min={param === 'D' ? 1000 : param === 'S' ? 10 : param === 'H' ? 0.5 : 1}
                  max={param === 'D' ? 50000 : param === 'S' ? 500 : param === 'H' ? 25 : 30}
                  step={param === 'D' ? 1000 : param === 'S' ? 10 : param === 'H' ? 0.5 : 1}
                  value={val[param]} onChange={handleChange} style={{ width: '100%', accentColor: '#10b981' }} />
              </div>
            ))}
          </div>

          <div className="card">
            <div className="sec-title">🎯 Resultados</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem' }}>
              {[
                ['Q* (EOQ)', Math.round(eoq), '#f59e0b'],
                ['Pedidos/año', Math.round(numOrders), '#3b82f6'],
                ['ROP', Math.round(rop), '#10b981'],
                ['Costo Total', `$${Math.round(tc).toLocaleString()}`, '#ec4899']
              ].map(([label, value, color]) => (
                <div key={label} style={{ padding: '.75rem', background: '#0f172a', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: '.65rem', color: '#94a3b8' }}>{label}</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={generateExercise} style={{ padding: '.75rem', background: '#3b82f6', border: 'none', borderRadius: 8, color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
            🎯 Generar Ejercicio
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
          <canvas ref={chartRef} width={500} height={300} style={{ background: '#0f172a', borderRadius: 12, border: '1px solid #1e293b' }} />
          
          <div className="card">
            <div className="sec-title">📈 Comparación de Políticas</div>
            <table style={{ width: '100%', fontSize: '.75rem', color: '#94a3b8' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #334155' }}>
                  <th style={{ textAlign: 'left', padding: '.5rem' }}>Política</th>
                  <th style={{ textAlign: 'right', padding: '.5rem' }}>Cantidad</th>
                  <th style={{ textAlign: 'right', padding: '.5rem' }}>Costo Total</th>
                  <th style={{ textAlign: 'right', padding: '.5rem' }}>Diferencia</th>
                </tr>
              </thead>
              <tbody>
                {policies.map((p, i) => (
                  <tr key={p.name} style={{ borderBottom: '1px solid #1e293b' }}>
                    <td style={{ padding: '.5rem', color: i === 0 ? '#10b981' : '#94a3b8', fontWeight: i === 0 ? 'bold' : 'normal' }}>
                      {i === 0 && '✓ '}{p.name}
                    </td>
                    <td style={{ padding: '.5rem', textAlign: 'right' }}>{Math.round(p.q)}</td>
                    <td style={{ padding: '.5rem', textAlign: 'right' }}>${Math.round(p.tc).toLocaleString()}</td>
                    <td style={{ padding: '.5rem', textAlign: 'right', color: i === 0 ? '#10b981' : '#ef4444' }}>
                      {i === 0 ? '—' : `+${Math.round(p.tc - policies[0].tc).toLocaleString()}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}