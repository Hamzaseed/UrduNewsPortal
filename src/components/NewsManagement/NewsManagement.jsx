// File: NewsManagement.jsx
import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiEye, FiCheckCircle, FiUpload } from 'react-icons/fi';
import { ImCancelCircle } from "react-icons/im"
import './NewsManagement.css';

const categories = [
  {value : "important ", label :"Important /اہم خبریں"},
  {value :"articles" , label : "Articles /کالمز " },
  { value: 'technology', label: 'Technology / ٹیکنالوجی' },
  { value: 'sports', label: 'Sports / کھیل' },
  { value: 'politics', label: 'Politics / سیاست' },
  { value: 'international', label: 'International / بین الاقوامی' },
  { value: 'health', label: 'Health / صحت' },
  { value: 'finance', label: 'Finance / مالیات' },
  { value: 'entertainment', label: 'Entertainment / تفریح' },
  { value: 'science', label: 'Science / سائنس' },
  {value : "pakistan", label :"Pakistan / پاکستان "}
];

const initialMockNews = [
  {
    id: 1,
    title: 'Revolutionary AI Technology Transforms Healthcare',
    category: 'technology',
    excerpt: 'New AI-powered diagnostic tools are showing remarkable accuracy in early disease detection...',
    detailedDescription: 'Revolutionary AI Technology Transforms Healthcare with new diagnostic capabilities...',
    status: 'Published',
    date: '2024-01-15',
    views: 15420,
    author: 'Sarah Johnson',
    img: ''
  },
  {
    id: 2,
    title: 'امریکی صدارتی انتخابات، ہیلری نے پہلے مرحلے میں ہی ٹرمپ کو بڑی شکست دے دی',
    category: 'international',
    excerpt: 'امریکی صدارتی انتخابات میں ہیلری کلنٹن کی جانب سے حیرت انگیز کارکردگی',
    detailedDescription: 'تفصیلی رپورٹ جلد آئے گی...',
    status: 'Published',
    date: '2016-09-29',
    views: 25420,
    author: 'سلمان قریشی',
    img: ''
  },
  {
    id: 3,
    title: 'Championship Finals Set to Begin This Weekend',
    category: 'sports',
    excerpt: 'The most anticipated sporting event of the year is about to commence with record attendance...',
    detailedDescription: 'Complete coverage of the championship finals with detailed analysis...',
    status: 'Draft',
    date: '2024-01-20',
    views: 8930,
    author: 'Mike Chen',
    img: ''
  }
];

export default function NewsManagement() {
  const [news, setNews] = useState(initialMockNews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [filterQuery, setFilterQuery] = useState('');
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    title: '',
    category: '',
    excerpt: '',
    detailedDescription: '',
    author: '',
    date: '',
    img: '',
    status: 'Draft',
    tags: '',
    priority: 'normal',
    scheduled: false,
    publishTime: ''
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!isModalOpen) {
      setForm(emptyForm);
      setStep(1);
      setValidationErrors([]);
      setEditingId(null);
    }
  }, [isModalOpen]);

  function openAddModal() {
    setIsModalOpen(true);
  }

  function openEditModal(id) {
    const item = news.find(n => n.id === id);
    if (!item) return;
    setForm({
      title: item.title || '',
      category: item.category || '',
      excerpt: item.excerpt || '',
      detailedDescription: item.detailedDescription || '',
      author: item.author || '',
      date: item.date || '',
      img: item.img || '',
      status: item.status || 'Draft',
      tags: item.tags || '',
      priority: item.priority || 'normal',
      scheduled: item.scheduled || false,
      publishTime: item.publishTime || ''
    });
    setEditingId(id);
    setIsModalOpen(true);
  }

  function validateAll() {
    const errors = [];
   if (!form.title.trim()) errors.push('Title is required / عنوان لازمی ہے');
if (!form.category) errors.push('Category is required / قسم لازمی ہے');
if (!form.excerpt.trim()) errors.push('Brief description is required / مختصر تفصیل لازمی ہے');
if (!form.detailedDescription.trim()) errors.push('Detailed description is required / تفصیلی مواد لازمی ہے');
if (form.title.length > 200) errors.push('Title must be under 200 characters / عنوان 200 حروف سے کم ہونا چاہئے');
if (form.excerpt.length > 300) errors.push('Brief description must be under 300 characters / مختصر تفصیل 300 حروف سے کم ہونی چاہئے');
if (form.scheduled && !form.publishTime) errors.push('Publish time is required when scheduled / شیڈول ہونے پر اشاعت کا وقت لازمی ہے');
    setValidationErrors(errors);
    return errors.length === 0;
  }

  function handleNext() {
    // basic validation for step 1
    if (step === 1) {
      const sErrors = [];
      if (!form.title.trim()) sErrors.push('Title is required/عنوان درکار ہے');
      if (!form.category) sErrors.push('Category is required/قسم درکار /');
      if (!form.excerpt.trim()) sErrors.push('Brief description is required /مختصر تفصیل درکار ہے');
      if (sErrors.length) {
        setValidationErrors(sErrors);
        return;
      }
    }
    setValidationErrors([]);
    setStep(prev => Math.min(prev + 1, 3));
  }
  function handlePrev() {
    setValidationErrors([]);
    setStep(prev => Math.max(prev - 1, 1));
  }

  async function handlePublish() {
    if (!validateAll()) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 800));

    if (editingId) {
      setNews(prev => prev.map(n => n.id === editingId ? ({ ...n, ...form }) : n));
    } else {
      const id = Date.now();
      setNews(prev => [{ id, ...form, views: 0 }, ...prev]);
    }

    setIsSubmitting(false);
    setIsModalOpen(false);
  }

  function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    setNews(prev => prev.filter(n => n.id !== id));
  }

  function togglePublish(id) {
    setNews(prev => prev.map(n => n.id === id ? ({ ...n, status: n.status === 'Published' ? 'Draft' : 'Published' }) : n));
  }

  function startEdit(id) {
    openEditModal(id);
  }

  function filteredNews() {
    const q = filterQuery.trim().toLowerCase();
    if (!q) return news;
    return news.filter(n => (n.title + ' ' + n.excerpt + ' ' + n.author).toLowerCase().includes(q));
  }

  function getCategoryCount(value) {
    return news.filter(n => n.category === value).length;
  }

  return (
  <div className='container' >
    <main className="nm-root">
      <header className="nm-header">
        <div>
          <h1>News Management</h1>
          <p className="nm-sub">Create, edit and manage news articles</p>
        </div>
        <div className="nm-actions">
          <input
            placeholder="Search articles..."
            value={filterQuery}
            onChange={e => setFilterQuery(e.target.value)}
            className="nm-search"
          />
          <button className="nm-btn primary" onClick={openAddModal}>
            <FiPlus /> Add News
          </button>
        </div>
      </header>

      <section className="nm-cards">
        {categories.map(cat => (
          <article className="nm-card" key={cat.value}>
            <div className="nm-card-title">{cat.label}</div>
            <div className="nm-card-count">{getCategoryCount(cat.value)}</div>
            <div className="nm-card-sub">articles</div>
          </article>
        ))}
      </section>

      <section className="nm-table-wrap">
        <table className="nm-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Author</th>
              <th>Views</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredNews().map(item => (
              <tr key={item.id}>
                <td className="nm-td-title">
                  <div className="nm-title">{item.title}</div>
                  <div className="nm-excerpt">{item.excerpt}</div>
                </td>
                <td>{categories.find(c => c.value === item.category)?.label || item.category}</td>
                <td>
                  <span className={`nm-badge ${item.status === 'Published' ? 'published' : 'draft'}`}>{item.status}</span>
                </td>
                <td>{item.author}</td>
                <td>{(item.views || 0).toLocaleString()}</td>
                <td>{item.date}</td>
                <td>
                  <nav className="nm-actions-row">
                    <button title="Preview" className="icon-btn" onClick={() => alert(item.title)}><FiEye /></button>
                    <button title="Edit" className="icon-btn" onClick={() => startEdit(item.id)}><FiEdit /></button>
                    <button title="Delete" className="icon-btn danger" onClick={() => handleDelete(item.id)}><FiTrash2 /></button>
                    <button title="Toggle Publish" className="icon-btn" onClick={() => togglePublish(item.id)}>
                      <FiCheckCircle />
                    </button>
                  </nav>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {isModalOpen && (
        <div className="nm-modal-overlay">
          <article className="nm-modal">
            <header className="nm-modal-header">
              <h2>{editingId ? 'Edit Article' : 'ئی خبر شامل کریں  /Add New Article'}</h2>
              <button className="icon-btn" onClick={() => setIsModalOpen(false)}><ImCancelCircle size={24} /></button>
            </header>

            <div className="nm-modal-body">
              <div className="nm-step-indicator">Step {step} of 3</div>

              {validationErrors.length > 0 && (
                <div className="validation-errors">
                  <ul>
  {validationErrors.map((err, idx) => <li key={idx}>{err}</li>)}
                  </ul>
                </div>
              )}

              {step === 1 && (
                <section className="nm-step">
                  <label className="nm-label">Title / عنوان *</label>
                  <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} maxLength={200} />

                  <label className="nm-label">Author / مصنف</label>
                  <input type="text" value={form.author} onChange={e => setForm({...form, author: e.target.value})} />

                  <label className="nm-label">Category / قسم *</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                    <option value="">Select category / منتخب کریں</option>
                    {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>

                  <label className="nm-label">Brief Description / مختصر تفصیل (SEO Description)</label>
                  <textarea value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} maxLength={300} rows={4}></textarea>

                  <label className="nm-label">Tags / ٹیگز (comma separated)</label>
                  <input type="text" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} />
                </section>
              )}

              {step === 2 && (
                <section className="nm-step">
                  <label className="nm-label">Featured Image URL</label>
                  <div className="nm-row">
                    <input type="text" value={form.img} onChange={e => setForm({...form, img: e.target.value})} />
                    <button className="nm-btn outline" onClick={() => alert('Upload not implemented') }><FiUpload /> Upload</button>
                  </div>
                  {form.img && (
                    <figure className="nm-image-preview">
                      <img src={form.img} alt="preview" onError={e => { e.target.style.display = 'none'; }} />
                    </figure>
                  )}

                  <label className="nm-label">Detailed Content *</label>
                  <textarea value={form.detailedDescription} onChange={e => setForm({...form, detailedDescription: e.target.value})} rows={12}></textarea>
                </section>
              )}

              {step === 3 && (
                <section className="nm-step nm-grid-2">
                  <div>
                    <label className="nm-label">Status</label>
                    <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                      <option value="Draft">Draft</option>
                      <option value="Review">Review</option>
                      <option value="Published">Published</option>
                    </select>

                    <label className="nm-label">Publication Date</label>
                    <input type="text" value={form.date} onChange={e => setForm({...form, date: e.target.value})} placeholder="e.g., 29 ستمبر، 2016" />

                    <label className="nm-checkbox">
                      <input type="checkbox" checked={form.scheduled} onChange={e => setForm({...form, scheduled: e.target.checked})} />
                      Schedule for later
                    </label>
                    {form.scheduled && (
                      <input type="datetime-local" value={form.publishTime} onChange={e => setForm({...form, publishTime: e.target.value})} />
                    )}

                  </div>

                  <aside className="nm-preview-box">
                    {form.title ? (
                      <>
                        <h3>{form.title}</h3>
                        <div className="nm-preview-meta">
                          <span className="nm-preview-cat">{categories.find(c => c.value === form.category)?.label}</span>
                          {form.priority !== 'normal' && <span className="nm-badge small">{form.priority}</span>}
                        </div>
                        <p className="nm-preview-excerpt">{form.excerpt}</p>
                        {form.img && <img src={form.img} alt="preview" onError={e => { e.target.style.display = 'none'; }}/>}
                      </>
                    ) : (
                      <div className="nm-empty-preview">Fill form to preview</div>
                    )}
                  </aside>
                </section>
              )}

            </div>

            <footer className="nm-modal-footer">
              <div>
                {step > 1 && <button className="nm-btn outline" onClick={handlePrev}>Previous</button>}
              </div>
              <div>
                <button className="nm-btn outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                {step < 3 ? (
                  <button className="nm-btn primary" onClick={handleNext}>Next</button>
                ) : (
                  <button className="nm-btn primary" onClick={handlePublish} disabled={isSubmitting}>{isSubmitting ? 'Saving...' : (editingId ? 'Save Changes' : 'Publish Article')}</button>
                )}
              </div>
            </footer>
          </article>
        </div>
      )}

    </main>
    </div>
  );
}