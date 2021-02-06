using Microsoft.EntityFrameworkCore.Migrations;

namespace CamexAPI.Migrations
{
    public partial class AboutOfficeCRUD : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
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
                name: "Address",
                table: "OfficeNameTranslates",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "WorkTime",
                table: "OfficeNameTranslates",
                nullable: false,
                defaultValue: "");

        /*    migrationBuilder.CreateTable(
                name: "Tariff",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    To = table.Column<string>(nullable: false),
                    CountryId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tariff", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tariff_Countries_CountryId",
                        column: x => x.CountryId,
                        principalTable: "Countries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PriceList",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Min = table.Column<decimal>(nullable: false),
                    Max = table.Column<decimal>(nullable: false),
                    Price = table.Column<decimal>(nullable: false),
                    TariffId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PriceList", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PriceList_Tariff_TariffId",
                        column: x => x.TariffId,
                        principalTable: "Tariff",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PriceList_TariffId",
                table: "PriceList",
                column: "TariffId");

            migrationBuilder.CreateIndex(
                name: "IX_Tariff_CountryId",
                table: "Tariff",
                column: "CountryId");*/
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
/*            migrationBuilder.DropTable(
                name: "PriceList");

            migrationBuilder.DropTable(
                name: "Tariff");*/

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Offices");

            migrationBuilder.DropColumn(
                name: "Email2",
                table: "Offices");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Offices");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "OfficeNameTranslates");

            migrationBuilder.DropColumn(
                name: "WorkTime",
                table: "OfficeNameTranslates");
        }
    }
}
