import React from "react";
import { TodoItemModel } from "../models/todo-item.model";

export interface TodoContextModel {
	todoList: TodoItemModel[];
	loading: boolean;
	setLoading: (value: boolean) => void;
	error: string;
	setError: (errorMessage: string) => void;
	editedTodoId: string | null;
	setEditedTodoId: (itemId: string | null) => void;
	getTodo: (itemId: string) => TodoItemModel | null;
	addTodo: (item: TodoItemModel) => void;
	removeTodo: (itemId: string) => void;
	toggleTodoCompleted: (itemId: string) => void;
}
const defaultTodoContext: TodoContextModel = {
	todoList: [],
	loading: false,
	setLoading: () => {
		throw new Error("Set Loading not implemented!");
	},
	error: "",
	setError: () => {
		throw new Error("Set error function not implemented");
	},
	setEditedTodoId: () => {
		throw new Error("Set edited todo id function not implemented");
	},
	editedTodoId: null,
	getTodo: () => {
		throw new Error("Get todo function not implemented");
	},
	addTodo: () => {
		throw new Error("Add todo function not implemented");
	},
	removeTodo: () => {
		throw new Error("Remove todo function not implemented");
	},
	toggleTodoCompleted: () => {
		throw new Error("Toggle todo function not implemented");
	},
};

export const TodoContext = React.createContext(defaultTodoContext);
