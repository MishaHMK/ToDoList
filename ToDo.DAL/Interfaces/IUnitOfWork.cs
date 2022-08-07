using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ToDo.DAL.Interfaces
{
    public interface IUnitOfWork
    {
        IBoardsRepository Boards
        {
            get;
        }
        IObjectivesRepository Objectives
        {
            get;
        }

        Task Save();
    }
}
