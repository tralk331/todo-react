import { PropsWithChildren, useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { DrawerContext } from "../../context/drawer-context";
import { TodoContext } from "../../context/todo-context";
import "./drawer.scss";

export const Drawer = ({ children }: PropsWithChildren<{}>) => {
	const { isOpen, setIsOpen } = useContext(DrawerContext);
	const { setEditedTodoId } = useContext(TodoContext);
	const onClose = () => {
		setEditedTodoId(null);
		setIsOpen(false);
	};
	return (
		<div className={`drawer ${isOpen && "drawer-open"}`}>
			<div className="drawer-close-icon">
				<FaTimes onClick={onClose} />
			</div>
			{children && <div className="drawer-content">{children}</div>}
		</div>
	);
};
