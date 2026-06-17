import os
from pathlib import Path
from typing import List

from langchain_community.document_loaders import DirectoryLoader, PyPDFLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from app.vector import get_embedder
from app.config import CHROMA_DIR, CHUNK_SIZE, CHUNK_OVERLAP

DATA_DIR = "data"

def load_docs():
    docs = []
    # PDFs
    if os.path.isdir(DATA_DIR):
        pdf_loader = DirectoryLoader(DATA_DIR, glob="**/*.pdf", loader_cls=PyPDFLoader, show_progress=True)
        docs += pdf_loader.load()

        # Markdown & Text
        for pattern in ["**/*.md", "**/*.txt"]:
            loader = DirectoryLoader(DATA_DIR, glob=pattern, loader_cls=TextLoader, show_progress=True, loader_kwargs={"encoding": "utf-8"})
            docs += loader.load()
    return docs

def split_docs(docs):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=CHUNK_SIZE,
        chunk_overlap=CHUNK_OVERLAP,
        separators=["\n\n", "\n", " ", ""],
    )
    return splitter.split_documents(docs)

def build_index():
    Path(CHROMA_DIR).mkdir(parents=True, exist_ok=True)
    docs = load_docs()
    if not docs:
        raise SystemExit("No documents found in ./data. Add PDFs/TXT/MD then rerun.")

    chunks = split_docs(docs)
    embedder = get_embedder()
    vs = Chroma.from_documents(
        documents=chunks,
        embedding=embedder,
        persist_directory=CHROMA_DIR,
        collection_name="safina_carpets",
    )
    vs.persist()
    print(f"✅ Indexed {len(chunks)} chunks into {CHROMA_DIR}")

if __name__ == "__main__":
    build_index()
