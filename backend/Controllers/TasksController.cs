using Microsoft.AspNetCore.Mvc;
using TaskManagerApi.Models;
using TaskManagerApi.Repositories;


namespace TaskManagerApi.Controllers;


[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
private readonly ITaskRepository _repo;


public TasksController(ITaskRepository repo)
{
_repo = repo;
}


[HttpGet]
public ActionResult<IEnumerable<TaskItem>> Get()
{
return Ok(_repo.GetAll());
}


[HttpGet("{id}")]
public ActionResult<TaskItem> GetById(Guid id)
{
var t = _repo.Get(id);
if (t == null) return NotFound();
return Ok(t);
}


[HttpPost]
public ActionResult<TaskItem> Post([FromBody] TaskItem item)
{
if (string.IsNullOrWhiteSpace(item.Description))
return BadRequest("Description is required");


var created = _repo.Add(new TaskItem { Description = item.Description, IsCompleted = item.IsCompleted });
return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
}


[HttpPut("{id}")]
public IActionResult Put(Guid id, [FromBody] TaskItem item)
{
var ok = _repo.Update(id, item);
if (!ok) return NotFound();
return NoContent();
}


[HttpDelete("{id}")]
public IActionResult Delete(Guid id)
{
var ok = _repo.Delete(id);
if (!ok) return NotFound();
return NoContent();
}
}