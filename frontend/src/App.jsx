import { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from './services/api';
import StatsCards from './components/StatsCards';
import Toolbar from './components/Toolbar';
import ProductTable from './components/ProductTable';
import ProductModal from './components/ProductModal';
import './App.css';

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchAllProducts = async () => {
    try {
      const res = await getProducts();
      setAllProducts(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchFilteredProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (category !== 'All Categories') params.category = category;

      const res = await getProducts(params);
      setProducts(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    fetchFilteredProducts();
  }, [search, category]);

  const totalProducts = allProducts.length;
  const lowStockCount = allProducts.filter((p) => p.quantity <= p.minStock).length;
  const uniqueCategories = [...new Set(allProducts.map((p) => p.category))];

  // Open modal for adding
  const handleAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  // Called when the modal form is submitted (Add or Edit)
  const handleSubmitProduct = async (formData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, formData);
      } else {
        await createProduct(formData);
      }
      handleCloseModal();
      fetchAllProducts();
      fetchFilteredProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (product) => {
    const confirmed = window.confirm(`Delete "${product.name}"? This cannot be undone.`);
    if (!confirmed) return;

    try {
      await deleteProduct(product._id);
      fetchAllProducts();
      fetchFilteredProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <main className="container">
        <header className="page-header">
          <h1>Inventory Management System</h1>
          <p>Manage products and monitor inventory levels efficiently.</p>
        </header>

        <StatsCards
          total={totalProducts}
          lowStock={lowStockCount}
          categories={uniqueCategories.length}
        />

        <Toolbar
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          categories={uniqueCategories}
          onAddClick={handleAdd}
        />

        {error && <p className="status-text error">Error: {error}</p>}
        {loading ? (
          <p className="status-text">Loading products...</p>
        ) : (
          <ProductTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </main>

     
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitProduct}
        initialData={editingProduct}
      />
    </div>
  );
}

export default App;