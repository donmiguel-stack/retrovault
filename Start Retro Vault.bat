@echo off
setlocal EnableExtensions EnableDelayedExpansion
title Retro Vault
:: ------------------------------------------------------------------
::  Start Retro Vault  (Windows 10 / 11)
::
::  Double-click this file. It will:
::    1. make sure Python 3 is installed (installs it if not)
::    2. make sure the Vault files are here (downloads them if not)
::    3. start the Vault's little local server
::    4. open it in your browser
::
::  Leave this window open while you play. Close it (or press Ctrl+C)
::  to stop.
::
::  If Windows shows "Windows protected your PC", click "More info" and
::  then "Run anyway". That's a one-time thing for downloaded files.
:: ------------------------------------------------------------------

set "RELEASE_URL=https://github.com/donmiguel-stack/retrovault/releases/latest/download/retro-vault.zip"
set "PYTHON_URL=https://www.python.org/ftp/python/3.13.7/python-3.13.7-amd64.exe"
set "DEFAULT_DIR=%USERPROFILE%\RetroVault"
set "FIRST_PORT=8000"
set "HERE=%~dp0"
if "%HERE:~-1%"=="\" set "HERE=%HERE:~0,-1%"

echo.
echo    RETRO VAULT
echo    Videopac - Odyssey2 - Commodore 64 - MS-DOS
echo.

:: ---------- 1. Python ----------------------------------------------
echo ==^> Checking for Python 3...
call :find_python
if defined PY goto :python_ok

echo     Python 3 is not installed yet.
where winget >nul 2>&1
if not errorlevel 1 (
    echo ==^> Installing Python with winget ^(this can take a few minutes^)...
    winget install -e --id Python.Python.3.13 --scope user --accept-package-agreements --accept-source-agreements
    call :find_python
)
if defined PY goto :python_ok
echo ==^> Downloading the official Python installer from python.org...
set "PYEXE=%TEMP%\retro-vault-python.exe"
curl -fL -o "%PYEXE%" "%PYTHON_URL%"
if not exist "%PYEXE%" powershell -NoProfile -Command "Invoke-WebRequest -Uri '%PYTHON_URL%' -OutFile '%PYEXE%'"
if not exist "%PYEXE%" (call :die "Could not download Python. Are you online?" & exit /b 1)
echo ==^> Installing Python ^(a progress window will appear^)...
"%PYEXE%" /passive InstallAllUsers=0 PrependPath=1 Include_test=0 Include_launcher=1
del "%PYEXE%" >nul 2>&1
call :find_python
if not defined PY (call :die "Python still isn't available. Close this window, then double-click this file again." & exit /b 1)

:python_ok
for /f "delims=" %%v in ('%PY% --version 2^>^&1') do echo     Found: %%v

:: ---------- 2. The Vault files ---------------------------------------
echo.
echo ==^> Looking for the Vault...
if exist "%HERE%\serve.py" (
    set "VAULT=%HERE%"
    echo     Using this folder: !VAULT!
    goto :vault_ok
)
if exist "%DEFAULT_DIR%\serve.py" (
    set "VAULT=%DEFAULT_DIR%"
    echo     Found it in !VAULT!
    goto :vault_ok
)
echo     Not installed yet - downloading the latest release ^(about 200 MB^)...
set "TMP_DIR=%TEMP%\retro-vault-%RANDOM%"
mkdir "%TMP_DIR%" >nul 2>&1
curl -fL -# -o "%TMP_DIR%\retro-vault.zip" "%RELEASE_URL%"
if not exist "%TMP_DIR%\retro-vault.zip" powershell -NoProfile -Command "Invoke-WebRequest -Uri '%RELEASE_URL%' -OutFile '%TMP_DIR%\retro-vault.zip'"
if not exist "%TMP_DIR%\retro-vault.zip" (call :die "Download failed. Are you online?" & exit /b 1)
echo ==^> Unpacking...
mkdir "%TMP_DIR%\unzipped" >nul 2>&1
tar -xf "%TMP_DIR%\retro-vault.zip" -C "%TMP_DIR%\unzipped" 2>nul
if errorlevel 1 powershell -NoProfile -Command "Expand-Archive -LiteralPath '%TMP_DIR%\retro-vault.zip' -DestinationPath '%TMP_DIR%\unzipped' -Force"
:: the zip holds one top-level folder (retro-vault-x.y.z\); find serve.py inside it
set "SRC="
for /d %%d in ("%TMP_DIR%\unzipped\*") do if exist "%%~d\serve.py" set "SRC=%%~d"
if exist "%TMP_DIR%\unzipped\serve.py" set "SRC=%TMP_DIR%\unzipped"
if not defined SRC (call :die "serve.py not found inside the download." & exit /b 1)
if not exist "%DEFAULT_DIR%" mkdir "%DEFAULT_DIR%"
xcopy "%SRC%" "%DEFAULT_DIR%\" /E /I /Q /Y >nul
rmdir /S /Q "%TMP_DIR%" >nul 2>&1
set "VAULT=%DEFAULT_DIR%"
echo     Installed to %VAULT%
echo     Put your own game files in:  %VAULT%\emulator\roms\
echo     and the console BIOS in:     %VAULT%\emulator\bios\

:vault_ok
cd /d "%VAULT%" || (call :die "Cannot open %VAULT%" & exit /b 1)

:: ---------- 3. Pick a port -------------------------------------------
set /a PORT=%FIRST_PORT%
:port_loop
netstat -ano -p tcp | findstr /r /c:":%PORT% .*LISTENING" >nul 2>&1
if errorlevel 1 goto :port_free
curl -s --max-time 2 "http://localhost:%PORT%/index.html" 2>nul | findstr /c:"Retro Vault" >nul 2>&1
if not errorlevel 1 (
    echo.
    echo ==^> The Vault is already running on port %PORT% - just opening it.
    start "" "http://localhost:%PORT%/"
    echo.
    pause
    exit /b 0
)
set /a PORT+=1
if %PORT% gtr 8020 (call :die "No free port found between %FIRST_PORT% and %PORT%." & exit /b 1)
goto :port_loop
:port_free

:: ---------- 4. Start + open the browser ------------------------------
echo.
echo ==^> Starting the Vault on http://localhost:%PORT%/ ...
echo.
echo     Leave this window open while you play.
echo     Done? Press Ctrl+C, or just close this window.
echo.
:: Chrome is the recommended browser (Safari/Edge quirks); fall back to the default.
set "OPEN=start "" "http://localhost:%PORT%/""
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" set "OPEN=start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" "http://localhost:%PORT%/""
if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" set "OPEN=start "" "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" "http://localhost:%PORT%/""
if exist "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" set "OPEN=start "" "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" "http://localhost:%PORT%/""
:: A tiny helper script waits (in the background) until the server answers,
:: then opens the browser - so the page never loads before the Vault is up.
set "HELPER=%TEMP%\retro-vault-open.bat"
> "%HELPER%" echo @echo off
>>"%HELPER%" echo for /l %%%%i in (1,1,40) do (
>>"%HELPER%" echo   curl -s --max-time 1 "http://localhost:%PORT%/index.html" ^>nul 2^>^&1 ^&^& goto :open
>>"%HELPER%" echo   timeout /t 1 ^>nul
>>"%HELPER%" echo )
>>"%HELPER%" echo exit
>>"%HELPER%" echo :open
>>"%HELPER%" echo %OPEN%
>>"%HELPER%" echo exit
start "" /min "%HELPER%"
%PY% serve.py %PORT%
echo.
echo ==^> The Vault has stopped.
pause
exit /b 0

:: ---------- helpers --------------------------------------------------
:find_python
:: PY ends up as either a bare command ("py -3" / "python") or a quoted
:: full path - either way it is used unquoted: %PY% serve.py
set "PY="
:: The Microsoft Store puts a fake python.exe on PATH that only opens the
:: Store, so each candidate has to actually run something.
py -3 -c "import sys; sys.exit(0 if sys.version_info >= (3, 7) else 1)" >nul 2>&1
if not errorlevel 1 (set "PY=py -3" & exit /b 0)
python -c "import sys; sys.exit(0 if sys.version_info >= (3, 7) else 1)" >nul 2>&1
if not errorlevel 1 (set "PY=python" & exit /b 0)
:: Freshly installed Python isn't on this window's PATH yet - look directly.
for /d %%d in ("%LOCALAPPDATA%\Programs\Python\Python3*") do if exist "%%~d\python.exe" set "PY="%%~d\python.exe""
for /d %%d in ("%ProgramFiles%\Python3*") do if exist "%%~d\python.exe" set "PY="%%~d\python.exe""
if exist "%LOCALAPPDATA%\Programs\Python\Launcher\py.exe" set "PY="%LOCALAPPDATA%\Programs\Python\Launcher\py.exe" -3"
if exist "%WINDIR%\py.exe" set "PY="%WINDIR%\py.exe" -3"
exit /b 0

:die
echo.
echo ERROR: %~1
echo.
pause
exit /b 1
