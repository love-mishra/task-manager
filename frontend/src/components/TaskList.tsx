import React from 'react'
import type { TaskItem } from '../types'

type Props = {
  tasks: TaskItem[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function TaskList({ tasks, onToggle, onDelete }: Props) {
  if (!tasks.length) return <p className="small" style={{padding:12}}>No tasks — add your first one!</p>

  return (
    <div>
      {tasks.map(t => (
        <div key={t.id} className="task" role="listitem">
          <input
            aria-label="Toggle complete"
            type="checkbox"
            checked={t.isCompleted}
            onChange={() => onToggle(t.id)}
            style={{width:18, height:18, borderRadius:6}}
          />
          <div className={`desc ${t.isCompleted ? 'completed' : ''}`}>{t.description}</div>
          <div style={{display:'flex', gap:8, alignItems:'center'}}>
            <button
              className="icon-btn"
              title="Delete"
              onClick={() => onDelete(t.id)}
              aria-label="Delete task"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M8 6v12a2 2 0 002 2h4a2 2 0 002-2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
