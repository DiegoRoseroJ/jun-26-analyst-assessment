namespace LendingDesk.Services;

using LendingDesk.Models;

public interface ILoanService
{
    IReadOnlyList<Loan> GetLoans();

    IReadOnlyList<string> GetNotices();

    Loan Checkout(CheckoutRequest request);
}
