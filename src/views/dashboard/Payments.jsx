export default function Payments() {
  return (
    <div className="order-box">
      <h4>
        <i className="fas fa-history text-warning" /> Payment History
      </h4>

      <ul className="order-totals">
        <li>¢10 — Daily Package <span>Today</span></li>
        <li>¢50 — Weekly Package <span>Last Week</span></li>
      </ul>
    </div>
  );
}
