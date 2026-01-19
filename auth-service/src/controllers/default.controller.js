// routes/default.js
exports.defaultRoute = (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cloud Native Backend App</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&display=swap');

  body {
    margin: 0;
    font-family: 'Orbitron', sans-serif;
    background: radial-gradient(circle at center, #0f0c29, #302b63, #24243e);
    color: #00fff7;
    overflow: hidden;
  }

  /* Floating particle nodes */
  .particle {
    position: absolute;
    width: 8px;
    height: 8px;
    background: #00fff7;
    border-radius: 50%;
    opacity: 0.7;
    animation: floatParticle linear infinite;
  }

  @keyframes floatParticle {
    0% { transform: translateY(100vh) translateX(0) scale(1); opacity: 0.3; }
    50% { opacity: 0.8; }
    100% { transform: translateY(-100vh) translateX(50px) scale(0.5); opacity: 0; }
  }

  /* Glowing title */
  h1 {
    text-align: center;
    font-size: 3rem;
    margin-top: 50px;
    text-shadow: 0 0 5px #00fff7, 0 0 10px #00fff7, 0 0 20px #00fff7, 0 0 40px #00fff7;
    animation: neonGlow 1.5s ease-in-out infinite alternate;
  }

  @keyframes neonGlow {
    0% { text-shadow: 0 0 5px #00fff7, 0 0 10px #00fff7, 0 0 20px #00fff7, 0 0 40px #00fff7; }
    50% { text-shadow: 0 0 10px #00fff7, 0 0 20px #00fff7, 0 0 30px #00fff7, 0 0 60px #00fff7; }
    100% { text-shadow: 0 0 5px #00fff7, 0 0 10px #00fff7, 0 0 20px #00fff7, 0 0 40px #00fff7; }
  }

  /* Dashboard panel */
  .dashboard {
    margin: 50px auto;
    max-width: 800px;
    background: rgba(0, 15, 30, 0.7);
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 0 20px #00fff7;
    backdrop-filter: blur(10px);
    text-align: center;
  }

  .dashboard h2 {
    margin-bottom: 1rem;
    font-size: 2rem;
    color: #00fff7;
    text-shadow: 0 0 5px #00fff7;
  }

  /* Buttons for smart actions */
  .dashboard button {
    margin: 0.5rem;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    color: #0f0c29;
    background: linear-gradient(135deg, #00fff7, #ff00f7);
    border: none;
    border-radius: 12px;
    cursor: pointer;
    box-shadow: 0 0 10px #00fff7, 0 0 20px #ff00f7;
    transition: 0.3s;
  }

  .dashboard button:hover {
    transform: scale(1.1);
    box-shadow: 0 0 20px #00fff7, 0 0 40px #ff00f7;
  }

  /* Small info boxes */
  .info-boxes {
    display: flex;
    justify-content: space-around;
    margin-top: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .info-box {
    flex: 1 1 200px;
    background: rgba(0, 255, 247, 0.1);
    padding: 1rem;
    border-radius: 12px;
    text-align: center;
    color: #00fff7;
    box-shadow: 0 0 10px #00fff7;
    transition: transform 0.3s;
  }

  .info-box:hover {
    transform: scale(1.05);
  }

  .info-box h3 {
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }

  .info-box p {
    font-size: 1rem;
  }
</style>
</head>
<body>

<h1>Cloud Native Backend App</h1>

<div class="dashboard">
  <h2>Intelligent Backend Dashboard</h2>
  <div>
    <button onclick="alert('Monitoring Systems')">Monitor</button>
    <button onclick="alert('Deploy Services')">Deploy</button>
    <button onclick="alert('Check Logs')">Logs</button>
  </div>

  <div class="info-boxes">
    <div class="info-box">
      <h3>Active Nodes</h3>
      <p>12</p>
    </div>
    <div class="info-box">
      <h3>Requests/sec</h3>
      <p>430</p>
    </div>
    <div class="info-box">
      <h3>Alerts</h3>
      <p>2</p>
    </div>
  </div>
</div>

<script>
  // Generate floating particles
  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * window.innerWidth + 'px';
    p.style.animationDuration = 2 + Math.random() * 4 + 's';
    p.style.width = 2 + Math.random() * 6 + 'px';
    p.style.height = p.style.width;
    document.body.appendChild(p);
  }
</script>

</body>
</html>
  `);
};
