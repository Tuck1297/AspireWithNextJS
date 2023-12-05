using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using AspireWithNextJS.WebAPI.Models.TestDbs.SupplyChain;
using AspireWithNextJS.WebAPI.Models.TestDbs.WebsiteInfo;
using AspireWithNextJS.WebAPI.Models.TestDbs.WebsiteUsers;

namespace AspireWithNextJS.WebAPI.Data
{
    public class WebsiteContext : DbContext
    {
        public WebsiteContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<WebAnalytics> WebAnalytics { get; set; }
        public DbSet<WebsiteInfo> WebSiteInfo { get; set; }
        public DbSet<Website1Users> Website1Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        { 
            var analytics_items = JsonConvert.DeserializeObject<List<WebAnalytics>>(File.ReadAllText("TestData/WebAnalyticsTestData.json"));

            modelBuilder.Entity<WebAnalytics>().HasData(analytics_items);

            var info_items = JsonConvert.DeserializeObject<List<WebsiteInfo>>(File.ReadAllText("TestData/WebsiteInfoTestData.json"));

            modelBuilder.Entity<WebsiteInfo>().HasData(info_items);

            var site1_items = JsonConvert.DeserializeObject<List<Website1Users>>(File.ReadAllText("TestData/Website1UsersTestData.json"));

            modelBuilder.Entity<Website1Users>().HasData(site1_items);

            base.OnModelCreating(modelBuilder);
        }
    }
}
