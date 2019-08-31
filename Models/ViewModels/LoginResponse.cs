namespace Blog.Models.ViewModels
{
    public class LoginResponse
    {
        public bool IsLoggedIn { get; set; }
        public string Name { get; set; }
        public string Message { get; set; }

        public LoginResponse(bool isLoggedIn, string name, string message)
        {
            IsLoggedIn = isLoggedIn;
            Name = name;
            Message = message;
        }

        public LoginResponse(bool isLoggedIn, string message)
        {
            IsLoggedIn = isLoggedIn;
            Message = message;
        }
    }
}