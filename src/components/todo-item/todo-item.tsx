import React, { useContext } from "react";
import { AiOutlineCheck, AiOutlineExclamation } from "react-icons/ai";
import "./todo-item.scss";
import { TodoContext } from "../../context/todo-context";
import { MdDelete } from "react-icons/md";

interface TodoItemProps {
	itemId: string;
}

export const TodoItem = ({ itemId }: TodoItemProps): JSX.Element => {
	const { getTodo, toggleTodoCompleted, removeTodo } = useContext(TodoContext);
	const item = getTodo(itemId);

	if (!item) {
		throw new Error("invalid item id");
	}
	const isChecked = item.isComplete;
	const handleTodoToggle = (e: React.SyntheticEvent<HTMLDivElement>) => {
		toggleTodoCompleted(item.id);
	};

	const dateString = new Date(item.deadlineTimestamp).toLocaleDateString("en");
	const isExpired = item.deadlineTimestamp <= Date.now();
	const renderCheckedState = () =>
		isChecked ? <AiOutlineCheck style={{ color: "#a5d6a7" }} /> : renderAlert();
	const renderAlert = () =>
		isExpired && <AiOutlineExclamation style={{ color: "#ef9a9a" }} />;
	return (
		<div className="todo-item">
			<div className="todo-checkbox" onClick={handleTodoToggle}>
				{renderCheckedState()}
			</div>
			<div
				className="todo-info"
				style={
					isChecked
						? { textDecoration: "line-through" }
						: { textDecoration: "none" }
				}
			>
				<h2 className="item-title">{item.title}</h2>
				<p className="item-description">{item.description}</p>
				<span
					className="item-deadline"
					style={
						isExpired && !isChecked ? { color: "#ef9a9a" } : { color: "white" }
					}
				>
					{dateString}
				</span>
			</div>
			<div className="todo-edit-buttons">
				<span className="delete-icon">
					<MdDelete onClick={() => removeTodo(item.id)} />
				</span>
			</div>
		</div>
	);
};
