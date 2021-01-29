using Microsoft.EntityFrameworkCore.Migrations;

namespace CamexAPI.Migrations
{
    public partial class cargosFix2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "Cargos",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Cargos_ProductId",
                table: "Cargos",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cargos_Product_ProductId",
                table: "Cargos",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cargos_Product_ProductId",
                table: "Cargos");

            migrationBuilder.DropIndex(
                name: "IX_Cargos_ProductId",
                table: "Cargos");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "Cargos");
        }
    }
}
