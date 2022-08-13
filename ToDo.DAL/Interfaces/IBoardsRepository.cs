using Microsoft.EntityFrameworkCore.Query;
using System.Collections.Generic;
using System.Threading.Tasks;
using ToDo.DAL.Entities;

namespace ToDo.DAL.Interfaces
{
    public interface IBoardsRepository : IGenericRepository<Board>
    {
        List<Objective> GetObjectives(int boardId);

        List<Board> GetBoardsWithObjectives();

        //List<Board> GetBoardsWithObjectives(int boardId);
    }
}
