using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccess.Migrations
{
    public partial class Descs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           /* migrationBuilder.AddColumn<string>(
                name: "ActiveCode",
                table: "AppUser",
                nullable: true);*/

            migrationBuilder.CreateTable(
                name: "About",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DescRus = table.Column<string>(nullable: false),
                    DescEng = table.Column<string>(nullable: false),
                    DescAz = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_About", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Bio",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PageTitle = table.Column<string>(nullable: false),
                    CallCenter = table.Column<string>(nullable: false),
                    LogoNavbar = table.Column<string>(nullable: true),
                    LogoFooter = table.Column<string>(nullable: true),
                    ShortDescRus = table.Column<string>(nullable: false),
                    ShortDescEng = table.Column<string>(nullable: false),
                    ShortDescAz = table.Column<string>(nullable: false),
                    SliderTitleRus = table.Column<string>(nullable: true),
                    SliderTitleEng = table.Column<string>(nullable: false),
                    SliderTitleAz = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bio", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ContactNotice",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DescRus = table.Column<string>(nullable: false),
                    DescEng = table.Column<string>(nullable: false),
                    DescAz = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactNotice", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "About");

            migrationBuilder.DropTable(
                name: "Bio");

            migrationBuilder.DropTable(
                name: "ContactNotice");
/*
            migrationBuilder.DropColumn(
                name: "ActiveCode",
                table: "AppUser");*/
        }
    }
}
