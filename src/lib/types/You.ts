interface YouResponse {
  data: {
    id: number;
    created_at: string;
    username: string;
    studio: number;
    busy: boolean;
    workingOnProject: boolean;
    percentageDoneWithProject: boolean;
  };
  studio: {
    id: number;
    title: string;
    host: number;
    description: string;
    visibility: "visible" | "hidden";
    public: boolean;
    open_to_all: boolean;
    comments_allowed: boolean;
    image: string;
    history: {
      created: string;
      modified: string;
    };
    stats: {
      comments: number;
      followers: number;
      managers: number;
      projects: number;
    }
  }
  studio_url: string;
  isError: boolean;
}

export type { YouResponse };
