#!/usr/bin/env node

import fs from "fs";
import path from "path";
import os from "os";
import chalk from "chalk";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFilePath = path.join(os.tmpdir(), "fix-errors-data.json");

function loadErrorData() {
  if (fs.existsSync(dataFilePath)) {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(data);
  } else {
    return initializeErrorData();
  }
}

function initializeErrorData() {
  const errorData = {
    totalErrors: Math.floor(Math.random() * 150) + 50,
    fixable: Math.floor(Math.random() * 50) + 25,
    unfixable: Math.floor(Math.random() * 20) + 5,
    lastReset: Date.now(),
  };
  saveErrorData(errorData);
  return errorData;
}

function saveErrorData(data) {
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

let errorData = loadErrorData();
errorData = resetIfDue(errorData);

// Parse flags from command-line arguments
const args = process.argv.slice(2);
const flags = {
  all: args.includes("--all"),
  verbose: args.includes("--verbose"),
  silent: args.includes("--silent"),
  unfixable: args.includes("--unfixable"),
};

if (!flags.silent) {
  console.log(`Total Errors: ${errorData.totalErrors}`);
  console.log(`Fixable Errors: ${errorData.fixable}`);
  console.log(`Unfixable Errors: ${errorData.unfixable}`);
}

function loadingAnimation() {
  const frames = ["-", "\\", "|", "/"];
  let i = 0;
  return setInterval(() => {
    if (!flags.silent) {
      process.stdout.write(
        `\rFixing errors... ${frames[i++ % frames.length]} `
      );
    }
  }, 100);
}

function stopAnimation(animation) {
  clearInterval(animation);

  if (errorData.totalErrors === 0) {
    console.log(chalk.green("\nAll errors have been fixed! 🎉"));
  } else {
    console.log(chalk.red(`\nRemaining Errors: ${errorData.totalErrors}`));
  }
}

const animation = loadingAnimation();

// Randomize animation duration for non-silent mode
const loadingTime = Math.floor(Math.random() * 3000) + 2000;

setTimeout(
  () => {
    stopAnimation(animation);

    // Apply flags to modify error data
    if (flags.all) {
      errorData.fixable = 0;
      errorData.unfixable = flags.unfixable ? 0 : errorData.unfixable;
    } else {
      // Reduce fixable errors by a random amount
      const fixed = Math.min(
        Math.floor(Math.random() * 10) + 5,
        errorData.fixable
      );
      errorData.fixable -= fixed;
    }

    // If verbose, display additional information
    if (flags.verbose && !flags.silent) {
      console.log(
        `Fixed ${
          errorData.totalErrors - (errorData.fixable + errorData.unfixable)
        } errors in this run.`
      );
    }

    // Update the total error count and save
    errorData.totalErrors = errorData.fixable + errorData.unfixable;
    saveErrorData(errorData);
  },
  flags.silent ? 0 : loadingTime
);
