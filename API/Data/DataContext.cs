using API.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext(DbContextOptions options) : IdentityDbContext<AppUser, AppRole, string>(options)
    {
        public DbSet<Product> Products => Set<Product>();
        public DbSet<Cart> Carts => Set<Cart>();
        public DbSet<Order> Orders => Set<Order>();
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>().HasData(
                new List<Product>{
                    new Product{Id=1,Name="Iphone 15", Description="Telefon Açıklaması",ImageUrl="1.jpg",Price=70000,IsActive=true,Stock=100},
                    new Product{Id=2,Name="Iphone 16", Description="Telefon Açıklaması",ImageUrl="2.jpg",Price=80000,IsActive=true,Stock=100},
                    new Product{Id=3,Name="Iphone 16 Pro", Description="Telefon Açıklaması",ImageUrl="3.jpg",Price=90000,IsActive=true,Stock=100},
                    new Product{Id=4,Name="Iphone 16 Pro Max", Description="Telefon Açıklaması",ImageUrl="4.jpg",Price=100000,IsActive=true,Stock=100},
                }
            );
        }
    }
}
