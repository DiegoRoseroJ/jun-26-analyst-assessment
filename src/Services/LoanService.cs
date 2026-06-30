namespace LendingDesk.Services;

using LendingDesk.Models;

public class LoanService : ILoanService
{
    private readonly List<Loan> _loans = new();
    private readonly List<string> _notices = new();
    private int _nextId = 1;

    public IReadOnlyList<Loan> GetLoans()
    {
        return _loans;
    }

    public IReadOnlyList<string> GetNotices()
    {
        return _notices;
    }

    public Loan Checkout(CheckoutRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.MemberName))
        {
            throw new ArgumentException("Member name is required.");
        }

        if (string.IsNullOrWhiteSpace(request.BookTitle))
        {
            throw new ArgumentException("Book title is required.");
        }

        var checkedOutOn = DateOnly.FromDateTime(DateTime.UtcNow);
        var loan = new Loan
        {
            Id = _nextId++,
            MemberName = request.MemberName,
            BookTitle = request.BookTitle,
            CheckedOutOn = checkedOutOn,
            DueOn = checkedOutOn.AddDays(request.LoanDays)
        };

        _loans.Add(loan);

        var reminder = $"EMAIL -> {loan.MemberName}: \"{loan.BookTitle}\" is due on {loan.DueOn:yyyy-MM-dd}.";
        _notices.Add(reminder);

        return loan;
    }
}
