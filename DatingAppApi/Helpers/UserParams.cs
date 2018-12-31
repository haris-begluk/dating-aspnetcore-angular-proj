namespace DatingAppApi.Helpers
{
    public class UserParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        public int PageSize = 10;
        public int MyProperty
        {
            get { return PageSize; }
            set { PageSize = (value > MaxPageSize ? MaxPageSize : value); }
        }

    }
}