// reducers/userReducer.js

// Function to load state from sessionStorage
const loadStateFromSessionStorage = () => {
    try {
      const serializedState = sessionStorage.getItem('authState');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (error) {
      return undefined;
    }
  };
  
  // Function to save state to sessionStorage
  const saveStateToSessionStorage = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      sessionStorage.setItem('authState', serializedState);
    } catch (error) {
      // Ignore write errors
    }
  };
  
  // Reducer initialization
  const initialState = loadStateFromSessionStorage() || {
    isAuthenticated: false,
    user: {}
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_USER':
        const newStateAfterLogin = {
          ...state,
          isAuthenticated: true,
          user: action.payload
        };
        saveStateToSessionStorage(newStateAfterLogin);
        return newStateAfterLogin;
      case 'LOGOUT_USER':
        const newStateAfterLogout = {
          ...state,
          isAuthenticated: false,
          user: {}
        };
        saveStateToSessionStorage(newStateAfterLogout);
        return newStateAfterLogout;
      default:
        return state;
    }
  };
  
  export default userReducer;
  
 