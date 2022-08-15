using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDo.DAL.Interfaces;
using ToDo.DAL.Entities;
using ToDo.DAL;

namespace ToDo.DAL.Repositories
{
    public class ObjectivesRepository : GenericRepository<Objective>, IObjectivesRepository
    {
        public ObjectivesRepository(ToDoListContext context) : base(context)
        {
        }

        public override async Task<ICollection<Objective>> GetAll()
        {
            return await dbSet.OrderBy(p => p.Completed).ToListAsync();
        }

        public override async Task<Objective> GetById(int id)
        {
            return await dbSet.FindAsync(id);
        }

        public override async Task Create(Objective objective)
        {
            await dbSet.AddAsync(objective);
        }

        public override async Task Update(Objective objective)
        {
            _context.Entry(objective).State = EntityState.Modified;
        }

        public override async Task Delete(int objectId)
        {
            Objective objective = await dbSet.FindAsync(objectId);
            dbSet.Remove(objective);
        }
    }
}
