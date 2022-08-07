using System.Collections.Generic;
using System.Threading.Tasks;
using ToDo.DAL.Entities;
using ToDo.BLL.Interfaces;
using ToDo.DAL.Interfaces;

namespace ToDo.BLL.Services
{
    public class ObjectiveService : IObjectiveService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ObjectiveService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<ICollection<Objective>> GetAllObjectivesAsync()
        {
            return await _unitOfWork.Objectives.GetAll();
        }

        public async Task<Objective> GetObjectiveByIdAsync(int objectId)
        {
            return await _unitOfWork.Objectives.GetById(objectId);
        }


        public async Task CreateObjective(Objective objective)
        {
            await _unitOfWork.Objectives.Create(objective);
            await _unitOfWork.Save();
        }

        public async Task UpdateObjective(Objective objective)
        {
            await _unitOfWork.Objectives.Update(objective);
            await _unitOfWork.Save();
        }

        public async Task DeleteObjectiveById(int id)
        {
            await _unitOfWork.Objectives.Delete(id);
            await _unitOfWork.Save();
        }
    }
}
