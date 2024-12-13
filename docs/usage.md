
# Usage Documentation

This document provides instructions on how to use the `useConfigParam` hook, including examples and common use cases.

## Features

### `useConfigParam` Hook
The `useConfigParam` hook allows you to retrieve a configuration parameter following a priority order:
1. **Query Parameter**: The value from the URL query string.
2. **Environment Variable**: The value from an environment variable.
3. **Default Value**: A fallback value provided as a parameter.

This hook simplifies configuration management, enabling flexibility and adaptability across different environments.

## Installation
To use this hook in your project:

1. **Install the Package**:
   ```bash
   npm install react-use-config
   ```

2. **Import the Hook**:
   Import the `useConfigParam` hook where you need it in your React project:
   ```javascript
   import useConfigParam from 'react-use-config';
   ```

## Examples

### Example 1: Retrieve a GeoServer URL
You can retrieve a GeoServer URL with a default value:

```javascript
const geoServer = useConfigParam('geoServer', 'http://localhost:8080/geoserver/isagro/wms');
console.log(geoServer); // Logs the query param, env var, or default value
```

### Example 2: Retrieve a Boolean Parameter
Retrieve a boolean parameter for a configuration, e.g., `showMap`:

```javascript
const showMap = useConfigParam('showMap', true);
console.log(showMap); // Logs true or false based on the query param or env var
```

### Example 3: Fallback to Default Value
If neither a query parameter nor an environment variable is present, the hook will use the default value:

```javascript
const maxRetries = useConfigParam('maxRetries', 3);
console.log(maxRetries); // Logs the default value: 3
```

## Troubleshooting

### Common Issues

- **Error: `paramName is required`**:
  - This error occurs if the `paramName` argument is missing. Ensure you pass a valid string as the parameter name.

- **Query Parameter Not Found**:
  - If the query parameter is not available, verify the URL or use the fallback mechanisms (environment variable or default value).

- **Environment Variable Not Working**:
  - Make sure the variable is prefixed with `REACT_APP_` in the `.env` file (e.g., `REACT_APP_GEOSERVER`).

## Advanced Usage
### Query Parameter Priority
If the URL contains a query parameter, it takes precedence over environment variables and default values:
```javascript
// URL: http://localhost:3000/?geoServer=http://example.com/geoserver
const geoServer = useConfigParam('geoServer', 'http://localhost:8080/geoserver/isagro/wms');
console.log(geoServer); // Output: http://example.com/geoserver
```

### Boolean Conversion
The hook automatically converts `true` and `false` query parameter values to booleans:
```javascript
// URL: http://localhost:3000/?showMap=true
const showMap = useConfigParam('showMap', false);
console.log(showMap); // Output: true
```

For further questions, consult the [GitHub Repository](https://github.com/Malnati/react-use-config) or open an issue.
