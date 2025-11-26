Eragon Calc
Overview

The OS Calculator is a JavaScript-based application designed for a hypothetical operating system. It performs basic arithmetic operations, tracks all calculations in a history log, and supports keyboard input for quick calculations.

Features

Addition (+), subtraction (−), multiplication (×), and division (÷)

Real-time calculation display

History panel with all previous calculations

Export calculation history as CSV

Clear history option

Keyboard support for all standard operations

Professional, responsive design for desktop and mobile

File Structure
os-calculator/
│
├─ index.html          # Main HTML structure
├─ style.css           # Styles and layout for calculator and history panel
├─ script.js           # Core calculator logic and history management
└─ README.md           # Project documentation

Getting Started
Prerequisites

Modern web browser (Chrome, Firefox, Edge, Safari)

No additional dependencies required

Instructions

Clone or download the repository:

git clone <repository_url>


Open index.html in your preferred web browser.

Start using the calculator:

Click buttons or use your keyboard for input.

View history on the right-hand panel.

Clear or export history as needed.

Usage
Buttons

Numbers: 0–9

Operators: +, −, ×, ÷

Special:

C — Clear

± — Toggle sign

% — Percent

= — Calculate

Keyboard Support

Numbers: 0–9

Decimal point: .

Operators: +, -, *, /

Enter: = or Enter

Escape: Clear

Technical Details
Calculator Logic

Stores current and previous values, along with the pending operator.

Performs calculations only when a valid operation sequence is entered.

Handles division by zero gracefully with an "Error" display.

History Management

All calculations are stored in an array of objects:

{ operand1, operator, operand2, result }


History is displayed in reverse chronological order.

Users can export the history to CSV for offline records.