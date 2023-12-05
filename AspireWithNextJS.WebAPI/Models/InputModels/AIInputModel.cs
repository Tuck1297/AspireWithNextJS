using System.ComponentModel.DataAnnotations;

namespace AspireWithNextJS.WebAPI.Models.InputModels
{
    public class AIInputModel
    {
        [Required(ErrorMessage = "Database Connection Id is required.")]
        public required Guid DatabaseConnectionId { get; set; }
        [Required(ErrorMessage = "Prompt is required.")]
        public required string Prompt { get; set; }
        [Required(ErrorMessage = "Data retrieval selection required.")]
        public required string DataRetrievalSelection { get; set; } // be either all or random-25
    }
}