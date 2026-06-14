# CODESOFT_TASK03
# Calculator — Level 1, Task 3

A basic calculator built with **HTML, CSS, and JavaScript** as required by the
"Calculator" internship task.

## Project structure

```
calculator/
├── index.html      # Page structure (display + button grid)
├── styles.css      # Dark-themed styling, CSS Grid for button layout
├── script.js       # Calculator logic
└── README.md       # This file
```

## Features

- **Display screen** with a "previous operand + operator" line and the main
  current value.
- **CSS Grid** layout for clean button alignment (4 columns).
- Operations: addition (`+`), subtraction (`−`), multiplication (`×`),
  division (`÷`), and percentage (`%`).
- **AC** (all clear), **DEL** (delete last digit), and decimal point support.
- Division-by-zero handling (shows `Error`).
- Large numbers are formatted with comma separators (e.g. `1,234,567`).
- **Keyboard support** — type numbers and operators, `Enter`/`=` to evaluate,
  `Backspace` to delete, `Esc` to clear.

### How the task requirements are met

- **Event listeners** — every button (and the keyboard) is wired up with
  `addEventListener`.
- **If-else statements** — used for input validation (e.g. preventing double
  decimals, handling empty operands).
- **Operators** — `+`, `-`, `*`, `/` are implemented via a `switch` statement
  in `compute()`.
- **Loops** — a `for` loop in `getDisplayNumber()` builds the comma-separated
  number string digit by digit.

## How to open this project in VS Code

1. Unzip the downloaded file — you'll get a folder named `calculator`.
2. Open VS Code → **File → Open Folder...** → select the `calculator` folder.
3. Install the **Live Server** extension (if you don't have it):
   - Go to the Extensions tab (`Ctrl+Shift+X`), search for **"Live Server"** by
     Ritwick Dey, and click **Install**.
4. Right-click `index.html` in the file explorer and choose
   **"Open with Live Server"**.
5. Your browser will open the calculator automatically.

> You can also just double-click `index.html` to open it directly in any
> browser — it works without Live Server too.

## Customizing

- **Colors / theme**: edit the `:root { ... }` variables at the top of
  `styles.css`.
- **Layout**: the button grid is controlled by `.keys { grid-template-columns: ... }`
  in `styles.css`.
