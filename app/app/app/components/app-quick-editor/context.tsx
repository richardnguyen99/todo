"use client";

import * as React from "react";

interface AppEditorContext {
  content: string;
  description: string;
  date: Date;
  priority: number;
  labels: string[];

  handleContentChange: (newContent: string) => void;
  handleDescriptionChange: (newDescription: string) => void;
  handleDateChange: (newDate: Date) => void;
  handlePriorityChange: (newPriority: number) => void;
  handleLabelsChange: (newLabels: string[]) => void;
}

const AppQuicKEditorContext = React.createContext<AppEditorContext>(
  {} as AppEditorContext
);
AppQuicKEditorContext.displayName = "AppQuicKEditorContext";

const AppQuickEditorProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [content, setContent] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [date, setDate] = React.useState<Date>(new Date());
  const [priority, setPriority] = React.useState<number>(0);
  const [labels, setLabels] = React.useState<string[]>([]);

  const handleContentChange = React.useCallback((newContent: string) => {
    setContent(newContent);
  }, []);

  const handleDescriptionChange = React.useCallback(
    (newDescription: string) => {
      setDescription(newDescription);
    },
    []
  );

  const handleDateChange = React.useCallback((newDate: Date) => {
    setDate(newDate);
  }, []);

  const handlePriorityChange = React.useCallback((newPriority: number) => {
    setPriority(newPriority);
  }, []);

  const handleLabelsChange = React.useCallback((newLabels: string[]) => {
    setLabels(newLabels);
  }, []);

  const memoValue = React.useMemo(
    () => ({
      content,
      description,
      date,
      priority,
      labels,
      handleContentChange,
      handleDescriptionChange,
      handleDateChange,
      handlePriorityChange,
      handleLabelsChange,
    }),
    [
      content,
      description,
      date,
      priority,
      labels,
      handleContentChange,
      handleDescriptionChange,
      handleDateChange,
      handlePriorityChange,
      handleLabelsChange,
    ]
  );

  return (
    <AppQuicKEditorContext.Provider value={memoValue}>
      {children}
    </AppQuicKEditorContext.Provider>
  );
};

export const useAppQuickEditorContext = () => {
  const context = React.useContext(AppQuicKEditorContext);

  if (!context) {
    throw new Error(
      "useAppQuickEditorContext must be used within an AppQuickEditorProvider"
    );
  }

  return context;
};

export default AppQuickEditorProvider;
