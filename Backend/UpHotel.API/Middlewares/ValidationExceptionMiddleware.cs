using System.Net;
using System.Text.Json;
using UpHotel.Business.Exceptions;

namespace UpHotel.API.Middlewares
{
    public class ValidationExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ValidationExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await ConvertException(context, ex);
            }
        }

        private Task ConvertException(HttpContext context, Exception exception)
        {
            HttpStatusCode httpStatusCode = HttpStatusCode.InternalServerError;
            context.Response.ContentType = "application/json";

            var result = string.Empty;

            switch (exception)
            {
                case ValidationException validationException:
                    httpStatusCode = HttpStatusCode.BadRequest;
                    result = JsonSerializer.Serialize(new { Errors = validationException.ValidationErrors });
                    break;
                case Exception ex:
                    httpStatusCode = HttpStatusCode.InternalServerError;
                    var id = context.TraceIdentifier;
                    result = JsonSerializer.Serialize(new { Error = exception.Message, TraceId = id });
                    break;
            }

            context.Response.StatusCode = (int)(httpStatusCode);

            if (result == string.Empty)
            {
                result = JsonSerializer.Serialize(new { Error = exception.Message });
            }

            return context.Response.WriteAsync(result);
        }
    }
}
