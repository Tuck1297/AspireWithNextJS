using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AspireWithNextJS.WebAPI.Migrations.Data
{
    /// <inheritdoc />
    public partial class Data : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserAccount",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: false),
                    RefreshToken = table.Column<string>(type: "text", nullable: false),
                    TokenExpires = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    TokenCreated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAccount", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    Role = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "ConnectionStrings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    dbName = table.Column<string>(type: "text", nullable: false),
                    dbType = table.Column<string>(type: "text", nullable: false),
                    dbConnectionString = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    currentTableInteracting = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConnectionStrings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ConnectionStrings_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "UserAccount",
                columns: new[] { "UserId", "Email", "PasswordHash", "RefreshToken", "TokenCreated", "TokenExpires" },
                values: new object[,]
                {
                    { new Guid("d63f0ca3-e25d-4583-9354-57f110538a55"), "test2hackathon.com", "$2a$11$E8B8qV/3bS6lcEYZgVMbWuyjFvoterdAKPqf/STj0ujQ1yYFSTQY2", "5MPNbnyAhUZGr7uBWAFlRSLRWKMMg7+e1zNH5fs/4I31B1YxAwLZiFxKNFlGZctBeKgoUo4fyuqRZw875dRIoA==", new DateTime(2023, 12, 5, 6, 18, 37, 240, DateTimeKind.Utc).AddTicks(9584), new DateTime(2023, 12, 5, 6, 48, 37, 240, DateTimeKind.Utc).AddTicks(9578) },
                    { new Guid("d63f0ca3-e25d-4583-9354-57f110538f45"), "test1@hackathon.com", "$2a$11$pGTOlU2xtRRKU0QgpWRIH.PmW6/arjo6cd2C9tzsUbZDGinjSrxXm", "IPa8wYK5nA8jjR5UbU4WUNNNkjBCpLHyfCYKzElOEB55vYixePRlPyFN8grrS4NgQkK5s/yZcnxI8zbALRqdoA==", new DateTime(2023, 12, 5, 6, 18, 37, 141, DateTimeKind.Utc).AddTicks(785), new DateTime(2023, 12, 5, 6, 48, 37, 141, DateTimeKind.Utc).AddTicks(778) }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Email", "FirstName", "LastName", "Role" },
                values: new object[,]
                {
                    { new Guid("d63f0ca3-e25d-4583-9354-57f110538a55"), "test2@hackathon.com", "TestUser", "Tester", "User" },
                    { new Guid("d63f0ca3-e25d-4583-9354-57f110538f45"), "test1@hackathon.com", "TestAdmin", "Tester", "Admin" }
                });

            migrationBuilder.InsertData(
                table: "ConnectionStrings",
                columns: new[] { "Id", "UserId", "currentTableInteracting", "dbConnectionString", "dbName", "dbType" },
                values: new object[,]
                {
                    { new Guid("4ffd0817-a0f5-48bb-b723-40cf88b7c673"), new Guid("d63f0ca3-e25d-4583-9354-57f110538f45"), "", "host=127.0.0.1; database=WebsiteInfo; port=5420; user id=postgres; password=123456;", "WebsiteInfo", "Postgres" },
                    { new Guid("ed46eec9-e94c-41e4-b2d9-089b1b171beb"), new Guid("d63f0ca3-e25d-4583-9354-57f110538f45"), "", "host=127.0.0.1; database=SupplyChain; port=5420; user id=postgres; password=123456;", "SupplyChain", "Postgres" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ConnectionStrings_UserId",
                table: "ConnectionStrings",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ConnectionStrings_dbName",
                table: "ConnectionStrings",
                column: "dbName",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConnectionStrings");

            migrationBuilder.DropTable(
                name: "UserAccount");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
