import fastApiInstance from "./fastapiInstance";

export const askChatbot = async (question: string) => {
    const response = await fastApiInstance.post(`/chat?q=${question}`)
    return response.data.answer;
}