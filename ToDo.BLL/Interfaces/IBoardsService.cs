using Microsoft.EntityFrameworkCore.Query;
using System.Collections.Generic;
using System.Threading.Tasks;
using ToDo.DAL.Entities;

namespace ToDo.BLL.Interfaces
{
    public interface IBoardsService
    {
        Task<ICollection<Board>> GetAllBoardsAsync();

        Task<Board> GetBoardByIdAsync(int boardId);

        Task CreateBoard(Board board);

        Task UpdateBoard(Board board);

        Task DeleteBoardById(int id);

        ICollection<Objective> GetAllBoardObjectives(int id);

        ICollection<Board> GetAllUserBoards(int userId);

        ICollection<Board> GetBoardsWithObjectives();

        //List<Board> GetBoardsWithObjectives(int id);
    }
}
