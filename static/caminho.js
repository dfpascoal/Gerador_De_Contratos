const response = await fetch("https://127.0.0.1:8000/gerar-contrato", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
});

document.getElementById("contratoForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Impede envio padrão

    // Coleta os dados do formulário
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    data.valor = parseFloat(data.valor.replace(/\./g, '').replace(',', '.')).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    try {
        const response = await fetch("http://127.0.0.1:8000/gerar-contrato", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error("Erro ao gerar contrato");

        // Cria um link para baixar o PDF
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "contrato.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    } catch (err) {
        alert("Erro: " + err.message);
    }
});
document.getElementById("valor").addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, '');
    value = (Number(value) / 100).toFixed(2);
    value = value.replace(".", ",");
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    e.target.value = value;
});
