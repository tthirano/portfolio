@echo off
setlocal

REM === Path to ffmpeg.exe (yours) ===
set "FF=C:\ffmpeg\bin\ffmpeg.exe"

REM === Input/output folders ===
set "INPUT_DIR=%~dp0public\videos"
set "OUTPUT_DIR=%~dp0public\videos2"

echo Input:  %INPUT_DIR%
echo Output: %OUTPUT_DIR%
echo Using:  %FF%

if not exist "%FF%" (
  echo.
  echo ❌ ffmpeg not found at "%FF%".
  echo Edit this file and set the FF variable to your ffmpeg.exe path.
  pause
  exit /b 1
)

if not exist "%OUTPUT_DIR%" mkdir "%OUTPUT_DIR%"

for %%F in ("%INPUT_DIR%\*.mp4" "%INPUT_DIR%\*.mov") do (
  echo.
  echo === Converting %%~nxF ===

  REM --- H.264 MP4 (broad support) ---
  "%FF%" -i "%%~fF" -c:v libx264 -profile:v high -level 4.0 -pix_fmt yuv420p -movflags +faststart ^
    -crf 22 -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ^
    -c:a aac -b:a 128k "%OUTPUT_DIR%\%%~nF.h264.mp4" -y

  REM --- VP9 WebM (fallback) ---
  "%FF%" -i "%%~fF" -c:v libvpx-vp9 -b:v 0 -crf 33 ^
    -c:a libopus -b:a 96k "%OUTPUT_DIR%\%%~nF.vp9.webm" -y
)

echo.
echo ✅ Conversion complete. Files are in: %OUTPUT_DIR%
pause
