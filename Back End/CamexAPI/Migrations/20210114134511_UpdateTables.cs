using Microsoft.EntityFrameworkCore.Migrations;

namespace CamexAPI.Migrations
{
    public partial class UpdateTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActived",
                table: "Offices",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "PriceValue",
                table: "Offices",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsActived",
                table: "Cities",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "PriceValue",
                table: "Cities",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActived",
                table: "Offices");

            migrationBuilder.DropColumn(
                name: "PriceValue",
                table: "Offices");

            migrationBuilder.DropColumn(
                name: "IsActived",
                table: "Cities");

            migrationBuilder.DropColumn(
                name: "PriceValue",
                table: "Cities");
        }
    }
}
