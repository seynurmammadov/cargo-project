using Microsoft.EntityFrameworkCore.Migrations;

namespace CamexAPI.Migrations
{
    public partial class fixbalance : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Value",
                table: "Receipts",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.AlterColumn<decimal>(
                name: "UserBalance",
                table: "Balances",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "Value",
                table: "Receipts",
                type: "real",
                nullable: false,
                oldClrType: typeof(decimal));

            migrationBuilder.AlterColumn<float>(
                name: "UserBalance",
                table: "Balances",
                type: "real",
                nullable: false,
                oldClrType: typeof(decimal));
        }
    }
}
