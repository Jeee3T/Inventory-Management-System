import { Pencil, Trash2 } from 'lucide-react';

function getStatus(product) {
  if (product.quantity === 0) return { label: 'Out of Stock', className: 'badge-red' };
  if (product.quantity <= product.minStock) return { label: 'Low Stock', className: 'badge-amber' };
  return { label: 'In Stock', className: 'badge-green' };
}

function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="table-card">
      <table className="product-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Min. Stock</th>
            <th>Status</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan="7" className="empty-row">No products found</td>
            </tr>
          )}

          {products.map((product) => {
            const status = getStatus(product);
            const rowClass =
              status.label === 'Out of Stock' ? 'row-danger' :
              status.label === 'Low Stock' ? 'row-warning' : '';

            return (
              <tr key={product._id} className={rowClass}>
                <td className="cell-name">{product.name}</td>
                <td>{product.category}</td>
                <td>₹{product.price.toFixed(2)}</td>
                <td className={status.label !== 'In Stock' ? 'cell-alert' : ''}>
                  {product.quantity}
                </td>
                <td>{product.minStock}</td>
                <td>
                  <span className={`badge ${status.className}`}>{status.label}</span>
                </td>
                <td className="text-right">
                  <button className="icon-btn" onClick={() => onEdit(product)} aria-label="Edit">
                    <Pencil size={16} />
                  </button>
                  <button className="icon-btn icon-btn-danger" onClick={() => onDelete(product)} aria-label="Delete">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="table-footer">
        Showing {products.length} of {products.length} entries
      </div>
    </div>
  );
}

export default ProductTable;