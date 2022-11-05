using System.ComponentModel.DataAnnotations;

namespace UpHotel.Business.Exceptions
{
    public class ValidationException : ApplicationException
    {
        public List<string> ValidationErrors { get; set; } = new List<string>();

        public ValidationException(string validationError)
        {
            ValidationErrors.Add(validationError);
        }

    }
}
