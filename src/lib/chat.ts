import { OpenAI } from "langchain/llms/openai";
import { RetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export async function promptChatGPT( apiKey : string, prompt: string, document: string) {

  const model = new OpenAI({ openAIApiKey: apiKey });
  
  const VECTOR_STORE_PATH = "./src/documents/"+document+"-data-index";
  let vectorStore;

  console.log("Loading existing vector store...");
  vectorStore = await HNSWLib.load(
    VECTOR_STORE_PATH,
    new OpenAIEmbeddings({ openAIApiKey: apiKey })
  );
  console.log("Vector store loaded.");

  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());

  console.log("Creating retrieval chain...");
  const result = await chain.call({ query: prompt });
  console.log("Result:", result);
  return result
}