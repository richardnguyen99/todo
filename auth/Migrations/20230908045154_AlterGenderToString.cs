using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace auth.Migrations
{
    /// <inheritdoc />
    public partial class AlterGenderToString : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "gender",
                schema: "user_schema",
                table: "user_info",
                type: "text",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "boolean",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "gender",
                schema: "user_schema",
                table: "user_info",
                type: "boolean",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
        }
    }
}
