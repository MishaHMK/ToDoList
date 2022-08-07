using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Threading.Tasks;
using ToDo.DAL.Interfaces;

namespace ToDo.DAL.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected ToDoListContext _context;
        internal Microsoft.EntityFrameworkCore.DbSet<T> dbSet { get; set; }

        public GenericRepository(ToDoListContext context)
        {
            _context = context;
            dbSet = context.Set<T>();
        }

        public virtual async Task<ICollection<T>> GetAll()
        {
            return await dbSet.ToListAsync();
        }

        public virtual async Task<T> GetById(int id)
        {
            return await dbSet.FindAsync(id);
        }

        public virtual async Task Create(T entity)
        {
            await dbSet.AddAsync(entity);
        }

        public virtual Task Update(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual Task Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
