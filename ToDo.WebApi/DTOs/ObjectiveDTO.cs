using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ToDoWebApi.DTOs
{
    public class ObjectiveDTO
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(30)]
        public string Title { get; set; }
        [MaxLength(100)]
        public string TaskDescription { get; set; }

        [DefaultValue("false")]
        public bool Completed { get; set; }
        public int BoardId { get; set; }
    }
}
