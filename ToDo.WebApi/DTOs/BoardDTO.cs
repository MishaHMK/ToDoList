using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace ToDoWebApi.DTOs
{
    public class BoardDTO
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(30)]
        public string Title { get; set; }
        public int UserId { get; set; }
    }
}
