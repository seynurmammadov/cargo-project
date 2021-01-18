using Microsoft.EntityFrameworkCore.Migrations;

namespace CamexAPI.Migrations
{
    public partial class LangFix2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CityNameTranslates_Offices_OfficeId",
                table: "CityNameTranslates");

            migrationBuilder.DropIndex(
                name: "IX_CityNameTranslates_OfficeId",
                table: "CityNameTranslates");

            migrationBuilder.DropColumn(
                name: "OfficeId",
                table: "CityNameTranslates");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OfficeId",
                table: "CityNameTranslates",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CityNameTranslates_OfficeId",
                table: "CityNameTranslates",
                column: "OfficeId");

            migrationBuilder.AddForeignKey(
                name: "FK_CityNameTranslates_Offices_OfficeId",
                table: "CityNameTranslates",
                column: "OfficeId",
                principalTable: "Offices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
