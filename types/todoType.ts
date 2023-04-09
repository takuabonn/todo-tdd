export type Todo = {
  id: string;
  user_id: string;
  task: string;
  is_completed: boolean;
};

export type GetResponseData = {
  todo_list: Todo[];
};

export type PostResponseData = {
  todo: Todo;
};

export type UpdateResponseData = {
  todo: Todo;
};

export type DeleteResponseData = {
  todo: Todo;
};
