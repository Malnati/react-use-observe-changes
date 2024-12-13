# Architecture Documentation

This document provides an overview of the `react-use-config` project's architecture, including its components, data flow, and design principles.

## Overview
The `react-use-config` project is designed with simplicity and flexibility in mind, focusing on providing a reliable hook to manage configuration parameters across different environments.

1. **Hook**: A React hook (`useConfigParam`) that retrieves configuration parameters.
2. **Sources of Configuration**:
   - Query parameters from the URL.
   - Environment variables defined in `.env`.
   - Default values provided in the code.

## Components
### React Hook: `useConfigParam`
- **Description**: The `useConfigParam` hook retrieves a configuration parameter based on the following priority order:
  1. Query parameters.
  2. Environment variables.
  3. Default values.
- **Technologies**: Built with React and TypeScript.

### Environment Variables
- **Description**: The hook supports environment variables using the `REACT_APP_` prefix, ensuring compatibility with Create React App and similar setups.

### URL Query Parameters
- **Description**: Query parameters in the URL are parsed and given the highest priority for dynamic configuration during runtime.

## Data Flow
1. **Parameter Request**:
   - A React component calls `useConfigParam` with a parameter name and default value.
2. **Query Parameter Check**:
   - The hook first checks the URL's query parameters for the specified name.
3. **Environment Variable Check**:
   - If not found in the query, it looks for an environment variable with the prefix `REACT_APP_`.
4. **Default Value**:
   - If neither the query nor the environment variable is available, the hook returns the default value.

```plaintext
[React Component] --> [useConfigParam] --> [Query Parameters]
                                         --> [Environment Variables]
                                         --> [Default Values]
```

## Design Principles
- **Flexibility**: Allows configuration from multiple sources, adapting to various environments.
- **Simplicity**: Offers a single hook for all configuration needs, reducing complexity in codebases.
- **Modularity**: The hook can be easily integrated into any React project.

## Diagrams
Consider adding diagrams to visually represent how `useConfigParam` prioritizes configuration sources. Example tools include [draw.io](https://app.diagrams.net/) or [PlantUML](https://plantuml.com/).

