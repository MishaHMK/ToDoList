#pragma warning disable CS1998
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using ToDo.BLL.Interfaces;
using ToDo.DAL.Entities;
using ToDoWebApi.DTOs;


namespace ToDoWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ObjectivesController : ControllerBase
    {

        private readonly IObjectiveService _objService;
        private readonly IMapper _mapper;

        public ObjectivesController(IObjectiveService objService, IMapper mapper)
        {
            _objService = objService;
            _mapper = mapper;
        }

        // GET: api/Objectives
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Objective>>> GetObjectives()
        {
            var objectives = await _objService.GetAllObjectivesAsync();
            var objectiveDTOs = _mapper.Map<List<ObjectiveDTO>>(objectives);

            return Ok(objectiveDTOs);
        }

        // GET: api/Objectives/1
        [HttpGet("{id}")]
        public async Task<ActionResult<Objective>> GetObjective(int id) 
        {
            var objective = await _objService.GetObjectiveByIdAsync(id);

            if (objective != null)
            {
                var objectiveDTO = _mapper.Map<ObjectiveDTO>(objective);
                return Ok(objectiveDTO);
            }
            else return NotFound();
        }

        // POST: api/Objectives
        [HttpPost]
        public async Task<ActionResult> PostObjective([FromBody] ObjectiveDTO objectiveDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var objective = _mapper.Map<Objective>(objectiveDTO);
            await _objService.CreateObjective(objective);

            return CreatedAtAction("PostObjective", new { id = objective.Id }, objective);

        }

        // PUT: api/Objectives
        [HttpPut]
        public async Task<ActionResult> PutObjective(Objective objective)
        {
            await _objService.UpdateObjective(objective);
           
            return NotFound();
        }

        // PUT: api/Boards/1010
        [HttpPut("{id}")]
        public async Task<ActionResult> PutObjectiveById(int id, [FromBody] ObjectiveDTO objectiveDTO)
        {

            var objectiveToUpdate = await _objService.GetObjectiveByIdAsync(id);

            if (objectiveToUpdate == null)
            {
                return NotFound($"Objective with Id = {id} not found");
            }
            objectiveToUpdate = _mapper.Map(objectiveDTO, objectiveToUpdate);

            await _objService.UpdateObjective(objectiveToUpdate);

            return NoContent();
        }


        // DELETE: api/Objectives/1   
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteObjectiveById(int id)
        {
            await _objService.DeleteObjectiveById(id);
            return Ok();
        }

    }
}
