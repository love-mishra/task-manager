import React, { useEffect, useState } from 'react'
import type { TaskItem } from './types'
import * as api from './api'
import TaskList from './components/TaskList'

const THEME_KEY = 'tm_theme' // localStorage key

export default function App() {
  const [tasks, setTasks] = useState<TaskItem[]>([])
  const [desc, setDesc] = useState('')
  const [filter, setFilter] = useState<'all'|'active'|'completed'>('all')
  const [theme, setTheme] = useState<'light'|'dark'>(() => {
    try {
      const stored = localStorage.getItem(THEME_KEY)
      if (stored === 'dark' || stored === 'light') return stored
      // default to system preference
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    } catch { return 'light' }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem(THEME_KEY, theme) } catch {}
  }, [theme])

  useEffect(() => { fetchTasks() }, [])

  async function fetchTasks() {
    try {
      const res = await api.getTasks()
      setTasks(res.data)
    } catch (err) {
      console.error(err)
      alert('Failed to load tasks from backend')
    }
  }

  async function addTask(e?: React.FormEvent) {
    if (e) e.preventDefault()
    if (!desc.trim()) return
    try {
      const res = await api.createTask({ description: desc.trim(), isCompleted: false })
      setTasks((s) => [...s, res.data])
      setDesc('')
    } catch (err) {
      console.error(err)
      alert('Failed to create task')
    }
  }

  async function toggleTask(id: string) {
    const t = tasks.find(x => x.id === id); if (!t) return
    const updated = { ...t, isCompleted: !t.isCompleted }
    try {
      await api.updateTask(id, updated)
      setTasks(s => s.map(x => x.id === id ? updated : x))
    } catch (err) {
      console.error(err)
      alert('Failed to update task')
    }
  }

  async function deleteTask(id: string) {
    try {
      await api.deleteTask(id)
      setTasks(s => s.filter(x => x.id !== id))
    } catch (err) {
      console.error(err)
      alert('Failed to delete task')
    }
  }

  function toggleTheme() { setTheme(t => t === 'dark' ? 'light' : 'dark') }

  const visible = tasks.filter(t => filter === 'all' ? true : filter === 'active' ? !t.isCompleted : t.isCompleted)
  const completedCount = tasks.filter(t => t.isCompleted).length

  return (
    <div className="app">
      <div className="card">
        <div className="header">
          <div className="title">
            <div className="logo">TM</div>
            <div>
              <h1>Task Manager</h1>
              <div className="sub">Simple tasks • React + TypeScript • .NET API</div>
            </div>
          </div>

          <div className="controls">
            <div className="small" style={{ marginRight:8 }}>{tasks.length} tasks</div>
            <button
              className="icon-btn"
              title="Toggle theme"
              onClick={toggleTheme}
              aria-pressed={theme === 'dark'}
            >
              {theme === 'dark' ? (
                // sun icon
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 19v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M4.2 4.2l1.4 1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M18.4 18.4l1.4 1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M4.2 19.8l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M18.4 5.6l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              ) : (
                // moon icon
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              )}
            </button>
          </div>
        </div>

        <form onSubmit={addTask} className="input-row">
          <input className="input" placeholder="Add a new task..." value={desc} onChange={e => setDesc(e.target.value)} />
          <button type="submit" className="btn">Add</button>
        </form>

        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:12}}>
          <div className="filters" role="tablist" aria-label="Filter tasks">
            <button className={`filter-btn ${filter==='all'?'active':''}`} onClick={() => setFilter('all')}>All</button>
            <button className={`filter-btn ${filter==='active'?'active':''}`} onClick={() => setFilter('active')}>Active</button>
            <button className={`filter-btn ${filter==='completed'?'active':''}`} onClick={() => setFilter('completed')}>Completed</button>
          </div>
          <div className="small">{completedCount} completed</div>
        </div>

        <div className="task-list">
          <TaskList tasks={visible} onToggle={toggleTask} onDelete={deleteTask} />
        </div>

        <div className="footer">
          <div className="small">Tip: use the toggle to switch theme.</div>
          <div>
            <button className="icon-btn ghost" onClick={() => { setTasks([]); }}>
              Clear UI
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
