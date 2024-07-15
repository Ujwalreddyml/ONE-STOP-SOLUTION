@echo off
setlocal enabledelayedexpansion

REM Load environment variables from .env file
for /f "tokens=1,2 delims==" %%a in (.env) do (
    set %%a=%%b
)

REM Execute SQL command
mysql -h %DB_HOST% -u %DB_USER% -p%DB_PASS% %DB_NAME% < path\to\your\script.sql

endlocal
