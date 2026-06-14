import { ClipboardCheck, AlertTriangle, Shapes } from 'lucide-react';

function StatsCards({ total, lowStock, categories }) {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div>
          <p className="stat-label">Total Products</p>
          <h2 className="stat-value">{total.toLocaleString()}</h2>
        </div>
        <div className="stat-icon stat-icon-blue">
          <ClipboardCheck size={22} />
        </div>
      </div>

      <div className="stat-card stat-card-warning">
        <div>
          <p className="stat-label stat-label-warning">Low Stock Products</p>
          <h2 className="stat-value stat-value-warning">{lowStock}</h2>
        </div>
        <div className="stat-icon stat-icon-amber">
          <AlertTriangle size={22} />
        </div>
      </div>

      <div className="stat-card">
        <div>
          <p className="stat-label">Categories</p>
          <h2 className="stat-value">{categories}</h2>
        </div>
        <div className="stat-icon stat-icon-gray">
          <Shapes size={22} />
        </div>
      </div>
    </div>
  );
}

export default StatsCards;