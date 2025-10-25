using TaskManagerApi.Models;


namespace TaskManagerApi.Repositories;


public class InMemoryTaskRepository : ITaskRepository
{
private readonly List<TaskItem> _tasks = new();


public IEnumerable<TaskItem> GetAll() => _tasks;


public TaskItem? Get(Guid id) => _tasks.FirstOrDefault(t => t.Id == id);


public TaskItem Add(TaskItem item)
{
item.Id = Guid.NewGuid();
_tasks.Add(item);
return item;
}


public bool Update(Guid id, TaskItem updated)
{
var existing = Get(id);
if (existing == null) return false;
existing.Description = updated.Description;
existing.IsCompleted = updated.IsCompleted;
return true;
}


public bool Delete(Guid id) => _tasks.RemoveAll(t => t.Id == id) > 0;
}