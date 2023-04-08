export type Todo = {
  id: string;
  user_id: string;
  task: string;
};

export type GetResponseData = {
  todo_list: Todo[];
};

export type PostResponseData = {
  todo: Todo;
};
