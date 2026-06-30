namespace LendingDesk.Models;

public class Loan
{
    public required int Id { get; init; }
    public required string MemberName { get; init; }
    public required string BookTitle { get; init; }
    public required DateOnly CheckedOutOn { get; init; }
    public required DateOnly DueOn { get; init; }
}

public class StaffActivityRecord
{
    public required int Id { get; init; }
    public required int LoanId { get; init; }
    public required string MemberName { get; init; }
    public required string BookTitle { get; init; }
    public required DateOnly CheckedOutOn { get; init; }
    public required DateTime RecordedOn { get; init; }
}

public class CheckoutRequest
{
    public string MemberName { get; init; } = string.Empty;
    public string BookTitle { get; init; } = string.Empty;
    public int LoanDays { get; init; } = 14;
}
