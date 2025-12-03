import { type ReactNode, createContext, useContext, useState } from "react";

interface UsernameContext {
	username: string;
	setUsername: (name: string) => void;
}

const UsernameContext = createContext<UsernameContext | undefined>(undefined);

export function UsernameProvider({ children }: { children: ReactNode }) {
	const [username, setUsername] = useState("");

	return (
		<UsernameContext.Provider value={{ username, setUsername }}>
			{children}
		</UsernameContext.Provider>
	);
}

export function useUsername() {
	const context = useContext(UsernameContext);
	if (!context) {
		throw new Error("Username must be used inside a UsernameProvider");
	}
	return context;
}
