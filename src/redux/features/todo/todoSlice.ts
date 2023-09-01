import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Todo } from './todo.types';
import TodoData from '@/data/todo.json';
import Notify from '@/components/NotificationAlert';

export interface TodoState {
	todos: Todo[];
	todo: Partial<Todo> | Todo | null;
	isLoading: boolean;
	showAddTodo: boolean;
	showEditTodo: boolean;
	viewTodo: boolean;
	showTodoPopUp: boolean;
}

const initialState: TodoState = {
	todos: [...TodoData] as Todo[],
	todo: null,
	isLoading: false,
	showAddTodo: false,
	showEditTodo: false,
	viewTodo: false,
	showTodoPopUp: false,
};

const renderNotification = Notify();

export const todoSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		handleShowToDoPopUp: (
			state,
			action: PayloadAction<{ status: boolean }>
		) => {
			const { status } = action.payload;
			state.showTodoPopUp = status;
		},

		handleShowAddTodo: (
			state,
			action: PayloadAction<{ status: boolean }>
		) => {
			const { status } = action.payload;
			state.showAddTodo = status;
		},

		handleShowEditTodo: (
			state,
			action: PayloadAction<{ status: boolean }>
		) => {
			const { status } = action.payload;
			state.showEditTodo = status;
		},

		handleViewTodo: (state, action: PayloadAction<{ status: boolean }>) => {
			const { status } = action.payload;
			state.viewTodo = status;
		},

		addTodo: (state, action: PayloadAction<Partial<TodoState>>) => {
			const { todo } = action.payload;

			// const {
			// 	time: { startTime, endTime },
			// } = todo as Todo;

			// const checkIfStartTimeIsEqualToOrGreaterThanEndTime =
			// 	startTime === endTime ||
			// 	Number(startTime.replace(':', '')) -
			// 		Number(endTime.replace(':', '')) ===
			// 		4;

			// if (checkIfStartTimeIsEqualToOrGreaterThanEndTime) {
			// 	renderNotification({
			// 		title: 'Validation Error!',
			// 		body: 'Please make sure your startTime is less than your endTime by at least 5mins!',
			// 		duration: 5000,
			// 		type: 'error',
			// 	});

			// 	return;
			// }

			if (
				(todo !== null && todo?.title === '') ||
				todo?.title === undefined
			) {
				renderNotification({
					title: 'Validation Error!',
					body: 'Please make sure you add a title!',
					duration: 5000,
					type: 'error',
				});

				return;
			}

			const newTodo = {
				...todo,
				createdAt: new Date(
					new Date().toLocaleDateString()
				).toISOString(),
				updatedAt: new Date(
					new Date().toLocaleDateString()
				).toISOString(),
				userId: Math.floor(Math.random() * 40),
				id: Math.floor(Math.random() * 1303881831),
				completed: false,
			} as Todo;

			state.todos = [newTodo as Todo, ...state.todos];

			// Success notification
			renderNotification({
				title: 'Success!',
				body: 'Task successfully added!',
				duration: 5000,
				type: 'success',
			});
		},

		deleteTodo: (state, action: PayloadAction<{ id: number }>) => {
			const { id } = action.payload;
			state.todos = state.todos.filter((todo) => todo.id !== id);

			renderNotification({
				title: 'Success!',
				body: 'Task successfully deleted!',
				duration: 5000,
				type: 'success',
			});
		},

		updateToDo: (state, action: PayloadAction<Partial<TodoState>>) => {
			const { todo } = action.payload;
			// const {
			// 	time: { startTime, endTime },
			// } = todo as Todo;

			// const checkIfStartTimeIsEqualToOrGreaterThanEndTime =
			// 	startTime === endTime ||
			// 	Number(startTime.replace(':', '')) -
			// 		Number(endTime.replace(':', '')) ===
			// 		4;

			// if (checkIfStartTimeIsEqualToOrGreaterThanEndTime) {
			// 	renderNotification({
			// 		title: 'Validation Error!',
			// 		body: 'Please make sure your startTime is lessthan your endTime by atleast 5mins!',
			// 		duration: 5000,
			// 		type: 'error',
			// 	});

			// 	return;
			// }

			if (
				(todo !== null && todo?.title === '') ||
				todo?.title === undefined
			) {
				renderNotification({
					title: 'Validation Error!',
					body: 'Please make sure you add a title!',
					duration: 5000,
					type: 'error',
				});

				return;
			}

			const todoToUpdate =
				todo !== null &&
				todo !== undefined &&
				state.todos.find((singleTodo) => singleTodo.id === todo.id);

			if (todoToUpdate) {
				state.todos = state.todos.map((todoToBeEdited) => {
					if (todoToBeEdited.id === todo.id)
						return { ...(todo as Todo) };
					return todoToBeEdited as Todo;
				});
			}

			renderNotification({
				title: 'Success!',
				body: 'Task successfully updated!',
				duration: 5000,
				type: 'success',
			});
		},

		getSingleToDo: (state, action: PayloadAction<{ id: number }>) => {
			const { id } = action.payload;
			state.todo = state.todos.find((todo) => todo.id === id) as Todo;
		},
	},
});

export const {
	addTodo,
	getSingleToDo,
	deleteTodo,
	updateToDo,
	handleShowAddTodo,
	handleShowEditTodo,
	handleViewTodo,
	handleShowToDoPopUp,
} = todoSlice.actions;

export default todoSlice.reducer;
