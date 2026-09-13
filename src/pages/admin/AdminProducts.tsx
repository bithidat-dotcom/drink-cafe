import React, { useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle, Loader2 } from 'lucide-react';
import { collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAppStore } from '../../store/useAppStore';
import { Product } from '../../types';
import { formatPrice } from '../../lib/utils';

export const AdminProducts: React.FC = () => {
  const { products } = useAppStore();
  const [isAdding, setIsAdding] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // New Product Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('coffee');
  const [imageUrl, setImageUrl] = useState('https://i.postimg.cc/52Fv0yC1/f7f7f32e-6709-496f-a1e2-173e733bbcad.png');
  const [isPopular, setIsPopular] = useState(true);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const newProduct = {
        name,
        description,
        price: parseFloat(price) || 0,
        categoryId,
        image: imageUrl,
        rating: 5.0,
        reviewCount: 0,
        isPopular
      };
      
      const docRef = await addDoc(collection(db, 'products'), newProduct);
      console.log("Document written with ID: ", docRef.id);
      
      await updateDoc(docRef, { id: docRef.id });
      
      setIsAdding(false);
      setName('');
      setDescription('');
      setPrice('');
      setCategoryId('coffee');
      setIsPopular(true);
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, 'products', id));
      } catch (error) {
        console.error("Error deleting product: ", error);
      }
    }
  };

  const togglePopularStatus = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'products', id), { isPopular: !currentStatus });
    } catch (error) {
      console.error("Error toggling popular status: ", error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-[#2D1B08]">Product Management</h3>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 bg-[#2D1B08] text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-[#4B3621] transition-all"
        >
          {isAdding ? "Cancel" : <><Plus size={18} /> Add Product</>}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddProduct} className="bg-white p-6 rounded-[32px] border border-[#F5E6D3] shadow-sm flex flex-col gap-4">
          <h4 className="font-bold text-[#2D1B08] border-b border-stone-100 pb-3 mb-2">Create New Product</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-500 mb-1 block">Product Name</label>
              <input required value={name} onChange={e => setName(e.target.value)} type="text" className="w-full bg-[#FAF9F6] border border-[#F5E6D3] rounded-2xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-[#C9794D]" placeholder="e.g. Vanilla Bean Frappe" />
            </div>
            <div>
              <label className="text-xs font-bold text-stone-500 mb-1 block">Price (৳)</label>
              <input required value={price} onChange={e => setPrice(e.target.value)} type="number" step="0.01" className="w-full bg-[#FAF9F6] border border-[#F5E6D3] rounded-2xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-[#C9794D]" placeholder="e.g. 450" />
            </div>
            <div>
              <label className="text-xs font-bold text-stone-500 mb-1 block">Category</label>
              <select required value={categoryId} onChange={e => setCategoryId(e.target.value)} className="w-full bg-[#FAF9F6] border border-[#F5E6D3] rounded-2xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-[#C9794D]">
                <option value="coffee">Coffee</option>
                <option value="tea">Tea</option>
                <option value="milkshake">Milkshake</option>
                <option value="snacks">Snacks</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-stone-500 mb-1 block">Image URL</label>
              <input required value={imageUrl} onChange={e => setImageUrl(e.target.value)} type="text" className="w-full bg-[#FAF9F6] border border-[#F5E6D3] rounded-2xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-[#C9794D]" placeholder="https://..." />
            </div>
          </div>
          
          <div>
            <label className="text-xs font-bold text-stone-500 mb-1 block">Description</label>
            <textarea required value={description} onChange={e => setDescription(e.target.value)} rows={2} className="w-full bg-[#FAF9F6] border border-[#F5E6D3] rounded-2xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-[#C9794D] resize-none" placeholder="Brief product description..." />
          </div>

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={isPopular} onChange={e => setIsPopular(e.target.checked)} className="w-5 h-5 rounded border-[#F5E6D3] text-[#C9794D] focus:ring-[#C9794D]" />
              <span className="text-sm font-bold text-[#2D1B08]">Mark as Popular (Shows on Home screen)</span>
            </label>
            <button disabled={submitting} type="submit" className="flex items-center gap-2 bg-[#C9794D] text-white px-6 py-3 rounded-xl text-sm font-bold shadow-md hover:bg-[#B36A42] transition-all disabled:opacity-50">
              {submitting ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle size={18} />}
              Save to Server
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-[32px] border border-[#F5E6D3] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#F5E6D3]">
                <th className="py-4 px-6 font-bold text-xs text-stone-400 uppercase tracking-wider">Product</th>
                <th className="py-4 px-6 font-bold text-xs text-stone-400 uppercase tracking-wider">Category</th>
                <th className="py-4 px-6 font-bold text-xs text-stone-400 uppercase tracking-wider">Price</th>
                <th className="py-4 px-6 font-bold text-xs text-stone-400 uppercase tracking-wider">Home Status</th>
                <th className="py-4 px-6 font-bold text-xs text-stone-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FAF9F6]">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-[#FAF9F6] transition-colors">
                  <td className="py-4 px-6 flex items-center gap-4">
                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded-xl object-cover border border-stone-200" />
                    <div>
                      <p className="font-bold text-sm text-[#2D1B08]">{product.name}</p>
                      <p className="text-[10px] text-stone-400 max-w-[200px] truncate">{product.description}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-lg text-[10px] font-black uppercase tracking-tight">
                      {product.categoryId}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-black text-[#C9794D] text-sm">
                    {formatPrice(product.price)}
                  </td>
                  <td className="py-4 px-6">
                    <button 
                      onClick={() => togglePopularStatus(product.id, !!product.isPopular)}
                      className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight transition-colors ${product.isPopular ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 'bg-stone-50 text-stone-500 hover:bg-stone-100'}`}
                    >
                      {product.isPopular ? 'Popular' : 'Normal'}
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <button onClick={() => handleDelete(product.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
