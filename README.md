# Riverside Library — Loan Desk

**Role:** Analyst
**Levels applied:** Good Practices → Beginner · Architectural Patterns → Beginner · Backend Frameworks → Beginner · Agentic AI → Beginner · CI/CD → Beginner · Frontend Frameworks → Beginner · Infrastructure → Beginner · TDD → Beginner
**Time:** 120m
**ID:** ex-analyst-002

---

## Instructions

This exercise has two parts:

1. **Practical** — implement the Acceptance Criteria described in the [Objective](#objective) section.
   The exercise covers both the backend (`src/`) and the frontend (`frontend/`).
   Read the code in each, understand the current behavior, and make the changes needed
   to satisfy each AC. The backend and frontend are part of the same scenario but each
   AC is independently solvable.
   Before you start, follow the setup steps in [SETUP.md](./SETUP.md).

2. **Theory** — open [THEORY.md](./THEORY.md) and answer the questions there.
   For each question, tick the option you believe is correct.
   Questions marked with 🔍 include a **"Your reasoning"** section — you **must** explain
   why you chose your answer. Skipping the reasoning will result in a half-point penalty
   even if the selected option is correct.

When both parts are complete, open a PR and notify your PL for review.

---

## Context

Riverside Community Library runs a small front-desk system for lending books to members.
When a member borrows a book, the desk records the loan and sends the member a reminder
about when the book is due back. A staff dashboard shows every active loan and a short
summary of how the loans stand against their due dates. Both the desk service and the
dashboard are early but working, and the library wants to grow them carefully.

## Objective

### Backend

**As a** developer working on `src/`
**I need to** keep an internal staff record of every checkout in addition to the member reminder
**So that** front-desk staff have their own activity trail of lending without changing what members receive

#### Acceptance Criteria

- [ ] **AC1:**
      **Given** a member checks out a book
      **When** the checkout is processed
      **Then** an internal staff activity entry is recorded for that checkout *in addition to*
      the existing member reminder, and the way a checkout is validated and stored stays exactly
      as it is today.

### Frontend

**As a** developer working on `frontend/`
**I need to** introduce a "Due today" status for loans whose book is due back today
**So that** staff can immediately see which books are due to come back on the current day

#### Acceptance Criteria

- [ ] **AC1:**
      **Given** the loan desk view is open
      **When** a loan's due date is the current day
      **Then** that loan shows a "Due today" status on its row **and** the same status is
      reflected in the desk summary, consistently with the statuses that already exist.

## Constraints

> ⚠️ Breaking a constraint applies a proportional penalty to your practical score.
> Each constraint carries equal weight — violating 1 of N constraints reduces your
> practical score by 1/N regardless of how well the objective was solved.

### Backend

- Do not remove existing behavior
- Keep the public API stable — existing routes and their responses must not change shape
- The member reminder must keep working exactly as it does today

### Frontend

- Do not remove existing behavior
- Keep the loan row usable from the page the way it is used today
- The "Due today" status must read the same way on a loan's row and in the summary
