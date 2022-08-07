using Microsoft.EntityFrameworkCore.Migrations;

namespace ToDoWebApi.Migrations
{
    public partial class EntityUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Objectives_Boards_BoardId",
                table: "Objectives");

            migrationBuilder.AlterColumn<int>(
                name: "BoardId",
                table: "Objectives",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Objectives_Boards_BoardId",
                table: "Objectives",
                column: "BoardId",
                principalTable: "Boards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Objectives_Boards_BoardId",
                table: "Objectives");

            migrationBuilder.AlterColumn<int>(
                name: "BoardId",
                table: "Objectives",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Objectives_Boards_BoardId",
                table: "Objectives",
                column: "BoardId",
                principalTable: "Boards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
