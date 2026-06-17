from typing import List
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from app.config import EMBEDDING_MODEL, CHROMA_DIR

_embedder = None
_vectordb = None

def get_embedder():
    global _embedder
    if _embedder is None:
        _embedder = HuggingFaceEmbeddings(model_name=EMBEDDING_MODEL)
    return _embedder

def get_vectordb():
    global _vectordb
    if _vectordb is None:
        _vectordb = Chroma(
            persist_directory=CHROMA_DIR,
            collection_name="safina_carpets",
            embedding_function=get_embedder(),
        )
    return _vectordb

def as_retriever(k: int = 4):
    return get_vectordb().as_retriever(search_kwargs={"k": k})
