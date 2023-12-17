let isAuthenticated = false;
let userData = null;

// Check if running in a browser environment
if (typeof window !== 'undefined') {
  // Access sessionStorage only if in a browser
  userData = sessionStorage.getItem("user");
}

if (userData) {
  isAuthenticated = true;
}

export default isAuthenticated