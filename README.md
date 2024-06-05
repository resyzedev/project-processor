# Project Processor

Project Processor is a Node.js utility that recursively reads and extracts the content of specific files in your project directory, ignoring specified files and directories. The output is saved to a log file named `ProjectProcessor.log`.

## Installation

To install the Project Processor globally via npm:

```sh
npm install -g project-processor
```

## Usage

To run the Project Processor in your project directory, simply use the command:

```sh
project-processor
```

You can also specify additional files or directories to ignore by passing them as arguments:

```sh
project-processor db.js anotherFile.js
```

## Example

Given a project structure:

```./
├── config/
│   ├── db.js
│   └── logger.js
├── controllers/
│   └── auth.js
├── node_modules/
├── package-lock.json
├── .gitignore
└── .git/
```

Running the command:

```sh
project-processor
```

Will generate a `ProjectProcessor.log` file containing the content of all `.js`, `.ts`, `.jsx`, and `.tsx` files, excluding `node_modules`, `package-lock.json`, `.gitignore`, `.git`, `logs`, and the script file itself.
