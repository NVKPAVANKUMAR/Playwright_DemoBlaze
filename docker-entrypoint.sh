#!/bin/bash

# Run tests
npm test

# Generate Allure reports
allure generate allure-results --clean

# Serve Allure reports (optional)
allure open
