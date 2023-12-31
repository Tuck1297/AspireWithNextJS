﻿using System.ComponentModel.DataAnnotations;

namespace AspireWithNextJS.WebAPI.Models.OutputModels
{
    public class ConnectionStringOutputModel
    {
        public Guid Id { get; set; }
        public required string dbName { get; set; }

        public required string dbType { get; set; }
    }
}
