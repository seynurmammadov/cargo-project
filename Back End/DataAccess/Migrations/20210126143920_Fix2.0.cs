using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccess.Migrations
{
    public partial class Fix20 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PrivateCustomers_Сitizenships_СitizenshipId",
                table: "PrivateCustomers");

            migrationBuilder.DropIndex(
                name: "IX_PrivateCustomers_СitizenshipId",
                table: "PrivateCustomers");

            migrationBuilder.DropColumn(
                name: "СitizenshipId",
                table: "PrivateCustomers");

          /*  migrationBuilder.DropColumn(
                name: "Name",
                table: "Offices");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Cities");*/

            migrationBuilder.AddColumn<int>(
                name: "CitizenshipId",
                table: "PrivateCustomers",
                nullable: false,
                defaultValue: 0);

         /*   migrationBuilder.AddColumn<bool>(
                name: "IsActived",
                table: "Offices",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
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

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Cities",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "PriceValue",
                table: "Cities",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "AppUser",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "Languages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Value = table.Column<string>(nullable: true),
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
                    LanguageId = table.Column<int>(nullable: false)
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
                });*/

            migrationBuilder.CreateIndex(
                name: "IX_PrivateCustomers_CitizenshipId",
                table: "PrivateCustomers",
                column: "CitizenshipId");

           /* migrationBuilder.CreateIndex(
                name: "IX_CityNameTranslates_CityId",
                table: "CityNameTranslates",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_CityNameTranslates_LanguageId",
                table: "CityNameTranslates",
                column: "LanguageId");

            migrationBuilder.CreateIndex(
                name: "IX_OfficeNameTranlates_LanguageId",
                table: "OfficeNameTranlates",
                column: "LanguageId");

            migrationBuilder.CreateIndex(
                name: "IX_OfficeNameTranlates_OfficeId",
                table: "OfficeNameTranlates",
                column: "OfficeId");*/

            migrationBuilder.AddForeignKey(
                name: "FK_PrivateCustomers_Сitizenships_CitizenshipId",
                table: "PrivateCustomers",
                column: "CitizenshipId",
                principalTable: "Сitizenships",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PrivateCustomers_Сitizenships_CitizenshipId",
                table: "PrivateCustomers");

            migrationBuilder.DropTable(
                name: "CityNameTranslates");

            migrationBuilder.DropTable(
                name: "OfficeNameTranlates");

            migrationBuilder.DropTable(
                name: "Languages");

            migrationBuilder.DropIndex(
                name: "IX_PrivateCustomers_CitizenshipId",
                table: "PrivateCustomers");

            migrationBuilder.DropColumn(
                name: "CitizenshipId",
                table: "PrivateCustomers");

            migrationBuilder.DropColumn(
                name: "IsActived",
                table: "Offices");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Offices");

            migrationBuilder.DropColumn(
                name: "PriceValue",
                table: "Offices");

            migrationBuilder.DropColumn(
                name: "IsActived",
                table: "Cities");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Cities");

            migrationBuilder.DropColumn(
                name: "PriceValue",
                table: "Cities");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "AppUser");

            migrationBuilder.AddColumn<int>(
                name: "СitizenshipId",
                table: "PrivateCustomers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Offices",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Cities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PrivateCustomers_СitizenshipId",
                table: "PrivateCustomers",
                column: "СitizenshipId");

            migrationBuilder.AddForeignKey(
                name: "FK_PrivateCustomers_Сitizenships_СitizenshipId",
                table: "PrivateCustomers",
                column: "СitizenshipId",
                principalTable: "Сitizenships",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
