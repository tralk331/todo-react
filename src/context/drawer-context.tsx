import React from "react";

export interface DrawerContextModel {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
}

const DEFAULT_DRAWER_CONTEXT_VALUE: DrawerContextModel = {
	isOpen: false,
	setIsOpen: () => {
		throw new Error("Function not implmeneted!");
	},
};

export const DrawerContext = React.createContext<DrawerContextModel>(
	DEFAULT_DRAWER_CONTEXT_VALUE
);
