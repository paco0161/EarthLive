$allTime = (Invoke-WebRequest "http://worldtimeapi.org/api/timezone").Content.Trim("[ ").Trim(" ]").split(",").Replace("`"","")

$jsonfile = #path

$json = Get-Content $jsonfile | Out-String | ConvertFrom-Json

foreach ($time in $allTime) {
	$detail = (Invoke-WebRequest $("http://worldtimeapi.org/api/timezone/" + $time)).Content | ConvertFrom-Json
	$abbreviation = $detail.abbreviation
	$utc_offset = $detail.utc_offset
	foreach($place in $json) {
		if ($place.timezone -eq $detail.timezone) {
			$place.utc_offset = $utc_offset
			$place.abbreviation = $abbreviation
		}
	}
}

$json | ConvertTo-Json -depth 32| set-content #path
