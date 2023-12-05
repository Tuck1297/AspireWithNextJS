using AutoMapper;
using AspireWithNextJS.WebAPI.Models;
using AspireWithNextJS.WebAPI.Models.InputModels;
using AspireWithNextJS.WebAPI.Models.OutputModels;

namespace AspireWithNextJS.WebAPI.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>().ReverseMap();

            CreateMap<ConnectionStrings, ConnectionStringsDto>();
            CreateMap<ConnectionStringsDto, ConnectionStrings>().ReverseMap();

            CreateMap<RegisterInputModel, User>()
             .ForMember(dest => dest.Role, opt => opt.MapFrom(src => "User")); // You may set a default role or handle it as needed

            CreateMap<User, RegisterInputModel>()
             .ForMember(dest => dest.ConfirmedPasswordHash, opt => opt.Ignore()) // Ignore ConfirmedPasswordHash during mapping
             .ReverseMap();

            CreateMap<ConnectionStringInputModel, ConnectionStrings>();
            CreateMap<ConnectionStrings, ConnectionStringInputModel>().ReverseMap();

            CreateMap<ConnectionStringOutputModel, ConnectionStrings>();
            CreateMap<ConnectionStrings, ConnectionStringOutputModel>().ReverseMap();

            CreateMap<UserOutputModel, User>();
            CreateMap<User, UserOutputModel>().ReverseMap();

            CreateMap<UpdateUserModel, User>();
            CreateMap<User, UpdateUserModel>().ReverseMap();
        }
    }

    internal class ConnectionStringsDto
    {
        public Guid UserId { get; set; }
        public required string Email { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Role { get; set; }
    }

    internal class UserDto
    {
        public Guid Id { get; set; }
        public required string DbName { get; set; }
        public required string DbType { get; set; }
        public required string DbConnectionString { get; set; }

    }
}
