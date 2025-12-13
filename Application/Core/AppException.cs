using System;

namespace Application.Core;

public class AppException(int statusCode, string message, string? details) : Exception(message)
{
    public int StatusCode { get; } = statusCode;
    public string? Details { get; } = details;
}
