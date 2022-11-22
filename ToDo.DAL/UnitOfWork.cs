using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using ToDo.DAL.Interfaces;
using ToDo.DAL.Repositories;


namespace ToDo.DAL
{
    public class UnitOfWork: IUnitOfWork
    {
        private readonly ToDoListContext _context;

        public IBoardsRepository Boards { get; private set; }

        public IObjectivesRepository Objectives { get; private set; }

        public IUserRepository Users { get; private set; }

        public UnitOfWork(ToDoListContext context)
        {
            _context = context;

            Boards = new BoardsRepository(context);

            Objectives = new ObjectivesRepository(context);

            Users = new UsersRepository(context);
        }

        public async Task CompleteAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }
    }
}
