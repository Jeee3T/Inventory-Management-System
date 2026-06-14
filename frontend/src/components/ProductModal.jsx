import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const emptyForm = {
  name: '',
  category: '',
  price: '',
  quantity: '',
  minStock: '',
};

function ProductModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState(emptyForm);

  
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        category: initialData.category,
        price: initialData.price,
        quantity: initialData.quantity,
        minStock: initialData.minStock,
      });
    } else {
      setFormData(emptyForm);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      minStock: Number(formData.minStock),
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{initialData ? 'Edit Product' : 'Add Product'}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Product Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} required />
          </div>

          <div className="form-row">
  <div className="form-group">
    <label>Price</label>
    <input type="number" name="price" value={formData.price} onChange={handleChange} min="0" step="0.01" required />
  </div>
  <div className="form-group">
    <label>Quantity</label>
    <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} min="0" required />
  </div>
</div>

<div className="form-group">
  <label>Min. Stock</label>
  <input type="number" name="minStock" value={formData.minStock} onChange={handleChange} min="0" required />
</div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {initialData ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductModal;