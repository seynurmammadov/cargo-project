using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CamexAPI.Migrations
{
    public partial class cargos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           /* migrationBuilder.CreateTable(
                name: "Country",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: false),
                    Value = table.Column<float>(nullable: false),
                    Image = table.Column<string>(nullable: true),
                    BgImage = table.Column<string>(nullable: true),
                    Wallet = table.Column<string>(nullable: true),
                    IsActived = table.Column<bool>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Country", x => x.Id);
                });*/

           /* migrationBuilder.CreateTable(
                name: "Product",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IsActived = table.Column<bool>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product", x => x.Id);
                });
*/
            migrationBuilder.CreateTable(
                name: "Status",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: false),
                    IsActived = table.Column<bool>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Status", x => x.Id);
                });
/*
            migrationBuilder.CreateTable(
                name: "CountryAddressDescription",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: false),
                    CountryId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CountryAddressDescription", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CountryAddressDescription_Country_CountryId",
                        column: x => x.CountryId,
                        principalTable: "Country",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });*/

          /*  migrationBuilder.CreateTable(
                name: "NoticeTranslate",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: false),
                    CountryId = table.Column<int>(nullable: false),
                    LanguageId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NoticeTranslate", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NoticeTranslate_Country_CountryId",
                        column: x => x.CountryId,
                        principalTable: "Country",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NoticeTranslate_Languages_LanguageId",
                        column: x => x.LanguageId,
                        principalTable: "Languages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });*/

           /* migrationBuilder.CreateTable(
                name: "ProductTranslate",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: false),
                    ProductId = table.Column<int>(nullable: false),
                    LanguageId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductTranslate", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductTranslate_Languages_LanguageId",
                        column: x => x.LanguageId,
                        principalTable: "Languages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductTranslate_Product_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Product",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });*/

            migrationBuilder.CreateTable(
                name: "Cargos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Track = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Price = table.Column<float>(nullable: false),
                    Count = table.Column<int>(nullable: false),
                    Notice = table.Column<string>(nullable: true),
                    Image = table.Column<string>(nullable: true),
                    TrackCamex = table.Column<string>(nullable: false),
                    Weight = table.Column<float>(nullable: false),
                    CamexPrice = table.Column<float>(nullable: false),
                    OfficeId = table.Column<int>(nullable: false),
                    StatusId = table.Column<int>(nullable: false),
                    CountryId = table.Column<int>(nullable: false),
                    PaymentStatus = table.Column<bool>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    ModifiedDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cargos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cargos_Country_CountryId",
                        column: x => x.CountryId,
                        principalTable: "Countries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Cargos_Offices_OfficeId",
                        column: x => x.OfficeId,
                        principalTable: "Offices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Cargos_Status_StatusId",
                        column: x => x.StatusId,
                        principalTable: "Status",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Cargos_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cargos_CountryId",
                table: "Cargos",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_Cargos_OfficeId",
                table: "Cargos",
                column: "OfficeId");

            migrationBuilder.CreateIndex(
                name: "IX_Cargos_StatusId",
                table: "Cargos",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Cargos_UserId",
                table: "Cargos",
                column: "UserId");

            /*    migrationBuilder.CreateIndex(
                    name: "IX_CountryAddressDescription_CountryId",
                    table: "CountryAddressDescription",
                    column: "CountryId");*/

            /* migrationBuilder.CreateIndex(
             name: "IX_NoticeTranslate_CountryId",
               table: "NoticeTranslate",
               column: "CountryId");

           migrationBuilder.CreateIndex(
               name: "IX_NoticeTranslate_LanguageId",
               table: "NoticeTranslate",
               column: "LanguageId");

           migrationBuilder.CreateIndex(
               name: "IX_ProductTranslate_LanguageId",
               table: "ProductTranslate",
               column: "LanguageId");

           migrationBuilder.CreateIndex(
               name: "IX_ProductTranslate_ProductId",
               table: "ProductTranslate",
               column: "ProductId");*/
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cargos");

            migrationBuilder.DropTable(
                name: "CountryAddressDescription");

            migrationBuilder.DropTable(
                name: "NoticeTranslate");

            migrationBuilder.DropTable(
                name: "ProductTranslate");

            migrationBuilder.DropTable(
                name: "Status");

            migrationBuilder.DropTable(
                name: "Country");

            migrationBuilder.DropTable(
                name: "Product");
        }
    }
}
