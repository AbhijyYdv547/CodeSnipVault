import { create } from "zustand"


interface SnippetStoreState{
    search: string;
    tags: string[];
    language: string;
    page: number;
    loading: boolean;
    setSearch: (searchString: string) => void
    setTags: (tags: string[]) => void
    setLanguage: (langString: string) => void
    setPage: (page: number) => void
    setLoading: (laodVal: boolean) => void
    handleLogout: (router: any) => Promise<void>
}

export const useSnippetStore = create<SnippetStoreState>((set)=>({
    search: "",
    tags: [],
    language: "",
    page: 1,
    loading: false,

    setSearch: (searchString) => {
        set({loading:true});
        set({ search: searchString,loading:false})
    },

    setTags: (tags) => {
        set({ loading: true });
        set({ tags: tags, loading: false })
    },

    setLanguage: (langString) => {
        set({ loading: true });
        set({ language: langString, loading: false })
    },

    setPage: (page) => {
        set({ loading: true });
        set({ page: page, loading: false })
    },

    setLoading: (loadVal)=>{
        set({loading: loadVal})
    },

    handleLogout: async (router) => {
        set({
            search: "",
            tags: [],
            language: "",
            page: 1,
            loading: false,
        });
        if(typeof router?.push === "function"){
            await router.push("/login")
        }
    },
}))