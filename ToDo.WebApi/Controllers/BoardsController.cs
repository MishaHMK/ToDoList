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
        public class BoardsController : ControllerBase
        {

            private readonly IBoardsService _brdService;
            private readonly IMapper _mapper;

             public BoardsController(IBoardsService brdService, IMapper mapper)
             {
                    _brdService = brdService;
                    _mapper = mapper;
             }

            // GET: api/Boards
            [HttpGet]
            public async Task<ActionResult> GetBoards()
            {
                var boards = await _brdService.GetAllBoardsAsync();
                //var boardDTOs = _mapper.Map<List<BoardDTO>>(boards);

                return Ok(boards);
            }

            // GET: api/Boards/1
            [HttpGet("{id}")]
            public async Task<ActionResult> GetBoard(int id)
            {
                var board = await _brdService.GetBoardByIdAsync(id);

                if (board != null)
                {
                    var boardDTO = _mapper.Map<BoardDTO>(board);
                    return Ok(boardDTO);
                }
                else return NotFound();
            }


            // GET: api/Boards/obj/1
            [HttpGet("obj/{id}")]
            public ActionResult GetAllBoardObjectivesById(int id)
            {
                 var objectives = _brdService.GetAllBoardObjectives(id);

                 var objectiveDTOs = _mapper.Map<List<ObjectiveDTO>>(objectives);

                 return Ok(objectiveDTOs);
            }

          // GET: api/Boards/boards
          [HttpGet("brd")]
            public ActionResult GetAllBoardsWithObjectives()
            {
                var boards = _brdService.GetBoardsWithObjectives();

                return Ok(boards);
            }



        // POST: api/Boards
        [HttpPost]
            public async Task<ActionResult> PostBoard(BoardDTO boardDTO)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var board = _mapper.Map<Board>(boardDTO);
                await _brdService.CreateBoard(board);

                return CreatedAtAction("PostBoard", new { id = board.Id }, board);
            }

    

            // PUT: api/Objectives
            [HttpPut]
            public async Task<ActionResult> PutObjective(Board board)
            {
                 await _brdService.UpdateBoard(board);
                 return NoContent();
            }


            // PUT: api/Boards/1010
            [HttpPut("{id}")]
            public async Task<ActionResult> PutObjectiveById(int id, [FromBody] BoardDTO boardDTO)
            {

                var boardToUpdate = await _brdService.GetBoardByIdAsync(id);

                if (boardToUpdate == null)
                {
                    return NotFound($"Board with Id = {id} not found");
                }

                boardToUpdate = _mapper.Map(boardDTO, boardToUpdate);

                await _brdService.UpdateBoard(boardToUpdate);

                return NoContent();
        }

            // DELETE: api/Boards/1   
            [HttpDelete("{id}")]
             public async Task<ActionResult> DeleteBoardById(int id)
             {
                  await _brdService.DeleteBoardById(id);
                  return Ok();
             }

    }
}

