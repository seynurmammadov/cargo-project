using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccess.Migrations
{
    public partial class CounryAdressesActionsFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Countries_CountryAddressDescriptions_CountryAddressDescriptionId",
                table: "Countries");

            migrationBuilder.DropIndex(
                name: "IX_Countries_CountryAddressDescriptionId",
                table: "Countries");

            migrationBuilder.DropColumn(
                name: "CountryAddressDescriptionId",
                table: "Countries");

            migrationBuilder.AddColumn<int>(
                name: "CountryId",
                table: "CountryAddressDescriptions",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_CountryAddressDescriptions_CountryId",
                table: "CountryAddressDescriptions",
                column: "CountryId");

            migrationBuilder.AddForeignKey(
                name: "FK_CountryAddressDescriptions_Countries_CountryId",
                table: "CountryAddressDescriptions",
                column: "CountryId",
                principalTable: "Countries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CountryAddressDescriptions_Countries_CountryId",
                table: "CountryAddressDescriptions");

            migrationBuilder.DropIndex(
                name: "IX_CountryAddressDescriptions_CountryId",
                table: "CountryAddressDescriptions");

            migrationBuilder.DropColumn(
                name: "CountryId",
                table: "CountryAddressDescriptions");

            migrationBuilder.AddColumn<int>(
                name: "CountryAddressDescriptionId",
                table: "Countries",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Countries_CountryAddressDescriptionId",
                table: "Countries",
                column: "CountryAddressDescriptionId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Countries_CountryAddressDescriptions_CountryAddressDescriptionId",
                table: "Countries",
                column: "CountryAddressDescriptionId",
                principalTable: "CountryAddressDescriptions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
