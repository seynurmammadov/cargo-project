using Microsoft.EntityFrameworkCore.Migrations;

namespace CamexAPI.Migrations
{
    public partial class fixagain : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Office_OfficeID",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "OfficeID",
                table: "AspNetUsers",
                newName: "OfficeId");

            migrationBuilder.RenameIndex(
                name: "IX_AspNetUsers_OfficeID",
                table: "AspNetUsers",
                newName: "IX_AspNetUsers_OfficeId");

            migrationBuilder.AddColumn<float>(
                name: "UserBalance",
                table: "Balance",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Office_OfficeId",
                table: "AspNetUsers",
                column: "OfficeId",
                principalTable: "Office",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Office_OfficeId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "UserBalance",
                table: "Balance");

            migrationBuilder.RenameColumn(
                name: "OfficeId",
                table: "AspNetUsers",
                newName: "OfficeID");

            migrationBuilder.RenameIndex(
                name: "IX_AspNetUsers_OfficeId",
                table: "AspNetUsers",
                newName: "IX_AspNetUsers_OfficeID");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Office_OfficeID",
                table: "AspNetUsers",
                column: "OfficeID",
                principalTable: "Office",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
