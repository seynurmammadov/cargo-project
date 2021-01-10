using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccess.Migrations
{
    public partial class Users : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BusinessCustomers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CamexId = table.Column<string>(nullable: true),
                    CompanyRegistrationNumber = table.Column<int>(nullable: false),
                    CompanyName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusinessCustomers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Сitizenships",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Сitizenships", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PrivateCustomers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CamexId = table.Column<string>(nullable: true),
                    PassportNumber = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Surname = table.Column<string>(nullable: true),
                    Lastname = table.Column<string>(nullable: true),
                    Birthday = table.Column<DateTime>(nullable: false),
                    СitizenshipId = table.Column<int>(nullable: false),
                    FINCode = table.Column<string>(nullable: true),
                    IsMan = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrivateCustomers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PrivateCustomers_Сitizenships_СitizenshipId",
                        column: x => x.СitizenshipId,
                        principalTable: "Сitizenships",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PrivateCustomers_СitizenshipId",
                table: "PrivateCustomers",
                column: "СitizenshipId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BusinessCustomers");

            migrationBuilder.DropTable(
                name: "PrivateCustomers");

            migrationBuilder.DropTable(
                name: "Сitizenships");
        }
    }
}
