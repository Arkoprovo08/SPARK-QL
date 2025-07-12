from fastapi import FastAPI, Depends, HTTPException
from databases import *
from sqlalchemy import text
import ollama
from fastapi.middleware.cors import CORSMiddleware


# FastAPI app instance
app = FastAPI(debug=True)

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Prompt(BaseModel):
    content:str


# Routes

# API endpoint to create an item
@app.post("/items/", response_model=BlogResponse)
async def create_item(item: BlogCreate, db: Session = Depends(get_db)):
    db_item = Blog(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


# API endpoint to read an item by ID
@app.get("/items/{item_id}", response_model=BlogResponse)
async def read_item(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(Blog).filter(Blog.id == item_id).first()
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item


@app.get("/recents/")
def get_raw_blogs(db: Session = Depends(get_db)):
    result = db.execute(text("SELECT * FROM blogs LIMIT 5;"))
    rows = result.mappings().all() 
    return rows

@app.post("/raw/")
def get_raw(query: str, db:Session = Depends(get_db)):
    print (query) 
    result = db.execute(text(query))
    rows = result.mappings().all() 
    return rows

@app.post("/generate")
def generate(prompt: Prompt,db:Session = Depends(get_db)):

    chat_prompt = '''You are a SQL assistant for a blogging platform. The schema has a `blogs` table with the following columns:
- id (int)
- name (text)
- description (text)
- likes (int)

Convert the following question into a SQLLite query only give me the query as output:
Don't allow risky operations like delete or modify

'''
    chat_prompt = chat_prompt + prompt.content

    response = ollama.chat(model='llama3.2',messages=[{"role":"user","content":chat_prompt}])


    query = response["message"]["content"]

    result = db.execute(text(query))
    rows = result.mappings().all() 

    for row in rows:
        print(dict(row))
    return rows



if __name__ == "__main__":
    import uvicorn

    # Run the FastAPI application using Uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)