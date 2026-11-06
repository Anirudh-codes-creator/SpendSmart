$ErrorActionPreference = 'Stop'
$mongod = 'C:\Program Files\MongoDB\Server\9.0\bin\mongod.exe'
if (-not (Test-Path $mongod)) { throw "MongoDB Server executable not found: $mongod" }
$data = Join-Path $PSScriptRoot 'data\db'
$log = Join-Path $PSScriptRoot 'data\mongod.log'
New-Item -ItemType Directory -Force -Path $data | Out-Null
if (Get-Process -Name mongod -ErrorAction SilentlyContinue) { Write-Output 'MongoDB is already running; use mongodb://127.0.0.1:27017'; exit 0 }
Start-Process -FilePath $mongod -ArgumentList @('--dbpath', $data, '--bind_ip', '127.0.0.1', '--port', '27017', '--logpath', $log, '--logappend') -WindowStyle Hidden | Out-Null
for ($i = 0; $i -lt 20; $i++) {
  Start-Sleep -Seconds 1
  if (Get-Process -Name mongod -ErrorAction SilentlyContinue) {
    if (Select-String -Path $log -Pattern 'Waiting for connections' -Quiet) { Write-Output 'MongoDB is running at mongodb://127.0.0.1:27017'; exit 0 }
  }
}
throw "MongoDB did not start. Check $log"
