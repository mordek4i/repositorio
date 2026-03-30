$port = 8080
$path = "c:\Users\Itzmd\Documents\antigravity"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host "Servidor ativo! Abra o seu navegador e acesse: http://localhost:$port"
Write-Host "Para parar, feche este terminal."

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $requestPath = $request.Url.LocalPath
        if ($requestPath -eq "/") { $requestPath = "/index.html" }
        
        $filePath = Join-Path $path $requestPath.Replace('/', '\')
        
        if (Test-Path $filePath -PathType Leaf) {
            # Set the content type based on file extension
            if ($filePath -match "\.html$") { $response.ContentType = "text/html; charset=utf-8" }
            elseif ($filePath -match "\.css$") { $response.ContentType = "text/css" }
            elseif ($filePath -match "\.js$") { $response.ContentType = "application/javascript" }
            elseif ($filePath -match "\.png$") { $response.ContentType = "image/png" }
            elseif ($filePath -match "\.jpg$|\.jpeg$") { $response.ContentType = "image/jpeg" }
            
            $content = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
        } else {
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentLength64 = $errBytes.Length
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }
        $response.Close()
    }
} finally {
    $listener.Stop()
}
