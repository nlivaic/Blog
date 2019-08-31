namespace Blog.Models.ViewModels
{
    public class RegisterResponse
    {
        public bool IsRegistered { get; set; }
        public string Message { get; set; }

        public RegisterResponse(bool isRegistered, string message)
        {
            IsRegistered = isRegistered;
            Message = message;
        }

    }
}