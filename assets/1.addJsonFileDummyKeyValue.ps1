$jsonfile = #path

$json = Get-Content $jsonfile | Out-String | ConvertFrom-Json

$json | Add-Member -Type NoteProperty -Name 'country' -Value 'Hong Kong'

$json | ConvertTo-Json | Set-Content $jsonfile