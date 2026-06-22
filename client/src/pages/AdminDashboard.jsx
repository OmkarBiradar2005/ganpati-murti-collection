import { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { PlusCircle, Pencil, Trash2, Upload, LogOut, BadgeIndianRupee, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import { siteConfig } from '../data/siteConfig';

const emptyForm = {
  modelNumber: '',
  size: '',
  price: '',
  description: '',
  imageUrl: '',
  availability: 'Available',
  featured: false,
};

const AdminDashboard = () => {
  const { admin, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);

  const stats = useMemo(() => ({
    total: products.length,
    featured: products.filter((product) => product.featured).length,
    available: products.filter((product) => product.availability === 'Available').length,
  }), [products]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (!admin) {
    return <Navigate to="/admin" replace />;
  }

  const resetForm = () => {
    setForm(emptyForm);
    setImageFile(null);
    setEditingId(null);
  };

  const uploadImage = async () => {
    if (!imageFile) {
      return form.imageUrl;
    }

    const data = new FormData();
    data.append('image', imageFile);
    const response = await api.post('/upload', data, { headers: { 'Content-Type': 'multipart/form-data' } });
    return response.data.imageUrl;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      const imageUrl = await uploadImage();
      const payload = { ...form, price: Number(form.price), imageUrl };

      if (editingId) {
        await api.put(`/products/${editingId}`, payload);
        toast.success('Product updated');
      } else {
        await api.post('/products', payload);
        toast.success('Product added');
      }

      await fetchProducts();
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to save product');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      modelNumber: product.modelNumber,
      size: product.size,
      price: product.price,
      description: product.description,
      imageUrl: product.imageUrl,
      availability: product.availability,
      featured: product.featured,
    });
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) {
      return;
    }
    try {
      await api.delete(`/products/${id}`);
      toast.success('Product deleted');
      await fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to delete product');
    }
  };

  const handleToggleFeatured = async (product) => {
    try {
      await api.put(`/products/${product._id}`, { ...product, featured: !product.featured });
      toast.success('Featured status updated');
      await fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to update product');
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 px-4 py-8 text-stone-900 dark:bg-stone-950 dark:text-stone-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 rounded-[2rem] bg-gradient-to-r from-saffron-600 to-maroon-700 p-6 text-white shadow-2xl lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-white/70">Owner Dashboard</p>
            <h1 className="mt-2 text-3xl font-display font-bold">{siteConfig.name}</h1>
            <p className="mt-1 text-sm text-white/80">Owner: {siteConfig.ownerName}</p>
            <p className="mt-2 text-white/85">Add new models, upload real photos, and update availability instantly.</p>
          </div>
          <button onClick={logout} className="btn-secondary border-white/20 bg-white/10 text-white">
            <LogOut size={18} /> Logout
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            ['Total Models', stats.total],
            ['Featured', stats.featured],
            ['Available', stats.available],
          ].map(([label, value]) => (
            <div key={label} className="glass-panel rounded-[1.8rem] p-5">
              <p className="text-sm text-stone-500 dark:text-stone-400">{label}</p>
              <p className="mt-2 text-3xl font-display font-bold">{value}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="glass-panel rounded-[2rem] p-6 space-y-5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h2 className="text-2xl font-display font-bold">{editingId ? 'Edit Model' : 'Add New Model'}</h2>
            {editingId ? <button type="button" onClick={resetForm} className="btn-secondary">Cancel Edit</button> : null}
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <input required value={form.modelNumber} onChange={(event) => setForm({ ...form, modelNumber: event.target.value })} placeholder="Model Number" className="rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none dark:border-stone-800 dark:bg-stone-950" />
            <input required value={form.size} onChange={(event) => setForm({ ...form, size: event.target.value })} placeholder="Size e.g. 12 inch" className="rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none dark:border-stone-800 dark:bg-stone-950" />
            <input required type="number" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} placeholder="Price in INR" className="rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none dark:border-stone-800 dark:bg-stone-950" />
            <select value={form.availability} onChange={(event) => setForm({ ...form, availability: event.target.value })} className="rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none dark:border-stone-800 dark:bg-stone-950">
              <option>Available</option>
              <option>Sold Out</option>
            </select>
            <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-stone-300 px-4 py-3 dark:border-stone-700">
              <Upload size={18} />
              <span>{imageFile ? imageFile.name : 'Upload real image'}</span>
              <input type="file" accept="image/*" onChange={(event) => setImageFile(event.target.files?.[0] || null)} className="hidden" />
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3 dark:border-stone-800 dark:bg-stone-950">
              <input type="checkbox" checked={form.featured} onChange={(event) => setForm({ ...form, featured: event.target.checked })} />
              <span className="inline-flex items-center gap-2"><Star size={16} /> Featured</span>
            </label>
          </div>
          <textarea required rows="4" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Short description" className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none dark:border-stone-800 dark:bg-stone-950" />
          <div className="flex flex-col gap-3 sm:flex-row">
            <button disabled={saving} className="btn-primary">
              <PlusCircle size={18} /> {saving ? 'Saving...' : editingId ? 'Update Model' : 'Add Model'}
            </button>
            <button type="button" onClick={resetForm} className="btn-secondary">Clear Form</button>
          </div>
        </form>

        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold">Existing Models</h2>
          {loading ? <Loader label="Loading admin catalog..." /> : null}
          <div className="grid gap-4">
            {products.map((product) => (
              <div key={product._id} className="glass-panel flex flex-col gap-4 rounded-[1.8rem] p-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex gap-4">
                  <img src={product.imageUrl} alt={product.modelNumber} className="h-24 w-24 rounded-2xl object-cover" />
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-saffron-600 dark:text-saffron-300">{product.modelNumber}</p>
                    <h3 className="mt-1 text-xl font-display font-bold">{product.size}</h3>
                    <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">₹{Number(product.price).toLocaleString('en-IN')} · {product.availability} · {product.featured ? 'Featured' : 'Standard'}</p>
                    <p className="mt-2 max-w-2xl text-sm text-stone-500 dark:text-stone-400">{product.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => handleEdit(product)} className="btn-secondary"><Pencil size={16} /> Edit</button>
                  <button onClick={() => handleToggleFeatured(product)} className="btn-secondary"><Star size={16} /> {product.featured ? 'Unfeature' : 'Feature'}</button>
                  <button onClick={() => handleDelete(product._id)} className="btn-secondary border-rose-200 text-rose-600 dark:border-rose-900 dark:text-rose-300"><Trash2 size={16} /> Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
