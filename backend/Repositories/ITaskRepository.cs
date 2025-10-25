using TaskManagerApi.Models;


namespace TaskManagerApi.Repositories;


public interface ITaskRepository
{
IEnumerable<TaskItem> GetAll();
TaskItem? Get(Guid id);
TaskItem Add(TaskItem item);
bool Update(Guid id, TaskItem updated);
bool Delete(Guid id);
}