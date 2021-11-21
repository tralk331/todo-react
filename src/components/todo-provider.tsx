import { PropsWithChildren, useEffect, useState } from "react";
import { TodoContext, TodoContextModel } from "../context/todo-context";
import { TodoItemModel } from "../models/todo-item.model";

export const TodoProvider = ({
	children,
}: PropsWithChildren<{}>): JSX.Element => {
	const [todoList, setTodoList] = useState<TodoItemModel[]>([]);
	const [todoLoading, setTodoLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		fetchTodos();
	}, []);

	const fetchTodos = async () => {
		setTodoLoading(true);
		const todosResponse = await fetch(
			"https://619a563d9022ea0017a7b116.mockapi.io/api/todos"
		);
		const todoValues = await todosResponse.json();
		setTodoList(todoValues);
		setTodoLoading(false);
	};
	const [editedTodoId, setEditedTodoId] = useState<string | null>(null);
	const todoContextValue: TodoContextModel = {
		todoList,
		loading: todoLoading,
		setLoading: setTodoLoading,
		error,
		setError,
		editedTodoId,
		setEditedTodoId,
		getTodo: (itemId) => {
			const foundItem = todoList.find((item) => item.id === itemId);
			if (foundItem) {
				return foundItem;
			}
			return null;
		},
		addTodo: async (item: TodoItemModel) => {
			console.log(JSON.stringify(item));
			try {
				await fetch(`https://619a563d9022ea0017a7b116.mockapi.io/api/todos`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(item),
				});
				await fetchTodos();
			} catch (error) {
				console.error("Failed to add todo");
			}
		},
		removeTodo: async (itemId: string) => {
			try {
				await fetch(
					`https://619a563d9022ea0017a7b116.mockapi.io/api/todos/${itemId}`,
					{
						method: "DELETE",
					}
				);
				await fetchTodos();
			} catch (error) {
				console.error("Failed to remove todo");
			}
		},
		toggleTodoCompleted: async (itemId: string) => {
			const items = [...todoList];
			const item = items.find((item) => item.id === itemId);

			if (item) {
				const itemIndex = items.indexOf(item);
				items[itemIndex].isComplete = !item.isComplete;
				setTodoList(items);

				console.log(JSON.stringify(items[itemIndex]));
				try {
					await fetch(
						`https://619a563d9022ea0017a7b116.mockapi.io/api/todos/${itemId}`,
						{
							method: "PUT",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify(items[itemIndex]),
						}
					);
				} catch (error) {
					console.error("Error changing state state");
				}
			}
		},
	};
	return (
		<TodoContext.Provider value={todoContextValue}>
			{children}
		</TodoContext.Provider>
	);
};
