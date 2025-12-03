import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface ClueState {
	clueVisible: boolean;
	setClueVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClueContext = createContext<ClueState>({
	clueVisible: false,
	setClueVisible: () => {},
});

export function ClueProvider({ children }: { children: ReactNode }) {
	const [clueVisible, setClueVisible] = useState(false);

	return (
		<ClueContext.Provider value={{ clueVisible, setClueVisible }}>
			{children}
		</ClueContext.Provider>
	);
}

export const useClue = () => useContext(ClueContext);
