using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccess.Migrations
{
    public partial class ReplyMessage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Image",
                table: "Services",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            /*  migrationBuilder.AddColumn<string>(
                  name: "Email",
                  table: "Offices",
                  nullable: false,
                  defaultValue: "");

              migrationBuilder.AddColumn<string>(
                  name: "Email2",
                  table: "Offices",
                  nullable: true);

              migrationBuilder.AddColumn<string>(
                  name: "PhoneNumber",
                  table: "Offices",
                  nullable: false,
                  defaultValue: "");

              migrationBuilder.AddColumn<string>(
                  name: "Url",
                  table: "Offices",
                  nullable: false,
                  defaultValue: "");

              migrationBuilder.AddColumn<string>(
                  name: "Address",
                  table: "OfficeNameTranslates",
                  nullable: false,
                  defaultValue: "");

              migrationBuilder.AddColumn<string>(
                  name: "WorkTime",
                  table: "OfficeNameTranslates",
                  nullable: false,
                  defaultValue: "");*/

            migrationBuilder.CreateTable(
                name: "MessageAdmins",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(nullable: true),
                    Subject = table.Column<string>(nullable: true),
                    Message = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MessageAdmins", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MessageUsers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Fullname = table.Column<string>(nullable: false),
                    PhoneNumber = table.Column<string>(nullable: false),
                    Email = table.Column<string>(nullable: false),
                    CamexId = table.Column<string>(nullable: false),
                    Message = table.Column<string>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MessageUsers", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MessageAdmins");

            migrationBuilder.DropTable(
                name: "MessageUsers");

        /*    migrationBuilder.DropColumn(
                name: "Email",
                table: "Offices");

            migrationBuilder.DropColumn(
                name: "Email2",
                table: "Offices");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Offices");

            migrationBuilder.DropColumn(
                name: "Url",
                table: "Offices");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "OfficeNameTranslates");

            migrationBuilder.DropColumn(
                name: "WorkTime",
                table: "OfficeNameTranslates");*/

            migrationBuilder.AlterColumn<string>(
                name: "Image",
                table: "Services",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
