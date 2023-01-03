using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UpHotel.Business.Contracts;
using UpHotel.Business.Options;

namespace UpHotel.Business.Services
{
    public class EmailService : IEmailService
    {
        private readonly ILogger<EmailService> _logger;
        private readonly SendgridOptions _sendgridOptions;

        public EmailService(ILogger<EmailService> logger, IOptions<SendgridOptions> sendgridOptions)
        {
            _logger = logger;
            _sendgridOptions = sendgridOptions.Value;
        }


        public async Task<bool> SendEmailAsync(string to, string subject, string htmlMessage)
        {
            var senderAddress = new EmailAddress()
            { Name = _sendgridOptions.SenderName, Email = _sendgridOptions.SenderEmail };
            var msg = GetMessage(senderAddress, subject, htmlMessage);
            msg.AddTo(new EmailAddress(to));
            _logger.LogInformation("Sending email '" + msg.Subject + "'");
            var client = new SendGridClient(_sendgridOptions.ApiKey);
            var response = await client.SendEmailAsync(msg);
            return response.IsSuccessStatusCode;
        }

        private static SendGridMessage GetMessage(EmailAddress emailAddress, string subject, string message)
        {
            return new SendGridMessage
            {
                From = emailAddress,
                Subject = subject,
                PlainTextContent = message,
                HtmlContent = message
            };
        }
    }
}
