using Microsoft.EntityFrameworkCore.Migrations;

namespace DatingAppApi.Migrations
{
    public partial class MessageEntityCorrection : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RecipinetId",
                table: "Messages");

            migrationBuilder.AlterColumn<int>(
                name: "RecipientId",
                table: "Messages",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "RecipientId",
                table: "Messages",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "RecipinetId",
                table: "Messages",
                nullable: false,
                defaultValue: 0);
        }
    }
}
