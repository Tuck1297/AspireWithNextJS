using AspireWithNextJS.WebAPI.Models.InputModels;
using AspireWithNextJS.WebAPI.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using AspireWithNextJS.WebAPI.Helpers;
using AspireWithNextJS.WebAPI.Models;

namespace AspireWithNextJS.WebAPI.Controllers
{
    [ApiController]
    [Route("ai")]
    public class AIController : Controller
    {

        private readonly IMapper _mapper;
        private readonly AiServices _aiServices;
        private readonly ILogger _logger;
        private readonly ConnectionStringsService _connectionStringService;

        public AIController(IMapper mapper, AiServices aiServices, ILogger logger, ConnectionStringsService connectionStringService)
        {
            _mapper = mapper;
            _aiServices = aiServices;
            _logger = logger;
            _connectionStringService = connectionStringService;

        }

        [HttpPost("Summarize")]
        [Authorize]
        public async Task<IActionResult> Summarize(AIInputModel model)
        {
            try
            {
                var dbConnectData = AuthenticateUser(model.DatabaseConnectionId);
                if (dbConnectData == null)
                {
                    return BadRequest("The request is invalid or missing requried parameters.");
                }

                var tableName = dbConnectData.currentTableInteracting;

                if (tableName == null)
                {
                    return BadRequest("Invalid or bad request");
                }

                var cs = dbConnectData.dbConnectionString;

                var query = "";

                if (model.DataRetrievalSelection == "all")
                {
                    query = $"SELECT * FROM {'"'+tableName+'"'}";
                } else
                {
                    query = $"SELECT * FROM {'"'+tableName+'"'} ORDER BY RANDOM() limit 25";
                }

                using (var dbExecutor = new DbExecutor(cs))
                {
                    try 
                    {
                        var dataResult = await dbExecutor.ExecuteQuery<dynamic>(query);
                        if (dataResult != null)
                        {
                            //var resultArray = dataResult.Select(t => t).ToArray();

                            var resultSummary = await _aiServices.Summarize(dataResult, model.Prompt);
                            if (resultSummary != null)
                            {
                                return Ok(resultSummary);
                            }
                        }
                        return BadRequest("AI is unable to summarize at this time.");
                    }
                    catch(Exception error)
                    {
                        _logger.LogError(error.Message);
                        return BadRequest("Invalid or bad request");
                    }
                }
            }
            catch (Exception error)
            {
                _logger.LogError(error.Message);
                return StatusCode(500);
            }
        }

        private ConnectionStrings? AuthenticateUser(Guid dbId)
        {
            var userIdClaim = User.FindFirst("ID");
            if (userIdClaim == null)
            {
                return null;
            }

            var dbConnectData = _connectionStringService.GetById(dbId);

            if (dbConnectData == null)
            {
                return null;
            }

            if (Guid.Parse(userIdClaim.Value) != dbConnectData.UserId)
            {
                return null;
            }
            return dbConnectData;
        }
    }
}
