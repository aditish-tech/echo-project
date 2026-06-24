import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Sun, CloudSun, Moon, Trash2, Edit2, Check, Plus, ArrowLeft, ChevronDown, ChevronUp, Save, X } from 'lucide-react';

export default function Routine({ token, user }) {
  const [routine, setRoutine] = useState({ morning: [], afternoon: [], evening: [] });
  const [tip, setTip] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Form input states
  const [newTasks, setNewTasks] = useState({ morning: '', afternoon: '', evening: '' });
  
  // Panel expansion states
  const [expanded, setExpanded] = useState({ morning: true, afternoon: true, evening: true });
  
  // Editing state: { itemId: editedTaskText }
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const fetchRoutine = async () => {
    try {
      const res = await fetch('https://echo-backend-1jn4.onrender.com/api/routine', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setRoutine(data.routine);
        setTip(data.tip);
      } else {
        setError('Unable to load daily routine schema.');
      }
    } catch (err) {
      console.error('Error fetching routine:', err);
      setError('Connection link timed out. Failed to fetch routine coordinate blocks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutine();
  }, [token]);

  const handleToggleComplete = async (item) => {
    try {
      const res = await fetch(`https://echo-backend-1jn4.onrender.com/api/routine/${item._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ completedToday: !item.completedToday })
      });
      const updatedItem = await res.json();
      if (res.ok) {
        // Update state
        setRoutine(prev => ({
          ...prev,
          [item.block]: prev[item.block].map(i => i._id === item._id ? updatedItem : i)
        }));
      }
    } catch (err) {
      console.error('Error toggling task:', err);
    }
  };

  const handleAddTask = async (block) => {
    const taskText = newTasks[block].trim();
    if (!taskText) return;

    try {
      const res = await fetch('https://echo-backend-1jn4.onrender.com/api/routine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ block, task: taskText })
      });
      const newItem = await res.json();
      if (res.ok) {
        setRoutine(prev => ({
          ...prev,
          [block]: [...prev[block], newItem]
        }));
        setNewTasks(prev => ({ ...prev, [block]: '' }));
      } else {
        setError(newItem.error || 'Failed to append task block.');
      }
    } catch (err) {
      console.error('Error adding routine task:', err);
    }
  };

  const handleDeleteTask = async (id, block) => {
    try {
      const res = await fetch(`https://echo-backend-1jn4.onrender.com/api/routine/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setRoutine(prev => ({
          ...prev,
          [block]: prev[block].filter(i => i._id !== id)
        }));
      }
    } catch (err) {
      console.error('Error deleting routine task:', err);
    }
  };

  const startEditing = (item) => {
    setEditingId(item._id);
    setEditingText(item.task);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingText('');
  };

  const handleSaveEdit = async (item) => {
    const text = editingText.trim();
    if (!text) return;

    try {
      const res = await fetch(`https://echo-backend-1jn4.onrender.com/api/routine/${item._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ task: text })
      });
      const updatedItem = await res.json();
      if (res.ok) {
        setRoutine(prev => ({
          ...prev,
          [item.block]: prev[item.block].map(i => i._id === item._id ? updatedItem : i)
        }));
        setEditingId(null);
        setEditingText('');
      } else {
        setError(updatedItem.error || 'Failed to update task.');
      }
    } catch (err) {
      console.error('Error editing routine task:', err);
    }
  };

  const togglePanel = (block) => {
    setExpanded(prev => ({ ...prev, [block]: !prev[block] }));
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '1', flexDirection: 'column', gap: '15px' }}>
        <div className="writing-indicator">
          <div className="dot-pulse"></div>
          <div className="dot-pulse"></div>
          <div className="dot-pulse"></div>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-title)' }}>Synthesizing routine blocks...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px', width: '100%' }}>
      
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', transition: 'all 0.2s ease', background: 'rgba(255, 255, 255, 0.02)' }}>
          <ArrowLeft size={16} />
        </Link>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-blue)', fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            <Sparkles size={12} />
            <span>Habit Coordinate Matrix</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-title)', fontSize: '28px', fontWeight: '800' }}>Daily Routine Builder</h1>
        </div>
      </div>

      {error && (
        <div className="glass-panel" style={{ padding: '16px', background: 'rgba(247, 37, 133, 0.1)', borderColor: 'var(--color-magenta)', color: 'var(--color-magenta)', marginBottom: '24px' }}>
          {error}
        </div>
      )}

      {/* Future You Tip Bar */}
      {tip && (
        <div className="glass-panel" style={{ 
          padding: '20px 24px', 
          marginBottom: '30px', 
          background: 'radial-gradient(circle at 10% 50%, rgba(0, 210, 255, 0.1) 0%, rgba(18, 11, 33, 0.5) 100%)',
          borderColor: 'rgba(0, 210, 255, 0.25)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle light bar at edge */}
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '4px', background: 'var(--gradient-glow)' }}></div>
          
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
            <div style={{ 
              background: 'rgba(0, 210, 255, 0.1)', 
              borderRadius: '50%', 
              width: '36px', 
              height: '36px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--color-blue)',
              flexShrink: 0
            }}>
              <Sparkles size={16} className="pulse-node" />
            </div>
            <div>
              <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-blue)', display: 'block', marginBottom: '4px' }}>
                Advice from Future {user.name}
              </span>
              <p style={{ fontSize: '13.5px', color: 'var(--text-primary)', lineHeight: '1.6', fontStyle: 'italic' }}>
                "{tip}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Routine Blocks Grid (3 panels) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }} className="routine-grid">
        
        {/* Morning Block (Sunrise Amber Glow) */}
        <div className="glass-panel routine-panel-morning" style={{ 
          padding: '24px', 
          background: 'rgba(255, 159, 67, 0.015)',
          borderColor: 'rgba(255, 159, 67, 0.15)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 15px rgba(255, 159, 67, 0.04)',
          display: 'flex',
          flexDirection: 'column',
          alignSelf: 'start'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none', borderBottom: '1px solid rgba(255, 159, 67, 0.15)', paddingBottom: '14px', marginBottom: '16px' }} onClick={() => togglePanel('morning')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ color: '#ff9f43', display: 'flex' }}><Sun size={20} /></div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#ff9f43', fontFamily: 'var(--font-title)' }}>Morning Routine</h3>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Coordinates of sunrise alignment</span>
              </div>
            </div>
            <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              {expanded.morning ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>

          {/* Expanded Content */}
          {expanded.morning && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Task Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {routine.morning.map(item => renderRoutineItem(item, 'morning'))}
                {routine.morning.length === 0 && (
                  <p style={{ color: 'var(--text-muted)', fontSize: '13px', textAlign: 'center', padding: '20px 0' }}>
                    No morning habits set. Add one below.
                  </p>
                )}
              </div>

              {/* Add form */}
              {renderAddForm('morning')}
            </div>
          )}
        </div>

        {/* Afternoon Block (Solar Cyan Glow) */}
        <div className="glass-panel routine-panel-afternoon" style={{ 
          padding: '24px', 
          background: 'rgba(0, 210, 255, 0.015)',
          borderColor: 'rgba(0, 210, 255, 0.15)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 15px rgba(0, 210, 255, 0.04)',
          display: 'flex',
          flexDirection: 'column',
          alignSelf: 'start'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none', borderBottom: '1px solid rgba(0, 210, 255, 0.15)', paddingBottom: '14px', marginBottom: '16px' }} onClick={() => togglePanel('afternoon')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ color: 'var(--color-blue)', display: 'flex' }}><CloudSun size={20} /></div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-blue)', fontFamily: 'var(--font-title)' }}>Afternoon Routine</h3>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Focus and consistency anchors</span>
              </div>
            </div>
            <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              {expanded.afternoon ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>

          {/* Expanded Content */}
          {expanded.afternoon && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {routine.afternoon.map(item => renderRoutineItem(item, 'afternoon'))}
                {routine.afternoon.length === 0 && (
                  <p style={{ color: 'var(--text-muted)', fontSize: '13px', textAlign: 'center', padding: '20px 0' }}>
                    No afternoon habits set. Add one below.
                  </p>
                )}
              </div>
              {renderAddForm('afternoon')}
            </div>
          )}
        </div>

        {/* Evening Block (Sunset Violet Glow) */}
        <div className="glass-panel routine-panel-evening" style={{ 
          padding: '24px', 
          background: 'rgba(157, 78, 221, 0.015)',
          borderColor: 'rgba(157, 78, 221, 0.15)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 15px rgba(157, 78, 221, 0.04)',
          display: 'flex',
          flexDirection: 'column',
          alignSelf: 'start'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none', borderBottom: '1px solid rgba(157, 78, 221, 0.15)', paddingBottom: '14px', marginBottom: '16px' }} onClick={() => togglePanel('evening')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ color: 'var(--color-violet)', display: 'flex' }}><Moon size={20} /></div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-violet)', fontFamily: 'var(--font-title)' }}>Evening Routine</h3>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Deceleration and reflection states</span>
              </div>
            </div>
            <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              {expanded.evening ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>

          {/* Expanded Content */}
          {expanded.evening && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {routine.evening.map(item => renderRoutineItem(item, 'evening'))}
                {routine.evening.length === 0 && (
                  <p style={{ color: 'var(--text-muted)', fontSize: '13px', textAlign: 'center', padding: '20px 0' }}>
                    No evening habits set. Add one below.
                  </p>
                )}
              </div>
              {renderAddForm('evening')}
            </div>
          )}
        </div>

      </div>

      <style>{`
        .routine-panel-morning:hover {
          border-color: rgba(255, 159, 67, 0.35) !important;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 20px rgba(255, 159, 67, 0.08) !important;
        }
        .routine-panel-afternoon:hover {
          border-color: rgba(0, 210, 255, 0.35) !important;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 20px rgba(0, 210, 255, 0.08) !important;
        }
        .routine-panel-evening:hover {
          border-color: rgba(157, 78, 221, 0.35) !important;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 20px rgba(157, 78, 221, 0.08) !important;
        }
        
        .routine-checkbox {
          width: 20px;
          height: 20px;
          border-radius: 6px;
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.02);
          transition: all 0.2s ease;
        }
        
        .routine-checkbox.checked {
          background: var(--gradient-glow);
          border-color: transparent;
          box-shadow: 0 0 8px var(--color-blue);
        }
        
        .routine-item-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          transition: all 0.2s ease;
          gap: 12px;
        }
        
        .routine-item-card:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.08);
        }
        
        .routine-item-text {
          flex: 1;
          font-size: 13.5px;
          color: var(--text-primary);
          transition: all 0.2s ease;
        }
        
        .routine-item-text.completed {
          color: var(--text-muted);
          text-decoration: line-through;
        }
        
        .routine-item-actions {
          display: flex;
          gap: 6px;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        
        .routine-item-card:hover .routine-item-actions {
          opacity: 1;
        }
        
        .routine-action-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          width: 24px;
          height: 24px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        
        .routine-action-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
        }
        
        .routine-action-btn.delete:hover {
          background: rgba(247, 37, 133, 0.1);
          color: var(--color-magenta);
        }
      `}</style>

    </div>
  );

  // Helper renderer: Single Routine Item
  function renderRoutineItem(item, block) {
    const isEditing = editingId === item._id;

    return (
      <div key={item._id} className="routine-item-card">
        {/* Left: Checkbox */}
        <div 
          className={`routine-checkbox ${item.completedToday ? 'checked' : ''}`}
          onClick={() => handleToggleComplete(item)}
        >
          {item.completedToday && <Check size={12} style={{ color: '#fff' }} />}
        </div>

        {/* Middle: Content/Inline Editor */}
        {isEditing ? (
          <div style={{ flex: 1, display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="text"
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveEdit(item);
                if (e.key === 'Escape') cancelEditing();
              }}
              style={{
                flex: 1,
                background: 'rgba(7, 3, 19, 0.6)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                padding: '6px 10px',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                outline: 'none'
              }}
              autoFocus
            />
            <button onClick={() => handleSaveEdit(item)} className="routine-action-btn" style={{ color: 'var(--color-blue)' }} title="Save">
              <Save size={14} />
            </button>
            <button onClick={cancelEditing} className="routine-action-btn" style={{ color: 'var(--color-magenta)' }} title="Cancel">
              <X size={14} />
            </button>
          </div>
        ) : (
          <span 
            className={`routine-item-text ${item.completedToday ? 'completed' : ''}`}
            onDoubleClick={() => startEditing(item)}
          >
            {item.task}
          </span>
        )}

        {/* Right: Actions */}
        {!isEditing && (
          <div className="routine-item-actions">
            <button onClick={() => startEditing(item)} className="routine-action-btn" title="Edit">
              <Edit2 size={13} />
            </button>
            <button onClick={() => handleDeleteTask(item._id, block)} className="routine-action-btn delete" title="Remove">
              <Trash2 size={13} />
            </button>
          </div>
        )}
      </div>
    );
  }

  // Helper renderer: Add Task Form
  function renderAddForm(block) {
    return (
      <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.03)', paddingTop: '14px', marginTop: '4px' }}>
        <input
          type="text"
          placeholder="Add habit coordinate..."
          value={newTasks[block]}
          onChange={(e) => setNewTasks(prev => ({ ...prev, [block]: e.target.value }))}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAddTask(block);
          }}
          style={{
            flex: '1',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '8px 12px',
            color: 'var(--text-primary)',
            fontSize: '13px',
            fontFamily: 'var(--font-body)',
            outline: 'none',
            transition: 'border-color 0.2s ease'
          }}
        />
        <button 
          onClick={() => handleAddTask(block)}
          style={{ 
            background: 'rgba(255, 255, 255, 0.03)', 
            border: '1px solid var(--border-color)', 
            color: 'var(--text-primary)',
            borderRadius: '8px',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          className="add-btn-hover"
        >
          <Plus size={16} />
        </button>
      </div>
    );
  }
}
