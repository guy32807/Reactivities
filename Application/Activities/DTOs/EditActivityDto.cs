using System;
using System.Data.Common;

namespace Application.Activities.DTOs;

public class EditActivityDto : BaseActivityDto
{
    public string Id { get; set; } = string.Empty;
}
