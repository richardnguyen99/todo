"use client";

export type AppQuickEditorActions =
  | {
      type: "SET_CONTENT";
      payload: {
        newContent: string;
      };
    }
  | {
      type: "SET_DESCRIPTION";
      payload: {
        newDescription: string;
      };
    }
  | {
      type: "SET_DUE_DATE";
      payload: {
        newDueDate: Date | null;
      };
    }
  | {
      type: "SET_PRIORITY";
      payload: {
        newPriority: number;
      };
    }
  | {
      type: "SET_LABELS";
      payload: {
        newLabels: string[];
      };
    }
  | {
      type: "SET_REMINDER";
      payload: {
        newReminder: Date | null;
      };
    }
  | {
      type: "RESET";
    };

export type AppQuickEditorState = {
  content: string;
  description: string;
  date: Date | null;
  priority: number;
  labels: string[];
  reminder: Date | null;
};

const reducer = (
  state: AppQuickEditorState,
  action: AppQuickEditorActions
): AppQuickEditorState => {
  switch (action.type) {
    case "SET_CONTENT": {
      return {
        ...state,
        content: action.payload.newContent,
      };
    }

    case "SET_DESCRIPTION": {
      return {
        ...state,
        description: action.payload.newDescription,
      };
    }

    case "SET_DUE_DATE": {
      return {
        ...state,
        date: action.payload.newDueDate,
      };
    }

    case "SET_LABELS": {
      return {
        ...state,
        labels: action.payload.newLabels,
      };
    }

    case "SET_PRIORITY": {
      return {
        ...state,
        priority: action.payload.newPriority,
      };
    }

    case "SET_REMINDER": {
      return {
        ...state,
        reminder: action.payload.newReminder,
      };
    }

    case "RESET": {
      return {
        content: "",
        description: "",
        date: null,
        priority: 0,
        labels: [],
        reminder: null,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
