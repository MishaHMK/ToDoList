using System.ComponentModel.DataAnnotations;

namespace ToDoWebApi.DTOs
{
    public class ObjectiveDTO
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }
        public string TaskDescription { get; set; }
        public bool Completed { get; set; }
        public int BoardId { get; set; }
    }
}
