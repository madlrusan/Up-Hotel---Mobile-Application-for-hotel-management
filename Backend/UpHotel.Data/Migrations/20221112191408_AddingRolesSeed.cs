using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UpHotel.Data.Migrations
{
    public partial class AddingRolesSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                INSERT INTO AspNetRoles(Id, Name, NormalizedName, ConcurrencyStamp) VALUES
                    (NEWID(), 'Housekeeping', 'HOUSEKEEPING', ''),
                    (NEWID(), 'Admin', 'ADMIN', ''),
                    (NEWID(), 'Room', 'ROOM', '')
            ");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                DELETE FROM AspNetRoles
                WHERE NormalizedName in ('HOUSEKEEPING', 'ADMIN', 'ROOM')
            ");
        }
    }
}
