using Microsoft.EntityFrameworkCore.Migrations;

namespace CamexAPI.Migrations
{
    public partial class fixOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
         /*   migrationBuilder.DropForeignKey(
                name: "FK_Cargos_Country_CountryId",
                table: "Cargos");

            migrationBuilder.DropForeignKey(
                name: "FK_CountryAddressDescription_Country_CountryId",
                table: "CountryAddressDescription");

            migrationBuilder.DropForeignKey(
                name: "FK_NoticeTranslate_Country_CountryId",
                table: "NoticeTranslate");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Country_CountryId",
                table: "Orders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Country",
                table: "Country");

            migrationBuilder.RenameTable(
                name: "Country",
                newName: "Countries");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Countries",
                table: "Countries",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Cargos_Countries_CountryId",
                table: "Cargos",
                column: "CountryId",
                principalTable: "Countries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CountryAddressDescription_Countries_CountryId",
                table: "CountryAddressDescription",
                column: "CountryId",
                principalTable: "Countries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_NoticeTranslate_Countries_CountryId",
                table: "NoticeTranslate",
                column: "CountryId",
                principalTable: "Countries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Countries_CountryId",
                table: "Orders",
                column: "CountryId",
                principalTable: "Countries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);*/
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cargos_Countries_CountryId",
                table: "Cargos");

            migrationBuilder.DropForeignKey(
                name: "FK_CountryAddressDescription_Countries_CountryId",
                table: "CountryAddressDescription");

            migrationBuilder.DropForeignKey(
                name: "FK_NoticeTranslate_Countries_CountryId",
                table: "NoticeTranslate");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Countries_CountryId",
                table: "Orders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Countries",
                table: "Countries");

            migrationBuilder.RenameTable(
                name: "Countries",
                newName: "Country");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Country",
                table: "Country",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Cargos_Country_CountryId",
                table: "Cargos",
                column: "CountryId",
                principalTable: "Country",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CountryAddressDescription_Country_CountryId",
                table: "CountryAddressDescription",
                column: "CountryId",
                principalTable: "Country",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_NoticeTranslate_Country_CountryId",
                table: "NoticeTranslate",
                column: "CountryId",
                principalTable: "Country",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Country_CountryId",
                table: "Orders",
                column: "CountryId",
                principalTable: "Country",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
