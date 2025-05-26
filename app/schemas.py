from pydantic import BaseModel 

class ContratoRequest(BaseModel):
    nome_Cliente: str
    cpf_Cliente: str 
    nome_Prestador: str 
    cpf_Prestador: str 
    servico: str
    prazo_entrega: str
    valor: float