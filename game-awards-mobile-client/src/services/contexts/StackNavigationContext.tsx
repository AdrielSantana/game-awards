import { createContext, ReactNode, useState } from "react";
import { CategoryGame } from "../../interfaces/GameInterface";

type StackNavigationProps = {
  setStackNavigation: React.Dispatch<any>;
  goToGameScreen: (game: CategoryGame) => void;
  goToVoteScreen: () => void;
};

const StackNavigationContext = createContext<StackNavigationProps>(
  {} as StackNavigationProps
);

type Props = {
  children: ReactNode;
};

const StackNavigationProvider = ({ children }: Props) => {
  const [stackNavigation, setStackNavigation] = useState<any>(null);

  const goToGameScreen = (game: CategoryGame) => {
    stackNavigation.navigate("GameScreen", { game: game });
  };

  const goToVoteScreen = () => {
    stackNavigation.goBack();
  };

  return (
    <StackNavigationContext.Provider
      value={{
        setStackNavigation,
        goToGameScreen,
        goToVoteScreen,
      }}
    >
      <>{children}</>
    </StackNavigationContext.Provider>
  );
};

export { StackNavigationProvider, StackNavigationContext };
