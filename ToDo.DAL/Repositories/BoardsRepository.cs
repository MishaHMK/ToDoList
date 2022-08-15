using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDo.DAL.Entities;
using ToDo.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace ToDo.DAL.Repositories
{
    public class BoardsRepository : GenericRepository<Board>, IBoardsRepository
    {
        public BoardsRepository(ToDoListContext context) : base(context)
        {
        }

        public override async Task<ICollection<Board>> GetAll()
        {
            return await dbSet.ToListAsync();
        }

        public override async Task<Board> GetById(int id)
        {
            return await dbSet.FindAsync(id);
        }

        public override async Task Create(Board board)
        {
            await dbSet.AddAsync(board);
        }

        public override async Task Update(Board board)
        {
            _context.Entry(board).State = EntityState.Modified;
        }

        public override async Task Delete(int boardId)
        {
            Board board = await dbSet.FindAsync(boardId);
            dbSet.Remove(board);
        }

        public List<Objective> GetObjectives(int boardId)
        {

            var objectives = _context.Objectives.Where(o => o.BoardId == boardId).OrderBy(c => c.Completed).ToList();
            return objectives;
        }

        public List<Board> GetBoardsWithObjectives()
        {
            var boards = _context.Boards.Include(o => o.Tasks).ToList();
            return boards;
        }
    }
}
