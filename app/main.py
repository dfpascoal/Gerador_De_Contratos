from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles  # <--- Import para arquivos estáticos
from app.schemas import ContratoRequest
from weasyprint import HTML
import uuid
import os

#  ESSA LINHA DEVE VIR PRIMEIRO
app = FastAPI()
# Servindo arquivos estáticos
app.mount("/static", StaticFiles(directory="static"), name="static")
# Templates
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/gerar-contrato")
async def gerar_contrato(dados: ContratoRequest):
    html_renderizado = templates.get_template("contrato_template.html").render(dados.dict())
    nome_arquivo = f"contrato_{uuid.uuid4()}.pdf"
    HTML(string=html_renderizado).write_pdf(nome_arquivo)
    return FileResponse(nome_arquivo, media_type="application/pdf", filename="contrato.pdf")
