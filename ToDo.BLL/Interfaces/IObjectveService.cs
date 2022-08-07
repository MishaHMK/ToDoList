using System.Collections.Generic;
using System.Threading.Tasks;
using ToDo.DAL.Entities;

namespace ToDo.BLL.Interfaces
{
    public interface IObjectiveService
    {
        Task<ICollection<Objective>> GetAllObjectivesAsync();

        Task<Objective> GetObjectiveByIdAsync(int objectId);

        Task CreateObjective(Objective objective);

        Task UpdateObjective(Objective objective);

        Task DeleteObjectiveById(int id);
    }
}
