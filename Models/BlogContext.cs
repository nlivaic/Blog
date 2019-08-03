using Microsoft.EntityFrameworkCore;

namespace Blog.Models
{
    #region Note regarding database setup
    /*
        The examples are geared towards working with MySql.
        In my case the database was not set up to store UTF-8.
        Execute below statements to prepare the database for UTF-8.

        SET FOREIGN_KEY_CHECKS=0;
        ALTER DATABASE blog CHARACTER SET utf8 COLLATE utf8_general_ci;
        ALTER DATABASE blog CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        ALTER TABLE authors CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        ALTER TABLE blogposts CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        ALTER TABLE comments CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        SET FOREIGN_KEY_CHECKS=1;
        SHOW FULL COLUMNS FROM authors;
        SHOW FULL COLUMNS FROM blogposts;
        SHOW FULL COLUMNS FROM comments;
     */
    #endregion

    public class BlogContext : DbContext
    {
        public DbSet<BlogPost> BlogPosts { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Comment> Comments { get; set; }

        public BlogContext(DbContextOptions<BlogContext> options) : base(options)
        { }
    }
}