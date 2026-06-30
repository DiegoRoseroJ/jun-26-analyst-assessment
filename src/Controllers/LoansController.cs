namespace LendingDesk.Controllers;

using LendingDesk.Models;
using LendingDesk.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class LoansController : ControllerBase
{
    private readonly ILoanService _loanService;

    public LoansController(ILoanService loanService)
    {
        _loanService = loanService;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_loanService.GetLoans());
    }

    [HttpGet("notices")]
    public IActionResult GetNotices()
    {
        return Ok(_loanService.GetNotices());
    }

    [HttpPost]
    public IActionResult Checkout([FromBody] CheckoutRequest request)
    {
        try
        {
            var loan = _loanService.Checkout(request);
            return CreatedAtAction(nameof(GetAll), new { id = loan.Id }, loan);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
