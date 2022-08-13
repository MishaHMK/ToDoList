
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ToDo.DAL.Entities
{
    public class Objective
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(30)]
        public string Title { get; set; }

        [MaxLength(100)]
        public string TaskDescription { get; set; }

        [DefaultValue("false")]
        public bool Completed { get; set; }

        public int BoardId { get; set; }
        public Board Board { get; set; }    

    }
}
