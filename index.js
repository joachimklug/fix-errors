#!/usr/bin/env node

import fs from "fs";
import path from "path";
import os from "os";
import chalk from "chalk";

function loadErrorData(dataFilePath) {
  if (fs.existsSync(dataFilePath)) {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(data);
  } else {
    return initializeErrorData();
  }
}

function initializeErrorData() {
  const errorData = {
    minor: Math.floor(Math.random() * 50) + 20,
    major: Math.floor(Math.random() * 10) + 5,
    lastReset: Date.now(),
  };
  saveErrorData(errorData);
  return errorData;
}

function saveErrorData(data) {
  const dataFilePath = getFilePath()
  fs.writeFileSync(dataFilePath, JSON.stringify(data));
}

function resetIfDue(data) {
  const resetInterval = 24 * 60 * 60 * 1000;
  const now = Date.now();
  if (now - data.lastReset > resetInterval) {
    return initializeErrorData();
  }
  return data;
}

function startLoadingAnimation() {
  const phrases = [
    "Fixing errors in your image library...",
    "Looking for errors under the sofa...",
    "Polishing up some minor bugs...",
    "Recalculating the meaning of error codes...",
    "Running diagnostics on your coffee machine...",
    "Searching for solutions in the cloud...",
    "Organizing the bits and bytes...",
    "Debugging the matrix...",
    "Tidying up the digital clutter...",
    "Sweeping errors under the rug...",
    "Herding stray semicolons...",
    "Untangling spaghetti code...",
    "Aligning the 1s and 0s...",
    "Patching up minor issues with duct tape...",
    "Bribing the compiler to be nicer...",
    "Consulting with the code wizard...",
    "Whispering encouragement to the functions...",
    "Converting bugs into features...",
    "Replacing the flux capacitor...",
    "Shuffling through endless lines of code..."
  ];

  let i = 0;
  let currentPhrase = phrases[Math.floor(Math.random() * phrases.length)];

  // Update the spinner every 0.25 seconds
  const spinnerInterval = setInterval(() => {
    process.stdout.write(`\r${currentPhrase} ${"-\\|/"[i++ % 4]} `);
  }, 250);

  // Update the phrase every 3 seconds
  const phraseInterval = setInterval(() => {
    currentPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    process.stdout.write(`\r${' '.repeat(50)}`); 
  }, 3000);

  // Return both intervals so they can be cleared later
  return [spinnerInterval, phraseInterval];
}


function showResult(errorData) {
  const totalErrors = getTotalErrorCount(errorData)
  if (totalErrors === 0) {
    console.log(chalk.green("All errors have been fixed! 🎉"));
  } else {
    console.log(`Unable to fix all errors.`);
    console.log(chalk.red(`Remaining Errors: ${totalErrors} - Try again!`));
  }
}

function getFlags() {
  const args = process.argv.slice(2);
  return {
    help: args.includes("-h") || args.includes("--help"),
    force: args.includes("-f") || args.includes("--force"),
    scan: args.includes("-s") || args.includes("--scan"),
  };
}

function getTotalErrorCount(errorData) {
  return errorData.minor + errorData.major
}

function showErrorData(errorData) {
  console.log(chalk.bold(`Total Errors found: ${getTotalErrorCount(errorData)}`));
  console.log(`Major Errors: ${errorData.major}`);
  console.log(`Minor Errors: ${errorData.minor}`);
}

function subtractRandom(num) {
  const randomNum = Math.floor(Math.random() * num) + 1;
  const result = Math.max(0, num - randomNum);
  return result;
}

function fixErrors(errorData, flags) {
  const newErrorData = {
    ...errorData,
    major: flags.force ? 0 : subtractRandom(errorData.major),
    minor: flags.force ? 0 : subtractRandom(errorData.minor)
  }
  console.log(chalk.blue(`\nYEAH! Fixed ${getTotalErrorCount(errorData) - getTotalErrorCount(newErrorData)} error(s)`))

  return newErrorData
}

function showHelp() {
  console.log(`
${chalk.bold('Usage:')} fix-errors [options]

${chalk.bold('Options:')}
  -h, --help       Show help information
  -f, --force      Force fix all errors, including major and minor
  -s, --scan       Scan for errors and finds them throughout your system

${chalk.bold('Description:')}
  ${chalk.cyan('fix-errors')} is a fun CLI tool that simulates fixing errors in a playful way. 
  Use flags to customize the behavior of the tool:
  - ${chalk.bold('--force')} attempts to fix all errors.
  - ${chalk.bold('--scan')} runs an error scan to find more errors.

Examples:
  fix-errors --force    Attempt to fix all errors immediately
  fix-errors --scan     Scan for errors and display counts
  fix-errors -h         Show help information
`);
}

// Helper function to await a timeout
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function scanForErrors(errorData) {
  console.log(chalk.yellow("\nInitiating scan for more errors..."));

  const phrases = [
    "Digging deep into the codebase...",
    "Looking under the hood...",
    "Checking for bugs in hidden corners...",
    "Investigating suspicious semicolons...",
    "Searching for gremlins in the system...",
    "Uncovering secret error lairs...",
    "Peeking behind the console...",
    "Dusting off some forgotten files...",
    "Running diagnostics on the coffee machine...",
    "Checking under the developer's chair...",
  ];

  let i = 0;
  let currentPhrase = phrases[Math.floor(Math.random() * phrases.length)];

  // Spinner and phrase update intervals
  const spinnerInterval = setInterval(() => {
    process.stdout.write(`\r${currentPhrase} ${"-\\|/"[i++ % 4]} `);
  }, 250);

  const phraseInterval = setInterval(() => {
    currentPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    process.stdout.write(`\r${' '.repeat(50)}`);
  }, 3000);

  // Await a timeout for the scan duration
  await sleep(5000); // Adjust the scan duration as needed

  // Stop the spinner and phrase intervals after the timeout
  clearInterval(spinnerInterval);
  clearInterval(phraseInterval);
  process.stdout.write("\n");

  // Randomly increase the number of minor and major errors
  const newMinorErrors = Math.floor(Math.random() * 20) + 5; // Add 5-25 minor errors
  const newMajorErrors = Math.floor(Math.random() * 5) + 1;  // Add 1-5 major errors

  errorData.minor += newMinorErrors;
  errorData.major += newMajorErrors;
  errorData.totalErrors = getTotalErrorCount(errorData);

  // Save the updated error data
  saveErrorData(errorData);

  // Display the results of the scan
  console.log(chalk.bold("\nScan complete! New errors found:"));
  console.log(`Added Minor Errors: ${newMinorErrors}`);
  console.log(`Added Major Errors: ${newMajorErrors}`);
  console.log(chalk.red(`Total Errors after scan: ${errorData.totalErrors}`));
}

function getFilePath() {
  return path.join(os.tmpdir(), "fix-errors-data.json");
}

async function main() {
  const errorData = resetIfDue(loadErrorData(getFilePath()));
  const flags = getFlags()
  if (flags.help) {
    showHelp();
    process.exit(0);
  }
  if (flags.scan) {
    await scanForErrors(errorData);
    process.exit(0);
  }
  showErrorData(errorData)
  if (getTotalErrorCount(errorData) === 0) {
    console.log(chalk.green("All errors fixed. To find new ones use the --scan flag"));
    process.exit(0)
  }
  const loadingAnimations = startLoadingAnimation();

  setTimeout(
    () => {
      const newErrorData = fixErrors(errorData, flags);
      saveErrorData(newErrorData);
      loadingAnimations.forEach(clearInterval);
      showResult(newErrorData)
    },
    Math.floor(Math.random() * 5000) + 5000
  );
}
main()