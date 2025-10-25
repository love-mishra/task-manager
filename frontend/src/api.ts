// cat > src/api.ts <<'EOF'
import axios from 'axios'
import type { TaskItem } from './types'

const API_BASE = (import.meta as any).env?.VITE_API_BASE ?? 'http://localhost:5000'


export const getTasks = () => axios.get<TaskItem[]>(`${API_BASE}/api/tasks`)
export const createTask = (data: { description: string; isCompleted?: boolean }) =>
  axios.post<TaskItem>(`${API_BASE}/api/tasks`, data)
export const updateTask = (id: string, data: Partial<TaskItem>) =>
  axios.put(`${API_BASE}/api/tasks/${id}`, data)
export const deleteTask = (id: string) => axios.delete(`${API_BASE}/api/tasks/${id}`)
// EOF
