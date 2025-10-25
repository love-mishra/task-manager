// cat > src/App.tsx <<'EOF'
import React, { useEffect, useState } from 'react'
import type { TaskItem } from './types'
import * as api from './api'
import TaskList from './components/TaskList'

export default function App() {
  const [tasks, setTasks] = useState<TaskItem[]>([])
  const [desc, setDesc] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  useEffect(() => {
    fetchTasks()
  }, [])

  async function fetchTasks() {
    try {
      const res = await api.getTasks()
      setTasks(res.data)
    } catch (err) {
      console.error(err)
      alert('Failed to load tasks from backend')
    }
  }

  async function addTask(e: React.FormEvent) {
    e.preventDefault()
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
    const t = tasks.find((x) => x.id === id)
    if (!t) return
    const updated = { ...t, isCompleted: !t.isCompleted }
    try {
      await api.updateTask(id, updated)
      setTasks((s) => s.map((x) => (x.id === id ? updated : x)))
    } catch (err) {
      console.error(err)
      alert('Failed to update task')
    }
  }

  async function deleteTask(id: string) {
    try {
      await api.deleteTask(id)
      setTasks((s) => s.filter((x) => x.id !== id))
    } catch (err) {
      console.error(err)
      alert('Failed to delete task')
    }
  }

  const visible = tasks.filter((t) =>
    filter === 'all' ? true : filter === 'active' ? !t.isCompleted : t.isCompleted
  )

  return (
    <div style={{ maxWidth: 720, margin: '40px auto', padding: 16 }}>
      <h1>Task Manager</h1>

      <form onSubmit={addTask} style={{ display: 'flex', gap: 8 }}>
        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Add a task..."
          style={{ flex: 1 }}
        />
        <button type="submit">Add</button>
      </form>

      <div style={{ marginTop: 12 }}>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>

      <div style={{ marginTop: 16 }}>
        <TaskList tasks={visible} onToggle={toggleTask} onDelete={deleteTask} />
      </div>
    </div>
  )
}
// EOF
