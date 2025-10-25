// cat > src/components/TaskList.tsx <<'EOF'
import React from 'react'
import type { TaskItem } from '../types'

type Props = {
  tasks: TaskItem[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function TaskList({ tasks, onToggle, onDelete }: Props) {
  if (!tasks.length) return <p>No tasks</p>

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tasks.map((t) => (
        <li
          key={t.id}
          style={{
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            padding: 8,
            borderBottom: '1px solid #eee',
          }}
        >
          <input type="checkbox" checked={t.isCompleted} onChange={() => onToggle(t.id)} />
          <span style={{ textDecoration: t.isCompleted ? 'line-through' : 'none' }}>
            {t.description}
          </span>
          <button style={{ marginLeft: 'auto' }} onClick={() => onDelete(t.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}
// EOF
