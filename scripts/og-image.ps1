Add-Type -AssemblyName System.Drawing
$out = Join-Path (Split-Path $PSScriptRoot -Parent) 'public/og.jpg'

$W = 1200; $H = 630
$bmp = [System.Drawing.Bitmap]::new($W, $H)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

# Brand palette (matches site: #080C14 navy/black, #C4956A warm copper)
$navy   = [System.Drawing.Color]::FromArgb(255,   8,  12,  20)
$navy2  = [System.Drawing.Color]::FromArgb(255,  15,  26,  46)
$copper = [System.Drawing.Color]::FromArgb(255, 196, 149, 106)
$white  = [System.Drawing.Color]::FromArgb(255, 248, 250, 252)
$dim    = [System.Drawing.Color]::FromArgb(255, 150, 158, 170)

# Gradient background (top-left navy -> bottom-right navy2)
$rect = [System.Drawing.Rectangle]::new(0, 0, $W, $H)
$lgb = [System.Drawing.Drawing2D.LinearGradientBrush]::new($rect, $navy, $navy2, 35.0)
$g.FillRectangle($lgb, $rect)

# Subtle radial copper glow centred lower-right
$gp = [System.Drawing.Drawing2D.GraphicsPath]::new()
$gp.AddEllipse(700, 200, 700, 700) | Out-Null
$pgb = [System.Drawing.Drawing2D.PathGradientBrush]::new($gp)
$pgb.CenterColor = [System.Drawing.Color]::FromArgb(60, 196, 149, 106)
$pgb.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 8, 12, 20))
$g.FillPath($pgb, $gp)

# Thin grid lines for texture
$gridPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(10, 248, 250, 252), [single]1)
for ($x = 0; $x -lt $W; $x += 60) { $g.DrawLine($gridPen, $x, 0, $x, $H) }
for ($y = 0; $y -lt $H; $y += 60) { $g.DrawLine($gridPen, 0, $y, $W, $y) }

# Eyebrow rule + label
$rulePen = [System.Drawing.Pen]::new($copper, [single]4)
$g.DrawLine($rulePen, [single]80, [single]110, [single]240, [single]110)

$eyebrowFont = [System.Drawing.Font]::new('Segoe UI', [single]14, [System.Drawing.FontStyle]::Bold)
$copperBrush = [System.Drawing.SolidBrush]::new($copper)
$g.DrawString('SANTA MESA  /  SYDNEY', $eyebrowFont, $copperBrush, [single]80, [single]130)

# Title — three lines, last in copper italic
$titleFont1 = [System.Drawing.Font]::new('Segoe UI', [single]80, [System.Drawing.FontStyle]::Bold)
$titleFont2 = [System.Drawing.Font]::new('Segoe UI', [single]80, ([System.Drawing.FontStyle]::Bold -bor [System.Drawing.FontStyle]::Italic))
$whiteBrush = [System.Drawing.SolidBrush]::new($white)

$g.DrawString('More Clients.',    $titleFont1, $whiteBrush,  [single]70, [single]180)
$g.DrawString('Less Chaos.',      $titleFont2, $copperBrush, [single]70, [single]290)

# Sub-headline
$subFont = [System.Drawing.Font]::new('Segoe UI', [single]22, [System.Drawing.FontStyle]::Regular)
$dimBrush = [System.Drawing.SolidBrush]::new($dim)
$g.DrawString('AI integration, lead generation and Google Ads', $subFont, $dimBrush, [single]80, [single]430)
$g.DrawString('for Sydney local businesses.',                   $subFont, $dimBrush, [single]80, [single]465)

# URL pill (bottom-right) — copper background
$pillW = 230; $pillH = 60
$pillX = $W - $pillW - 60
$pillY = $H - $pillH - 60
$r = 30
$pillPath = [System.Drawing.Drawing2D.GraphicsPath]::new()
$pillPath.AddArc($pillX,                  $pillY,                  ($r*2), ($r*2), 180, 90) | Out-Null
$pillPath.AddArc($pillX + $pillW - $r*2,  $pillY,                  ($r*2), ($r*2), 270, 90) | Out-Null
$pillPath.AddArc($pillX + $pillW - $r*2,  $pillY + $pillH - $r*2,  ($r*2), ($r*2),   0, 90) | Out-Null
$pillPath.AddArc($pillX,                  $pillY + $pillH - $r*2,  ($r*2), ($r*2),  90, 90) | Out-Null
$pillPath.CloseFigure()
$g.FillPath($copperBrush, $pillPath)

$pillFont = [System.Drawing.Font]::new('Segoe UI', [single]18, [System.Drawing.FontStyle]::Bold)
$navyBrush = [System.Drawing.SolidBrush]::new($navy)
$pillRect = [System.Drawing.RectangleF]::new([single]$pillX, [single]$pillY, [single]$pillW, [single]$pillH)
$sf = [System.Drawing.StringFormat]::new()
$sf.Alignment     = [System.Drawing.StringAlignment]::Center
$sf.LineAlignment = [System.Drawing.StringAlignment]::Center
$g.DrawString('santamesa.dev', $pillFont, $navyBrush, $pillRect, $sf)

# Save JPEG q88
$codec  = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = [System.Drawing.Imaging.EncoderParameters]::new(1)
$params.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, [long]88)
$bmp.Save($out, $codec, $params)

$g.Dispose(); $bmp.Dispose()
$size = (Get-Item $out).Length
Write-Output ("Wrote {0} ({1:N0} bytes)" -f $out, $size)
