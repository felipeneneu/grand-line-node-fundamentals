<#
.SYNOPSIS
    Script utilitário para invocar o mentor Silvers Rayleigh (SenseiBackendGrandLine) via Antigravity CLI (agy).

.PARAMETER Arco
    O arco atual do curso (EastBlue, Alabasta, Water7, EniesLobby, Marineford, NewWorld).

.PARAMETER Arquivo
    Arquivo específico a ser inspecionado (ex: src/server.js).
#>
param(
    [string]$Arco = "EastBlue",
    [string]$Arquivo = "src/server.js"
)

Write-Host "⚔️ Invocando Silvers Rayleigh para a Leitura de Haki do Arco: $Arco..." -ForegroundColor Yellow

$prompt = "Ative a habilidade revisao-arco. Avalie o arquivo '$Arquivo' referente ao arco '$Arco'. Aplique estritamente o método socrático do Silvers Rayleigh: não dê a resposta pronta, faça perguntas afiadas, exija que eu explique o código e me passe um desafio de fixação antes de gerar o diário de bordo."

agy --prompt $prompt
