using Microsoft.EntityFrameworkCore.Migrations;

namespace CamexAPI.Migrations
{
    public partial class TranslateTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Languages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Value = table.Column<int>(nullable: false),
                    FlagSrc = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Languages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CityNameTranslates",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    CityId = table.Column<int>(nullable: false),
                    LanguageId = table.Column<int>(nullable: false),
                    OfficeId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CityNameTranslates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CityNameTranslates_Cities_CityId",
                        column: x => x.CityId,
                        principalTable: "Cities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CityNameTranslates_Languages_LanguageId",
                        column: x => x.LanguageId,
                        principalTable: "Languages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CityNameTranslates_Offices_OfficeId",
                        column: x => x.OfficeId,
                        principalTable: "Offices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OfficeNameTranlates",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    OfficeId = table.Column<int>(nullable: false),
                    LanguageId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OfficeNameTranlates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OfficeNameTranlates_Languages_LanguageId",
                        column: x => x.LanguageId,
                        principalTable: "Languages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OfficeNameTranlates_Offices_OfficeId",
                        column: x => x.OfficeId,
                        principalTable: "Offices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CityNameTranslates_CityId",
                table: "CityNameTranslates",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_CityNameTranslates_LanguageId",
                table: "CityNameTranslates",
                column: "LanguageId");

            migrationBuilder.CreateIndex(
                name: "IX_CityNameTranslates_OfficeId",
                table: "CityNameTranslates",
                column: "OfficeId");

            migrationBuilder.CreateIndex(
                name: "IX_OfficeNameTranlates_LanguageId",
                table: "OfficeNameTranlates",
                column: "LanguageId");

            migrationBuilder.CreateIndex(
                name: "IX_OfficeNameTranlates_OfficeId",
                table: "OfficeNameTranlates",
                column: "OfficeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CityNameTranslates");

            migrationBuilder.DropTable(
                name: "OfficeNameTranlates");

            migrationBuilder.DropTable(
                name: "Languages");
        }
    }
}
