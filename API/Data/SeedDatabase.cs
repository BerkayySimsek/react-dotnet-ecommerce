using API.Entity;
using Microsoft.AspNetCore.Identity;

namespace API.Data;

public static class SeedDatabase
{
    public static async void Initialize(IApplicationBuilder app)
    {
        var userManager = app.ApplicationServices
            .CreateScope()
            .ServiceProvider
            .GetRequiredService<UserManager<AppUser>>();
        var roleManager = app.ApplicationServices
            .CreateScope()
            .ServiceProvider
            .GetRequiredService<RoleManager<AppRole>>();

        if (!roleManager.Roles.Any())
        {
            var customer = new AppRole { Name = "customer" };
            var admin = new AppRole { Name = "admin" };

            await roleManager.CreateAsync(customer);
            await roleManager.CreateAsync(admin);
        }
        if (!userManager.Users.Any())
        {
            var customer = new AppUser { Name = "Cansu Akil", UserName = "cansuakil", Email = "cansuakil@gmail.com" };
            var admin = new AppUser { Name = "Berkay Şimşek", UserName = "berkaysimsek", Email = "berkayysimsekk@gmail.com" };

            await userManager.CreateAsync(customer, "Customer_123");
            await userManager.AddToRoleAsync(customer, "Customer");

            await userManager.CreateAsync(admin, "Admin_123");
            await userManager.AddToRolesAsync(admin, ["Admin", "Customer"]);
        }
    }
}