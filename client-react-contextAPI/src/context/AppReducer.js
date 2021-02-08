export default (state, action) => {
    switch (action.type) {
        case 'REMOVE_USER':
            return {
                ...state,
                users: state.users.filter(employee => employee.id !== action.payload)
            };
        case 'ADD_USERS':
            return {
                ...state,
                users: [...state.users, action.payload]
            };
        case 'EDIT_USER':
            const updatedUser = action.payload;

            const updatedEmployees = state.users.map(employee => {
                if (employee.id === updatedUser.id) {
                    return updatedUser;
                }
                return employee;
            });
            return {
                ...state,
                users: updatedEmployees
            };
        case 'GET_USER':
            return {
                ...state,
                users: [ ...action.payload]
            };
        default: return state;
    }
}