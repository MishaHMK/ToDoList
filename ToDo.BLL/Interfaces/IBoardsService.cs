using Microsoft.EntityFrameworkCore.Query;
using System.Collections.Generic;
using System.Threading.Tasks;
using ToDo.DAL.Entities;

namespace ToDo.BLL.Interfaces
{
    public interface IBoardsService
    {
        Task<ICollection<Board>> GetAllBoardsAsync();

        Task<Board> GetBoardByIdAsync(int objectId);

        Task CreateBoard(Board objective);

        Task UpdateBoard(Board objective);

        Task DeleteBoardById(int id);

        ICollection<Objective> GetAllBoardObjectives(int id);

        ICollection<Board> GetBoardsWithObjectives();

        //List<Board> GetBoardsWithObjectives(int id);
    }
}
