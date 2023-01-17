using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UpHotel.Data.Migrations
{
    public partial class Add_Reception_role : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                INSERT INTO AspNetRoles(Id, Name, NormalizedName, ConcurrencyStamp) VALUES
                    (NEWID(), 'Reception', 'RECEPTION', '')
            ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                DELETE FROM AspNetRoles
                WHERE NormalizedName = 'RECEPTION'
            ");
        }
    }
}
