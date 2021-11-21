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

		try {
			const todosResponse = await fetch(
				"https://619a563d9022ea0017a7b116.mockapi.io/api/todos"
			);

			if (todosResponse.ok) {
				const todoValues = await todosResponse.json();
				setTodoList(todoValues);
				setTodoLoading(false);
				return;
			}
			throw new Error("Failed to fetch TODOs");
		} catch (error) {
			setError("Failed to fetch TODOs");
		}
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
			try {
				const res = await fetch(
					`https://619a563d9022ea0017a7b116.mockapi.io/api/todos`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(item),
					}
				);

				if (res.ok) {
					await fetchTodos();
					return;
				}

				throw new Error("Failed to add TODO");
			} catch (error) {
				setError("Failed to add todo!");
			}
		},
		removeTodo: async (itemId: string) => {
			try {
				const res = await fetch(
					`https://619a563d9022ea0017a7b116.mockapi.io/api/todos/${itemId}`,
					{
						method: "DELETE",
					}
				);

				if (res.ok) {
					await fetchTodos();
					return;
				}

				throw new Error("Failed to remove TODO");
			} catch (error) {
				setError("Failed to remove todo");
			}
		},
		toggleTodoCompleted: async (itemId: string) => {
			const items = [...todoList];
			const item = items.find((item) => item.id === itemId);

			if (item) {
				const itemIndex = items.indexOf(item);
				items[itemIndex].isComplete = !item.isComplete;
				setTodoList(items);

				try {
					const res = await fetch(
						`https://619a563d9022ea0017a7b116.mockapi.io/api/todos/${itemId}`,
						{
							method: "PUT",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify(items[itemIndex]),
						}
					);

					if (res.ok) {
						await fetchTodos();
						return;
					}

					throw new Error("Error toggling the todo.");
				} catch (error) {
					setError("Error toggling the todo.");
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
