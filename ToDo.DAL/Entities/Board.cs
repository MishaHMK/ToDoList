using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ToDo.DAL.Entities
{
    public class Board
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(30)]
        public string Title { get; set; }
        public List<Objective> Tasks { get; set; }
    }
}
