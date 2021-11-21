import { useContext } from "react";
import { TodoContext } from "../../context/todo-context";
import { isValidArray } from "../../utils/is-valid-array";
import { TodoItem } from "../todo-item/todo-item";
import "./todo-list.scss";

export const TodoList = (): JSX.Element => {
	const { todoList, loading } = useContext(TodoContext);
	return (
		<div className="todo-list">
			{isValidArray(todoList)
				? todoList.map((item) => <TodoItem key={item.id} itemId={item.id} />)
				: !loading && <span>No items found</span>}
			{loading && <span>Loading. . .</span>}
		</div>
	);
};
