import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../axios"

export const fetchStories = createAsyncThunk("/stories/fetchStories", async () => {
    const { data } = await axios.get("/api/stories")
    return data
})

export const deleteStory = createAsyncThunk("/stories/deleteStory", async (id) => {
    await axios.delete(`/api/stories/${id}`)
})

const initialState = {
    stories: [],
    status: "loading"
}

const storiesSlice = createSlice({
    name: "stories",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchStories.pending, (state) => {
                state.stories = []
                state.status = "loading"
            })
            .addCase(fetchStories.rejected, (state) => {
                state.stories = []
                state.status = "error"
            })
            .addCase(fetchStories.fulfilled, (state, action) => {
                state.stories = action.payload
                state.status = "success"
            })
            .addCase(deleteStory.pending, (state,action) => {
                state.stories = state.stories.filter((story) => story._id !== action.meta.arg)
            })
    }
})

export default storiesSlice.reducer