import React, { useContext, useState } from "react";
import { TodoContext } from "../../context/todo-context";
import { TodoItemModel } from "../../models/todo-item.model";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./todo-editor.scss";
import { DrawerContext } from "../../context/drawer-context";

export const TodoEditor = (): JSX.Element => {
	const { addTodo } = useContext(TodoContext);
	const { setIsOpen } = useContext(DrawerContext);

	const [error, setError] = useState("");

	const [formFields, setFormFields] = useState({
		title: "",
		description: "",
		date: new Date(),
	});

	const onFieldChange = (
		e: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormFields({
			...formFields,
			[e.currentTarget.name]: e.currentTarget.value,
		});
	};

	const onDateChange = (date: any) => {
		setFormFields({ ...formFields, date });
	};

	const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		const id = uuidv4();

		if (formFields.title === "") {
			setError("Please add a title");
			return;
		}
		const todoItem: TodoItemModel = {
			id,
			title: formFields.title,
			description: formFields.description,
			isComplete: false,
			deadlineTimestamp: formFields.date.getTime(),
		};

		try {
			await addTodo(todoItem);

			setIsOpen(false);
		} catch (e) {
			setError("Something went wrong, please try again later!");
		}
	};
	return (
		<div className="todo-editor">
			<h1>Create Item</h1>
			<form onSubmit={onSubmit} method="POST">
				<div className="input-block">
					<label htmlFor="title">Title</label>
					<input
						name="title"
						onChange={onFieldChange}
						value={formFields.title}
					></input>
				</div>
				<div className="input-block">
					<label htmlFor="description">Description</label>
					<textarea
						name="description"
						onChange={onFieldChange}
						value={formFields.description}
					></textarea>
				</div>
				<div className="input-block">
					<label htmlFor="date">Deadline</label>
					<DatePicker
						locale="en"
						onChange={onDateChange}
						selected={formFields.date}
						showTimeSelect
						timeIntervals={1}
					/>
				</div>

				<input className="submit-button" type="submit" value={"ADD ITEM"} />
				{error && (
					<span style={{ marginLeft: "1.5rem", color: "red" }}>{error}</span>
				)}
			</form>
		</div>
	);
};
