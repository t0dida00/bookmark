export const loadStateFromLocalStorage = () => {
    if (typeof window === "undefined") return null; // Skip if on the server
    try {
        const serializedState = localStorage.getItem("userData");
        return serializedState ? JSON.parse(serializedState) : null;
    } catch (error) {
        console.error("Error loading state from localStorage", error);
        return null;
    }
};
export const saveStateToLocalStorage = (state) => {
    if (typeof window === "undefined") return; // Skip if on the server
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("userData", serializedState);
    } catch (error) {
        console.error("Error saving state to localStorage", error);
    }
};