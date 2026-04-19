# Sets the ANTHROPIC_API_KEY Firebase secret + deploys the Cloud Functions.
#
# USAGE (from the repo root, in PowerShell):
#   powershell -ExecutionPolicy Bypass -File scripts\Set-AnthropicKey.ps1 -Key "sk-ant-YOUR-KEY-HERE"
#
# The -ExecutionPolicy Bypass flag lets it run even if your PowerShell is set
# to restrict unsigned scripts (the default on Windows).
#
# The key is written to a tempfile, uploaded to Firebase Secret Manager, then
# deleted. Nothing is stored in git. Only Cloud Functions that declare
# { secrets: [anthropicKey] } can read it at runtime.

param(
  [Parameter(Mandatory=$true, HelpMessage="Your Anthropic API key (starts with sk-ant-)")]
  [string]$Key
)

$ErrorActionPreference = "Stop"

if ($Key -notmatch '^sk-ant-') {
  Write-Host "ERROR: key must start with 'sk-ant-'" -ForegroundColor Red
  exit 1
}

$TempFile = New-TemporaryFile
try {
  # Use WriteAllText to avoid any trailing newline that PowerShell's
  # Set-Content would add.
  [System.IO.File]::WriteAllText($TempFile.FullName, $Key)

  Write-Host ""
  Write-Host "Setting ANTHROPIC_API_KEY Firebase secret..." -ForegroundColor Cyan
  firebase functions:secrets:set ANTHROPIC_API_KEY --data-file $TempFile.FullName
  if ($LASTEXITCODE -ne 0) {
    throw "Firebase secret set failed (exit code $LASTEXITCODE)"
  }

  Write-Host ""
  Write-Host "Deploying functions (takes ~1-2 minutes)..." -ForegroundColor Cyan
  firebase deploy --only functions
  if ($LASTEXITCODE -ne 0) {
    throw "Firebase deploy failed (exit code $LASTEXITCODE)"
  }

  Write-Host ""
  Write-Host "Done. AI policy generation is live." -ForegroundColor Green
  Write-Host "Test it on the Policies page -> New policy -> '* Generate with AI'"
}
finally {
  Remove-Item $TempFile.FullName -Force -ErrorAction SilentlyContinue
}
