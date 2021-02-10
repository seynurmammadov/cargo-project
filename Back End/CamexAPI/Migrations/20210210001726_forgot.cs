using Microsoft.EntityFrameworkCore.Migrations;

namespace CamexAPI.Migrations
{
    public partial class forgot : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ActiveCode",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActiveCode",
                table: "AspNetUsers");
        }
    }
}
