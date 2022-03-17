interface CollabResponse {
  studioID: number;
  collab: {
    id: number;
    created_at: string;
    studio: number;
    created_by: number;
    goals: {
      title: string;
      progress: number;
    }[];
    releases: {
      title: string;
      id: number;
      description: string;
    }[];
  };
  creator: string;
  studioData: {
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
    };
  };
}

export type { CollabResponse };
