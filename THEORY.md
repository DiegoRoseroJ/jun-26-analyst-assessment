## 🧠 Theory Questions

> Tick the option you believe is correct for each question.

---

### Question 1 — Good Practices

**The service exposes its loans through a method named `GetLoans` rather than `Get` or `Data`. What does choosing this name achieve?**

```csharp
public IReadOnlyList<Loan> GetLoans()
{
    return _loans;
}
```

- [ ] A) It makes the method run faster than a shorter name would
- [x] B) The name states what the method returns in the library's own words, so a reader knows its purpose without reading the body
- [ ] C) C# requires methods that return lists to begin with the word `Get`
- [ ] D) It stops callers from ever reading the loans

---

### Question 2 — Good Practices

**Inside `Checkout`, the date value is stored in a variable named `checkedOutOn` instead of `d` or `tmp`. Why does this matter for readability?**

```csharp
var checkedOutOn = DateOnly.FromDateTime(DateTime.UtcNow);
var dueOn = checkedOutOn.AddDays(request.LoanDays);
```

- [ ] A) Longer names are required by C# for `DateOnly` values
- [ ] B) The name changes how the date is stored in memory
- [ ] C) Short names like `d` would cause the build to fail
- [x] D) `checkedOutOn` tells the reader what the value represents, so the due-date line reads in plain language

---

### Question 3 — Good Practices

**The collection of loans is declared as a `private` field. What is the benefit of keeping it private?**

```csharp
public class LoanService : ILoanService
{
    private readonly List<Loan> _loans = new();
}
```

- [x] A) Code outside the service cannot add or remove loans directly, so the service stays in control of how loans change
- [ ] B) Private fields are stored more efficiently than public fields
- [ ] C) C# does not allow public fields in a service class
- [ ] D) It makes the list sort itself by due date

---

### Question 4 — Good Practices

**`Id` and `MemberName` on the `Loan` class are declared with `required`. What does that communicate to anyone creating a `Loan`?**

```csharp
public class Loan
{
    public required int Id { get; init; }
    public required string MemberName { get; init; }
}
```

- [ ] A) These properties can be changed at any time after the loan is created
- [ ] B) The properties will be filled in automatically by the framework
- [x] C) A `Loan` cannot be created without supplying these values, so a loan always has an id and a member
- [ ] D) The values are optional and default to null

---

### Question 5 — Good Practices

**The reminder text is built with string interpolation (`$"..."`). Compared with joining many small pieces using `+`, what does this give the reader?**

```csharp
var reminder = $"EMAIL -> {loan.MemberName}: \"{loan.BookTitle}\" is due on {loan.DueOn:yyyy-MM-dd}.";
```

- [x] A) The final shape of the message is visible in one line, so it is easy to see what the member receives
- [ ] B) It sends the reminder faster
- [ ] C) It is the only way C# can place a date inside a string
- [ ] D) It hides the member's name from the message

---

### Question 6 — Good Practices

**`DueOn` uses `init` rather than `set`. What does this mean once a `Loan` has been created?**

```csharp
public required DateOnly DueOn { get; init; }
```

- [ ] A) The due date can be changed by any caller at any time
- [ ] B) The property cannot be read after creation
- [x] C) The due date is set when the loan is created and cannot be reassigned afterwards
- [ ] D) The due date is recalculated on every read

---

### Question 7 — Good Practices

**`GetNotices` only returns the stored notices and does nothing else. Why is keeping a method this focused a good habit?**

```csharp
public IReadOnlyList<string> GetNotices()
{
    return _notices;
}
```

- [ ] A) Short methods always run faster than longer ones
- [x] B) A method that does one clear thing is easy to read and reason about at a glance
- [ ] C) A method must never contain more than one line in C#
- [ ] D) Returning a value is only allowed in methods named `Get...`

---

### Question 8 — Good Practices

**When the member name is missing, the code throws with the message `"Member name is required."`. Why is a specific message preferable to a generic one like `"error"`?**

```csharp
if (string.IsNullOrWhiteSpace(request.MemberName))
{
    throw new ArgumentException("Member name is required.");
}
```

- [ ] A) The message changes how fast the check runs
- [ ] B) C# requires every exception message to contain the word "required"
- [ ] C) A generic message would stop the application from starting
- [x] D) It tells whoever sees the failure exactly what was wrong, which makes the problem easy to understand

---

### Question 9 — Good Practices

**`Loan` is a class, and `loan` below is created with `new`. Which statement describes the relationship correctly?**

```csharp
var loan = new Loan { Id = 1, MemberName = "Sam", BookTitle = "Dune" /* ... */ };
```

- [ ] A) `loan` is the blueprint and `Loan` is the object
- [ ] B) `Loan` and `loan` are two unrelated types
- [x] C) `Loan` is the blueprint; `loan` is one specific object built from that blueprint
- [ ] D) `new` makes `Loan` and `loan` permanently share the same memory

---

### Question 10 — Good Practices

**In the service, the parameter is `request` (camelCase) while the property is `MemberName` (PascalCase). What does following these casing conventions give the team?**

```csharp
public Loan Checkout(CheckoutRequest request)
{
    var name = request.MemberName;
    // ...
}
```

- [x] A) Readers can tell at a glance what is a parameter/local and what is a property, because the codebase is consistent
- [ ] B) camelCase values are faster to access than PascalCase ones
- [ ] C) The casing decides whether the value is stored in memory
- [ ] D) C# will not compile unless every name is PascalCase

---

### Question 11 — Good Practices

**The request carries a `BookTitle` property rather than a property named `t` or `val`. Why does the descriptive name help?**

```csharp
public class CheckoutRequest
{
    public string MemberName { get; init; } = string.Empty;
    public string BookTitle { get; init; } = string.Empty;
}
```

- [ ] A) Descriptive names are required for the request body to be read
- [ ] B) `BookTitle` uses less memory than `t`
- [ ] C) The name changes the order the properties are sent in
- [x] D) Anyone reading the request immediately knows the value is the title of a book, with no guessing

---

### Question 12 — Good Practices

**The service keeps a private counter `_nextId` and increments it when creating a loan. Why keep this counter inside the service rather than letting callers pass an id?**

```csharp
private int _nextId = 1;
// ...
var loan = new Loan { Id = _nextId++, /* ... */ };
```

- [ ] A) Callers can assign ids faster than the service can
- [x] B) The service owns how ids are produced, so every loan gets a unique id without callers having to manage it
- [ ] C) C# forbids passing an id into a constructor
- [ ] D) It makes the loan list shorter

---

### Question 13 — Good Practices

**The `Loan` class holds only properties (id, member, title, dates) and contains no methods. What role does a class like this play?**

```csharp
public class Loan
{
    public required int Id { get; init; }
    public required string BookTitle { get; init; }
    public required DateOnly DueOn { get; init; }
}
```

- [ ] A) It is broken because every class must contain at least one method
- [ ] B) It runs the lending rules for the application
- [ ] C) It handles the HTTP request for a checkout
- [x] D) It is a simple data holder that describes the shape of a loan and carries its values around

---

### Question 14 — Good Practices

**Both read methods are named with the same `Get...` shape: `GetLoans` and `GetNotices`. What does this naming consistency give the codebase?**

```csharp
public IReadOnlyList<Loan> GetLoans() => _loans;
public IReadOnlyList<string> GetNotices() => _notices;
```

- [ ] A) It makes the two methods return the same data
- [x] B) Readers can predict what a method does from its name because similar methods are named the same way
- [ ] C) It is required before a class can have two methods
- [ ] D) It guarantees the methods run in a fixed order

---

### Question 15 — Good Practices

**The method that records a borrowing is named `Checkout`. Why is a verb like this a good choice for a method name?**

```csharp
public Loan Checkout(CheckoutRequest request)
{
    // ...
}
```

- [x] A) A verb names the action the method performs, so a reader knows it does something rather than just holding data
- [ ] B) Verbs make methods run faster
- [ ] C) Method names must always be a single verb in C#
- [ ] D) It prevents the method from returning a value

---

### Question 16 — Good Practices

**The loans field is declared `readonly` and assigned once with `= new()`. What does `readonly` communicate here?**

```csharp
private readonly List<Loan> _loans = new();
```

- [ ] A) The items inside the list can never change
- [ ] B) The list is read from a database each time
- [x] C) The field always points at the same list object — it cannot be reassigned to a different list later
- [ ] D) The list can only be read on the first request

---

### Question 17 — Good Practices

**The loan dates use the `DateOnly` type rather than a plain `string`. How does this choice help a reader of the code?**

```csharp
public required DateOnly CheckedOutOn { get; init; }
public required DateOnly DueOn { get; init; }
```

- [ ] A) `DateOnly` values are smaller than strings in every case
- [x] B) The type makes it clear these values are calendar dates, not arbitrary text, so they are used as dates
- [ ] C) Strings cannot be stored in a class
- [ ] D) It changes the time zone the dates are shown in

---

### Question 18 — Architectural Patterns

**The controller does not touch the `_loans` collection itself — it calls `_loanService`. What does this division give the application?**

```csharp
[HttpGet]
public IActionResult GetAll()
{
    return Ok(_loanService.GetLoans());
}
```

- [x] A) The controller handles the web request and leaves the lending work to the service, so each part has a focused job
- [ ] B) The controller runs faster because it skips the service
- [ ] C) The service becomes unnecessary once the controller exists
- [ ] D) The controller must store the loans itself for the route to work

---

### Question 19 — Architectural Patterns

**The controller depends on the `ILoanService` interface rather than writing `new LoanService()` inside itself. What does depending on the interface give the controller?**

```csharp
public LoansController(ILoanService loanService)
{
    _loanService = loanService;
}
```

- [ ] A) It removes the need for a `LoanService` class entirely
- [ ] B) It makes the controller create its own service
- [x] C) The controller works against a contract, so the actual service could be replaced without changing the controller
- [ ] D) It forces every request to create a new service

---

### Question 20 — Architectural Patterns

**`LoanService` lives under a `Services/` folder, while `LoansController` lives under `Controllers/`. What does placing the file under `Services/` signal?**

```
src/
├── Controllers/LoansController.cs
├── Services/LoanService.cs
└── Models/Loan.cs
```

- [ ] A) Files are grouped by the date they were created
- [ ] B) The folder name has no meaning and could be anything
- [ ] C) Every file in `Services/` must contain a controller
- [x] D) The class holds business logic (the lending work), which the project keeps separate from the HTTP layer

---

### Question 21 — Architectural Patterns

**`Program.cs` registers the service as `AddSingleton<ILoanService, LoanService>()`. What does registering an interface together with an implementation do?**

```csharp
builder.Services.AddSingleton<ILoanService, LoanService>();
```

- [x] A) When something asks for `ILoanService`, the framework supplies a `LoanService`, so consumers depend on the contract and the wiring picks the concrete type
- [ ] B) It creates two separate services that both run
- [ ] C) It renames `LoanService` to `ILoanService`
- [ ] D) It prevents `LoanService` from being used anywhere

---

### Question 22 — Architectural Patterns

**The rule "the book is due `LoanDays` after checkout" is computed inside the service, not in the controller. Where does this kind of lending rule belong?**

```csharp
var dueOn = checkedOutOn.AddDays(request.LoanDays);
```

- [ ] A) In the model class, because it holds the dates
- [ ] B) In `Program.cs`, so it runs at startup
- [ ] C) In the browser, before the request is sent
- [x] D) In the service, because that is where the application's lending logic lives

---

### Question 23 — Architectural Patterns

**On the dashboard, `LoansPageComponent` loads the data and `LoanRowComponent` only receives a single loan to show. What does this split between the two components give the app?**

```typescript
@for (loan of loans; track loan.id) {
  <app-loan-row [loan]="loan" />
}
```

- [ ] A) The row component becomes able to load its own data
- [x] B) The page coordinates the data while each row focuses only on showing one loan — each has a clear job
- [ ] C) The page no longer needs to exist
- [ ] D) Both components fetch the same data twice

---

### Question 24 — Architectural Patterns

**In the frontend, the HTTP service sits under `core/services/` while the loan screens sit under `features/loans/`. What does this folder split organize?**

```
src/app/
├── core/services/loan.service.ts
└── features/loans/
    ├── containers/loans-page.component.ts
    └── components/loan-row.component.ts
```

- [ ] A) It sorts files by how many lines each one has
- [ ] B) It keeps every component in a single folder regardless of role
- [x] C) It separates an app-wide data service from the UI pieces that belong to one feature
- [ ] D) It is decorative and the build ignores the folders

---

### Question 25 — Architectural Patterns

**The backend `Loan` (C#) and the frontend `Loan` (TypeScript) describe the same fields: id, member name, book title, and dates. Why is keeping the same shape on both sides useful?**

```typescript
export interface Loan {
  id: number;
  memberName: string;
  bookTitle: string;
  dueOn: string;
}
```

- [ ] A) It makes the API respond faster
- [ ] B) TypeScript requires C# classes to be copied exactly
- [x] C) Both sides agree on what a loan looks like, so the data the API sends lines up with what the UI expects
- [ ] D) It lets the frontend skip calling the backend

---

### Question 26 — Architectural Patterns

**The controller receives the request, calls the service, and returns the result — it contains no lending logic of its own. What is the controller's role in this design?**

```csharp
[HttpGet("notices")]
public IActionResult GetNotices()
{
    return Ok(_loanService.GetNotices());
}
```

- [ ] A) To store the loans and notices in memory
- [x] B) To act as the entry point that maps a web request to a service call and shapes the response
- [ ] C) To calculate due dates for each loan
- [ ] D) To build the user interface the member sees

---

### Question 27 — Architectural Patterns

**The service is registered with `AddSingleton`, so one instance lives for the whole app. Given the loans are kept in an in-memory list, what is the practical effect?**

```csharp
builder.Services.AddSingleton<ILoanService, LoanService>();
```

- [ ] A) The loans are saved to a database automatically
- [ ] B) Each request gets a brand new, empty list of loans
- [ ] C) The service stops working after the first request
- [x] D) The same loan list is reused across requests, so loans added earlier are still there on later requests

---

### Question 28 — Architectural Patterns

**`provideHttpClient()` is registered once in `app.config.ts`, and the loan service then uses `HttpClient`. What does registering it once at the app level achieve?**

```typescript
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient()],
};
```

- [x] A) Any service in the app can ask for `HttpClient` to make requests, configured in one place
- [ ] B) It makes every component send its own requests
- [ ] C) It disables the backend API
- [ ] D) It must be repeated inside every component that needs it

---

### Question 29 — Architectural Patterns

**The app starts from `main.ts`, which bootstraps `App`, which in turn shows `LoansPageComponent`. What does this chain represent?**

```typescript
bootstrapApplication(App, appConfig);
// App template: <app-loans-page />
```

- [ ] A) Three copies of the same screen
- [ ] B) A way to skip loading the loans
- [ ] C) An error, because an app can only have one component
- [x] D) A clear top-level structure: one entry point composes the root component, which hosts the feature screen

---

### Question 30 — Architectural Patterns

**The service holds the `_loans` list; the controller never keeps loans of its own. Why not let the controller hold the list directly?**

```csharp
public class LoansController : ControllerBase
{
    private readonly ILoanService _loanService;
    // no loan collection here
}
```

- [ ] A) Controllers are not allowed to have fields in C#
- [ ] B) Holding the list in the controller would make routes faster
- [x] C) Keeping the data and lending logic in the service keeps the HTTP layer thin and focused on requests and responses
- [ ] D) The controller would need two lists instead of one

---

### Question 31 — Architectural Patterns

**On the frontend, components do not call `HttpClient` directly — they go through `LoanService`. What does routing the HTTP call through a service give the app?**

```typescript
@Injectable({ providedIn: 'root' })
export class LoanService {
  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.baseUrl);
  }
}
```

- [x] A) The data-fetching is kept in one place that components share, instead of being scattered across components
- [ ] B) It makes the components unable to show data
- [ ] C) It removes the need for the backend
- [ ] D) Each component gets a different copy of the data

---

### Question 32 — Architectural Patterns

**Suppose the library later stores loans in a real database instead of an in-memory list. What about the current design makes that change easier for the controller?**

```csharp
public LoansController(ILoanService loanService) { /* ... */ }
```

- [ ] A) The controller already contains the database code
- [x] B) Because the controller depends on `ILoanService`, the storage can change behind that contract without changing the controller
- [ ] C) The controller would have to be deleted and rewritten
- [ ] D) Nothing — every layer would have to change together

---

### Question 33 — Architectural Patterns

**The frontend keeps `containers/` and `components/` as separate folders under the loans feature. What does this organization express?**

```
features/loans/
├── containers/loans-page.component.ts
└── components/loan-row.component.ts
```

- [ ] A) The two folders must contain the same number of files
- [x] B) One folder holds the screen that orchestrates data, the other holds a piece that just shows what it is given
- [ ] C) Components in `components/` cannot be shown on screen
- [ ] D) The folders are required by TypeScript to compile

---

### Question 34 — Backend Frameworks

**The `Checkout` action is marked with `[HttpPost]`. Which incoming request does this map the method to?**

```csharp
[HttpPost]
public IActionResult Checkout([FromBody] CheckoutRequest request)
{
    // ...
}
```

- [x] A) A POST request to `/loans`, which is how a new checkout is sent to the API
- [ ] B) A GET request to `/loans`
- [ ] C) Any request to the home page of the site
- [ ] D) A request that runs automatically every minute

---

### Question 35 — Backend Frameworks

**The notices action is marked `[HttpGet("notices")]` inside a controller routed as `[controller]`. What route does this produce?**

```csharp
[Route("[controller]")]
public class LoansController : ControllerBase
{
    [HttpGet("notices")]
    public IActionResult GetNotices() { /* ... */ }
}
```

- [ ] A) `/notices/loans`
- [ ] B) `/loans` for every method in the class
- [x] C) `GET /loans/notices`
- [ ] D) A route decided only by the method's name

---

### Question 36 — Backend Frameworks

**The class is marked with `[ApiController]`. What does this attribute indicate about the class?**

```csharp
[ApiController]
[Route("[controller]")]
public class LoansController : ControllerBase
{
    // ...
}
```

- [ ] A) It schedules the class to run as a background job
- [ ] B) It connects the class to a database
- [ ] C) It hides the class from the rest of the application
- [x] D) It marks the class as a web API controller that handles HTTP requests and applies API conventions

---

### Question 37 — Backend Frameworks

**A successful checkout returns `CreatedAtAction(...)` while reads return `Ok(...)`. What does returning `CreatedAtAction` communicate to the caller?**

```csharp
var loan = _loanService.Checkout(request);
return CreatedAtAction(nameof(GetAll), new { id = loan.Id }, loan);
```

- [x] A) That a new resource was created, signalled with a "created" response rather than a plain "OK"
- [ ] B) That the request failed
- [ ] C) That the loan was deleted
- [ ] D) That the response contains no data at all

---

### Question 38 — Backend Frameworks

**`Program.cs` calls `builder.Services.AddControllers()`. What does this line set up?**

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
```

- [ ] A) It opens a connection to a database
- [ ] B) It creates the loan records at startup
- [x] C) It registers the controllers so the app can route incoming requests to their actions
- [ ] D) It starts the Angular development server

---

### Question 39 — Agentic AI

**Imagine the library adds an assistant that uses a language model to draft the member reminder text. Which instruction is most likely to produce a usable reminder?**

```text
Prompt A: "Write something about the book."
Prompt B: "Write a friendly one-sentence reminder that includes the book title and the due date."
```

- [ ] A) Prompt A, because shorter prompts are always better
- [x] B) Prompt B, because it clearly states what the message must contain and how long it should be
- [ ] C) Neither — the model cannot follow written instructions
- [ ] D) Prompt A, because leaving details out lets the model be more accurate

---

### Question 40 — Agentic AI

**The team considers pasting the library's entire 50,000-book catalogue into a single prompt so the model "knows everything." What is the concern a beginner should recognize?**

```text
Prompt: "Here is our full catalogue: <50,000 entries>. Now draft a reminder for one book."
```

- [ ] A) The model will memorize the catalogue forever
- [ ] B) Prompts are not allowed to contain lists
- [ ] C) Larger prompts always give better answers
- [x] D) A prompt that large can exceed the model's context window; only the relevant book's details need to be included

---

### Question 41 — Agentic AI

**The assistant confidently states a loan policy ("books are due in 30 days"), but the system actually uses 14 days. What should a careful user do with the model's output?**

```text
Model output: "Your book is due in 30 days."
```

- [ ] A) Always trust the model, since its outputs are objective facts
- [ ] B) Assume the model has the most up-to-date policy
- [x] C) Treat the output as needing verification and check it against the system's actual rule before relying on it
- [ ] D) Increase the prompt length until the model agrees

---

### Question 42 — Agentic AI

**The team wants every drafted reminder to follow the same format. Which prompting approach most directly helps the model match a desired format?**

```text
"Format reminders like these examples:
 - 'Hi Sam — "Dune" is due 2026-07-14.'
 - 'Hi Lee — "Sula" is due 2026-07-20.'
 Now write one for: ..."
```

- [ ] A) Asking the model to be creative each time
- [ ] B) Removing all punctuation from the prompt
- [ ] C) Raising the temperature as high as possible
- [x] D) Giving the model a couple of example reminders to follow, so it imitates their format

---

### Question 43 — Agentic AI

**Separately, the assistant suggests book recommendations. The team wants more varied suggestions each time it is asked. Which setting most directly affects how varied the output is?**

```text
Task: "Suggest three books a fantasy reader might enjoy."
```

- [x] A) Raising the temperature, which increases the variability of the model's output
- [ ] B) Removing the instruction entirely
- [ ] C) Lowering the temperature to make every answer identical
- [ ] D) Shortening the model's context window

---

### Question 44 — CI/CD

**The README asks you to open a pull request when your work is done, instead of pushing directly to the main branch. What does using a pull request enable?**

- [ ] A) It deploys the code straight to members with no review
- [x] B) It lets the change be reviewed and checked before it becomes part of the main branch
- [ ] C) It renames the main branch
- [ ] D) It deletes the branch you were working on

---

### Question 45 — CI/CD

**You save your work with a commit and a short message describing the change. What does a commit represent?**

```text
git commit -m "Add Due today status to loan dashboard"
```

- [ ] A) A request to deploy the application to production
- [ ] B) A copy of the entire repository emailed to the team
- [ ] C) A way to delete previous work permanently
- [x] D) A saved snapshot of your changes, recorded with a message that explains what changed

---

### Question 46 — CI/CD

**A pipeline builds the backend with `dotnet build src/` and then the frontend with `ng build`. If the `ng build` step fails, what does that tell you?**

```text
Step 1: dotnet build src/   ✓
Step 2: cd frontend && ng build   ✗
```

- [x] A) The frontend did not build successfully, so the pipeline stops there and later steps such as deploy do not run
- [ ] B) The backend must also have failed
- [ ] C) It is only a warning and the app deploys anyway
- [ ] D) The members lost their loan data

---

### Question 47 — CI/CD

**The team sets up the pipeline to compile the app automatically every time changes are pushed, instead of someone building it by hand. What is this practice called, and what does it give the team?**

- [ ] A) Manual release — it removes the need for any builds
- [ ] B) A backup system — it stores old versions of the code
- [x] C) Build automation — the app is built consistently on every change, catching build problems early
- [ ] D) Branching — it creates a new copy of the repository each time

---

### Question 48 — Frontend Frameworks

**`LoanRowComponent` declares `@Input({ required: true }) loan`. How does a row get the loan it shows?**

```typescript
export class LoanRowComponent {
  @Input({ required: true }) loan!: Loan;
}
```

- [ ] A) It fetches the loan from the server by itself
- [x] B) The parent passes a loan into the row through the `[loan]` binding
- [ ] C) It reads the loan from the browser's address bar
- [ ] D) The loan is generated randomly inside the component

---

### Question 49 — Frontend Frameworks

**The row template contains `{{ loan.memberName }}`. What does this binding do?**

```html
<span class="member">{{ loan.memberName }}</span>
```

- [ ] A) It sends the member name to the backend
- [x] B) It inserts the current value of `loan.memberName` into the rendered view
- [ ] C) It changes the member's name to uppercase
- [ ] D) It deletes the member name after one second

---

### Question 50 — Frontend Frameworks

**`LoansPageComponent` loads its data inside `ngOnInit`. When does `ngOnInit` run?**

```typescript
ngOnInit(): void {
  this.loanService.getLoans().subscribe({
    next: (loans) => (this.loans = loans),
    error: (err) => console.error(err),
  });
}
```

- [ ] A) Only when the user clicks a button
- [ ] B) Every time the mouse moves over the component
- [x] C) Once, after Angular has created and initialized the component — a suitable point to load data
- [ ] D) Before the component class exists at all

---

### Question 51 — Frontend Frameworks

**The loan list uses an `@empty` block alongside `@for`. What does the `@empty` block show?**

```html
@for (loan of loans; track loan.id) {
  <app-loan-row [loan]="loan" />
} @empty {
  <p>No active loans.</p>
}
```

- [ ] A) A copy of every loan twice
- [ ] B) The first loan in the list
- [ ] C) An error message whenever the server is slow
- [x] D) A fallback message that appears only when there are no loans to show

---

### Question 52 — Frontend Frameworks

**`LoansPageComponent` lists `LoanRowComponent` in its `imports` array. Why is that needed?**

```typescript
@Component({
  selector: 'app-loans-page',
  imports: [LoanRowComponent],
  template: `... <app-loan-row [loan]="loan" /> ...`,
})
```

- [x] A) So the page's template is allowed to use the `<app-loan-row>` element
- [ ] B) So the row component can fetch data on its own
- [ ] C) So the page runs faster
- [ ] D) So the row component is hidden from the page

---

### Question 53 — Infrastructure

**The library plans to run this small API in the cloud and is choosing the size of the compute resource. What is the cost-aware choice for a low-traffic service?**

- [x] A) Pick a small resource sized to the actual need, rather than the largest available "just in case"
- [ ] B) Always pick the largest instance, because bigger is always better
- [ ] C) Provision several identical large servers before there are any users
- [ ] D) Resource size has no effect on cost

---

### Question 54 — Infrastructure

**A teammate suggests using an IaaS option where the library rents virtual machines. What does choosing IaaS mean for the team's responsibilities?**

- [ ] A) The provider writes the application code for the team
- [x] B) The team manages the virtual machine and its operating system, including patching and configuration
- [ ] C) There is nothing left for the team to manage at all
- [ ] D) The team can no longer deploy their own application

---

### Question 55 — Infrastructure

**The team writes an infrastructure file that describes the resources they want to exist, and the tool makes reality match it. How is this declarative approach best described?**

```text
resource "app_service" "library_api" {
  name = "riverside-loans"
  sku  = "small"
}
```

- [ ] A) A list of step-by-step commands the team must run in order by hand
- [ ] B) A backup of the running servers
- [ ] C) A log of past deployments
- [x] D) A description of the desired end state, which the tool then works out how to achieve

---

### Question 56 — Infrastructure

**Riverside's members are all in one town. When choosing where to host the API, why does the cloud region matter?**

- [ ] A) The region decides the programming language the API uses
- [ ] B) Regions have no effect on anything user-facing
- [x] C) Hosting in a region close to the members reduces the time requests take to travel
- [ ] D) The region changes how many loans the library can store

---

### Question 57 — TDD

**You write a unit test for `Checkout`. A book checked out today with a 14-day loan should be due 14 days later. Which assertion verifies the due date?**

```csharp
var loan = service.Checkout(new CheckoutRequest { MemberName = "Sam", BookTitle = "Dune", LoanDays = 14 });
var expectedDue = DateOnly.FromDateTime(DateTime.UtcNow).AddDays(14);
```

- [ ] A) `Assert.True(loan != null)`
- [ ] B) No assertion is needed as long as the method does not throw
- [x] C) `Assert.Equal(expectedDue, loan.DueOn)`
- [ ] D) `Assert.Equal(0, loan.Id)`

---

### Question 58 — TDD

**A teammate asks what an assertion in a unit test actually does. Which description is correct?**

```csharp
Assert.Equal(expected, actual);
```

- [ ] A) It prints the value to the console for the developer to read
- [ ] B) It deploys the code if the value looks right
- [x] C) It checks that the actual value matches the expected value, and fails the test if it does not
- [ ] D) It speeds up the method being tested

---

### Question 59 — TDD

**You want a test confirming that checking out with an empty member name is rejected. Which xUnit construct fits?**

```csharp
var request = new CheckoutRequest { MemberName = "", BookTitle = "Dune" };
```

- [x] A) `Assert.Throws<ArgumentException>(() => service.Checkout(request))`
- [ ] B) `Assert.Equal("", request.MemberName)`
- [ ] C) `Assert.True(service != null)`
- [ ] D) No test can check for an exception

---

### Question 60 — TDD

**You run the test suite and one test is red while the others are green. What does that one failing test tell you?**

```text
PASS  GetLoans_ReturnsLoans
FAIL  Checkout_SetsDueDate14DaysLater
PASS  Checkout_RejectsEmptyMemberName
```

- [ ] A) The whole application is broken and unusable
- [ ] B) The specific behavior that test checks does not currently meet its expectation
- [ ] C) Every test must be rewritten before continuing
- [ ] D) The other tests did not really run
- [x] B) The specific behavior that test checks does not currently meet its expectation

---
