import { Snippet } from "@/types/snippet-type";
import { toast } from "sonner";
import { create } from "zustand";
import { fetchSnippets as apiFetchSnippets } from "@/lib/api";

interface SnippetStoreState {
  search: string;
  tags: string[];
  language: string;
  page: number;
  loading: boolean;
  snippets: Snippet[];
  setSearch: (searchString: string) => void;
  setTags: (tags: string[]) => void;
  setLanguage: (langString: string) => void;
  setPage: (page: number) => void;
  setLoading: (laodVal: boolean) => void;
  setSnippets: (snippets: Snippet[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleLogout: (router: any) => Promise<void>;
  removeSnippets: (id: string) => void;
  fetchSnippets: () => Promise<void>;
}

export const useSnippetStore = create<SnippetStoreState>((set, get) => ({
  search: "",
  tags: [],
  language: "",
  page: 1,
  loading: false,
  snippets: [],

  setSearch: (searchString) => {
    set({ loading: true });
    set({ search: searchString, loading: false });
  },

  setTags: (tags) => {
    set({ loading: true });
    set({ tags: tags, loading: false });
  },

  setLanguage: (langString) => {
    set({ loading: true });
    set({ language: langString, loading: false });
  },

  setPage: (page) => {
    set({ loading: true });
    set({ page: page, loading: false });
  },

  setLoading: (loadVal) => {
    set({ loading: loadVal });
  },

  handleLogout: async (router) => {
    set({
      search: "",
      tags: [],
      language: "",
      page: 1,
      loading: false,
    });
    if (typeof router?.push === "function") {
      await router.push("/login");
    }
  },

  setSnippets: (snippets) => {
    set({ snippets: snippets });
  },

  fetchSnippets: async () => {
    set({ loading: true });
    try {
      const { page, search, tags, language } = get();
      const res = await apiFetchSnippets({ page, search, tags, language });
      set({ snippets: res.data.data });
    } catch (error) {
      toast.error("Failed to fetch snippets");
    } finally {
      set({ loading: false });
    }
  },

  removeSnippets: (id) => {
    set((state) => ({
      snippets: state.snippets.filter((s) => s.id !== id),
    }));
  },
}));
