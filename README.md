# Fix Errors

**Fix Errors** is a fun and playful CLI tool that simulates finding and fixing errors in your system. It’s designed to add a bit of humor to your command line experience, featuring quirky loading messages and customizable flags for more control. This project is open-source and encourages contributions to add more functionality, messages, and error-fixing logic.

---

## Background

In real software development, finding and fixing errors can be tedious. **Fix Errors** lightens the mood by pretending to "fix" random, fictional errors with humorous messages. It’s intended purely for entertainment — no actual system files or applications are modified by running this tool. (Except one file in /tmp to store the current error count)

## Installation

To use `fix-errors` directly without needing to install it globally, run:
```bash
npx fix-errors
```

Or, if you want to install it globally:
```bash
npm install -g fix-errors
```

## Usage

Once installed, you can run `fix-errors` with various flags for different behaviors. This tool includes a playful loading animation and humorous messages that rotate every few seconds.

Basic usage: `bash fix-errors`

## Options

| Option          | Alias    | Description                                                                 |
|-----------------|----------|-----------------------------------------------------------------------------|
| `--help`        | `-h`     | Show help information about the tool and its options                        |
| `--force`       | `-f`     | Force fixes all errors, setting both major and minor error counts to zero   |
| `--scan`        | `-s`     | Scans for additional errors, adding new ones to the error count             |

### Examples

- **Force fixing all errors**:
  ```bash
  fix-errors --force
  ```
  Attempts to set both major and minor errors to zero.

- **Scan for more errors**:
  ```bash
  fix-errors --scan
  ```
  Finds additional errors and adds them to the current count, simulating a "scan" process.

- **Display help information**:
  ```bash
  fix-errors -h
  ```

## Features

- **Random Error Counts**: On each run, the tool generates a random count of "errors" across different types (e.g., minor, major).
- **Persistent Error Tracking**: Keeps track of errors between sessions using a JSON file stored in your system’s temp directory.
- **Daily Reset**: Error counts reset every 24 hours, simulating the idea that "new errors" appear every day.
- **Humorous Loading Messages**: The tool shows random, humorous loading messages to make the experience more enjoyable.

## Contribution Guidelines

We welcome contributions to make this tool even more fun! Here are a few ideas:
- **Add New Flags**: Implement new flags to change behavior, e.g., a `--verbose` flag for more detailed messages.
- **Expand Error Types**: Add new categories or types of errors for more variety.
- **More Loading Messages**: Add more funny messages to keep the loading animation entertaining.
- **Refine Existing Features**: Improve current features or optimize performance.

### Steps to Contribute

1. **Fork the Repository**: Click the "Fork" button at the top right of this repository.
2. **Clone the Repository**: Clone your forked repository to your local machine.
   ```bash
   git clone https://github.com/YOUR_USERNAME/fix-errors.git
   ```
3. **Create a New Branch**: Create a branch for your feature or bug fix.
   ```bash
   git checkout -b my-new-feature
   ```
4. **Make Your Changes**: Add and commit your changes.
5. **Push to Your Branch**: Push your branch to GitHub.
   ```bash
   git push origin my-new-feature
   ```
6. **Submit a Pull Request**: Open a pull request from your branch into the main repository.

## License

This project is licensed under the GPLv3 License.

---

## Disclaimer

This tool is intended for entertainment purposes only.