using Microsoft.EntityFrameworkCore.Query;
using System.Collections.Generic;
using System.Threading.Tasks;
using ToDo.BLL.Interfaces;
using ToDo.DAL.Entities;
using ToDo.DAL.Interfaces;

namespace ToDo.BLL.Services
{
    public class BoardService : IBoardsService
    {
        private readonly IUnitOfWork _unitOfWork;

        public BoardService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<ICollection<Board>> GetAllBoardsAsync()
        {
            return await _unitOfWork.Boards.GetAll();
        }

        public async Task<Board> GetBoardByIdAsync(int boardId)
        {
            return await _unitOfWork.Boards.GetById(boardId);
        }


        public async Task CreateBoard(Board board)
        {
            await _unitOfWork.Boards.Create(board);
            await _unitOfWork.Save();
        }

        public async Task UpdateBoard(Board board)
        {
            await _unitOfWork.Boards.Update(board);
            await _unitOfWork.Save();
        }

        public async Task DeleteBoardById(int id)
        {
            await _unitOfWork.Boards.Delete(id);
            await _unitOfWork.Save();
        }

        public ICollection<Objective> GetAllBoardObjectives(int id)
        {
            return _unitOfWork.Boards.GetObjectives(id);
        }

        public ICollection<Board> GetBoardsWithObjectives()
        {
            return _unitOfWork.Boards.GetBoardsWithObjectives();
        }
    }
}
